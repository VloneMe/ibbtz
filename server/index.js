import express from 'express';
import { DatabaseSync } from 'node:sqlite';
import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';
import { mkdirSync, existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GALA_QUESTIONS, OTHER } from './questions.js';

// ---------------------------------------------------------------------------
// Config (loaded from ./.env if present, then process.env)
// ---------------------------------------------------------------------------
const here = dirname(fileURLToPath(import.meta.url));
const envFile = resolve(here, '.env');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2];
  }
}
const PORT = Number(process.env.PORT || 5091);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const DB_PATH = resolve(here, process.env.DB_PATH || './data/ibbplus.db');
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

if (!ADMIN_PASSWORD || !TOKEN_SECRET) {
  console.error('ADMIN_PASSWORD and TOKEN_SECRET must be set (see .env.example)');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Database
// ---------------------------------------------------------------------------
mkdirSync(dirname(DB_PATH), { recursive: true });
const db = new DatabaseSync(DB_PATH);
db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS gala_registrations (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name         TEXT NOT NULL,
    email             TEXT NOT NULL,
    phone             TEXT NOT NULL,
    organisation      TEXT NOT NULL,
    job_title         TEXT,
    registration_type TEXT NOT NULL,
    payment_method    TEXT,
    amount            TEXT,
    ip                TEXT,
    user_agent        TEXT,
    created_at        TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
  );
  CREATE INDEX IF NOT EXISTS idx_gala_created ON gala_registrations(created_at);
  CREATE INDEX IF NOT EXISTS idx_gala_email ON gala_registrations(email);
`);
// Add the interests column to databases created before it existed.
const columns = db.prepare(`PRAGMA table_info(gala_registrations)`).all().map((c) => c.name);
if (!columns.includes('interests')) db.exec(`ALTER TABLE gala_registrations ADD COLUMN interests TEXT`);

const insertStmt = db.prepare(`
  INSERT INTO gala_registrations
    (full_name, email, phone, organisation, job_title, registration_type, payment_method, amount, interests, ip, user_agent)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
const listStmt = db.prepare(`SELECT * FROM gala_registrations ORDER BY created_at DESC, id DESC`);
const deleteStmt = db.prepare(`DELETE FROM gala_registrations WHERE id = ?`);

// ---------------------------------------------------------------------------
// Form definition (mirrors the Google Form)
// ---------------------------------------------------------------------------
export const REGISTRATION_TYPES = ['Individual', 'Corporate Table'];
export const PAYMENT_METHODS = ['Mobile Money (Pay Bill)'];
export const AMOUNTS = ['Tsh 150,000', 'Tsh 2,000,000'];

const clean = (v, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

function validateRegistration(body) {
  const errors = {};
  const data = {
    full_name: clean(body.fullName),
    email: clean(body.email).toLowerCase(),
    phone: clean(body.phone, 40),
    organisation: clean(body.organisation),
    job_title: clean(body.jobTitle) || null,
    registration_type: clean(body.registrationType, 40),
    payment_method: clean(body.paymentMethod, 40) || PAYMENT_METHODS[0],
    amount: clean(body.amount, 40) || null,
  };
  if (data.full_name.length < 2) errors.fullName = 'Full name is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'A valid email address is required';
  if (data.phone.replace(/\D/g, '').length < 7) errors.phone = 'A valid phone number is required';
  if (data.organisation.length < 2) errors.organisation = 'Organisation / company is required';
  if (!REGISTRATION_TYPES.includes(data.registration_type)) errors.registrationType = 'Please choose a registration type';
  if (data.payment_method && !PAYMENT_METHODS.includes(data.payment_method)) errors.paymentMethod = 'Invalid payment method';
  if (data.amount && !AMOUNTS.includes(data.amount)) errors.amount = 'Invalid amount';

  // Career, business and leadership interests (optional; validated against the question list)
  const rawInterests = body.interests && typeof body.interests === 'object' ? body.interests : {};
  const interests = {};
  for (const q of GALA_QUESTIONS) {
    const v = rawInterests[q.id];
    if (!Array.isArray(v) || v.length === 0) continue;
    const allowed = q.allowOther ? [...q.options, OTHER] : q.options;
    const picked = [...new Set(v.filter((x) => typeof x === 'string' && allowed.includes(x)))];
    if (picked.length > q.max) { errors[`interests.${q.id}`] = `Select up to ${q.max}`; continue; }
    if (picked.length) interests[q.id] = picked;
  }
  const other = clean(body.interestsOther, 200);
  if (other && interests.challenge?.includes(OTHER)) interests.challengeOther = other;
  data.interests = Object.keys(interests).length ? JSON.stringify(interests) : null;
  return { data, errors };
}

// ---------------------------------------------------------------------------
// Auth: single shared password -> HMAC-signed bearer token
// ---------------------------------------------------------------------------
const b64url = (buf) => Buffer.from(buf).toString('base64url');
function sign(payload) {
  const body = b64url(JSON.stringify(payload));
  const mac = createHmac('sha256', TOKEN_SECRET).update(body).digest('base64url');
  return `${body}.${mac}`;
}
function verify(token) {
  if (typeof token !== 'string') return null;
  const [body, mac] = token.split('.');
  if (!body || !mac) return null;
  const expected = createHmac('sha256', TOKEN_SECRET).update(body).digest('base64url');
  const a = Buffer.from(mac), b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
    return payload.exp > Date.now() ? payload : null;
  } catch { return null; }
}
function passwordMatches(candidate) {
  const a = Buffer.from(String(candidate ?? '')), b = Buffer.from(ADMIN_PASSWORD);
  return a.length === b.length && timingSafeEqual(a, b);
}
function requireAdmin(req, res, next) {
  const header = req.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : req.query.token;
  if (!verify(token)) return res.status(401).json({ success: false, message: 'Unauthorised' });
  next();
}

// ---------------------------------------------------------------------------
// Simple in-memory rate limiter (per IP, sliding window)
// ---------------------------------------------------------------------------
function rateLimit({ windowMs, max }) {
  const hits = new Map();
  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip;
    const list = (hits.get(key) || []).filter((t) => now - t < windowMs);
    if (list.length >= max) return res.status(429).json({ success: false, message: 'Too many requests. Please try again shortly.' });
    list.push(now); hits.set(key, list);
    if (hits.size > 10000) hits.clear();
    next();
  };
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
const app = express();
app.set('trust proxy', 'loopback');
app.disable('x-powered-by');
app.use(express.json({ limit: '32kb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'ibbplus-api' }));

app.get('/api/gala/options', (_req, res) =>
  res.json({ registrationTypes: REGISTRATION_TYPES, paymentMethods: PAYMENT_METHODS, amounts: AMOUNTS }));

app.post('/api/gala/registrations', rateLimit({ windowMs: 60_000, max: 10 }), (req, res) => {
  const { data, errors } = validateRegistration(req.body || {});
  if (Object.keys(errors).length) {
    return res.status(400).json({ success: false, message: 'Please correct the highlighted fields.', errors });
  }
  const result = insertStmt.run(
    data.full_name, data.email, data.phone, data.organisation, data.job_title,
    data.registration_type, data.payment_method, data.amount, data.interests,
    req.ip, clean(req.get('user-agent'), 300) || null,
  );
  const id = Number(result.lastInsertRowid);
  console.log(`[gala] registration #${id} ${data.email} (${data.registration_type})`);
  res.status(201).json({ success: true, message: 'Registration received', data: { id } });
});

app.post('/api/admin/login', rateLimit({ windowMs: 15 * 60_000, max: 20 }), (req, res) => {
  if (!passwordMatches(req.body?.password)) {
    return res.status(401).json({ success: false, message: 'Incorrect password' });
  }
  const exp = Date.now() + TOKEN_TTL_MS;
  res.json({ success: true, token: sign({ sub: 'admin', exp, nonce: randomBytes(8).toString('hex') }), expiresAt: exp });
});

app.get('/api/admin/registrations', requireAdmin, (_req, res) => {
  const rows = listStmt.all();
  const countBy = (key) => rows.reduce((acc, r) => { const k = r[key] || 'Not specified'; acc[k] = (acc[k] || 0) + 1; return acc; }, {});
  const amountValue = (a) => Number(String(a || '').replace(/\D/g, '')) || 0;
  const stats = {
    total: rows.length,
    byRegistrationType: countBy('registration_type'),
    byPaymentMethod: countBy('payment_method'),
    byAmount: countBy('amount'),
    expectedRevenueTsh: rows.reduce((sum, r) => sum + amountValue(r.amount), 0),
    last7Days: rows.filter((r) => Date.now() - Date.parse(r.created_at) < 7 * 86_400_000).length,
    byQuestion: Object.fromEntries(GALA_QUESTIONS.map((q) => [q.id, {}])),
  };
  for (const r of rows) {
    let parsed = {};
    try { parsed = r.interests ? JSON.parse(r.interests) : {}; } catch { parsed = {}; }
    for (const q of GALA_QUESTIONS) {
      for (const opt of parsed[q.id] || []) stats.byQuestion[q.id][opt] = (stats.byQuestion[q.id][opt] || 0) + 1;
    }
  }
  res.json({ success: true, stats, data: rows });
});

app.get('/api/admin/registrations.csv', requireAdmin, (_req, res) => {
  const rows = listStmt.all();
  const base = ['id', 'created_at', 'full_name', 'email', 'phone', 'organisation', 'job_title', 'registration_type', 'payment_method', 'amount'];
  const qCols = GALA_QUESTIONS.map((q) => `q${q.number}_${q.id}`);
  const esc = (v) => { const s = v == null ? '' : String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  const rowValues = (r) => {
    let parsed = {};
    try { parsed = r.interests ? JSON.parse(r.interests) : {}; } catch { parsed = {}; }
    const answers = GALA_QUESTIONS.map((q) => {
      const vals = parsed[q.id] || [];
      return vals.map((v) => (v === OTHER && parsed.challengeOther ? `Other: ${parsed.challengeOther}` : v)).join('; ');
    });
    return [...base.map((c) => r[c]), ...answers].map(esc).join(',');
  };
  const csv = [[...base, ...qCols].join(','), ...rows.map(rowValues)].join('\n');
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="gala-registrations-${new Date().toISOString().slice(0, 10)}.csv"`);
  res.send('﻿' + csv);
});

app.delete('/api/admin/registrations/:id', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
  const { changes } = deleteStmt.run(id);
  if (!changes) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true });
});

app.use('/api', (_req, res) => res.status(404).json({ success: false, message: 'Not found' }));
app.use((err, _req, res, _next) => {
  if (err?.type === 'entity.parse.failed') return res.status(400).json({ success: false, message: 'Invalid JSON' });
  console.error(err);
  res.status(500).json({ success: false, message: 'Server error' });
});

app.listen(PORT, '127.0.0.1', () => console.log(`ibbplus-api listening on http://127.0.0.1:${PORT} (db: ${DB_PATH})`));

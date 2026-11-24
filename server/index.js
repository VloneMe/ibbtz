import express from 'express';
import { DatabaseSync } from 'node:sqlite';
import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';
import { mkdirSync, existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GALA_QUESTIONS, OTHER } from './questions.js';
import { sendConfirmationEmail } from './email.js';
import { sendInvitationEmail, buildInvitationPage, inactiveInvitationPage, qrPng, newInviteToken, isInviteToken } from './invitation.js';

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
// Confirmation email outcome: 'sent', 'failed: <reason>', or NULL for rows before emails existed.
if (!columns.includes('email_status')) db.exec(`ALTER TABLE gala_registrations ADD COLUMN email_status TEXT`);
if (!columns.includes('email_sent_at')) db.exec(`ALTER TABLE gala_registrations ADD COLUMN email_sent_at TEXT`);
// Public reference numbers run IBA-101, IBA-102, ... in registration order.
const FIRST_REFERENCE = 101;
if (!columns.includes('ref_no')) {
  db.exec(`ALTER TABLE gala_registrations ADD COLUMN ref_no INTEGER`);
  // Earlier emails quoted IBA-<row id padded to 4 digits>; keep that so old references still match.
  db.exec(`ALTER TABLE gala_registrations ADD COLUMN legacy_reference TEXT`);
  db.exec(`UPDATE gala_registrations SET legacy_reference = 'IBA-' || substr('0000' || id, -4) WHERE email_status IS NOT NULL`);
  const setRef = db.prepare(`UPDATE gala_registrations SET ref_no = ? WHERE id = ?`);
  db.prepare(`SELECT id FROM gala_registrations ORDER BY created_at, id`).all()
    .forEach((r, i) => setRef.run(FIRST_REFERENCE + i, r.id));
}
db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS idx_gala_ref_no ON gala_registrations(ref_no)`);
// Payment and invitation tracking.
for (const [col, type] of [['paid_at', 'TEXT'], ['invite_token', 'TEXT'], ['invite_status', 'TEXT'], ['invite_sent_at', 'TEXT'], ['rsvp_status', 'TEXT'], ['rsvp_at', 'TEXT']]) {
  if (!columns.includes(col)) db.exec(`ALTER TABLE gala_registrations ADD COLUMN ${col} ${type}`);
}
db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS idx_gala_invite_token ON gala_registrations(invite_token)`);
// Invited guests: added from the dashboard, attend without paying, and get the invitation straight away.
if (!columns.includes('complimentary')) db.exec(`ALTER TABLE gala_registrations ADD COLUMN complimentary INTEGER NOT NULL DEFAULT 0`);
const GUEST_PAYMENT_METHOD = 'Invited guest';

const insertStmt = db.prepare(`
  INSERT INTO gala_registrations
    (full_name, email, phone, organisation, job_title, registration_type, payment_method, amount, interests, ip, user_agent, ref_no)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    (SELECT COALESCE(MAX(ref_no), ${FIRST_REFERENCE - 1}) + 1 FROM gala_registrations))
`);
const insertGuestStmt = db.prepare(`
  INSERT INTO gala_registrations
    (full_name, email, phone, organisation, job_title, registration_type, payment_method, amount, complimentary, invite_token, ref_no)
  VALUES (?, ?, ?, ?, ?, ?, '${GUEST_PAYMENT_METHOD}', NULL, 1, ?,
    (SELECT COALESCE(MAX(ref_no), ${FIRST_REFERENCE - 1}) + 1 FROM gala_registrations))
`);
const SELECT_ROW = `SELECT *, 'IBA-' || ref_no AS reference FROM gala_registrations`;
const getStmt = db.prepare(`${SELECT_ROW} WHERE id = ?`);
const emailStatusStmt = db.prepare(`UPDATE gala_registrations SET email_status = ?, email_sent_at = COALESCE(?, email_sent_at) WHERE id = ?`);
/** Sends the confirmation email for a registration and records the outcome. */
async function sendAndRecord(reg, options) {
  const r = await sendConfirmationEmail(reg, options);
  emailStatusStmt.run(r.ok ? 'sent' : `failed: ${r.error}`.slice(0, 300), r.ok ? new Date().toISOString() : null, reg.id);
  console.log(`[email] registration #${reg.id} ${r.ok ? `sent (${r.id})` : `failed: ${r.error}`}`);
  return r;
}
const listStmt = db.prepare(`${SELECT_ROW} ORDER BY created_at DESC, id DESC`);
const byTokenStmt = db.prepare(`${SELECT_ROW} WHERE invite_token = ?`);
const markPaidStmt = db.prepare(`UPDATE gala_registrations SET paid_at = COALESCE(paid_at, ?), invite_token = COALESCE(invite_token, ?) WHERE id = ?`);
const markUnpaidStmt = db.prepare(`UPDATE gala_registrations SET paid_at = NULL WHERE id = ?`);
const inviteStatusStmt = db.prepare(`UPDATE gala_registrations SET invite_status = ?, invite_sent_at = COALESCE(?, invite_sent_at) WHERE id = ?`);
/** Sends the invitation for a paid registration and records the outcome. */
async function sendInvitationAndRecord(reg) {
  const r = await sendInvitationEmail(reg);
  inviteStatusStmt.run(r.ok ? 'sent' : `failed: ${r.error}`.slice(0, 300), r.ok ? new Date().toISOString() : null, reg.id);
  console.log(`[invite] registration #${reg.id} ${reg.reference} ${r.ok ? `sent (${r.id})` : `failed: ${r.error}`}`);
  return r;
}
const rsvpStmt = db.prepare(`UPDATE gala_registrations SET rsvp_status = ?, rsvp_at = ? WHERE id = ?`);
const RSVP_RESPONSES = ['attending', 'declined'];
const deleteStmt = db.prepare(`DELETE FROM gala_registrations WHERE id = ?`);

// ---------------------------------------------------------------------------
// Form definition (mirrors the Google Form)
// ---------------------------------------------------------------------------
export const REGISTRATION_TYPES = ['Individual', 'Corporate Table'];
export const PAYMENT_METHODS = ['Mobile Money (Pay Bill)'];
export const AMOUNTS = ['Tsh 150,000', 'Tsh 2,000,000'];
const AMOUNT_BY_TYPE = { 'Individual': 'Tsh 150,000', 'Corporate Table': 'Tsh 2,000,000' };

const clean = (v, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

function validateGuest(body) {
  const errors = {};
  const data = {
    full_name: clean(body.fullName),
    email: clean(body.email).toLowerCase(),
    phone: clean(body.phone, 40),
    organisation: clean(body.organisation),
    job_title: clean(body.jobTitle) || null,
    registration_type: clean(body.registrationType, 40) || REGISTRATION_TYPES[0],
  };
  if (data.full_name.length < 2) errors.fullName = 'Full name is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'A valid email address is required';
  if (!REGISTRATION_TYPES.includes(data.registration_type)) errors.registrationType = 'Please choose a registration type';
  return { data, errors };
}

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
  // The price is fixed by the registration type, so never store a mismatched amount.
  if (AMOUNT_BY_TYPE[data.registration_type]) data.amount = AMOUNT_BY_TYPE[data.registration_type];
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
app.use('/invite', express.urlencoded({ extended: false, limit: '2kb' }));

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
  const reg = getStmt.get(id);
  console.log(`[gala] registration #${id} ${reg.reference} ${data.email} (${data.registration_type})`);
  res.status(201).json({ success: true, message: 'Registration received', data: { id, reference: reg.reference } });

  // Send the confirmation after responding, so email problems never block a registration.
  sendAndRecord(reg);
});

app.post('/api/admin/login', rateLimit({ windowMs: 15 * 60_000, max: 20 }), (req, res) => {
  if (!passwordMatches(req.body?.password)) {
    return res.status(401).json({ success: false, message: 'Incorrect password' });
  }
  const exp = Date.now() + TOKEN_TTL_MS;
  res.json({ success: true, token: sign({ sub: 'admin', exp, nonce: randomBytes(8).toString('hex') }), expiresAt: exp });
});

app.get('/api/admin/registrations', requireAdmin, (_req, res) => {
  const all = listStmt.all();
  let rows = all;
  const countBy = (key) => rows.reduce((acc, r) => { const k = r[key] || 'Not specified'; acc[k] = (acc[k] || 0) + 1; return acc; }, {});
  const amountValue = (a) => Number(String(a || '').replace(/\D/g, '')) || 0;
  const guests = rows.filter((r) => r.complimentary);
  const invited = rows.filter((r) => r.paid_at || r.complimentary);
  rows = rows.filter((r) => !r.complimentary);
  const stats = {
    guests: guests.length,
    attending: invited.filter((r) => r.rsvp_status === 'attending').length,
    declined: invited.filter((r) => r.rsvp_status === 'declined').length,
    total: rows.length,
    byRegistrationType: countBy('registration_type'),
    byPaymentMethod: countBy('payment_method'),
    byAmount: countBy('amount'),
    expectedRevenueTsh: rows.reduce((sum, r) => sum + amountValue(r.amount), 0),
    paid: rows.filter((r) => r.paid_at).length,
    receivedTsh: rows.filter((r) => r.paid_at).reduce((sum, r) => sum + amountValue(r.amount), 0),
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
  res.json({ success: true, stats, data: all });
});

app.get('/api/admin/registrations.csv', requireAdmin, (_req, res) => {
  const rows = listStmt.all();
  const base = ['reference', 'legacy_reference', 'created_at', 'full_name', 'email', 'phone', 'organisation', 'job_title', 'registration_type', 'payment_method', 'amount', 'paid_at', 'invite_status', 'invite_sent_at', 'rsvp_status', 'rsvp_at', 'complimentary'];
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
  res.setHeader('Content-Disposition', `attachment; filename="iba-registrations-${new Date().toISOString().slice(0, 10)}.csv"`);
  res.send('﻿' + csv);
});

app.delete('/api/admin/registrations/:id', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
  const { changes } = deleteStmt.run(id);
  if (!changes) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true });
});

// Send (or resend) the confirmation email from the dashboard. The three working days
// to pay are counted from today, so a resent email never shows a deadline in the past.
const findRegistration = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) { res.status(400).json({ success: false, message: 'Invalid id' }); return null; }
  const reg = getStmt.get(id);
  if (!reg) { res.status(404).json({ success: false, message: 'Not found' }); return null; }
  return reg;
};

// Mark a registration as paid and send the invitation.
app.post('/api/admin/registrations/:id/paid', requireAdmin, rateLimit({ windowMs: 60_000, max: 20 }), async (req, res) => {
  const found = findRegistration(req, res); if (!found) return;
  if (found.complimentary) return res.status(409).json({ success: false, message: 'This is an invited guest, so no payment is needed', data: found });
  markPaidStmt.run(new Date().toISOString(), newInviteToken(), found.id);
  const reg = getStmt.get(found.id);
  const r = await sendInvitationAndRecord(reg);
  const row = getStmt.get(found.id);
  if (!r.ok) return res.status(502).json({ success: false, message: `Marked as paid, but the invitation was not sent: ${r.error}`, data: row });
  res.json({ success: true, message: `${reg.reference} marked as paid. Invitation sent to ${reg.email}`, data: row });
});

// Add an invited guest (no payment) and email their invitation straight away.
app.post('/api/admin/guests', requireAdmin, rateLimit({ windowMs: 60_000, max: 30 }), async (req, res) => {
  const { data, errors } = validateGuest(req.body || {});
  if (Object.keys(errors).length) return res.status(400).json({ success: false, message: 'Please correct the highlighted fields.', errors });
  const result = insertGuestStmt.run(data.full_name, data.email, data.phone, data.organisation, data.job_title, data.registration_type, newInviteToken());
  const reg = getStmt.get(Number(result.lastInsertRowid));
  console.log(`[guest] #${reg.id} ${reg.reference} ${reg.email} invited (${reg.registration_type})`);
  const r = await sendInvitationAndRecord(reg);
  const row = getStmt.get(reg.id);
  if (!r.ok) return res.status(502).json({ success: false, message: `${reg.reference} added, but the invitation was not sent: ${r.error}. Use Resend invitation to try again.`, data: row });
  res.status(201).json({ success: true, message: `${reg.reference} added. Invitation sent to ${reg.email}`, data: row });
});

// Resend the invitation to a paid registrant or invited guest.
app.post('/api/admin/registrations/:id/invitation', requireAdmin, rateLimit({ windowMs: 60_000, max: 20 }), async (req, res) => {
  const reg = findRegistration(req, res); if (!reg) return;
  if ((!reg.paid_at && !reg.complimentary) || !reg.invite_token) return res.status(409).json({ success: false, message: 'Mark this registration as paid first', data: reg });
  const r = await sendInvitationAndRecord(reg);
  const row = getStmt.get(reg.id);
  if (!r.ok) return res.status(502).json({ success: false, message: `Invitation not sent: ${r.error}`, data: row });
  res.json({ success: true, message: `Invitation sent to ${reg.email}`, data: row });
});

// Undo a payment marked by mistake. The invitation link stops working until marked paid again.
app.post('/api/admin/registrations/:id/unpaid', requireAdmin, (req, res) => {
  const reg = findRegistration(req, res); if (!reg) return;
  if (reg.complimentary) return res.status(409).json({ success: false, message: 'Invited guests have no payment to undo. Delete the guest to withdraw the invitation.', data: reg });
  markUnpaidStmt.run(reg.id);
  console.log(`[invite] registration #${reg.id} ${reg.reference} marked unpaid`);
  res.json({ success: true, message: `${reg.reference} marked as not paid. Its invitation link is now inactive.`, data: getStmt.get(reg.id) });
});

// Public personal invitation page and its QR image (only while the registration is marked paid).
const activeInvite = (token) => {
  if (!isInviteToken(token)) return null;
  const reg = byTokenStmt.get(token);
  return reg && (reg.paid_at || reg.complimentary) ? reg : null;
};
app.get('/invite/:token', rateLimit({ windowMs: 60_000, max: 60 }), async (req, res) => {
  res.set({ 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' });
  const reg = activeInvite(req.params.token);
  if (!reg) return res.status(404).type('html').send(inactiveInvitationPage());
  res.type('html').send(await buildInvitationPage(reg));
});
// RSVP from the invitation page. Works as a plain form post (redirects back) or via fetch (JSON).
app.post('/invite/:token/rsvp', rateLimit({ windowMs: 60_000, max: 20 }), (req, res) => {
  res.set({ 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' });
  const wantsJson = req.is('application/json');
  const reg = activeInvite(req.params.token);
  if (!reg) return wantsJson ? res.status(404).json({ success: false, message: 'This invitation is not active' }) : res.status(404).type('html').send(inactiveInvitationPage());
  const response = String(req.body?.response || '');
  if (!RSVP_RESPONSES.includes(response)) return wantsJson ? res.status(400).json({ success: false, message: 'Invalid response' }) : res.redirect(303, `/invite/${reg.invite_token}`);
  const at = new Date().toISOString();
  rsvpStmt.run(response, at, reg.id);
  console.log(`[rsvp] registration #${reg.id} ${reg.reference} ${response}`);
  if (wantsJson) return res.json({ success: true, rsvp_status: response, rsvp_at: at });
  res.redirect(303, `/invite/${reg.invite_token}?rsvp=${response}#rsvp`);
});
app.get('/invite/:token/qr.png', rateLimit({ windowMs: 60_000, max: 60 }), async (req, res) => {
  const reg = activeInvite(req.params.token);
  if (!reg) return res.status(404).end();
  res.set({ 'Cache-Control': 'private, max-age=3600', 'X-Robots-Tag': 'noindex' });
  res.type('png').send(await qrPng(reg.invite_token));
});

app.post('/api/admin/registrations/:id/email', requireAdmin, rateLimit({ windowMs: 60_000, max: 20 }), async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
  const reg = getStmt.get(id);
  if (!reg) return res.status(404).json({ success: false, message: 'Not found' });
  if (reg.complimentary) return res.status(409).json({ success: false, message: 'Invited guests do not get the payment email. Use Resend invitation instead.', data: reg });
  const r = await sendAndRecord({ ...reg, created_at: new Date().toISOString() },
    { idempotencyKey: `iba-registration-${id}-manual-${Date.now()}` });
  const row = getStmt.get(id);
  if (!r.ok) return res.status(502).json({ success: false, message: `Email not sent: ${r.error}`, data: row });
  res.json({ success: true, message: `Email sent to ${reg.email}`, data: row });
});

app.use('/api', (_req, res) => res.status(404).json({ success: false, message: 'Not found' }));
app.use((err, _req, res, _next) => {
  if (err?.type === 'entity.parse.failed') return res.status(400).json({ success: false, message: 'Invalid JSON' });
  console.error(err);
  res.status(500).json({ success: false, message: 'Server error' });
});

app.listen(PORT, '127.0.0.1', () => console.log(`ibbplus-api listening on http://127.0.0.1:${PORT} (db: ${DB_PATH})`));

import { useCallback, useEffect, useMemo, useState, type ElementType, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, LogOut, RefreshCw, Download, Search, Trash2, Loader2, Users, User, Building2, Wallet, CalendarClock, AlertCircle } from 'lucide-react';
import { adminApi, adminAuth, ApiError, type GalaRegistration, type GalaStats } from '@/services/galaApi';

const fmtTsh = (n: number) => `Tsh ${n.toLocaleString('en-US')}`;
const fmtDate = (iso: string) => new Date(iso).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Africa/Dar_es_Salaam' });

function LoginCard({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setError(null);
    try { await adminAuth.login(password); onSuccess(); }
    catch (err) { setError((err as ApiError).message); }
    finally { setBusy(false); }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-sm border border-stone shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center"><Lock className="h-6 w-6 text-white" /></div>
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy">Gala Dashboard</h1>
          <p className="text-sm text-ink-muted">Enter the admin password to continue.</p>
        </div>
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />{error}
        </div>
      )}
      <form onSubmit={submit} className="space-y-4">
        <div>
          <Label htmlFor="admin-password" className="field-label">Password</Label>
          <Input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus autoComplete="current-password"
            className="field" />
        </div>
        <Button type="submit" disabled={busy || !password} className="btn-primary w-full py-3">
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign in'}
        </Button>
      </form>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub }: { icon: ElementType; label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white p-5 rounded-sm border border-stone">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 bg-sand rounded-full flex items-center justify-center"><Icon className="h-4 w-4 text-navy" /></div>
        <span className="text-sm text-ink-muted">{label}</span>
      </div>
      <div className="font-display text-3xl font-semibold text-navy">{value}</div>
      {sub && <div className="text-xs text-ink-muted mt-1">{sub}</div>}
    </div>
  );
}

export default function AdminDashboard() {
  const [signedIn, setSignedIn] = useState(adminAuth.isSignedIn());
  const [rows, setRows] = useState<GalaRegistration[]>([]);
  const [stats, setStats] = useState<GalaStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [pendingDelete, setPendingDelete] = useState<number | null>(null);

  useEffect(() => { document.title = 'Gala Registrations | Admin | IBB+'; }, []);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await adminApi.list();
      setRows(res.data); setStats(res.stats);
    } catch (err) {
      const e = err as ApiError;
      if (e.status === 401) setSignedIn(false);
      else setError(e.message);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { if (signedIn) load(); }, [signedIn, load]);

  const signOut = () => { adminAuth.clear(); setSignedIn(false); setRows([]); setStats(null); };

  const remove = async (id: number) => {
    try { await adminApi.remove(id); setPendingDelete(null); await load(); }
    catch (err) { setError((err as ApiError).message); }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) =>
      (typeFilter === 'All' || r.registration_type === typeFilter) &&
      (!q || [r.full_name, r.email, r.phone, r.organisation, r.job_title, r.payment_method, r.amount].some((v) => (v || '').toLowerCase().includes(q))),
    );
  }, [rows, query, typeFilter]);

  if (!signedIn) {
    return (
      <main className="min-h-screen bg-ivory text-ink">
        <Container className="py-24 px-4"><LoginCard onSuccess={() => setSignedIn(true)} /></Container>
      </main>
    );
  }

  const types = stats?.byRegistrationType || {};

  return (
    <main className="min-h-screen bg-ivory text-ink">
      <Container className="py-12 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-semibold text-navy">Gala Registrations</h1>
            <p className="text-ink-muted text-sm">Impact Business Awards Gala sign-ups submitted on ibbplus.com</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={load} disabled={loading} className="btn-outline">
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />Refresh
            </Button>
            <a href={adminApi.csvUrl()} download>
              <Button className="btn-primary"><Download className="h-4 w-4 mr-2" />Export CSV</Button>
            </a>
            <Button variant="outline" onClick={signOut} className="btn-outline"><LogOut className="h-4 w-4 mr-2" />Sign out</Button>
          </div>
        </motion.div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600"><AlertCircle className="h-5 w-5" />{error}</div>
        )}

        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatCard icon={Users} label="Total registrations" value={stats.total} sub={`${stats.last7Days} in the last 7 days`} />
            <StatCard icon={User} label="Individual" value={types['Individual'] || 0} />
            <StatCard icon={Building2} label="Corporate tables" value={types['Corporate Table'] || 0} />
            <StatCard icon={Wallet} label="Expected revenue" value={fmtTsh(stats.expectedRevenueTsh)} sub="Based on selected amounts" />
            <StatCard icon={CalendarClock} label="Payment method"
              value={Object.entries(stats.byPaymentMethod).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'}
              sub={Object.entries(stats.byPaymentMethod).map(([k, v]) => `${k}: ${v}`).join(' · ') || 'No selections yet'} />
          </div>
        )}

        <div className="bg-white rounded-sm border border-stone">
          <div className="p-4 flex flex-wrap gap-3 items-center border-b border-white/10">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="h-4 w-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, email, phone, organisation..."
                className="field pl-9" />
            </div>
            <div className="flex gap-1">
              {['All', 'Individual', 'Corporate Table'].map((t) => (
                <button key={t} onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${typeFilter === t ? 'bg-navy text-white' : 'bg-sand text-ink-muted hover:bg-stone'}`}>
                  {t}
                </button>
              ))}
            </div>
            <span className="text-sm text-ink-muted ml-auto">{filtered.length} of {rows.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-ink-muted bg-sand/60">
                <tr>
                  {['#', 'Submitted', 'Name', 'Contact', 'Organisation', 'Type', 'Payment', 'Amount', ''].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && rows.length === 0 && (
                  <tr><td colSpan={9} className="px-4 py-10 text-center text-ink-muted"><Loader2 className="h-5 w-5 animate-spin inline mr-2" />Loading...</td></tr>
                )}
                {!loading && filtered.length === 0 && (
                  <tr><td colSpan={9} className="px-4 py-10 text-center text-ink-muted">{rows.length ? 'No registrations match your search.' : 'No registrations yet.'}</td></tr>
                )}
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t border-stone hover:bg-sand/40 align-top">
                    <td className="px-4 py-3 text-ink-muted">{r.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-ink-muted">{fmtDate(r.created_at)}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-ink">{r.full_name}</div>
                      {r.job_title && <div className="text-xs text-ink-muted">{r.job_title}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${r.email}`} className="text-navy hover:underline block">{r.email}</a>
                      <a href={`tel:${r.phone}`} className="text-ink-muted hover:underline">{r.phone}</a>
                    </td>
                    <td className="px-4 py-3 text-ink">{r.organisation}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${r.registration_type === 'Corporate Table' ? 'bg-gold/20 text-navy' : 'bg-sand text-ink'}`}>
                        {r.registration_type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink-muted whitespace-nowrap">{r.payment_method || '—'}</td>
                    <td className="px-4 py-3 text-ink-muted whitespace-nowrap">{r.amount || '—'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {pendingDelete === r.id ? (
                        <span className="flex gap-1">
                          <button onClick={() => remove(r.id)} className="px-2 py-1 rounded bg-red-600 hover:bg-red-500 text-white text-xs">Confirm</button>
                          <button onClick={() => setPendingDelete(null)} className="px-2 py-1 rounded bg-sand hover:bg-stone text-xs">Cancel</button>
                        </span>
                      ) : (
                        <button onClick={() => setPendingDelete(r.id)} title="Delete" className="p-1.5 rounded text-ink-muted hover:text-red-600 hover:bg-red-500/10">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </main>
  );
}

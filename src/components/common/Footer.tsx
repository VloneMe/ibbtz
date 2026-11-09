import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from './Logo';
import { newsletterApi } from '@/services/newsletterApi';
import { socialLinks } from '@/data/socialLinks';

const icons = { Facebook, Twitter, Linkedin, Instagram, Youtube } as const;

const navigate = [
  { to: '/', label: 'Home' },
  { to: '/aboutus', label: 'About' },
  { to: '/iba', label: 'Impact Business Awards' },
  { to: '/contactus', label: 'Contact' },
  { to: '/feedback', label: 'Feedback' },
];

const related = [
  { href: 'https://impactadvisory.co.tz', label: 'Impact Advisory Africa' },
  { href: 'https://www.impactbusinessaward.com', label: 'Impact Business Awards' },
  { href: 'https://impactadvisory.co.tz/csr', label: 'Corporate Social Responsibility' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const subscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { toast.error('Please enter an email address'); return; }
    setBusy(true);
    try {
      const res = await newsletterApi.subscribeToNewsletter({ email: email.trim() });
      if (res.success || (res.code === 'VALIDATION_ERROR' && res.details?.currentStatus === 'subscribed')) {
        setDone(true); setEmail('');
        toast.success(res.success ? 'Subscribed. Thank you.' : 'You are already subscribed.');
      } else {
        toast.warning(res.error || res.message || 'Could not subscribe right now.');
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.error || err?.response?.data?.message || 'Could not subscribe. Please try again.');
    } finally { setBusy(false); }
  };

  return (
    <footer className="border-t border-stone bg-ivory">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo size="lg" imgClasses="h-12" />
            <p className="mt-5 max-w-xs leading-relaxed text-ink-muted">
              Catalysing Tanzania's human capital and building a knowledge-driven economy for Vision 2050. An initiative of Impact Advisory Africa.
            </p>
            <ul className="mt-6 flex gap-2">
              {socialLinks.map((s) => {
                const Icon = icons[s.iconName as keyof typeof icons];
                return Icon ? (
                  <li key={s.name}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="flex h-9 w-9 items-center justify-center rounded-sm border border-stone text-ink-muted transition-colors hover:border-navy hover:text-navy">
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                ) : null;
              })}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Navigate</h3>
              <ul className="mt-4 space-y-2.5">
                {navigate.map((n) => <li key={n.to}><Link to={n.to} className="text-ink-muted hover:text-navy">{n.label}</Link></li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Related</h3>
              <ul className="mt-4 space-y-2.5">
                {related.map((r) => <li key={r.href}><a href={r.href} target="_blank" rel="noopener noreferrer" className="text-ink-muted hover:text-navy">{r.label}</a></li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Contact</h3>
              <ul className="mt-4 space-y-2.5 text-ink-muted">
                <li>Dar es Salaam, Tanzania</li>
                <li><a href="tel:+255748111183" className="hover:text-navy">+255 748 111 183</a></li>
                <li><a href="mailto:ibb@impactadvisory.co.tz" className="break-all hover:text-navy">ibb@impactadvisory.co.tz</a></li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Newsletter</h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">Dates, themes and speakers for upcoming editions.</p>
            {done ? (
              <p className="mt-4 text-sm font-semibold text-navy">Thank you. You're on the list.</p>
            ) : (
              <form onSubmit={subscribe} className="mt-4 flex flex-col gap-2 sm:flex-row lg:flex-col">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input id="footer-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="field" />
                <button type="submit" disabled={busy} className="btn-primary shrink-0">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Subscribe'}</button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-stone pt-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Impact Business Breakfast. All rights reserved.</p>
          <p>Ideals Beyond Ideas</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

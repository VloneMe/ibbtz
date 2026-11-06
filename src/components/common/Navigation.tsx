import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

const links = [
  { to: '/', label: 'Home' },
  { to: '/aboutus', label: 'About' },
  { to: '/gala', label: 'Awards Gala' },
  { to: '/contactus', label: 'Contact' },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[0.8rem] font-semibold uppercase tracking-[0.14em] transition-colors ${isActive ? 'text-navy' : 'text-ink-muted hover:text-navy'}`;

  return (
    <header className={`sticky top-0 z-50 border-b bg-ivory/95 backdrop-blur transition-shadow ${scrolled ? 'border-stone shadow-[0_1px_0_0_rgba(0,0,0,0.04)]' : 'border-transparent'}`}>
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link to="/" aria-label="IBB+ home" className="shrink-0">
          <Logo size="md" imgClasses="h-9 sm:h-10" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>{l.label}</NavLink>
          ))}
          <a href="https://impactadvisory.co.tz" target="_blank" rel="noopener noreferrer" className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-ink-muted hover:text-navy">
            Impact Advisory
          </a>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/feedback" className="btn-outline px-5 py-2.5">Feedback</Link>
          <Link to="/gala" className="btn-primary px-5 py-2.5">Register for the Gala</Link>
        </div>

        <button type="button" onClick={() => setOpen((v) => !v)} className="-mr-2 rounded-sm p-2 text-navy lg:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-stone bg-ivory lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-4 sm:px-8" aria-label="Mobile">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `border-b border-stone/70 py-3.5 text-base font-semibold ${isActive ? 'text-navy' : 'text-ink'}`}>
                {l.label}
              </NavLink>
            ))}
            <a href="https://impactadvisory.co.tz" target="_blank" rel="noopener noreferrer" className="border-b border-stone/70 py-3.5 text-base font-semibold text-ink">Impact Advisory</a>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link to="/feedback" className="btn-outline">Feedback</Link>
              <Link to="/gala" className="btn-primary">Register</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;

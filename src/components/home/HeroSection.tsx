import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../../common/Container';
import hero from '@/assets/photos/hero.jpg';

const stats = [
  { value: '14', label: 'Editions held' },
  { value: '50+', label: 'Leaders and speakers convened' },
  { value: '20+', label: 'Partner organisations' },
  { value: '2019', label: 'First breakfast' },
];

const HeroSection = ({ onBecomeSponsor }: { onBecomeSponsor: () => void }) => (
  <section className="relative isolate overflow-hidden bg-navy-deep text-white" aria-labelledby="hero-title">
    <img src={hero} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-center" fetchPriority="high" />
    <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/35" />
    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-deep to-transparent" />

    <Container className="relative pb-16 pt-20 sm:pb-20 sm:pt-28 lg:pb-28 lg:pt-36">
      <p className="eyebrow text-gold-soft">Impact Business Breakfast · Dar es Salaam</p>
      <h1 id="hero-title" className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[3.75rem]">
        Where Tanzania's business leaders meet to shape the economy.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
        A convening platform for executives, policy makers and entrepreneurs: high-level sessions, candid debate and the partnerships that turn ideas into growth.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link to="/iba" className="btn-gold">
          Register for the Impact Business Awards <ArrowRight className="h-4 w-4" />
        </Link>
        <button type="button" onClick={onBecomeSponsor} className="btn-outline-light">Become a sponsor</button>
      </div>
    </Container>

    <Container className="relative">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/15 py-8 sm:py-10 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse">
            <dt className="mt-1 text-sm text-white/65">{s.label}</dt>
            <dd className="font-display text-3xl font-semibold text-gold-soft sm:text-4xl">{s.value}</dd>
          </div>
        ))}
      </dl>
    </Container>
  </section>
);

export default HeroSection;

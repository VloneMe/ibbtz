import { useEffect } from 'react';
import { Container } from '../common/Container';
import Reveal from '@/components/common/Reveal';
import GalaRegistrationForm from '@/components/common/GalaRegistrationForm';
import hero from '@/assets/photos/hero.jpg';
import { MOBILE_MONEY_PAYBILLS, PAYMENT_ACCOUNT_NAME } from '@/data/paymentDetails';

const tiers = [
  { title: 'Individual', price: 'Tsh 150,000', text: 'One seat at the awards dinner and ceremony.' },
  { title: 'Corporate table', price: 'Tsh 2,000,000', text: 'A full table for your organisation, with recognition on the night.' },
];

export default function GalaRegistration() {
  useEffect(() => { document.title = 'Register | Impact Business Awards (IBA) | IBB+ Tanzania'; }, []);
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-deep text-white">
        <img src={hero} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/85 to-navy-deep" />
        <Container className="relative py-16 sm:py-24">
          <p className="eyebrow text-gold-soft">Impact Business Awards</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.1] sm:text-5xl">Impact Business Awards 2026</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">Reserve your seat at the evening celebrating Tanzania's impact-driven businesses and leaders. Register as an individual or book a corporate table.</p>
        </Container>
      </section>

      <section className="section bg-ivory">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-8">
              <GalaRegistrationForm />
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Registration options</h2>
              <dl className="mt-5 divide-y divide-stone border-y border-stone">
                {tiers.map((t) => (
                  <div key={t.title} className="py-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="font-semibold text-ink">{t.title}</dt>
                      <dd className="font-display text-xl font-semibold text-navy">{t.price}</dd>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{t.text}</p>
                  </div>
                ))}
              </dl>
              <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-ink">Payment</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">Pay by mobile money (Pay Bill) to <span className="font-semibold text-ink">{PAYMENT_ACCOUNT_NAME}</span>, or by bank transfer. Our team confirms your registration by email.</p>
              <dl className="mt-4 divide-y divide-stone border-y border-stone">
                {MOBILE_MONEY_PAYBILLS.map((m) => (
                  <div key={m.network} className="flex items-center justify-between gap-4 py-3">
                    <dt className="flex items-center gap-3 text-sm font-semibold text-ink">
                      <img src={m.logo} alt="" aria-hidden="true" className="h-8 w-14 object-contain object-left" />
                      {m.network}
                    </dt>
                    <dd className="font-display text-lg font-semibold text-navy">{m.number}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-ink-muted">Questions? <a href="mailto:ibb@impactadvisory.co.tz" className="font-semibold text-navy">ibb@impactadvisory.co.tz</a></p>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

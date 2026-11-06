import { useEffect } from 'react';
import { Container } from '../common/Container';
import Reveal from '@/components/common/Reveal';
import GalaRegistrationForm from '@/components/common/GalaRegistrationForm';
import hero from '@/assets/photos/hero.jpg';

const tiers = [
  { title: 'Individual', price: 'Tsh 250,000', text: 'One seat at the gala dinner and awards ceremony.' },
  { title: 'Corporate table', price: 'Tsh 2,000,000', text: 'A full table for your organisation, with recognition on the night.' },
];

export default function GalaRegistration() {
  useEffect(() => { document.title = 'Register | Impact Business Awards Gala | IBB+ Tanzania'; }, []);
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-deep text-white">
        <img src={hero} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/85 to-navy-deep" />
        <Container className="relative py-16 sm:py-24">
          <p className="eyebrow text-gold-soft">Impact Business Awards</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.1] sm:text-5xl">Impact Business Awards Gala</h1>
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
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">Pay by bank transfer or mobile money. Our team confirms your registration and shares payment details by email.</p>
              <p className="mt-6 text-sm leading-relaxed text-ink-muted">Questions? <a href="mailto:ibb@impactadvisory.co.tz" className="font-semibold text-navy">ibb@impactadvisory.co.tz</a></p>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

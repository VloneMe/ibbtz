import { Container } from '../../common/Container';
import Reveal from '@/components/common/Reveal';
import speaker from '@/assets/photos/speaker.jpg';

const audiences = [
  ['Decision makers', 'in the public and private sectors'],
  ['Policy makers', 'and government officials'],
  ['Entrepreneurs', 'innovators and business leaders'],
  ['Academics', 'and researchers'],
  ['NGO leaders', 'and social entrepreneurs'],
  ['Industry experts', 'and thought leaders'],
];

const expectations = [
  'High-level sessions with industry leaders',
  'Structured networking with decision-makers',
  'Interactive panel discussions',
  'Exhibitions and showcases',
  'Awards and recognition',
  'Knowledge-sharing sessions',
];

const AudienceSection = () => (
  <section className="relative isolate overflow-hidden bg-navy text-white" aria-labelledby="audience-title">
    <img src={speaker} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-[0.14]" loading="lazy" />
    <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/95 to-navy-deep" />
    <Container className="section relative">
      <Reveal className="max-w-2xl">
        <p className="eyebrow text-gold-soft">The room</p>
        <h2 id="audience-title" className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-4xl">
          Who attends, and what to expect.
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft">Who attends</h3>
          <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
            {audiences.map(([t, d]) => (
              <li key={t} className="flex flex-wrap items-baseline gap-x-2 py-3.5">
                <span className="font-semibold">{t}</span>
                <span className="text-white/65">{d}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft">What to expect</h3>
          <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
            {expectations.map((e) => (
              <li key={e} className="flex items-center gap-3 py-3.5">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Container>
  </section>
);

export default AudienceSection;

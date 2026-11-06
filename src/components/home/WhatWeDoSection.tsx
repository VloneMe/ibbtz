import { Container } from '../../common/Container';
import Reveal from '@/components/common/Reveal';

const pillars = [
  { n: '01', title: 'Vision', text: "To become Pan-Africa's most impactful private-public platform for knowledge-based sector transformation." },
  { n: '02', title: 'Mission', text: 'To convene leaders and drive knowledge-based growth by shaping agendas, strengthening investment readiness, and unleashing human capital and innovation: starting in Tanzania, scaling across Africa.' },
  { n: '03', title: 'Objectives', text: 'Foster policy reform, facilitate new business ventures, strengthen public-private partnerships, and create a platform for knowledge sharing and collaboration.' },
];

const objectives = [
  { title: 'Policy reform', text: 'An enabling environment for business growth.' },
  { title: 'Business ventures', text: 'New entrepreneurial opportunities across Tanzania.' },
  { title: 'Partnerships', text: 'Stronger public and private sector collaboration.' },
  { title: 'Knowledge sharing', text: 'Platforms for leaders to learn from one another.' },
  { title: 'Economic growth', text: 'Innovation-led, strategic development.' },
  { title: 'Global integration', text: 'Links to global markets and best practice.' },
];

const WhatWeDoSection = () => (
  <section className="section bg-ivory" aria-labelledby="wwd-title">
    <Container>
      <Reveal className="max-w-2xl">
        <p className="eyebrow">What we do</p>
        <h2 id="wwd-title" className="mt-5 font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">
          Ideals beyond ideas: a platform with a clear purpose.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-10 border-t border-stone pt-10 md:grid-cols-3 md:gap-8">
        {pillars.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.08}>
            <span className="font-display text-sm font-semibold text-gold">{p.n}</span>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{p.title}</h3>
            <p className="mt-3 leading-relaxed text-ink-muted">{p.text}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 rounded-sm border border-stone bg-white p-6 sm:p-8 lg:p-10">
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Our objectives</h3>
        <ul className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {objectives.map((o) => (
            <li key={o.title} className="flex gap-4">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <div>
                <p className="font-semibold text-ink">{o.title}</p>
                <p className="text-sm leading-relaxed text-ink-muted">{o.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </Container>
  </section>
);

export default WhatWeDoSection;

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../common/Container';
import Reveal from '@/components/common/Reveal';
import hall from '@/assets/photos/hall.jpg';
import presentation from '@/assets/photos/presentation.jpg';

const stats = [
  { value: '14', label: 'Editions of the breakfast' },
  { value: '50+', label: 'Industry leaders and speakers' },
  { value: '20+', label: 'Organisations engaged' },
  { value: '100+', label: 'Professionals connected' },
];

const milestones = [
  { year: '2010', text: 'Impact Advisory Africa is founded' },
  { year: '2019', text: 'First Impact Business Breakfast' },
  { year: '2020', text: 'Digital transformation initiative' },
  { year: '2024', text: '13th edition of IBB' },
  { year: '2025', text: '14th edition: Catalysing Tanzania\'s human capital' },
];

const foundation = [
  { n: '01', title: 'Vision', text: "To become Pan-Africa's most impactful private-public platform for knowledge-based sector transformation." },
  { n: '02', title: 'Mission', text: 'To convene leaders and drive knowledge-based growth by shaping agendas, strengthening investment readiness, and unleashing human capital and innovation: starting in Tanzania, scaling across Africa.' },
  { n: '03', title: 'Values', text: "Integrity, innovation, collaboration, and commitment to Tanzania's sustainable economic growth and development." },
];

export default function About() {
  useEffect(() => { document.title = 'About IBB+ | Impact Business Breakfast Tanzania'; }, []);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-deep text-white">
        <img src={hall} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/85 to-navy-deep" />
        <Container className="relative py-20 sm:py-28">
          <p className="eyebrow text-gold-soft">About IBB+</p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.1] sm:text-5xl">The Impact Business Breakfast</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
            Catalysing Tanzania's human capital and building a knowledge-driven economy for Vision 2050.
          </p>
          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/15 pt-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-3xl font-semibold text-gold-soft sm:text-4xl">{s.value}</dd>
                <dt className="mt-1 text-sm text-white/65">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="section bg-ivory">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow">Our story</p>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">From an advisory practice to a national platform.</h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
                <p>Impact Advisory Africa was founded with a vision to transform Tanzania's economic landscape through strategic human capital development and knowledge-driven initiatives.</p>
                <p>Since inception we have brought together industry leaders, government officials and entrepreneurs to address the critical issues affecting Tanzania's economic development.</p>
                <p>Our flagship event, the Impact Business Breakfast, has become the country's leading platform for networking, knowledge sharing and strategic collaboration across sectors.</p>
              </div>
              <img src={presentation} alt="A keynote presentation at the Impact Business Breakfast" className="mt-10 aspect-[16/9] w-full rounded-sm object-cover shadow-lg" loading="lazy" />
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Milestones</h3>
              <ol className="mt-5 border-l border-stone">
                {milestones.map((m) => (
                  <li key={m.year} className="relative pb-8 pl-8 last:pb-0">
                    <span aria-hidden="true" className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-gold ring-4 ring-ivory" />
                    <p className="font-display text-xl font-semibold text-navy">{m.year}</p>
                    <p className="text-ink-muted">{m.text}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section bg-sand">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Our foundation</p>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">The principles that guide the work.</h2>
          </Reveal>
          <div className="mt-12 grid gap-10 border-t border-stone pt-10 md:grid-cols-3 md:gap-8">
            {foundation.map((f, i) => (
              <Reveal key={f.n} delay={i * 0.08}>
                <span className="font-display text-sm font-semibold text-gold">{f.n}</span>
                <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{f.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section bg-navy text-white">
        <Container>
          <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow text-gold-soft">Join the conversation</p>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-4xl">Be part of Tanzania's transformation.</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">Connect with industry leaders, share knowledge, and help build a knowledge-driven economy for Vision 2050.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
              <Link to="/gala" className="btn-gold">Register for the Gala <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/contactus" className="btn-outline-light">Get in touch</Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

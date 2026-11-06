import { Check } from 'lucide-react';
import { Container } from '../../common/Container';
import Reveal from '@/components/common/Reveal';
import group from '@/assets/photos/group.jpg';

const benefits = [
  "Visibility among Tanzania's top business leaders, government officials and industry decision-makers.",
  "Association with the country's leading business networking and knowledge-sharing platform.",
  'A visible demonstration of leadership in corporate responsibility and economic growth.',
  'Access to exclusive networking and partnership opportunities with key stakeholders.',
];

const SponsorshipSection = ({ onBecomeSponsor }: { onBecomeSponsor: () => void }) => (
  <section className="section bg-sand" aria-labelledby="sponsor-title">
    <Container>
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-6">
          <img src={group} alt="Speakers, partners and guests gathered on stage at the Impact Business Breakfast" className="aspect-[4/3] w-full rounded-sm object-cover shadow-xl" loading="lazy" />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-6">
          <p className="eyebrow">Sponsorship</p>
          <h2 id="sponsor-title" className="mt-5 font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">
            Put your organisation in the room where decisions take shape.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Sponsors connect directly with industry leaders, policy makers and decision makers while supporting sustainable development and human capital growth.
          </p>
          <ul className="mt-8 space-y-3.5">
            {benefits.map((b) => (
              <li key={b} className="flex gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span className="leading-relaxed text-ink">{b}</span>
              </li>
            ))}
          </ul>
          <button type="button" onClick={onBecomeSponsor} className="btn-primary mt-8">Become a sponsor</button>
        </Reveal>
      </div>
    </Container>
  </section>
);

export default SponsorshipSection;

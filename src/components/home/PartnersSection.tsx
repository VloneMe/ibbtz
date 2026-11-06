import { Container } from '../../common/Container';
import Reveal from '@/components/common/Reveal';
import somakwanza from '@/assets/partiners/somakwanza.png';
import impactadvisory from '@/assets/partiners/impactadvisory.png';

const partners = [
  { name: 'Impact Advisory', logo: impactadvisory, url: 'https://impactadvisory.co.tz' },
  { name: 'Soma Kwanza', logo: somakwanza, url: 'https://somakwanza.tz' },
];

const PartnersSection = () => (
  <section className="border-y border-stone bg-ivory py-12 sm:py-14" aria-labelledby="partners-title">
    <Container>
      <Reveal className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <h2 id="partners-title" className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Our partners</h2>
          <p className="mt-1 text-sm text-ink-muted">Organisations who make the breakfast possible.</p>
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {partners.map((p) => (
            <li key={p.name}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" title={p.name} className="flex h-20 w-36 items-center justify-center rounded-sm border border-stone bg-white px-5 transition-colors hover:border-navy/40">
                <img src={p.logo} alt={p.name} className="max-h-12 w-auto object-contain" loading="lazy" />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Container>
  </section>
);

export default PartnersSection;

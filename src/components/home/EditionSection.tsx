import { Container } from '../../common/Container';
import Reveal from '@/components/common/Reveal';
import voice1 from '@/assets/photos/voice-1.jpg';
import voice2 from '@/assets/photos/voice-2.jpg';
import voice3 from '@/assets/photos/voice-3.jpg';

const speakers = [
  { name: 'Nehemia K. Mchechu', role: 'Director General, Treasury Registrar' },
  { name: 'Dr. Fred Msemwa', role: 'Executive Secretary, Planning Commission' },
  { name: 'Prof. Mussa J. Assad', role: 'Vice Chancellor, Morogoro Muslim University; former Controller and Auditor General' },
];

const voices = [
  { src: voice1, alt: 'Speaker quote from the 14th edition' },
  { src: voice2, alt: 'Anabahati Mlay: "Inclusion has to be designed. Not assumed."' },
  { src: voice3, alt: 'Dr. Fred Msemwa: "Technology is no longer an economic sector; it is the platform upon which all sectors operate."' },
];

const EditionSection = () => (
  <section className="section bg-sand" aria-labelledby="edition-title">
    <Container>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">14th edition · 28 November 2025</p>
          <h2 id="edition-title" className="mt-5 font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">
            Catalysing Tanzania's human capital
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            What it will take to ignite a knowledge-driven economy and fulfil the promise of Vision 2050.
          </p>
          <h3 className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-ink">Speakers</h3>
          <ul className="mt-4 divide-y divide-stone border-y border-stone">
            {speakers.map((s) => (
              <li key={s.name} className="py-4">
                <p className="font-semibold text-ink">{s.name}</p>
                <p className="text-sm text-ink-muted">{s.role}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Voices from the breakfast</h3>
          <ul className="-mx-5 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
            {voices.map((v) => (
              <li key={v.src} className="w-[78%] shrink-0 snap-start sm:w-auto">
                <img src={v.src} alt={v.alt} className="aspect-[3/2] w-full rounded-sm object-cover shadow-md" loading="lazy" />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Container>
  </section>
);

export default EditionSection;

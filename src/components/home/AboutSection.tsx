import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../../common/Container';
import Reveal from '@/components/common/Reveal';
import audience from '@/assets/photos/audience.jpg';
import networking from '@/assets/photos/networking-1.jpg';

const AboutSection = () => (
  <section className="section bg-ivory" aria-labelledby="about-title">
    <Container>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow">About the platform</p>
          <h2 id="about-title" className="mt-5 font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl lg:text-[2.75rem]">
            A convening platform for decision-makers, built on ideals that move Tanzania forward.
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
            <p>
              The Impact Business Breakfast (IBB+) brings together industry leaders, entrepreneurs, government officials and professionals to work through the issues that shape Tanzania's economic development.
            </p>
            <p>
              Each edition takes a single theme, pairs it with speakers who carry real responsibility for it, and leaves room for the frank conversation and introductions that a breakfast table allows.
            </p>
          </div>
          <blockquote className="mt-8 border-l-2 border-gold pl-5">
            <p className="font-display text-xl italic leading-snug text-navy sm:text-2xl">
              "We always believed that the most powerful innovations happen when unlikely collaborations come together."
            </p>
            <footer className="mt-3 text-sm font-semibold uppercase tracking-wider text-ink-muted">Nelson Mandela</footer>
          </blockquote>
          <Link to="/aboutus" className="btn-link mt-8">
            More about IBB+ <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6">
          <div className="relative">
            <img src={audience} alt="Delegates seated at the Impact Business Breakfast" className="aspect-[4/3] w-full rounded-sm object-cover shadow-xl" loading="lazy" />
            <img src={networking} alt="Delegates networking between sessions" className="absolute -bottom-8 -left-4 hidden w-2/5 rounded-sm border-4 border-ivory object-cover shadow-lg sm:block lg:-left-10" loading="lazy" />
          </div>
        </Reveal>
      </div>
    </Container>
  </section>
);

export default AboutSection;

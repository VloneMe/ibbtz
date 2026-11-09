import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../../common/Container';
import Reveal from '@/components/common/Reveal';

const GalaCallout = () => (
  <section className="section bg-ivory" aria-labelledby="gala-title">
    <Container>
      <Reveal className="grid gap-10 rounded-sm border border-gold/50 bg-white p-7 sm:p-10 lg:grid-cols-12 lg:gap-16 lg:p-14">
        <div className="lg:col-span-7">
          <p className="eyebrow">Impact Business Awards (IBA)</p>
          <h2 id="gala-title" className="mt-5 font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">
            An evening to celebrate the businesses shaping Tanzania's future.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Join fellow leaders at the Impact Business Awards 2026. Register as an individual or reserve a corporate table for your organisation.
          </p>
          <Link to="/iba" className="btn-primary mt-8">
            Register now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <dl className="divide-y divide-stone border-y border-stone self-center lg:col-span-5">
          <div className="flex items-baseline justify-between gap-4 py-5">
            <dt><span className="block font-semibold text-ink">Individual</span><span className="text-sm text-ink-muted">One seat</span></dt>
            <dd className="font-display text-2xl font-semibold text-navy">Tsh 150,000</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 py-5">
            <dt><span className="block font-semibold text-ink">Corporate table</span><span className="text-sm text-ink-muted">For your organisation</span></dt>
            <dd className="font-display text-2xl font-semibold text-navy">Tsh 2,000,000</dd>
          </div>
          <p className="py-4 text-sm text-ink-muted">Payment by bank transfer or mobile money. Details follow registration.</p>
        </dl>
      </Reveal>
    </Container>
  </section>
);

export default GalaCallout;

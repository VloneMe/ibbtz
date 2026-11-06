import { useEffect } from 'react';
import { Container } from '../common/Container';
import FeedbackForm from '@/components/common/FeedbackForm';
import Reveal from '@/components/common/Reveal';

export default function Feedback() {
  useEffect(() => { document.title = 'Feedback | IBB+ Impact Business Breakfast'; }, []);
  return (
    <>
      <section className="border-b border-stone bg-ivory">
        <Container className="py-16 sm:py-20">
          <p className="eyebrow">Feedback</p>
          <h1 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.1] text-navy sm:text-5xl">Tell us how we did</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">Your views on the sessions, the speakers and the format shape the next edition. It takes two minutes.</p>
        </Container>
      </section>
      <section className="section bg-ivory">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">What we ask</h2>
              <ul className="mt-5 space-y-4 text-ink-muted">
                <li><span className="font-semibold text-ink">Event feedback.</span> The programme, speakers and venue.</li>
                <li><span className="font-semibold text-ink">General feedback.</span> Anything about IBB+ as a platform.</li>
                <li><span className="font-semibold text-ink">Service feedback.</span> Registration, communication and follow-up.</li>
              </ul>
              <p className="mt-8 text-sm leading-relaxed text-ink-muted">Prefer to speak to someone? Call <a href="tel:+255748111183" className="font-semibold text-navy">+255 748 111 183</a> or email <a href="mailto:ibb@impactadvisory.co.tz" className="font-semibold text-navy">ibb@impactadvisory.co.tz</a>.</p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-8">
              <FeedbackForm title="Share your feedback" />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

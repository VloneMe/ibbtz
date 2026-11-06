import { useEffect } from 'react';
import { Container } from '../common/Container';
import ContactForm from '@/components/common/ContactForm';
import Reveal from '@/components/common/Reveal';

export default function Contact() {
  useEffect(() => { document.title = 'Contact | IBB+ Impact Business Breakfast'; }, []);
  return (
    <>
      <section className="border-b border-stone bg-ivory">
        <Container className="py-16 sm:py-20">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.1] text-navy sm:text-5xl">Get in touch</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">Partnerships, sponsorship, speaking opportunities or a question about the next edition. We'd like to hear from you.</p>
        </Container>
      </section>
      <section className="section bg-ivory">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <dl className="space-y-8">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Office</dt>
                  <dd className="mt-3 leading-relaxed text-ink-muted">Victoria, Noble Centre<br />7th Floor, Suite 702<br />Dar es Salaam, Tanzania</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Phone</dt>
                  <dd className="mt-3 leading-relaxed text-ink-muted"><a href="tel:+255748111183" className="hover:text-navy">+255 748 111 183</a><br /><a href="tel:+255784242486" className="hover:text-navy">+255 784 242 486</a></dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Email</dt>
                  <dd className="mt-3 leading-relaxed text-ink-muted"><a href="mailto:ibb@impactadvisory.co.tz" className="hover:text-navy">ibb@impactadvisory.co.tz</a><br /><a href="mailto:info@impactadvisory.co.tz" className="hover:text-navy">info@impactadvisory.co.tz</a></dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Hours</dt>
                  <dd className="mt-3 leading-relaxed text-ink-muted">Monday to Friday<br />08:00 to 17:00 EAT</dd>
                </div>
              </dl>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-8">
              <ContactForm title="Send us a message" />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

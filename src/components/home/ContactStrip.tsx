import { Link } from 'react-router-dom';
import { Container } from '../../common/Container';
import Reveal from '@/components/common/Reveal';

const ContactStrip = () => (
  <section className="bg-navy-deep text-white" aria-labelledby="contact-strip-title">
    <Container className="section">
      <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5">
          <p className="eyebrow text-gold-soft">Get in touch</p>
          <h2 id="contact-strip-title" className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Partnerships, speaking, or a question about the next edition.
          </h2>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/contactus" className="btn-gold">Contact us</Link>
            <Link to="/feedback" className="btn-outline-light">Share feedback</Link>
          </div>
        </div>
        <dl className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft">Office</dt>
            <dd className="mt-3 leading-relaxed text-white/80">Victoria, Noble Centre<br />7th Floor, Suite 702<br />Dar es Salaam, Tanzania</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft">Phone</dt>
            <dd className="mt-3 leading-relaxed text-white/80"><a href="tel:+255748111183" className="hover:text-white">+255 748 111 183</a><br /><a href="tel:+255784242486" className="hover:text-white">+255 784 242 486</a></dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft">Email</dt>
            <dd className="mt-3 leading-relaxed text-white/80"><a href="mailto:ibb@impactadvisory.co.tz" className="hover:text-white">ibb@impactadvisory.co.tz</a><br /><a href="mailto:info@impactadvisory.co.tz" className="hover:text-white">info@impactadvisory.co.tz</a></dd>
          </div>
        </dl>
      </Reveal>
    </Container>
  </section>
);

export default ContactStrip;

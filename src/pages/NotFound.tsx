import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Container } from '../common/Container';

export default function NotFound() {
  return (
    <section className="section bg-ivory">
      <Container size="narrow" className="py-10 text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="mt-5 font-display text-4xl font-semibold text-navy sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-lg text-ink-muted">The page you are looking for has moved or never existed.</p>
        <Link to="/" className="btn-primary mt-8"><ArrowLeft className="h-4 w-4" /> Back to home</Link>
      </Container>
    </section>
  );
}

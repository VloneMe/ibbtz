import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Container } from '../../common/Container';
import Reveal from '@/components/common/Reveal';

const faqs = [
  { q: 'What is the Impact Business Breakfast?', a: "A networking and knowledge-sharing platform that brings together industry leaders, entrepreneurs, government officials and professionals to discuss the issues affecting Tanzania's economic development." },
  { q: 'How do I register?', a: 'Registration for the Impact Business Awards (IBA) is open on this site. For the breakfast editions, use the contact page and our team will reach you with the next date and registration details.' },
  { q: 'What does attendance cost?', a: 'Breakfast editions: individual seats are TZS 120,000 and corporate tables TZS 1,500,000. The Impact Business Awards: individual Tsh 250,000 and corporate table Tsh 2,000,000.' },
  { q: 'Who can attend?', a: "Business leaders, government officials, entrepreneurs, academics and professionals with an interest in Tanzania's economic development and human capital growth." },
  { q: 'Is there time for networking?', a: 'Yes. Every edition includes dedicated networking time, breaks and interactive discussion designed for meaningful introductions.' },
];

const FAQSection = () => (
  <section className="section bg-ivory" aria-labelledby="faq-title">
    <Container>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Questions</p>
          <h2 id="faq-title" className="mt-5 font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">Frequently asked</h2>
          <p className="mt-4 leading-relaxed text-ink-muted">Can't find what you need? Our team is happy to help.</p>
          <Link to="/contactus" className="btn-link mt-5">Contact us <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-8">
          <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-stone">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-b border-stone">
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:text-navy hover:no-underline sm:text-lg">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-ink-muted">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Container>
  </section>
);

export default FAQSection;

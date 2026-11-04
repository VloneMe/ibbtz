import { motion } from 'framer-motion';
import { Container } from '../../common/Container';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const fadeInUp = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      type: "spring" as const,
      stiffness: 100,
      damping: 10,
      duration: 0.8
    }
  }
};

const FAQSection = () => {
  const faqs = [
    {
      question: "What is the Impact Business Breakfast?",
      answer: "The Impact Business Breakfast is a premier networking and knowledge-sharing platform that brings together industry leaders, entrepreneurs, and professionals to discuss critical issues affecting Tanzania's economic development."
    },
    {
      question: "How do I register for the event?",
      answer: "You can register by clicking the 'REGISTER NOW' button on this page or visiting our registration portal. Payment is required upon registration."
    },
    {
      question: "What is the cost of attendance?",
      answer: "Individual tickets cost TZS 120,000 and corporate tables cost TZS 1,500,000. This premium pricing reflects the high-value networking opportunities and expert insights provided at our events."
    },
    {
      question: "Who can attend this event?",
      answer: "The event is open to business leaders, government officials, entrepreneurs, academics, and professionals interested in Tanzania's economic development and human capital growth."
    },
    {
      question: "Will there be networking opportunities?",
      answer: "Yes, the event includes dedicated networking sessions, coffee breaks, and interactive discussions to facilitate meaningful connections among attendees."
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-20 bg-black"
    >
      <Container className="min-w-full px-4">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Frequently Asked Questions</h2>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-gray-900 border border-[oklch(0.473_0.137_46.201)]/20 rounded-lg">
                <AccordionTrigger className="text-white hover:text-[#768f00] px-6 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 px-6 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </motion.div>
  );
};

export default FAQSection;

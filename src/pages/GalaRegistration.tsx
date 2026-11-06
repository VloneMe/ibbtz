import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { Badge } from '@/components/ui/badge';
import { Award, Users, CreditCard } from 'lucide-react';
import GalaRegistrationForm from '@/components/common/GalaRegistrationForm';

const fadeInUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100, damping: 15 } },
};

export default function GalaRegistration() {
  useEffect(() => {
    document.title = 'Impact Business Awards Gala | Registration | IBB+ Tanzania';
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-poppins relative overflow-hidden">
      <Container className="relative z-10 py-16 sm:py-24 px-4">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="bg-[#768f00] text-white px-4 py-2 font-bold text-sm mb-4">Impact Business Awards</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Impact Business Awards Gala</h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Reserve your seat at the gala celebrating Tanzania's impact-driven businesses and leaders. Complete the form below to register as an individual or book a corporate table.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <motion.aside initial="hidden" animate="visible" variants={fadeInUp} className="space-y-4 lg:order-2">
            {[
              { icon: Users, title: 'Individual', text: 'One seat at the gala. Tsh 250,000.' },
              { icon: Award, title: 'Corporate Table', text: 'A full table for your organisation. Tsh 2,000,000.' },
              { icon: CreditCard, title: 'Payment', text: 'Pay by bank transfer or mobile money. Details are shared after registration.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-black/20 backdrop-blur-sm p-5 rounded-lg border border-white/10 flex gap-4">
                <div className="w-10 h-10 bg-[#768f00] rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="text-sm text-gray-300">{text}</p>
                </div>
              </div>
            ))}
          </motion.aside>

          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="lg:col-span-2 lg:order-1">
            <GalaRegistrationForm />
          </motion.div>
        </div>
      </Container>
    </main>
  );
}

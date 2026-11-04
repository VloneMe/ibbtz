import { motion } from 'framer-motion';
import { Container } from '../../common/Container';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowRight } from 'lucide-react';

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

const ParentOrganizationSection = () => {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-20 bg-gradient-to-r from-black to-[#012557]"
    >
      <Container className='px-4'>
        <motion.div variants={fadeInUp} className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Part of Impact Advisory Africa
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            The Impact Business Breakfast is a flagship initiative of Impact Advisory Africa, 
            dedicated to fostering economic development and human capital growth across Tanzania.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              className="bg-[#768f00] hover:bg-[#768f00]/90 text-white px-8 py-4 text-lg rounded-full"
              onClick={() => window.open('https://impactadvisory.co.tz', '_blank')}
            >
              Visit Impact Advisory Africa
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              className="border-[#768f00] text-[#768f00] hover:bg-[#768f00] hover:text-white px-8 py-4 text-lg rounded-full"
              onClick={() => window.open('https://impactadvisory.co.tz/aboutus', '_blank')}
            >
              Learn About Our Mission
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default ParentOrganizationSection;

import { motion } from 'framer-motion';
import { Container } from '../../common/Container';

import partiner1 from '@/assets/partiners/somakwanza.jpeg';
import partiner2 from '@/assets/partiners/impactadvisory.png';

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

const PartnersSection = () => {
  const partners = [
    { name: "Soma Kwanza", logo: partiner1, url: "https://somakwanza.tz" },
    { name: "Impact Advisory", logo: partiner2, url: "https://impactadvisory.co.tz" }
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-20 bg-[#012557]/55"
    >
      <Container className='px-4'>
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Our Partners</h2>
          <span className="text-xl text-gray-300 max-w-3xl mx-auto">
            We are grateful to our partners for their support and collaboration.
          </span>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <motion.div 
              key={index} 
              variants={fadeInUp} 
              className="bg-[oklch(0.473_0.137_46.201)]/20 p-6 rounded-lg border border-[oklch(0.473_0.137_46.201)]/30 text-center hover:bg-[oklch(0.473_0.137_46.201)]/30 transition-colors"
            >
              <div className="text-4xl mb-3 bg-white rounded-lg p-5">
                <a href={partner.url} target="_blank" rel="noopener noreferrer">
                  <img src={partner.logo} alt={partner.name} className="w-full h-full object-cover" />
                </a>
              </div>
              <p className="text-white text-sm font-medium leading-tight">{partner.name}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </motion.div>
  );
};

export default PartnersSection;

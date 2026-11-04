import { motion } from 'framer-motion';
import { Container } from '../../common/Container';
import { 
  Users, 
  Handshake, 
  Lightbulb, 
  TrendingUp, 
  Globe, 
  Target 
} from 'lucide-react';

import attend1 from '@/assets/ibb1.jpg';
import attend2 from '@/assets/ibb2.jpg';
import attend3 from '@/assets/ibb3.jpg';
import attend4 from '@/assets/ibb4.jpg';
import attend5 from '@/assets/ibb5.jpg';
import attend6 from '@/assets/ibb6.jpg';

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

const WhyAttendSection = () => {
  const attendReasons = [
    { img: attend1, icon: Users, text: "Network with industry leaders and decision makers" },
    { img: attend2, icon: Handshake, text: "Build strategic alliances and partnerships" },
    { img: attend3, icon: Lightbulb, text: "Gain insights from expert speakers and panelists" },
    { img: attend4, icon: TrendingUp, text: "Boost your skills and knowledge base" },
    { img: attend5, icon: Globe, text: "Expand your professional network across Africa" },
    { img: attend6, icon: Target, text: "Discover new business opportunities" }
  ];

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-20 bg-[#f78e22]/55 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <Container className="relative z-10 px-4">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">Why Attend the Summit?</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attendReasons.map((item, index) => (
            <motion.div key={index} variants={fadeInUp} className="flex flex-col items-start gap-4 tracking-wide">
              <img src={item.img} alt={item.text} className="w-full h-48 object-cover rounded-lg mb-4" />
              <div className="flex justify-center items-center items-start gap-4">
                <div className="w-8 h-8 bg-[#768f00] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <item.icon className="h-4 w-4 text-white" />
                </div>
                <p className="text-white text-xl lg:text-2xl">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </motion.div>
  );
};

export default WhyAttendSection;

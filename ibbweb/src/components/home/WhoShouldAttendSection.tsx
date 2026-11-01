import { motion } from 'framer-motion';
import { Container } from '../../common/Container';
import { 
  Briefcase, 
  Shield, 
  Zap, 
  GraduationCap, 
  Heart, 
  Crown 
} from 'lucide-react';

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

const WhoShouldAttendSection = () => {
  const attendeeTypes = [
    { icon: Briefcase, title: "Decision Makers", desc: "in the Public and Private Sectors" },
    { icon: Shield, title: "Policy Makers", desc: "and Government Officials" },
    { icon: Zap, title: "Entrepreneurs", desc: "Innovators, and Business Leaders" },
    { icon: GraduationCap, title: "Academics", desc: "and Researchers" },
    { icon: Heart, title: "NGO Leaders", desc: "and Social Entrepreneurs" },
    { icon: Crown, title: "Industry Experts", desc: "and Thought Leaders" }
  ];

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-20 bg-gradient-to-b from-[oklch(0.473_0.137_46.201)] to-black"
    >
      <Container className='px-4'>
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide">Who Should Attend?</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attendeeTypes.map((item, index) => (
            <motion.div key={index} variants={fadeInUp} className="bg-[#768f00]/55 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/90">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </motion.div>
  );
};

export default WhoShouldAttendSection;

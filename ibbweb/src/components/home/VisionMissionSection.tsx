import { motion } from 'framer-motion';
import { Container } from '../../common/Container';
import { Compass, Target, Award } from 'lucide-react';

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

const VisionMissionSection = () => {
  const visionMissionData = [
    {
      icon: Compass,
      title: "Vision",
      description: "To become Pan Africa's most impactful private-public platform for knowledge-based sector transformation."
    },
    {
      icon: Target,
      title: "Mission",
      description: "To convene leaders and drive knowledge-based growth by shaping agendas, strengthening investment readiness, and unleashing human capital and innovation, starting in Tanzania, scaling across Africa."
    },
    {
      icon: Award,
      title: "Objectives",
      description: "Foster policy reforms, facilitate new business ventures, strengthen partnerships, and create a platform for knowledge sharing and collaboration."
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
      <Container className='px-4'>
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">WHAT WE DO</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visionMissionData.map((item, index) => (
            <motion.div key={index} variants={fadeInUp} className="bg-[oklch(0.473_0.137_46.201)] p-8 rounded-lg">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                <item.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </motion.div>
  );
};

export default VisionMissionSection;

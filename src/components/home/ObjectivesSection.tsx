import { motion } from 'framer-motion';
import { Container } from '../../common/Container';
import { 
  Target, 
  Handshake, 
  Users, 
  Lightbulb, 
  TrendingUp, 
  Globe 
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

const ObjectivesSection = () => {
  const objectives = [
    {
      icon: Target,
      title: "Policy Reforms",
      description: "Foster policy reforms that create an enabling environment for business growth and economic development."
    },
    {
      icon: Handshake,
      title: "Business Ventures",
      description: "Facilitate new business ventures and entrepreneurial opportunities across Tanzania."
    },
    {
      icon: Users,
      title: "Partnerships",
      description: "Strengthen partnerships between public and private sectors for sustainable development."
    },
    {
      icon: Lightbulb,
      title: "Knowledge Sharing",
      description: "Create platforms for knowledge sharing and collaboration among industry leaders."
    },
    {
      icon: TrendingUp,
      title: "Economic Growth",
      description: "Drive economic growth through innovation and strategic development initiatives."
    },
    {
      icon: Globe,
      title: "Global Integration",
      description: "Connect Tanzania's economy with global markets and international best practices."
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-20 bg-[oklch(0.473_0.137_46.201)]"
    >
      <Container className='px-4'>
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Our Objectives</h2>
          <p className="text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
            Driving Tanzania's economic transformation through strategic partnerships and knowledge sharing
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {objectives.map((objective, index) => (
            <motion.div key={index} variants={fadeInUp} className="bg-white/10 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-[#768f00] rounded-full flex items-center justify-center mx-auto mb-6">
                <objective.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{objective.title}</h3>
              <p className="text-gray-300 leading-relaxed">
                {objective.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </motion.div>
  );
};

export default ObjectivesSection;

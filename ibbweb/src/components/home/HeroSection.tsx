import { motion } from 'framer-motion';
import { Container } from '../../common/Container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import heroImage from '/src/assets/ibb.jpg';

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

// const fadeInUp = {
//   hidden: { y: 40, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: { 
//       type: "spring" as const,
//       stiffness: 100,
//       damping: 10,
//       duration: 0.8
//     }
//   }
// };

interface HeroSectionProps {
  onViewAgenda: () => void;
}

const HeroSection = ({ onViewAgenda }: HeroSectionProps) => {
  const platformInfo = {
    name: "Impact Business Breakfast",
    tagline: "Ideals Beyond Ideas",
    title: "Tanzania's Premier Business Networking Platform",
    description: "The Impact Business Breakfast (IBB+) is a premier networking and knowledge-sharing platform that brings together industry leaders, entrepreneurs, government officials, and professionals to discuss critical issues affecting Tanzania's economic development."
  };

  return (
    <section 
      className="relative min-h-[70vh] flex items-center"
      aria-label="IBB Networking Platform Hero Section"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Impact Business Breakfast Tanzania - Premier business networking event in Dar es Salaam"
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>
      
      <Container className="relative z-10 pt-20">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl space-y-4 px-4 sm:px-0"
        >
          {/* Platform Badges */}
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <Badge className="bg-[#768f00] text-white px-3 py-1 sm:px-4 sm:py-2 font-bold text-xs sm:text-sm">
              {platformInfo.tagline}
            </Badge>
            <Badge className="bg-[oklch(0.473_0.137_46.201)] text-white px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
              Business Networking Platform
            </Badge>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {platformInfo.title}
          </h1>
          
          {/* Platform Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
            {platformInfo.description}
          </p>


          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link to="/feedback">
              <Button 
                size="lg" 
                className="bg-[#012557] hover:bg-[#012557]/90 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
              >
                FEEDBACK
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[oklch(0.473_0.137_46.201)] text-[oklch(0.473_0.137_46.201)] hover:bg-[oklch(0.473_0.137_46.201)] hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
              onClick={onViewAgenda}
            >
              VIEW AGENDA
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default HeroSection;

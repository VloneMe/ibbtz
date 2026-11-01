import { motion } from 'framer-motion';
import { Container } from '../../common/Container';
import ImageCarousel from './ImageCarousel';
import highlightsImage1 from '/src/assets/ibbV1.jpeg';

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

interface EventHighlightsSectionProps {
  summitHighlightsCarouselImages: string[];
  summitHighlightsCarouselIndex: number;
  handleSummitHighlightsNext: () => void;
  handleSummitHighlightsPrev: () => void;
}

const EventHighlightsSection = ({ 
  summitHighlightsCarouselImages, 
  summitHighlightsCarouselIndex, 
  handleSummitHighlightsNext, 
  handleSummitHighlightsPrev 
}: EventHighlightsSectionProps) => {
  const eventFeatures = [
    "High-level Sessions with Industry Leaders",
    "Networking Opportunities",
    "Interactive Panel Discussions",
    "Exhibitions and Showcases",
    "Awards & Recognition Ceremony",
    "Knowledge Sharing Sessions"
  ];

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-20 relative overflow-hidden min-h-[80vh] flex items-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={highlightsImage1}
          alt="Summit Highlights Background"
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#973c00] via-black/80 to-[#012557]"></div>
      </div>
      <Container className="relative z-10 px-4">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Event Highlights</h2>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div variants={fadeInUp} className="bg-[oklch(0.473_0.137_46.201)] p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-6">Event Features</h3>
            <ul className="space-y-4">
              {eventFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-white">
                  <div className="w-2 h-2 bg-[#768f00] rounded-full"></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <ImageCarousel
              images={summitHighlightsCarouselImages}
              currentIndex={summitHighlightsCarouselIndex}
              onNext={handleSummitHighlightsNext}
              onPrev={handleSummitHighlightsPrev}
              className="w-full h-96"
            />
          </motion.div>
        </div>
      </Container>
    </motion.div>
  );
};

export default EventHighlightsSection;

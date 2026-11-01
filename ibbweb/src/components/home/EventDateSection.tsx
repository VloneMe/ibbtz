import { motion } from 'framer-motion';
import { Container } from '../../common/Container';
import { Clock } from 'lucide-react';
import { nextEvent } from '@/data/index';
import ImageCarousel from './ImageCarousel';

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

interface EventDateSectionProps {
  eventDateCarouselImages: string[];
  eventDateCarouselIndex: number;
  handleEventDateNext: () => void;
  handleEventDatePrev: () => void;
}

const EventDateSection = ({ 
  eventDateCarouselImages, 
  eventDateCarouselIndex, 
  handleEventDateNext, 
  handleEventDatePrev 
}: EventDateSectionProps) => {
  const event = nextEvent;

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-20 relative overflow-hidden min-h-[70vh] flex items-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/src/assets/ibbV1.jpeg"
          alt="Event Background"
          className="w-full h-full object-contain w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#5c6522]/90 via-[oklch(0.473_0.137_46.201)]/80 to-[#012557]"></div>
      </div>
      <Container className="relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp}>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {event.date}
            </h2>
            <p className="text-2xl text-[#768f00] mb-8 text-gray-900">
              {event.location}
            </p>
            <div className="flex items-center gap-4 text-lg text-white">
              <Clock className="h-6 w-6" />
              <span>{event.time}</span>
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="w-full min-h-fit">
            <ImageCarousel
              images={eventDateCarouselImages}
              currentIndex={eventDateCarouselIndex}
              onNext={handleEventDateNext}
              onPrev={handleEventDatePrev}
              className="w-full h-96"
            />
          </motion.div>
        </div>
      </Container>
    </motion.div>
  );
};

export default EventDateSection;

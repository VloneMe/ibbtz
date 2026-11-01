import { motion } from 'framer-motion';
import { Container } from '../../common/Container';
import { nextEvent } from '@/data/index';
import mandela from '/src/assets/Yousuf-Karsh-Nelson-Mandela-1990.webp';

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

interface QuoteAboutSectionProps {
  getFeaturedMedia: () => any;
  getMediaUrl: (mediaItem: any) => string;
}

const QuoteAboutSection = ({ getFeaturedMedia, getMediaUrl }: QuoteAboutSectionProps) => {
  const event = nextEvent;

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-20"
    >
      <Container className='px-4'>
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Quote Section */}
          <motion.div variants={fadeInUp} className="bg-gradient-to-br from-[oklch(0.473_0.137_46.201)] via-[oklch(0.4_0.15_46.201)] to-[oklch(0.473_0.137_46.201)] p-6 sm:p-8 lg:p-12 rounded-2xl relative overflow-hidden shadow-2xl border border-[#768f00]/30">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#768f00]/10 rounded-full -translate-y-12 translate-x-12 sm:-translate-y-16 sm:translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-[#768f00]/10 rounded-full translate-y-8 -translate-x-8 sm:translate-y-12 sm:-translate-x-12"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 lg:gap-8">
                {/* Enhanced Mandela Portrait */}
                <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-[#768f00] shadow-2xl ring-4 ring-[#768f00]/20">
                    <img 
                      src={mandela} 
                      alt="Nelson Mandela - Former President of South Africa and Nobel Peace Prize Laureate" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative ring around image */}
                  <div className="absolute -inset-1 sm:-inset-2 rounded-full border-2 border-[#768f00]/30 animate-pulse"></div>
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  {/* Quote with enhanced typography */}
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 text-4xl sm:text-6xl text-[#768f00]/20 font-serif">"</div>
                    <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white leading-relaxed mb-6 sm:mb-8 relative z-10 italic">
                      We always believed that the most powerful innovations happen when unlikely collaborations come together.
                    </blockquote>
                    <div className="absolute -bottom-1 -right-2 sm:-bottom-2 sm:-right-4 text-4xl sm:text-6xl text-[#768f00]/20 font-serif">"</div>
                  </div>
                  
                  {/* Enhanced attribution */}
                  <div className="flex items-center justify-center sm:justify-start gap-3">
                    <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-[#768f00] to-[#768f00]"></div>
                    <cite className="text-lg sm:text-xl text-[#768f00] font-bold">Nelson Mandela</cite>
                    <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-[#768f00] to-[#768f00]"></div>
                  </div>
                  
                  {/* Additional context */}
                  <p className="text-xs sm:text-sm text-[#768f00]/80 mt-2 font-medium">
                    Former President of South Africa • Nobel Peace Prize Laureate
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* About Section */}
          <motion.div variants={fadeInUp} className="bg-black py-6 sm:p-8 lg:p-12 rounded-lg border border-[oklch(0.473_0.137_46.201)]/20">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">About The Summit</h2>
            <div className="mb-4 sm:mb-6">
              <img 
                src={getFeaturedMedia() ? getMediaUrl(getFeaturedMedia()) : event.image} 
                alt="Summit" 
                className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg border border-[oklch(0.473_0.137_46.201)]/30"
              />
            </div>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              {event.fullDescription || event.description}
            </p>
          </motion.div>
        </div>
      </Container>
    </motion.div>
  );
};

export default QuoteAboutSection;

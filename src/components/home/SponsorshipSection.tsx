import { motion } from 'framer-motion';
import { Container } from '../../common/Container';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Crown, 
  Briefcase, 
  Users, 
  Lightbulb, 
  TrendingUp 
} from 'lucide-react';
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

interface SponsorshipSectionProps {
  sponsorshipCarouselImages: string[];
  sponsorshipCarouselIndex: number;
  handleSponsorshipNext: () => void;
  handleSponsorshipPrev: () => void;
  onBecomeSponsor: () => void;
}

const SponsorshipSection = ({ 
  sponsorshipCarouselImages, 
  sponsorshipCarouselIndex, 
  handleSponsorshipNext, 
  handleSponsorshipPrev, 
  onBecomeSponsor 
}: SponsorshipSectionProps) => {
  const sponsorBenefits = [
    "Strategic visibility among Tanzania's top business leaders, government officials, and industry decision-makers.",
    "Association with Tanzania's premier business networking and knowledge-sharing platform driving economic development.",
    "The opportunity to demonstrate leadership in corporate social responsibility and support for Tanzania's economic growth.",
    "Access to exclusive networking opportunities and potential business partnerships with key stakeholders."
  ];

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-20 bg-[#012557] relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <Container className="relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Text Content */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Sponsorship Opportunity</h2>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="w-16 h-0.5 bg-yellow-400"></div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-gray-200 leading-relaxed">
                The Impact Business Breakfast offers a unique platform for driving Tanzania's economic transformation, 
                providing sponsors with opportunities to connect with industry leaders, policy makers, and decision makers 
                while supporting sustainable development and human capital growth.
              </p>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">By partnering with us, sponsors gain:</h3>
                <ul className="space-y-3">
                  {sponsorBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-200">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-lg text-gray-200 leading-relaxed">
                We invite forward-thinking organizations to join us in shaping Tanzania's economic future through 
                strategic partnerships and collaborative development initiatives.
              </p>

              <Button 
                className="bg-secondary bg-secondary-foreground hover:bg-primary/90 text-white px-8 py-4 text-lg font-bold border-2 border-yellow-400 rounded-lg flex items-center gap-3"
                onClick={onBecomeSponsor}
              >
                <Crown className="h-6 w-6 text-yellow-400" />
                BECOME A SPONSOR
              </Button>
            </div>
          </motion.div>

          {/* Right Section - Image Carousel */}
          <motion.div variants={fadeInUp} className="relative">
            <div className="relative">
              {/* Image Carousel */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <ImageCarousel
                  images={sponsorshipCarouselImages}
                  currentIndex={sponsorshipCarouselIndex}
                  onNext={handleSponsorshipNext}
                  onPrev={handleSponsorshipPrev}
                  className="w-full h-fit flip-vertical"
                  autoPlay={true}
                  interval={4000}
                />
                
                {/* Overlay Content */}
                <div hidden className="absolute lg:bottom-6 -bottom-3 left-6 right-6 z-10">
                  <div className="bg-black/65 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-[#768f00] rounded-full flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">IBB Partnership</h3>
                        <p className="text-sm text-gray-200">Strategic Business Alliance</p>
                      </div>
                    </div>
                    
                    {/* IBB Focus Areas */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-[#768f00] rounded-full flex items-center justify-center mx-auto mb-1">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-xs text-gray-200">Networking</p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-1">
                          <Lightbulb className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-xs text-gray-200">Knowledge</p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-1">
                          <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-xs text-gray-200">Growth</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#768f00]/20 rounded-full blur-xl"></div>
            </div>
          </motion.div>
        </div>
      </Container>
    </motion.div>
  );
};

export default SponsorshipSection;

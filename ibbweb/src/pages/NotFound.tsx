import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Container } from '../common/Container';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  ArrowLeft, 
  // Search,
  AlertCircle,
  // Globe
} from 'lucide-react';

// Animation variants
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

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#012557]/55 text-white font-poppins">
      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#768f00]/10 via-transparent to-[#768f00]/5"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#768f00]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#768f00]/10 rounded-full blur-3xl"></div>
        
        <Container>
          <motion.div variants={fadeInUp} className="max-w-4xl mx-auto text-center relative z-10">
            <div className="space-y-8">
              {/* 404 Number */}
              <motion.div 
                variants={fadeInUp}
                className="text-9xl md:text-[12rem] font-bold text-[#768f00] leading-none"
              >
                404
              </motion.div>
              
              {/* Error Icon */}
              <motion.div 
                variants={fadeInUp}
                className="flex justify-center"
              >
                <div className="w-24 h-24 bg-[#768f00]/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-12 w-12 text-[#768f00]" />
                </div>
              </motion.div>
              
              {/* Title */}
              <motion.div variants={fadeInUp}>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Page Not Found
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  The page you're looking for doesn't exist or has been moved.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Button 
                  onClick={handleGoHome}
                  className="bg-[#768f00] hover:bg-[#768f00]/90 text-white px-8 py-4 text-lg rounded-full"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Button>
                <Button 
                  onClick={handleGoBack}
                  variant="outline" 
                  className="border-[#768f00] text-[#768f00] hover:bg-[#768f00] hover:text-white px-8 py-4 text-lg rounded-full"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Go Back
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </motion.div>

      {/* Help Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-24 bg-gradient-to-br from-[#768f00]/10 via-black/50 to-[#768f00]/5"
      >
        <Container>
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Need Help Finding Something?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Here are some popular pages you might be looking for
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Home", 
                description: "Return to our homepage", 
                path: "/",
                icon: Home 
              },
              // { 
              //   title: "Events", 
              //   description: "View our upcoming events", 
              //   path: "/ibb",
              //   icon: Globe 
              // },
              // { 
              //   title: "Gallery", 
              //   description: "Browse our photo gallery", 
              //   path: "/gallery",
              //   icon: Search 
              // },
              { 
                title: "Contact", 
                description: "Get in touch with us", 
                path: "/contactus",
                icon: AlertCircle 
              }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp} 
                className="bg-gradient-to-br from-black/40 to-black/20 p-8 rounded-2xl border border-gray-800 hover:border-[#768f00]/40 transition-all duration-300 text-center group cursor-pointer"
                whileHover={{ y: -5 }}
                onClick={() => navigate(item.path)}
              >
                <div className="w-16 h-16 bg-[#768f00]/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-8 w-8 text-[#768f00]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-24"
      >
        <Container>
          <motion.div variants={fadeInUp} className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Still Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Our team is here to help. Contact us and we'll guide you to the right place.
            </p>
            <Button 
              onClick={() => navigate('/contactus')}
              className="bg-[#768f00] hover:bg-[#768f00]/90 text-white px-8 py-4 text-lg rounded-full"
            >
              Contact Support
              <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
            </Button>
          </motion.div>
        </Container>
      </motion.div>
    </div>
  );
}


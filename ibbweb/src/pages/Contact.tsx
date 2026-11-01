import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { 
  MapPin, 
  Phone, 
  Mail,
  Globe
} from 'lucide-react';
import ContactForm from '@/components/common/ContactForm';

// Animation variants
const fadeInUp = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};


export default function Contact() {

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-poppins relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16">
        <Container className='px-4'>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-[#768f00] bg-clip-text text-transparent mb-6">
                Get In Touch
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Ready to make an impact? We're here to help you create meaningful connections and drive positive change in your community.
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Get in Touch Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 bg-[oklch(0.473_0.137_46.201)]"
      >
        <Container className='px-4'>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <motion.div variants={fadeInUp} className="space-y-6 lg:space-y-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Contact Information</h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                  Get in touch with us for partnerships, event inquiries, or any questions you might have.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#768f00] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Address</h4>
                    <p className="text-gray-300 text-sm sm:text-base">
                      Victoria, Noble Center 7th Floor, Suite 702<br />
                      Dar es Salaam, Tanzania
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#768f00] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Phone</h4>
                    <p className="text-gray-300 text-sm sm:text-base">+255 743 111 183<br />
                    +255 748 111 183<br />
                    +255 784 242 486</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#768f00] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Email</h4>
                    <p className="text-gray-300 text-sm sm:text-base">info@impactadvisory.co.tz<br />
                    ibb@impactadvisory.co.tz</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <div className="relative z-10">
              <ContactForm 
                title="Send us a Message"
              />
            </div>
          </div>
        </Container>
      </motion.div>

      {/* Bottom CTA Section */}
      <section className="relative py-16">
        <Container>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50"
          >
            <Globe className="h-16 w-16 text-[#768f00] mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Make an Impact?
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Join our community of changemakers and be part of something bigger. 
              Together, we can create lasting positive change in Tanzania and beyond.
            </p>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}

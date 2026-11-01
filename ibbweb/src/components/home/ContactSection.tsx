import { motion } from 'framer-motion';
import { Container } from '../../common/Container';
import ContactForm from '@/components/common/ContactForm';
import { MapPin, Phone, Mail } from 'lucide-react';

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

interface ContactSectionProps {
  onContactSubmit: (formData: any) => Promise<void>;
}

const ContactSection = ({ onContactSubmit }: ContactSectionProps) => {
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in Touch</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions about the event? Want to partner with us? We'd love to hear from you.
          </p>
        </motion.div>
        
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
                  <p className="text-gray-300 text-sm sm:text-base">
                    {/* +255 743 111 183<br /> */}
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
                  <p className="text-gray-300 text-sm sm:text-base">ibb@impactadvisory.co.tz<br />
                  info@impactadvisory.co.tz</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={fadeInUp}>
            <ContactForm 
              onSubmit={onContactSubmit}
              title="Send us a Message"
            />
          </motion.div>
        </div>
      </Container>
    </motion.div>
  );
};

export default ContactSection;

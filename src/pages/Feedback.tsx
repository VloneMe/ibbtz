import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { 
  MessageSquare, 
  Heart,
  Star,
  TrendingUp
} from 'lucide-react';
import FeedbackForm from '@/components/common/FeedbackForm';

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

export default function Feedback() {
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
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#768f00] to-[#5a6f00] rounded-full flex items-center justify-center shadow-lg">
                  <MessageSquare className="h-10 w-10 text-white" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-[#768f00] bg-clip-text text-transparent mb-6">
                Share Your Feedback
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Your opinion matters to us. Help us improve by sharing your thoughts, experiences, and suggestions.
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Feedback Form Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 bg-[oklch(0.473_0.137_46.201)]"
      >
        <Container className='px-4'>
          <div className="max-w-3xl mx-auto">
            <FeedbackForm 
              title="We'd Love to Hear From You"
              description="Please fill out the form below to share your feedback. All submissions are reviewed and help us improve our services and events."
            />
          </div>
        </Container>
      </motion.div>

      {/* Why Feedback Matters Section */}
      <section className="relative py-16">
        <Container className='px-4'>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Why Your Feedback Matters
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Your insights help us create better experiences and drive positive change in our community.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              <motion.div 
                variants={fadeInUp}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-700/50 hover:border-[#768f00]/50 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#768f00] rounded-full flex items-center justify-center mb-4">
                  <Star className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Improve Quality</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Your feedback helps us identify areas for improvement and enhance the quality of our events and services.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-700/50 hover:border-[#768f00]/50 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#768f00] rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Better Experience</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  We use your suggestions to create more meaningful and enjoyable experiences for all participants.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-700/50 hover:border-[#768f00]/50 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#768f00] rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Drive Innovation</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Your ideas and perspectives inspire new initiatives and innovative solutions for our community.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Bottom CTA Section */}
      <section className="relative py-16">
        <Container>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50"
          >
            <MessageSquare className="h-16 w-16 text-[#768f00] mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">
              Your Voice Makes a Difference
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Every piece of feedback is valuable. Together, we can build a stronger, more impactful community 
              that creates lasting positive change.
            </p>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}


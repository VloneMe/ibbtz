import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  Compass,
  Heart,
  ArrowRight,
  Building2,
  BookOpen,
  Users2,
  Calendar,
  BarChart3,
  Network,
  Rocket,
  Trophy,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ibbV1 from '/src/assets/ibbV1.jpeg';

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

export default function About() {
  return (
    <div className="min-h-screen bg-[#012557]/55 text-white font-poppins">

      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative min-h-[50vh] flex items-center py-20 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#768f00]/10 via-transparent to-[#768f00]/5"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#768f00]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#768f00]/10 rounded-full blur-3xl"></div>
        
        <Container className='px-4'>
          <motion.div variants={fadeInUp} className="max-w-6xl space-y- text-center relative z-10">
            <div className="space-y-2 flex flex-col items-center justify-center">
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 bg-[#768f00]/20 px-4 py-2 rounded-full text-[#768f00] text-sm font-medium"
              >
                <Sparkles className="h-4 w-4" />
                Transforming Tanzania's Future
              </motion.div>

              {/* <span className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">About</span> */}
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                IBB - Impact Business Breakfast
              </h1>
              
              <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
                Catalyzing Tanzania's human capital and building a knowledge-driven economy for Vision 2050.
              </p>
            </div>

            {/* Key Stats */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
              {[
                { number: "14+", label: "Years of Impact" },
                { number: "50+", label: "Industry Leaders" },
                { number: "13+", label: "Events Hosted" },
                { number: "100+", label: "Professionals Connected" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#768f00] mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>

      {/* Our Story Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-24 relative overflow-hidden"
        style={{
          backgroundImage: `url(${ibbV1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/80"></div>
        <Container className="relative z-10 px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeInUp} className="space-y-8">
              <div>
                <h2 className="text-5xl font-bold text-white mb-8 drop-shadow-lg">Our Story</h2>
                <div className="w-20 h-1 bg-[#768f00] rounded-full mb-8"></div>
              </div>
              
              <div className="space-y-6 text-gray-200 bg-black/30 p-8 rounded-2xl backdrop-blur-sm">
                <p className="text-xl leading-relaxed">
                  Impact Advisory Africa was founded with a vision to transform Tanzania's economic landscape 
                  through strategic human capital development and knowledge-driven initiatives.
                </p>
                <p className="text-lg leading-relaxed">
                  Since our inception, we have been at the forefront of bringing together industry leaders, 
                  government officials, and entrepreneurs to address critical issues affecting Tanzania's 
                  economic development.
                </p>
                <p className="text-lg leading-relaxed">
                  Our flagship event, The Impact Business Breakfast, has become a premier platform for 
                  networking, knowledge sharing, and strategic collaboration across various sectors.
                </p>
              </div>

              <motion.div variants={fadeInUp} className="pt-8">
                <Link to="https://impactadvisory.co.tz/ibb">
                  <Button className="bg-[#768f00] hover:bg-[#768f00]/90 text-white px-8 py-4 text-lg rounded-full"
                    onClick={() => window.open('https://impactadvisory.co.tz/ibb', '_blank')}
                  >
                    Explore Our Events
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-8">
              <div className="bg-gradient-to-br from-[#768f00]/30 to-[#768f00]/10 p-8 rounded-2xl border border-[#768f00]/30 backdrop-blur-sm shadow-2xl">
                <h3 className="text-3xl font-bold text-white mb-8">Key Milestones</h3>
                <div className="space-y-6">
                  {[
                    { year: "2010", event: "Company Founded", icon: Building2 },
                    { year: "2019", event: "First Impact Business Breakfast", icon: Calendar },
                    { year: "2020", event: "Digital Transformation Initiative", icon: Rocket },
                    { year: "2024", event: "13th Edition of IBB", icon: Trophy }
                  ].map((milestone, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center gap-6 p-4 bg-black/20 rounded-xl hover:bg-black/30 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-16 h-16 bg-[#768f00] rounded-full flex items-center justify-center flex-shrink-0">
                        <milestone.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[#768f00] font-bold text-lg">{milestone.year}</div>
                        <div className="text-white">{milestone.event}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </motion.div>

      {/* Vision, Mission, Values Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-24 bg-[#012557]"
      >
        <Container className='px-4'>
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Our Foundation</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide our mission to transform Tanzania's economic landscape
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              variants={fadeInUp} 
              className="bg-gradient-to-br from-black/40 to-black/20 p-10 rounded-2xl border border-[#768f00]/20 hover:border-[#768f00]/40 transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#768f00] to-[#768f00]/80 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Compass className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Vision</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
              To become Pan Africa’s most impactful private-public platform for knowledge-based sector transformation..
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp} 
              className="bg-gradient-to-br from-black/40 to-black/20 p-10 rounded-2xl border border-[#768f00]/20 hover:border-[#768f00]/40 transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#768f00] to-[#768f00]/80 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Mission</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
              To convene leaders and drive knowledge-based growth by shaping agendas, strengthening investment readiness, and unleashing human capital and innovation, starting in Tanzania, scaling across Africa.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp} 
              className="bg-gradient-to-br from-black/40 to-black/20 p-10 rounded-2xl border border-[#768f00]/20 hover:border-[#768f00]/40 transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#768f00] to-[#768f00]/80 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Values</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Integrity, Innovation, Collaboration, and Commitment to Tanzania's sustainable economic growth and development.
              </p>
            </motion.div>
          </div>
        </Container>
      </motion.div>

      {/* Impact & Achievements Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-24"
      >
        <Container className='px-4'>
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Our Impact</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Driving change through strategic partnerships and knowledge sharing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users2, title: "Industry Leaders", description: "50+ professionals connected", color: "from-blue-500 to-blue-600" },
              { icon: BookOpen, title: "Knowledge Sharing", description: "13+ events and workshops", color: "from-green-500 to-green-600" },
              { icon: Network, title: "Strategic Partnerships", description: "20+ organizations engaged", color: "from-purple-500 to-purple-600" },
              { icon: BarChart3, title: "Economic Impact", description: "Tanzania's Vision 2050 progress", color: "from-orange-500 to-orange-600" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-gradient-to-br from-black/40 to-black/20 p-8 rounded-2xl border border-gray-800 hover:border-[#768f00]/40 transition-all duration-300 text-center group"
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.div>

      {/* Call to Action Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-24 bg-gradient-to-r from-[#768f00]/20 via-[#768f00]/10 to-[#768f00]/20"
      >
        <Container className='px-4'>
          <motion.div variants={fadeInUp} className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Join the Movement
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Be part of Tanzania's transformation. Connect with industry leaders, share knowledge, 
              and contribute to building a knowledge-driven economy for Vision 2050.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/ibb">
                <Button className="bg-[#768f00] hover:bg-[#768f00]/90 text-white px-8 py-4 text-lg rounded-full" hidden>
                  Attend Our Events
                  <Calendar className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contactus">
                <Button variant="outline" className="border-[#768f00] text-[#768f00] hover:bg-[#768f00] hover:text-white px-8 py-4 text-lg rounded-full">
                  Get In Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </motion.div>

    </div>
  );
}

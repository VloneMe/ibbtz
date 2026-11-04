import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Globe,
  Briefcase,
  GraduationCap,
  Heart,
  Users,
  Star,
  ArrowRight,
  Filter,
  Search,
  Trophy,
  Sparkles,
  Network
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageLoadingControl } from '@/components/common/withPageLoading';

// Event data interface
interface EventData {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  edition?: string;
  pricing?: {
    isFree: boolean;
    currency: string;
    regular: { price: number };
  };
}

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

export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventData[]>([]);
  const [___, setLoading] = useState(true);
  const [_, setError] = useState<string | null>(null);
  const { setLoadingWithMessage } = usePageLoadingControl();
  
  // Media API state
  const [media, setMedia] = useState<any[]>([]);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoadingWithMessage(true, 'Loading events...');
        
        const baseUrl = import.meta.env.VITE_BASE_API_URL;
        const apiToken = import.meta.env.VITE_API_TOKEN;
        
        if (!baseUrl || !apiToken) {
          throw new Error('API configuration missing. Please check environment variables.');
        }
        
        const response = await fetch(`${baseUrl}/events`, {
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Events API response:', data);
        
        // Handle different API response structures
        // Check if data is directly an array or wrapped in an object
        if (Array.isArray(data)) {
          setEvents(data);
        } else if (data.data && data.data.events && Array.isArray(data.data.events)) {
          setEvents(data.data.events);
        } else if (data.data && Array.isArray(data.data)) {
          setEvents(data.data);
        } else if (data.events && Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          console.warn('Unexpected API response structure:', data);
          setEvents([]);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        console.error('Error fetching events:', err);
        // Set empty array on error to prevent map errors
        setEvents([]);
      } finally {
        setLoading(false);
        setLoadingWithMessage(false);
      }
    };

    const fetchMediaData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BASE_API_URL;
        const apiToken = import.meta.env.VITE_API_TOKEN;
        
        if (!baseUrl || !apiToken) {
          console.warn('API configuration missing for media fetch');
          return;
        }
        
        const response = await fetch(`${baseUrl}/media`, {
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          console.warn(`Failed to fetch media: ${response.status}`);
          return;
        }
        
        const mediaData = await response.json();
        console.log('Media API response:', mediaData);
        
        // Handle different API response structures
        if (Array.isArray(mediaData)) {
          setMedia(mediaData);
        } else if (mediaData.data && mediaData.data.media && Array.isArray(mediaData.data.media)) {
          setMedia(mediaData.data.media);
        } else if (mediaData.data && Array.isArray(mediaData.data)) {
          setMedia(mediaData.data);
        } else if (mediaData.media && Array.isArray(mediaData.media)) {
          setMedia(mediaData.media);
        } else {
          console.warn('Unexpected media API response structure:', mediaData);
          setMedia([]);
        }
      } catch (error) {
        console.error('Error fetching media:', error);
        setMedia([]);
      }
    };

    fetchEvents();
    fetchMediaData();
  }, [setLoadingWithMessage]);

  // Helper function to get media URL
  const getMediaUrl = (mediaItem: any) => {
    const imgUrl = import.meta.env.VITE_IMG_URL;
    return imgUrl ? `${imgUrl}/${mediaItem.url}` : mediaItem.url;
  };

  // Get featured media (first image or specific featured image)
  const getFeaturedMedia = () => {
    if (media.length > 0) {
      return media[0];
    }
    return null;
  };

  // Get featured event (first event or a specific one)
  const featuredEvent = events.length > 0 ? events[0] : null;

  // Handle navigating to event detail page
  const handleViewEvent = (event: EventData) => {
    navigate(`/event/${event.id}`);
  };

  // Debug environment variables
  console.log('Environment variables:', {
    VITE_BASE_API_URL: import.meta.env.VITE_BASE_API_URL,
    VITE_API_TOKEN: import.meta.env.VITE_API_TOKEN ? 'Set' : 'Not set',
    VITE_IMG_URL: import.meta.env.VITE_IMG_URL
  });

  return (
    <div className="min-h-screen bg-[#012557]/55 text-white font-poppins">

      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#768f00]/10 via-transparent to-[#768f00]/5"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#768f00]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#768f00]/10 rounded-full blur-3xl"></div>
        
        <Container>
          <motion.div variants={fadeInUp} className="max-w-6xl space-y-12 text-center relative z-10">
            <div className="space-y-6">
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 bg-[#768f00]/20 px-4 py-2 rounded-full text-[#768f00] text-sm font-medium"
              >
                <Sparkles className="h-4 w-4" />
                Transformative Events
              </motion.div>
              
              <h1 className="text-6xl md:text-8xl font-bold leading-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Our Events
              </h1>
              
              <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
                Join us for transformative events that shape Tanzania's economic future.
              </p>
            </div>

            {/* Key Stats */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
              {[
                { number: "50+", label: "Events Hosted", icon: Calendar },
                { number: "500+", label: "Industry Leaders", icon: Users },
                { number: "1000+", label: "Professionals", icon: Network },
                { number: "14+", label: "Years of Impact", icon: Trophy }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-[#768f00]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-[#768f00]" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-[#768f00] mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>

      {/* Featured Event */}
      {featuredEvent && (
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-24"
        >
          <Container>
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Featured Event</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Don't miss our premier event bringing together Tanzania's most influential leaders
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-gradient-to-br from-[#768f00]/20 to-[#768f00]/5 p-2 rounded-3xl border border-[#768f00]/20"
            >
              <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <motion.div variants={fadeInUp} className="space-y-8">
                    <div className="flex gap-4 mb-6">
                      {featuredEvent.edition && (
                        <Badge className="bg-[#768f00] text-white px-6 py-3 font-bold text-sm rounded-full">
                          {featuredEvent.edition}
                        </Badge>
                      )}
                      <Badge className="bg-[#768f00]/20 text-[#768f00] border border-[#768f00]/30 px-6 py-3 text-sm rounded-full">
                        {featuredEvent.category}
                      </Badge>
                    </div>
                    
                    <h3 className="text-4xl font-bold text-white mb-6 leading-tight">{featuredEvent.title}</h3>
                    <p className="text-gray-200 text-lg leading-relaxed mb-8">{featuredEvent.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                      <div className="flex items-center gap-3 p-4 bg-black/20 rounded-xl">
                        <Calendar className="h-6 w-6 text-[#768f00]" />
                        <div>
                          <div className="text-white font-semibold">Date</div>
                          <div className="text-gray-300 text-sm">{featuredEvent.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-black/20 rounded-xl">
                        <Clock className="h-6 w-6 text-[#768f00]" />
                        <div>
                          <div className="text-white font-semibold">Time</div>
                          <div className="text-gray-300 text-sm">{featuredEvent.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-black/20 rounded-xl">
                        <MapPin className="h-6 w-6 text-[#768f00]" />
                        <div>
                          <div className="text-white font-semibold">Location</div>
                          <div className="text-gray-300 text-sm">{featuredEvent.location}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="bg-[#768f00] hover:bg-[#768f00]/90 text-white px-8 py-4 text-lg rounded-full flex-1">
                        REGISTER NOW
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-[#768f00] text-[#768f00] hover:bg-[#768f00] hover:text-white px-8 py-4 text-lg rounded-full"
                        onClick={() => handleViewEvent(featuredEvent)}
                      >
                        LEARN MORE
                      </Button>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={fadeInUp} className="relative">
                    <div className="relative overflow-hidden rounded-2xl">
                      <img 
                        src={getFeaturedMedia() ? getMediaUrl(getFeaturedMedia()) : `${import.meta.env.VITE_IMG_URL}/${featuredEvent.image}`} 
                        alt={featuredEvent.title} 
                        className="w-full h-96 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 text-white">
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">Featured Event</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Container>
        </motion.div>
      )}

      {/* All Events */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-24 bg-gradient-to-br from-[#768f00]/10 via-black/50 to-[#768f00]/5"
      >
        <Container>
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">All Events</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our upcoming and past events designed to drive economic growth and transformation.
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div variants={fadeInUp} className="mb-16">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:border-[#768f00] focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:border-[#768f00] hover:text-[#768f00]">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:border-[#768f00] hover:text-[#768f00]">
                  <Calendar className="h-4 w-4 mr-2" />
                  Upcoming
                </Button>
              </div>
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <motion.div 
                key={event.id} 
                variants={fadeInUp} 
                className="bg-gradient-to-br from-black/40 to-black/20 p-6 rounded-2xl border border-gray-800 hover:border-[#768f00]/40 transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <img 
                    src={getFeaturedMedia() ? getMediaUrl(getFeaturedMedia()) : `${import.meta.env.VITE_IMG_URL}/${event.image}`} 
                    alt={event.title} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#768f00] text-white px-3 py-1 text-xs font-bold">
                      {event.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
                      <Star className="h-4 w-4 text-yellow-400" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#768f00] transition-colors">{event.title}</h3>
                  <p className="text-gray-300 text-sm line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Calendar className="h-4 w-4 text-[#768f00]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Clock className="h-4 w-4 text-[#768f00]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <MapPin className="h-4 w-4 text-[#768f00]" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-[#768f00] hover:bg-[#768f00]/90 text-white rounded-full py-3 group-hover:scale-105 transition-transform duration-300"
                    onClick={() => handleViewEvent(event)}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.div>

      {/* Event Categories */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-24"
      >
        <Container>
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Event Categories</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore different types of transformative events we organize across various sectors.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Briefcase, title: "Business Leadership", desc: "Executive networking and strategic discussions", color: "from-blue-500 to-blue-600" },
              { icon: GraduationCap, title: "Education & Training", desc: "Professional development and skill building", color: "from-green-500 to-green-600" },
              { icon: Globe, title: "International", desc: "Global partnerships and cross-border collaboration", color: "from-purple-500 to-purple-600" },
              { icon: Heart, title: "Social Impact", desc: "Community development and social entrepreneurship", color: "from-pink-500 to-pink-600" }
            ].map((category, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp} 
                className="bg-gradient-to-br from-black/40 to-black/20 p-8 rounded-2xl border border-gray-800 hover:border-[#768f00]/40 transition-all duration-300 text-center group"
                whileHover={{ y: -5 }}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{category.title}</h3>
                <p className="text-gray-300 leading-relaxed">{category.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-24 bg-gradient-to-br from-[#768f00]/10 via-black/50 to-[#768f00]/5"
      >
        <Container>
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">What People Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear from industry leaders and professionals who have attended our events
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Mwalimu",
                title: "CEO, Tanzania Investment Bank",
                content: "The Impact Business Breakfast has been instrumental in connecting industry leaders and driving meaningful conversations about Tanzania's economic future.",
                rating: 5
              },
              {
                name: "John Mwangi",
                title: "Managing Director, Tech Solutions Ltd",
                content: "These events provide unparalleled networking opportunities and insights that have directly contributed to our company's growth strategy.",
                rating: 5
              },
              {
                name: "Fatma Hassan",
                title: "Director, Women in Business",
                content: "The knowledge sharing and collaborative environment at Impact Advisory events has been transformative for our organization's development.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-gradient-to-br from-black/40 to-black/20 p-8 rounded-2xl border border-gray-800 hover:border-[#768f00]/40 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="text-white font-bold text-lg">{testimonial.name}</div>
                  <div className="text-[#768f00] text-sm">{testimonial.title}</div>
                </div>
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
        <Container>
          <motion.div variants={fadeInUp} className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Ready to Transform Tanzania?
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Join our community of industry leaders, entrepreneurs, and professionals working together 
              to build a knowledge-driven economy for Vision 2050.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button className="bg-[#768f00] hover:bg-[#768f00]/90 text-white px-8 py-4 text-lg rounded-full">
                Register for Next Event
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-[#768f00] text-[#768f00] hover:bg-[#768f00] hover:text-white px-8 py-4 text-lg rounded-full">
                Become a Partner
                <Network className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </Container>
      </motion.div>

    </div>
  );
}


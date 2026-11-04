import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowLeft,
  Star,
  Users,
  Share2,
  Heart,
  Bookmark,
  Globe,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventData | null>(null);
  const [___, setLoading] = useState(true);
  const [_, setError] = useState<string | null>(null);
  const [media, setMedia] = useState<any[]>([]);
  const { setLoadingWithMessage } = usePageLoadingControl();

  // Fetch event by ID
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoadingWithMessage(true, 'Loading event details...');
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/events/${id}`, {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }
        
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching event:', err);
      } finally {
        setLoading(false);
        setLoadingWithMessage(false);
      }
    };

    const fetchMedia = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BASE_API_URL || '{{url}}';
        const apiToken = import.meta.env.VITE_API_TOKEN;
        
        const response = await fetch(`${baseUrl}/media`, {
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch media: ${response.status}`);
        }
        
        const mediaData = await response.json();
        setMedia(mediaData);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    if (id) {
      fetchEvent();
      fetchMedia();
    }
  }, [id, setLoadingWithMessage]);

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

  // Remove the old loading state since we're using the global page loader


  if (!event) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black/80 text-white font-poppins">
      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${getFeaturedMedia() ? getMediaUrl(getFeaturedMedia()) : `${import.meta.env.VITE_IMG_URL}/${event.image}`})`
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <Container className="relative z-10">
          <motion.div variants={fadeInUp} className="max-w-4xl space-y-8">
            <div className="flex items-center gap-4 mb-6">
              <Button 
                variant="outline"
                className="border-gray-600 text-gray-300 hover:border-[#768f00] hover:text-[#768f00]"
                onClick={() => navigate('/ibb')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Button>
            </div>
            
            <div className="flex gap-4 mb-6">
              {event.edition && (
                <Badge className="bg-[#768f00] text-white px-4 py-2 font-bold text-sm rounded-full">
                  {event.edition}
                </Badge>
              )}
              <Badge className="bg-[#768f00]/20 text-[#768f00] border border-[#768f00]/30 px-4 py-2 text-sm rounded-full">
                {event.category}
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              {event.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed">
              {event.description}
            </p>

            <div className="flex flex-wrap gap-6 text-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-[#768f00]" />
                <span className="text-white">{event.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-[#768f00]" />
                <span className="text-white">{event.time}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-[#768f00]" />
                <span className="text-white">{event.location}</span>
              </div>
            </div>
          </motion.div>
        </Container>
      </motion.div>

      {/* Event Details Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-24"
      >
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <motion.div variants={fadeInUp}>
                <h2 className="text-4xl font-bold text-white mb-8">About This Event</h2>
                <div className="prose prose-lg text-gray-300 leading-relaxed">
                  <p>
                    Join us for an exclusive gathering of Tanzania's most influential business leaders, 
                    entrepreneurs, and industry experts. This event promises to deliver valuable insights, 
                    networking opportunities, and strategic discussions that will shape the future of 
                    Tanzania's economy.
                  </p>
                  <p>
                    Our carefully curated program includes keynote presentations, panel discussions, 
                    and interactive sessions designed to foster meaningful connections and drive 
                    economic growth across various sectors.
                  </p>
                  <p>
                    Don't miss this opportunity to be part of Tanzania's transformation journey and 
                    contribute to building a knowledge-driven economy for Vision 2050.
                  </p>
                </div>
              </motion.div>

              {/* Event Features */}
              <motion.div variants={fadeInUp}>
                <h3 className="text-3xl font-bold text-white mb-8">What to Expect</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    { icon: Users, title: "Networking", desc: "Connect with industry leaders and professionals" },
                    { icon: Star, title: "Keynote Speakers", desc: "Insights from top business leaders" },
                    { icon: Globe, title: "Panel Discussions", desc: "Interactive sessions on current topics" },
                    { icon: Heart, title: "Community Building", desc: "Join Tanzania's business community" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-6 bg-black/20 rounded-xl">
                      <div className="w-12 h-12 bg-[#768f00] rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                        <p className="text-gray-300">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Registration Card */}
              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-[#768f00]/20 to-[#768f00]/5 p-8 rounded-2xl border border-[#768f00]/20">
                <h3 className="text-2xl font-bold text-white mb-6">Register Now</h3>
                
                {event.pricing && (
                  <div className="mb-6">
                    <div className="text-sm text-gray-400 mb-2">Price</div>
                    {event.pricing.isFree ? (
                      <div className="text-3xl font-bold text-[#768f00]">FREE</div>
                    ) : (
                      <div className="text-3xl font-bold text-[#768f00]">
                        {event.pricing.currency} {event.pricing.regular.price}
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-4">
                  <Button className="w-full bg-[#768f00] hover:bg-[#768f00]/90 text-white py-4 text-lg rounded-full">
                    REGISTER NOW
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 border-[#768f00] text-[#768f00] hover:bg-[#768f00] hover:text-white">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" className="flex-1 border-[#768f00] text-[#768f00] hover:bg-[#768f00] hover:text-white">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Event Info Card */}
              <motion.div variants={fadeInUp} className="bg-black/20 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-6">Event Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-[#768f00]" />
                    <div>
                      <div className="text-white font-semibold">Date</div>
                      <div className="text-gray-300 text-sm">{event.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-[#768f00]" />
                    <div>
                      <div className="text-white font-semibold">Time</div>
                      <div className="text-gray-300 text-sm">{event.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#768f00]" />
                    <div>
                      <div className="text-white font-semibold">Location</div>
                      <div className="text-gray-300 text-sm">{event.location}</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Card */}
              <motion.div variants={fadeInUp} className="bg-black/20 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-6">Need Help?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#768f00]" />
                    <span className="text-gray-300">+255 123 456 789</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#768f00]" />
                    <span className="text-gray-300">info@impactadvisory.co.tz</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </motion.div>
    </div>
  );
}


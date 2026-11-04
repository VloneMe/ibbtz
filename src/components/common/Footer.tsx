import { motion } from 'framer-motion';
import { Container } from '../../common/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin,
  Phone,
  Mail,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Bell,
  CheckCircle,
  // AlertCircle,
  Loader2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useState } from 'react';
import { newsletterApi, type NewsletterSubscriptionPayload } from '@/services/newsletterApi';
import { toast } from 'sonner';

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

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscriptionState, setSubscriptionState] = useState({
    isSubscribing: false,
    isSubscribed: false,
  });

  const handleNewsletterSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Invalid Email", {
        description: "Please enter a valid email address",
      });
      return;
    }

    setSubscriptionState({ 
      isSubscribing: true, 
      isSubscribed: false
    });

    try {
      const newsletterPayload: NewsletterSubscriptionPayload = {
        email: email.trim()
      };

      const response = await newsletterApi.subscribeToNewsletter(newsletterPayload);

      if (response.success) {
        setSubscriptionState({ 
          isSubscribing: false, 
          isSubscribed: true
        });
        setEmail('');
        toast.success("Successfully Subscribed!", {
          description: "Thank you for subscribing to our newsletter. You'll receive updates about our events.",
        });
      } else {
        // Use exact error message from API response
        const errorMessage = response.error || response.message || 'Failed to subscribe to newsletter';
        
        // Check if user is already subscribed
        if (response.code === 'VALIDATION_ERROR' && response.details?.currentStatus === 'subscribed') {
          setSubscriptionState({ 
            isSubscribing: false, 
            isSubscribed: true
          });
          
          toast.success("Already Subscribed!", {
            description: response.details.suggestion || 'You are already subscribed to our newsletter',
          });
          return;
        }
        
        setSubscriptionState({ 
          isSubscribing: false, 
          isSubscribed: false
        });
        
        toast.warning("Subscription Issue", {
          description: errorMessage,
        });
      }
    } catch (error: any) {
      // Use exact error message from axios error response
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Failed to subscribe to newsletter. Please try again.';
      
      setSubscriptionState({ 
        isSubscribing: false, 
        isSubscribed: false
      });
      
      toast.error("Subscription Failed", {
        description: errorMessage,
      });
    }
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="lg:py-20 py-10 bg-gradient-to-r from-[oklch(0.473_0.137_46.201)] lg:via-[#012557]/55 to-[#012557]"
    >
      <Container className='px-4'>
        <div className="grid md:grid-cols-5 gap-8">
          <motion.div variants={fadeInUp}>
            <div className="flex items-center gap-3 mb-6">
              <Logo size="lg" />
            </div>
            <p className="text-gray-300 mb-6">
              Catalyzing Tanzania's human capital and building a knowledge-driven economy for Vision 2050.
            </p>
            <div className="mb-4">
              <a 
                href="https://impactadvisory.co.tz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#768f00] hover:text-white transition-colors duration-300 font-semibold"
              >
                Visit Impact Advisory Tanzania →
              </a>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" size="sm" 
                      className="border-white text-gray-700 hover:bg-white hover:text-black"
                      onClick={() => window.open('https://www.youtube.com/@impactadvisory9056')}
                      rel="noopener noreferrer"
              >
                <Youtube className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" 
                      className="border-white text-gray-700 hover:bg-white hover:text-black"
                      onClick={() => window.open('https://www.linkedin.com/in/impact-advisory-africa-972b31232/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app')}
                      rel="noopener noreferrer"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" 
                      className="border-white text-gray-700 hover:bg-white hover:text-black"
                      onClick={() => window.open('https://www.linkedin.com/in/impact-advisory-africa-972b31232/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app')}
                      rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" 
                      className="border-white text-gray-700 hover:bg-white hover:text-black"
                      onClick={() => window.open('https://www.instagram.com/impactadvisoryafrica/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D#')}
                      rel="noopener noreferrer"
              >
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#768f00]" />
                <span>Dar es Salaam, Tanzania</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[#768f00]" />
                <div className="flex flex-col">
                    {/* <span>+255 743 111 183</span> */}
                    <span>+255 748 111 183</span>
                    <span>+255 784 242 486</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[#768f00]" />
                <div className="flex flex-col">
                    <span>info@impactadvisory.co.tz</span>
                    <span>ibb@impactadvisory.co.tz</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <div className="space-y-3">
              <Link to="/" className="block text-gray-300 hover:text-[#768f00] transition-colors">Home</Link>
              <Link to="/aboutus" className="block text-gray-300 hover:text-[#768f00] transition-colors">About Us</Link>
              {/* <Link to="/ibb" className="block text-gray-300 hover:text-[#768f00] transition-colors">Events</Link>
              <Link to="/gallery" className="block text-gray-300 hover:text-[#768f00] transition-colors">Gallery</Link> */}
              <Link to="/contactus" className="block text-gray-300 hover:text-[#768f00] transition-colors">Contact</Link>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="text-xl font-bold text-white mb-6">Related Links</h3>
            <div className="space-y-3">
              <a href="https://impactadvisory.co.tz" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-[#768f00] transition-colors">
                Impact Advisory Africa
              </a>
            </div>
            <Separator className='bg-gray-300 my-2' />
            <div className="space-y-3">
              <a href="https://www.impactbusinessaward.com" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-[#768f00] transition-colors">
                IBA - Impact Business Awards
              </a>
            </div>
            <Separator className='bg-gray-300 my-2' />
            <div className="space-y-3">
              <a href="https://impactadvisory.co.tz/csr" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-[#768f00] transition-colors">
                CSR - Corporate Social Responsibility
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#768f00]" />
              Newsletter
            </h3>
            <p className="text-gray-300 mb-4 text-sm">
              Stay updated with our latest events and announcements.
            </p>
            
            {subscriptionState.isSubscribed ? (
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <p className="text-green-400 font-semibold">Subscribed!</p>
                </div>
                <p className="text-green-300 text-sm">
                  Thank you for subscribing to our newsletter.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubscription} className="space-y-3">
                <div>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#768f00]"
                    disabled={subscriptionState.isSubscribing}
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={subscriptionState.isSubscribing}
                  className="w-full bg-[#768f00] hover:bg-[#768f00]/80 text-white"
                >
                  {subscriptionState.isSubscribing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Subscribe
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
        
        <div className="border-t border-red-500/20 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Impact Business Breakfast. All rights reserved.
          </p>
        </div>
      </Container>
    </motion.div>
  );
};

export default Footer;

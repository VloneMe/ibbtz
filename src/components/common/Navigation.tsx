import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

interface NavigationProps {
  onRegisterClick?: () => void;
}

const Navigation = (_props: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 h-[6rem] z-50 bg-[#012557]/65 backdrop-blur-sm border-b border-[oklch(0.473_0.137_46.201)]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <Logo
              // size="lg"
              className='max-w-[10rem] w-full'
            />
          </Link>
          
          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link to="/" className="text-white hover:text-[#768f00] transition-colors">HOME</Link>
              <Link to="/aboutus" className="text-white hover:text-[#768f00] transition-colors">ABOUT</Link>
              {/* <Link to="/ibb" className="text-white hover:text-[#768f00] transition-colors">EVENTS</Link> */}
              {/* <Link to="/gallery" className="text-white hover:text-[#768f00] transition-colors">GALLERY</Link> */}
              <Link to="/contactus" className="text-white hover:text-[#768f00] transition-colors">CONTACT</Link>
              <a 
                href="https://impactadvisory.co.tz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#768f00] hover:text-white transition-colors border-l-2 border-[#768f00] pl-4"
              >
                IMPACT ADVISORY
              </a>
            </nav>
            
            <Link to="/feedback">
              <Button 
                className="bg-[oklch(0.473_0.137_46.201)] hover:bg-[oklch(0.4_0.15_46.201)] text-white px-6 py-2"
              >
                FEEDBACK
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden border-t border-[oklch(0.473_0.137_46.201)]/20 py-4 bg-[#012557]/95 backdrop-blur-md relative z-50 px-4"
            >
              <nav className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className="text-white hover:text-[#768f00] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link 
                  to="/aboutus" 
                  className="text-white hover:text-[#768f00] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ABOUT
                </Link>
                <Link hidden={true}
                  to="/ibb" 
                  className="text-white hover:text-[#768f00] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  EVENTS
                </Link>
                <Link hidden={true}
                  to="/gallery" 
                  className="text-white hover:text-[#768f00] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  GALLERY
                </Link>
                <Link 
                  to="/contactus" 
                  className="text-white hover:text-[#768f00] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  CONTACT
                </Link>
                <a 
                  href="https://impactadvisory.co.tz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#768f00] hover:text-white transition-colors py-2 border-l-2 border-[#768f00] pl-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  IMPACT ADVISORY
                </a>
                <Link 
                  to="/feedback"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full mt-4"
                >
                  <Button 
                    className="bg-[oklch(0.473_0.137_46.201)] hover:bg-[oklch(0.4_0.15_46.201)] text-white px-6 py-2 w-full"
                  >
                    FEEDBACK
                  </Button>
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Navigation;

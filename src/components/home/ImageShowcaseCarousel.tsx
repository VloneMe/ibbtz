import { motion } from 'framer-motion';
import { Container } from '../../common/Container';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

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

// Image Showcase Carousel Component (3-column with center focus)
const ImageShowcaseCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000); // Change every 4 seconds
    
    return () => clearInterval(timer);
  }, [currentIndex, isPaused, images.length]);

  // Get previous, current, and next indices
  const getPrevIndex = () => (currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  const getNextIndex = () => (currentIndex === images.length - 1 ? 0 : currentIndex + 1);

  const handlePrev = () => {
    setCurrentIndex(getPrevIndex());
  };

  const handleNext = () => {
    setCurrentIndex(getNextIndex());
  };

  return (
    <section className="py-20 bg-[#012557] relative overflow-hidden">
      <Container className='px-4'>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Section Title */}
          <motion.div variants={fadeInUp} className="text-center mb-12" hidden={true}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Event Gallery
            </h2>
            <p className="text-xl text-gray-400">
              Experience the atmosphere of our previous events
            </p>
          </motion.div>

          {/* 3-Column Carousel Grid */}
          <motion.div
            variants={fadeInUp}
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Desktop View: 3 Columns with Center Focus */}
            <div className="hidden lg:grid lg:grid-cols-[0.8fr_2.5fr_0.8fr] gap-6 items-center">
              {/* Left Image (Previous) */}
              <motion.div
                key={`left-${getPrevIndex()}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 0.5, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-fit rounded-lg overflow-hidden cursor-pointer group"
                onClick={handlePrev}
              >
                <img
                  src={images[getPrevIndex()]}
                  alt={`Gallery image ${getPrevIndex() + 1}`}
                  className="w-full h-fit object-cover transform scale-90 group-hover:scale-95 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronLeft className="h-6 w-6 text-white" />
                  </button>
                </div>
              </motion.div>

              {/* Center Image (Active) */}
              <motion.div
                key={`center-${currentIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-fit rounded-lg overflow-hidden shadow-2xl ring-4 ring-[#768f00] z-10 max-w-full"
              >
                <img
                  src={images[currentIndex]}
                  alt={`Gallery image ${currentIndex + 1}`}
                  className="w-full h-fit object-contain rounded-lg max-w-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-lg font-bold">
                        Impact Business Breakfast
                      </p>
                      <p className="text-gray-300 text-sm">
                        Image {currentIndex + 1} of {images.length}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      aria-label={isPaused ? "Play" : "Pause"}
                    >
                      {isPaused ? <Play className="h-5 w-5 text-white" /> : <Pause className="h-5 w-5 text-white" />}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Right Image (Next) */}
              <motion.div
                key={`right-${getNextIndex()}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 0.5, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-fit rounded-lg overflow-hidden cursor-pointer group"
                onClick={handleNext}
              >
                <img
                  src={images[getNextIndex()]}
                  alt={`Gallery image ${getNextIndex() + 1}`}
                  className="w-full h-full object-cover transform scale-90 group-hover:scale-95 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="h-6 w-6 text-white" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Mobile/Tablet View: Single Image Carousel */}
            <div className="lg:hidden relative">
              <div className="relative h-[70vh] min-h-fit rounded-lg overflow-hidden">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`Gallery image ${currentIndex + 1}`}
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                  <p className="text-white font-bold text-lg">Impact Business Breakfast</p>
                  <p className="text-gray-300 text-sm">Image {currentIndex + 1} of {images.length}</p>
                  
                  {/* Mobile Play/Pause Button */}
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="mt-3 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    aria-label={isPaused ? "Play" : "Pause"}
                  >
                    {isPaused ? <Play className="h-5 w-5 text-white" /> : <Pause className="h-5 w-5 text-white" />}
                  </button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-20"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-20"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-[#768f00] w-8'
                      : 'bg-gray-600 hover:bg-gray-500 w-2'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Background Decoration */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-[#768f00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-[oklch(0.473_0.137_46.201)]/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default ImageShowcaseCarousel;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import impactLogo from '/src/assets/logo/IBB+ NEW LOGO-1.png';

interface PageLoaderProps {
  isLoading: boolean;
  message?: string;
  fullScreen?: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ 
  isLoading, 
  message = 'Loading...', 
  fullScreen = true 
}) => {
  const containerClass = fullScreen 
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm'
    : 'flex items-center justify-center min-h-[50vh]';

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={containerClass}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              duration: 0.5 
            }}
            className="text-center"
          >
            {/* Spinning Logo */}
            <div className="relative w-[10rem] lg:w-[17rem] h-[5rem] lg:h-[7rem] mx-auto mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute inset-0 border-4 border-[#768f00] border-t-transparent rounded-lg"
              />
              <img 
                src={impactLogo}
                alt="Loading..."
                className="w-full h-full object-contain p-2"
              />
            </div>

            {/* Loading Message */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {message}
              </h3>
              
              {/* Animated Dots */}
              <div className="flex justify-center space-x-1">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-2 h-2 bg-[#768f00] rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-48 h-1 bg-gray-700 rounded-full mx-auto mt-6 overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#768f00] to-[#9bb300] rounded-full"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;

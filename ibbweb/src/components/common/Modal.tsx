import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { ReactNode } from "react";   

interface ModalProps {  
  children: ReactNode;  
  className?: string;  
  open: boolean;  
  onOpenChange: (open: boolean) => void;  
}  

export function Modal({ children, className = "", open, onOpenChange }: ModalProps) {  
  if (!open) return null;

  return (  
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={() => onOpenChange(false)}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`w-full max-h-screen overflow-y-auto mx-auto rounded-lg bg-white relative ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        {children}  
      </motion.div>  
    </motion.div>  
  );  
}
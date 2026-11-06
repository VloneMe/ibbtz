import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface RevealProps { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'section' | 'li'; }

/** Subtle fade-up on first view. Keeps motion restrained and consistent across the site. */
const Reveal = ({ children, className = '', delay = 0 }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default Reveal;

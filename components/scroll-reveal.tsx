'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
}

export default function ScrollReveal({ children, className = '', delay = 0, variants }: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants || defaultVariants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

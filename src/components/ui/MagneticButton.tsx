'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function MagneticButton({ children, className }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center - max 20px movement
    const moveX = (clientX - centerX) * 0.3;
    const moveY = (clientY - centerY) * 0.3;
    
    x.set(moveX);
    y.set(moveY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      className={cn(
        'relative px-10 py-4 rounded-pill border border-caramel/40 text-cream font-body text-micro uppercase tracking-spread transition-colors overflow-hidden group',
        className
      )}
    >
      <span className="relative z-10 transition-colors duration-500 group-hover:text-bg-primary">
        {children}
      </span>
      <div className="absolute inset-0 bg-caramel translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-smooth" />
    </motion.button>
  );
}

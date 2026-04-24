'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // default true to avoid flash on mobile

  useEffect(() => {
    // Check if device supports hover
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsTouchDevice(false);
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'img' || target.closest('img')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    if (!isTouchDevice) {
      window.addEventListener('mousemove', updateMousePosition);
      window.addEventListener('mouseover', handleMouseOver);
    }

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center rounded-full bg-accent text-white font-sans text-[10px] uppercase tracking-widest"
      style={{
        mixBlendMode: 'difference',
      }}
      animate={{
        x: mousePosition.x - (isHovering ? 24 : 4),
        y: mousePosition.y - (isHovering ? 24 : 4),
        width: isHovering ? 48 : 8,
        height: isHovering ? 48 : 8,
        opacity: 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.5,
      }}
    >
      {isHovering && <span className="absolute mix-blend-normal opacity-90">View</span>}
    </motion.div>
  );
}

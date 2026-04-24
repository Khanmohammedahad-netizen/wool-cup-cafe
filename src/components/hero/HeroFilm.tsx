'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroVideo } from './HeroVideo';
import { cinematic } from '@/lib/motion';

export function HeroFilm() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-bg-hero"
      aria-label="Hero"
    >
      {/* Video layer with parallax */}
      <motion.div
        style={{ y: videoY, scale: videoScale }}
        className="absolute inset-0"
      >
        <HeroVideo />
      </motion.div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.25) 0%, rgba(247,247,245,0.85) 80%)',
        }}
      />

      {/* Bottom gradient transition to ivory */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, var(--color-bg-primary) 100%)'
        }}
      />

      {/* Text content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: cinematic }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="text-eyebrow text-mute">SPECIALTY COFFEE</span>
          <span className="w-4 h-px bg-rule"></span>
          <span className="text-eyebrow text-mute">HYDERABAD</span>
        </motion.div>

        {/* Hero title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: cinematic }}
          className="font-serif font-medium text-display-xl text-ink"
        >
          Coffee, quieted.
        </motion.h1>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-12 flex flex-col items-center gap-3"
        >
          <span className="text-eyebrow text-mute text-[10px]">
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-brew to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

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
      className="relative h-screen w-full overflow-hidden bg-bg-dark"
      aria-label="Hero"
    >
      {/* Video layer with parallax */}
      <motion.div
        style={{ y: videoY, scale: videoScale }}
        className="absolute inset-0"
      >
        <HeroVideo />
      </motion.div>

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Bottom gradient transition to espresso */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[240px] pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,10,10,0) 0%, var(--color-bg-dark) 100%)'
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
          <span className="text-eyebrow text-gold tracking-[0.4em]">SPECIALTY COFFEE</span>
          <span className="w-4 h-px bg-gold/50"></span>
          <span className="text-eyebrow text-gold tracking-[0.4em]">HYDERABAD</span>
        </motion.div>

        {/* Hero title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: cinematic }}
          className="font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-[1.1] text-text-light"
        >
          Coffee, quieted.
        </motion.h1>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-12 flex flex-col items-center gap-4"
        >
          <span className="text-eyebrow text-gold text-[10px] tracking-[0.4em]">
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-gold"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

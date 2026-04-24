'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const IMAGES = [
  { src: '/images/woolcup/interior-01.jpg', alt: 'Wool Cup café interior, Film Nagar' },
  { src: '/images/woolcup/interior-02.jpg', alt: 'Wool Cup seating area' },
  { src: '/images/woolcup/interior-04.jpg', alt: 'Wool Cup ambience, Hyderabad' },
  { src: '/images/woolcup/interior-06.jpg', alt: 'Luxury seating at Wool Cup' },
  { src: '/images/woolcup/interior-08.jpg', alt: 'Wool Cup café coffee bar' },
  { src: '/images/woolcup/interior-10.jpg', alt: 'Wool Cup entrance and signage' },
];

export function Ambience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <section 
      id="ambience"
      ref={containerRef} 
      className="py-section overflow-hidden bg-bg-primary"
      aria-label="Cafe Ambience"
    >
      <motion.div style={{ y }} className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="block font-sans font-medium text-[11px] tracking-[0.22em] text-mute uppercase mb-4"
          >
            AMBIENCE
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-display-xl text-ink"
          >
            The Space.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-accent italic text-[18px] text-mute mt-4"
          >
            Designed for slow mornings and quiet conversations.
          </motion.p>
        </div>

        {/* CSS Grid Masonry Collage */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-[4px] md:gap-[6px] auto-rows-[200px] md:auto-rows-[300px]">
          {IMAGES.map((img, i) => {
            let spanClass = '';
            // Desktop:
            // Image 1: spans col 1, row 1-2 (TALL)
            // Image 2: col 2, row 1
            // Image 3: col 3, row 1
            // Image 4: col 2, row 2
            // Image 5: col 3, row 2
            // Image 6: spans col 1-2, row 3 (WIDE)
            if (i === 0) spanClass = 'col-span-1 row-span-2'; // Tall
            else if (i === 1) spanClass = 'col-span-1 row-span-1';
            else if (i === 2) spanClass = 'col-span-1 row-span-1 hidden md:block'; // Hide 3rd on mobile to keep balance
            else if (i === 3) spanClass = 'col-span-1 row-span-1';
            else if (i === 4) spanClass = 'col-span-1 row-span-1';
            else if (i === 5) spanClass = 'col-span-2 md:col-span-2 row-span-1'; // Wide

            if (!spanClass) spanClass = 'col-span-1 row-span-1';

            return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.1, once: true }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`relative overflow-hidden bg-cream ${spanClass} group`}
              >
                {/* Grain Filter */}
                <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-[0.15] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-all duration-[600ms] ease-out group-hover:scale-[1.03] group-hover:brightness-105"
                  loading="lazy"
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

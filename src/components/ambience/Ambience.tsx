'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const IMAGES = [
  { src: '/images/new/exterior-wide.jpg', alt: 'Wool Cup café exterior' },
  { src: '/images/new/interior-sofa.jpg', alt: 'Cozy interior seating' },
  { src: '/images/new/interior-hand-chairs.jpg', alt: 'Unique hand-shaped chairs' },
  { src: '/images/new/dessert-case.jpg', alt: 'Fresh dessert display' },
  { src: '/images/new/interior-dining.jpg', alt: 'Elegant dining area' },
  { src: '/images/new/interior-wide-cloud.jpg', alt: 'Atmospheric cloud lighting' },
];

export function Ambience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section 
      id="ambience"
      ref={containerRef} 
      className="py-section overflow-hidden bg-bg-dark"
      aria-label="Cafe Ambience"
    >
      <motion.div style={{ y }} className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="block font-sans font-medium text-[11px] tracking-[0.4em] text-gold uppercase mb-6"
          >
            THE SPACE
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-medium text-display-xl text-text-light"
          >
            Ambience.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif italic text-[20px] text-text-muted mt-6"
          >
            Designed for slow mornings and quiet conversations.
          </motion.p>
        </div>

        {/* CSS Grid Masonry Collage */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[350px]">
          {IMAGES.map((img, i) => {
            let spanClass = '';
            if (i === 0) spanClass = 'col-span-1 row-span-2'; // Tall
            else if (i === 1) spanClass = 'col-span-1 row-span-1';
            else if (i === 2) spanClass = 'col-span-1 row-span-1 hidden md:block';
            else if (i === 3) spanClass = 'col-span-1 row-span-1';
            else if (i === 4) spanClass = 'col-span-1 row-span-1';
            else if (i === 5) spanClass = 'col-span-2 md:col-span-2 row-span-1'; // Wide

            if (!spanClass) spanClass = 'col-span-1 row-span-1';

            return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ amount: 0.1, once: true }}
                transition={{ duration: 1.2, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative overflow-hidden rounded-lg bg-bg-footer ${spanClass} group shadow-lg`}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-all duration-[800ms] ease-out group-hover:scale-[1.05] group-hover:brightness-110"
                  loading="lazy"
                />
                {/* Subtle vignette on each image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}


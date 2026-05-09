'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const IMAGES = [
  { src: '/images/new/exterior-wide.jpg', alt: 'Wool Cup café exterior' },
  { src: '/images/new/interior-sofa.jpg', alt: 'Cozy interior seating' },
  { src: '/images/new/interior-hand-chairs.jpg', alt: 'Unique hand-shaped chairs' },
  { src: '/images/new/dessert-case.jpg', alt: 'Fresh dessert display' },
  { src: '/images/new/interior-dining.jpg', alt: 'Elegant dining area' },
  { src: '/images/new/interior-wide-cloud.jpg', alt: 'Atmospheric cloud lighting' },
];

export function Ambience() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const handleScroll = () => {
      const progress = el.scrollLeft / (el.scrollWidth - el.clientWidth);
      setScrollProgress(progress || 0);
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="ambience"
      className="py-24 bg-bg-secondary overflow-hidden"
      aria-label="Cafe Ambience"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-[300] text-4xl md:text-[56px] text-text-primary text-center"
        >
          The Space.
        </motion.h2>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 px-[8vw] overflow-x-auto scrollbar-hide scroll-snap-x mandatory pb-12 cursor-grab active:cursor-grabbing"
      >
        {IMAGES.map((img, i) => (
          <div
            key={i}
            className="min-w-[85vw] md:min-w-[45vw] aspect-[4/3] rounded-2xl overflow-hidden scroll-snap-start relative group"
          >
            <motion.img
              initial={{ scale: 1.1, opacity: 0.3 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <div className="relative w-[200px] h-[2px] bg-border">
          <motion.div
            className="absolute top-0 left-0 h-full bg-cream"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}

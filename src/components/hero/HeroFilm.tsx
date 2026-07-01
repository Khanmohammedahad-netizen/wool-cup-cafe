'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { HeroVideo } from './HeroVideo';

export function HeroFilm() {
  const arrowRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!arrowRef.current) return;
    const tween = gsap.to(arrowRef.current, {
      y: 6,
      duration: 1.5,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });
    return () => { tween.kill(); };
  }, []);

  return (
    <section className="relative w-full flex flex-col">
      {/* Video + text overlay share this relative container */}
      <div className="relative w-full aspect-[9/16] md:aspect-video overflow-hidden">
        <HeroVideo />

        {/* Text Overlay — inside the video container */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 z-10">
          <div className="max-w-[1100px] mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="block text-label text-white/70 mb-2 md:mb-4"
            >
              Specialty Coffee · Hyderabad
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-white text-4xl md:text-5xl max-w-[850px]"
            >
              Where every cup is a quiet ritual
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Scroll Cue — below the video */}
      <div className="flex flex-col items-center justify-center pt-8 pb-12">
        <div className="text-text-soft">
          <svg
            ref={arrowRef}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        <span className="text-label font-ui uppercase tracking-widest mt-2">SCROLL</span>
      </div>
    </section>
  );
}

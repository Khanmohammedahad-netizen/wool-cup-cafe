'use client';

import { useEffect, useRef } from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export function WoolcupHero() {
  const lenis = useLenis(undefined);
  const arrowRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    lenis?.start();
  }, [lenis]);

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
    <section className="relative w-full min-h-[100dvh] flex flex-col">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        className="absolute inset-0 w-full h-full object-cover brightness-[0.75]"
        src="/hero.mp4"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(18,13,8,0.80) 0%, transparent 60%)' }}
      />

      {/* Text overlay */}
      <div className="relative z-10 flex flex-col justify-end flex-1 p-6 md:p-16 pb-24 md:pb-28">
        <div className="max-w-[1100px] mx-auto w-full">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="block font-ui text-[11px] uppercase tracking-[0.3em] text-[#ead8b5]/70 mb-3"
          >
            Specialty Coffee · Hyderabad
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-[#ead8b5] max-w-[700px]"
          >
            Where every cup is a quiet ritual
          </motion.h1>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <svg
          ref={arrowRef}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(234,216,181,0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
        <span className="font-ui text-[10px] uppercase tracking-widest text-[#ead8b5]/50">Scroll</span>
      </div>
    </section>
  );
}

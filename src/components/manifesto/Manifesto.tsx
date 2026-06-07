'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(mascotRef.current,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%' },
      }
    );
  }, []);

  return (
    <section id="philosophy" ref={containerRef} className="relative bg-bg py-8 px-6 lg:py-10 overflow-hidden">
      <div className="flex justify-center items-center pointer-events-none select-none">
        <img
          ref={mascotRef}
          src="/images/caricature-girl.svg"
          alt="Wool Cup mascot"
          width={150}
          height={175}
          className="opacity-90 w-[120px] md:w-[150px]"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>
    </section>
  );
}

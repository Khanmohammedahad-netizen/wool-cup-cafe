'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(textRef.current,
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
    <section id="philosophy" ref={containerRef} className="relative bg-bg py-16 px-6 lg:py-24 overflow-hidden">
      <div className="max-w-[680px] mx-auto text-center">
        <p
          ref={textRef}
          className="font-display text-[1.25rem] md:text-[1.65rem] text-text leading-[1.6] lg:leading-[1.7]"
        >
          We don't rush coffee. We don't rush mornings. Every cup is slowed down, stripped back, and made to be remembered.
        </p>
      </div>

      {/* Mascot — floats right on desktop, centered below on mobile */}
      <div className="flex justify-center mt-10 lg:mt-0 lg:absolute lg:right-[6vw] lg:top-1/2 lg:-translate-y-1/2 pointer-events-none select-none">
        <img
          src="/images/mascot.svg"
          alt="Wool Cup mascot"
          width={110}
          height={128}
          className="opacity-90 w-[90px] md:w-[110px]"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>
    </section>
  );
}

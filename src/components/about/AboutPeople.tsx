'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AboutPeople() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 85%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-[#ead8b5]/10 py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* TODO: Replace with 2-column founder portrait grid once photos are available */}
        <div ref={contentRef}>
          <p className="font-ui uppercase tracking-[0.3em] text-xs text-brown/70 mb-6">
            The People
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-brown">
            The faces behind every cup.
          </h2>
          <p className="font-body text-base text-dark/60 mt-4">
            We'll introduce you soon.
          </p>
        </div>
      </div>
    </section>
  );
}

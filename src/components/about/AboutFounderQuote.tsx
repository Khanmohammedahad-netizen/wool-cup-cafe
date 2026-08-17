'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AboutFounderQuote() {
  const containerRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const attributionRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        [quoteRef.current, attributionRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: { trigger: quoteRef.current, start: 'top 85%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-ivory py-24 md:py-32 border-t border-[#ead8b5]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p
          ref={quoteRef}
          className="font-display text-3xl md:text-4xl lg:text-5xl text-dark italic leading-tight mb-6"
        >
          "We don't just serve coffee. We serve the pause."
        </p>
        <p ref={attributionRef} className="font-ui text-sm text-dark/50">
          The Founders
        </p>
      </div>
    </section>
  );
}

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function MenuCTAFooter() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-[#7B4A2E] py-24 md:py-32">
      <div ref={contentRef} className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
          Can't decide? Visit us.
        </h2>
        <p className="font-body text-lg text-white/60 mb-10">
          Our team will guide you to your perfect cup.
        </p>
        <Link
          href="/#locations"
          className="bg-[#ead8b5] text-[#231f20] font-ui text-sm uppercase tracking-wide px-8 py-3 rounded-full hover:bg-white transition-colors duration-300"
        >
          Find Us →
        </Link>
      </div>
    </section>
  );
}

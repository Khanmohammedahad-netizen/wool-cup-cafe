'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AboutCTA() {
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
    <section ref={containerRef} className="bg-[#231f20] py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 text-center relative overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center font-display text-[clamp(80px,15vw,160px)] text-white/5 tracking-[0.3em] select-none pointer-events-none"
        >
          WOOL CUP
        </span>

        <div ref={contentRef} className="relative z-10">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            Come find us.
          </h2>
          <p className="font-body text-lg text-[#ead8b5]/70 mb-10">
            Film Nagar & Financial District, Hyderabad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#locations"
              className="bg-[#ead8b5] text-dark font-ui text-sm uppercase tracking-wide px-8 py-3 rounded-full hover:bg-white transition-colors duration-300"
            >
              Visit Us →
            </Link>
            <a
              href="https://www.instagram.com/woolcupcafe"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#ead8b5]/60 text-[#ead8b5] font-ui text-sm uppercase tracking-wide px-8 py-3 rounded-full hover:border-[#ead8b5] hover:bg-[#ead8b5]/10 transition-all duration-300"
            >
              Follow Our Story →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CakesInquiryCTA() {
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
    <section ref={containerRef} className="relative bg-[#7B4A2E] py-20 md:py-28 overflow-hidden">
      {/* Mascot watermark */}
      <img
        src="/images/mascot.png"
        alt=""
        aria-hidden="true"
        width={160}
        height={186}
        className="absolute bottom-0 right-4 md:right-12 opacity-10 pointer-events-none select-none"
        style={{ filter: 'invert(1)', mixBlendMode: 'screen' }}
      />
      <div ref={contentRef} className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-display text-4xl text-white mb-4">
          Let's create something <em>beautiful.</em>
        </h2>
        <p className="font-body text-lg text-[#ead8b5]/70 mb-10">
          Tell us about your celebration and we'll craft something perfect.
        </p>

        <a
          href="https://wa.me/917292944244?text=Hi%20Wool%20Cup!%20I'd%20like%20to%20inquire%20about%20a%20custom%20cake."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#ead8b5] text-[#231f20] font-ui text-sm uppercase tracking-wide px-8 py-3 rounded-full hover:bg-white hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
        >
          Start a Conversation →
        </a>

        <a
          href="tel:+917292944244"
          className="font-body text-sm text-[#ead8b5]/70 hover:text-[#ead8b5] transition-colors mt-4 block"
        >
          or call us
        </a>

        <p className="font-ui text-xs text-white/40 mt-8">
          We recommend ordering at least 48 hours in advance for custom designs.
        </p>
      </div>
    </section>
  );
}

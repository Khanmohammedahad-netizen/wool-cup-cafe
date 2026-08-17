'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }
      );
      gsap.fromTo(
        mascotRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out', delay: 0.15 }
      );
    },
    { scope: sectionRef }
  );

  return (
    <>
      <style href="about-hero" precedence="default">{`
        .about-hero-dots {
          background-image: radial-gradient(circle, rgba(193,155,95,0.15) 1px, transparent 1px);
          background-size: 22px 22px;
        }
        .mascot-col::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,
            #f4ead7 0%,
            rgba(244,234,215,0.6) 28%,
            rgba(244,234,215,0) 60%);
          z-index: 2;
          pointer-events: none;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative min-h-screen bg-[#f4ead7] about-hero-dots overflow-hidden grid grid-cols-1 md:grid-cols-2 items-center"
      >
        {/* Left: text */}
        <div ref={textRef} className="relative z-10 px-8 md:px-16 py-24 md:py-0">
          <span className="inline-flex items-center gap-3 font-ui text-[0.62rem] uppercase tracking-[0.28em] text-[#6c3b11] mb-8">
            <span className="block w-5 h-px bg-[#c9a96e]" />
            Our Story
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-[3.4rem] text-[#231f20] leading-[1.12] mb-5">
            Born from a love of <em>slow mornings</em>
          </h1>
          <p className="font-body text-sm text-[#231f20]/55 leading-relaxed max-w-[34ch] mb-8">
            A sanctuary of craft, comfort, and connection, built for people who believe in the pause between sips.
          </p>
          <span className="inline-flex items-center gap-2 font-ui text-[0.65rem] uppercase tracking-[0.18em] text-[#6c3b11] border border-[#c9a96e] px-5 py-2.5 rounded-full">
            Read the story &nbsp;↓
          </span>
        </div>

        {/* Right: mascot — desktop side column */}
        <div className="mascot-col relative hidden md:flex items-end justify-center self-stretch overflow-hidden">
          <img
            ref={mascotRef}
            src="/images/caricature-girl.svg"
            alt=""
            aria-hidden="true"
            className="max-h-[82%] w-auto max-w-full object-contain object-bottom z-10"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>

        {/* Mascot — mobile only, below text */}
        <div className="relative md:hidden flex justify-center items-end overflow-hidden" style={{ height: '52vw', maxHeight: 320 }}>
          <img
            src="/images/caricature-girl.svg"
            alt=""
            aria-hidden="true"
            className="h-full w-auto object-contain object-bottom"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>
      </section>
    </>
  );
}

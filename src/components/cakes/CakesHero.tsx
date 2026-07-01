'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

export function CakesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        [eyebrowRef.current, headlineRef.current, subtitleRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out', stagger: 0.15 }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background image — TODO: Replace with woolcup-cake-branded.jpg once available */}
      <img
        src="/images/new/dessert-case.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Warm dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#231f20]/80 via-[#231f20]/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <p
          ref={eyebrowRef}
          className="font-ui uppercase tracking-[0.3em] text-xs text-[#ead8b5]/70 mb-4"
        >
          The Bakery
        </p>
        <h1
          ref={headlineRef}
          className="font-display text-4xl md:text-5xl text-white"
        >
          Celebration <em>cakes</em>
        </h1>
        <p
          ref={subtitleRef}
          className="font-body text-base text-[#ead8b5]/80 mt-4 max-w-xl"
        >
          Handcrafted with love, designed for your moments
        </p>
      </div>
    </section>
  );
}

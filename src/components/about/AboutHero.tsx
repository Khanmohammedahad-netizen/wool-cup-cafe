'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        [eyebrowRef.current, headlineRef.current],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', stagger: 0.15 }
      );

      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/images/new/interior-wide-cloud.jpg"
          alt=""
          aria-hidden="true"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#ead8b5]/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#231f20]/60 via-transparent to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p
          ref={eyebrowRef}
          className="font-ui uppercase tracking-[0.3em] text-xs text-white/70 mb-4"
        >
          Our Story
        </p>
        <h1
          ref={headlineRef}
          className="font-display text-5xl md:text-6xl lg:text-7xl text-white max-w-4xl leading-tight"
        >
          Born from a love of <em>slow mornings.</em>
        </h1>
      </div>
    </section>
  );
}

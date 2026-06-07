'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PARAGRAPHS = [
  "Every great café begins with a conversation. For us, it started over a cup of coffee that wasn't quite right — too rushed, too impersonal, too forgettable. We knew Hyderabad deserved something different.",
  "Wool Cup was born in 2024, not as a business plan, but as a promise — to create a space where every cup is pulled with intention, every dish is crafted with care, and every guest feels the warmth of belonging.",
  "We named it Wool Cup because wool is warm, familiar, comforting. It wraps around you. That's what we wanted our café to feel like — a place that wraps around you like your favourite sweater on a quiet morning.",
];

export function AboutOrigin() {
  const containerRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const parasRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        [eyebrowRef.current, ...parasRef.current.filter(Boolean), imageRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-ivory py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-12 lg:gap-20 items-center max-w-7xl mx-auto px-6 md:px-12">
        <div>
          <p
            ref={eyebrowRef}
            className="font-ui uppercase tracking-[0.3em] text-xs text-dark/50 mb-6"
          >
            The Beginning
          </p>
          {PARAGRAPHS.map((text, i) => (
            <p
              key={i}
              ref={(el) => { parasRef.current[i] = el; }}
              className="font-body text-lg text-dark/85 leading-loose mb-6"
            >
              {text}
            </p>
          ))}
        </div>

        <div ref={imageRef} className="rounded-2xl overflow-hidden shadow-md aspect-[3/4]">
          <img
            src="/images/new/interior-sofa.jpg"
            alt="Wool Cup sofa seating area"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}

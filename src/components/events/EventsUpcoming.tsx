'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);


export function EventsUpcoming() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
        }
      );
      gsap.fromTo(
        cardRefs.current.filter((r): r is HTMLDivElement => r !== null),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: { trigger: cardRefs.current[0], start: 'top 85%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-ivory py-20 md:py-28">
      <div ref={headerRef} className="max-w-3xl mx-auto px-6 text-center mb-12">
        <p className="font-ui uppercase tracking-[0.3em] text-xs text-[#231f20]/50 mb-4">
          What&apos;s On
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-[#231f20]">
          Upcoming <em>events.</em>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={(el) => { cardRefs.current[0] = el; }}
          className="aspect-[4/3] md:aspect-[16/5] bg-[#ead8b5]/30 rounded-xl border border-[#ead8b5]/50 flex items-center justify-center"
        >
          <span className="font-display text-[#231f20]/30 text-2xl">Coming Soon</span>
        </div>
      </div>
    </section>
  );
}

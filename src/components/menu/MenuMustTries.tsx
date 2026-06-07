'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MUST_TRY_ITEMS = [
  {
    name: 'OG Cold Brew',
    description: 'Straight-up, smooth, and slow-brewed. The one that keeps regulars coming back.',
    price: '₹290',
  },
  {
    name: 'Spanish Latte',
    description: 'Sweetened condensed milk meets bold espresso for a rich, velvety finish. Hot or iced.',
    price: '₹340',
  },
  {
    name: 'Biscoff French Toast',
    description: 'Our most-requested brunch item — buttery brioche, Lotus Biscoff, warm and golden.',
    price: '₹445',
  },
];

export function MenuMustTries() {
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
          stagger: 0.12,
          scrollTrigger: { trigger: cardRefs.current[0], start: 'top 85%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="must-tries"
      ref={containerRef}
      className="bg-[#ead8b5]/15 py-20 md:py-28"
    >
      <div ref={headerRef} className="max-w-3xl mx-auto px-6 text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl text-[#231f20]">
          The Must-Tries
        </h2>
        <p className="font-body text-base text-[#231f20]/70 mt-4 max-w-xl mx-auto">
          The ones Hyderabad keeps coming back for.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {MUST_TRY_ITEMS.map((item, i) => (
          <div
            key={item.name}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="bg-ivory border border-[#ead8b5] rounded-2xl overflow-hidden"
          >
            <div className="h-[220px] flex items-center justify-center bg-[#ead8b5]/20">
              <p className="font-body italic text-[#231f20]/40 text-sm">Photograph coming soon</p>
            </div>
            <div className="p-6">
              <span className="font-ui text-[10px] uppercase tracking-widest text-[#C9A84C] inline-block mb-3">
                ★ Must-Try
              </span>
              <h3 className="font-display text-2xl text-[#231f20]">{item.name}</h3>
              <p className="font-body text-sm italic text-[#231f20]/70 mt-1">{item.description}</p>
              <p className="font-ui text-lg text-[#231f20] mt-3">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

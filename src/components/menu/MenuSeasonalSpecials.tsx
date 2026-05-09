'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SeasonalItem {
  name: string;
  description: string;
  price: string;
  image?: string;
  video?: string;
}

const SEASONAL_ITEMS: SeasonalItem[] = [
  {
    name: 'Mango Season Special',
    description: 'It\'s mango season — and we\'re making the most of it. Ask us what\'s on today.',
    price: '—',
    image: '/images/woolcup/mango-dish.jpg',
  },
  {
    name: 'Yuzu Cold Brew',
    description: 'Zesty Japanese yuzu meets our slow-brewed cold brew. Bright, citrusy, and utterly refreshing.',
    price: '₹380',
  },
  {
    name: 'Lavender Sea Salt Matcha',
    description: 'Ceremonial matcha layered with lavender and a whisper of sea salt. Floral, calm, complex.',
    price: '₹430',
  },
];

export function MenuSeasonalSpecials() {
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
    <section
      id="seasonal"
      ref={containerRef}
      className="bg-white py-20 md:py-28 border-t border-[#ead8b5]"
    >
      <div ref={headerRef} className="max-w-3xl mx-auto px-6 text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl text-[#231f20]">
          Right Now
        </h2>
        <p className="font-body text-base text-[#231f20]/70 mt-4 max-w-xl mx-auto">
          Two drinks worth making the trip for. Always rotating.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {SEASONAL_ITEMS.map((item, i) => (
          <div
            key={item.name}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="bg-[#ead8b5]/20 border border-[#ead8b5] rounded-2xl overflow-hidden"
          >
            <div className="h-[180px] md:h-[220px] relative overflow-hidden bg-[#ead8b5]/30">
              {'video' in item && item.video ? (
                <video
                  src={item.video}
                  poster={'image' in item ? item.image : undefined}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : 'image' in item && item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="absolute inset-0 flex items-center justify-center font-body italic text-[#231f20]/40 text-sm">Photograph coming soon</p>
              )}
            </div>
            <div className="p-6">
              <span className="font-ui text-[10px] uppercase tracking-widest bg-[#ead8b5] text-[#231f20] px-3 py-1 rounded-full inline-block mb-3">
                Right Now
              </span>
              <h3 className="font-display text-2xl text-[#231f20]">{item.name}</h3>
              <p className="font-body text-sm italic text-[#231f20]/70 mt-1">{item.description}</p>
              <p className="font-ui text-lg text-[#231f20] mt-3">
                {item.price === '—' ? <span className="italic text-[#231f20]/50 text-base">Ask us</span> : item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

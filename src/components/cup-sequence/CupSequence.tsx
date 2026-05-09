'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const originData = [
  {
    num: '01',
    title: 'Origin',
    copy: 'Single-estate Arabica from the Chikmagalur hills. Sourced directly, traded fairly, picked at peak ripeness.',
  },
  {
    num: '02',
    title: 'Roast',
    copy: "Small-batch. Fourteen-minute profile. Light to medium, roasted weekly to honour the bean's origin character.",
  },
  {
    num: '03',
    title: 'Method',
    copy: 'Hand-pulled. Nine bars of pressure. Twenty-seven seconds of extraction. Precision in every shot.',
  },
  {
    num: '04',
    title: 'Yours',
    copy: 'One cup. Your table. A morning that belongs to you.',
  },
];

export function CupSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(cardRefs.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
      }
    );
  }, []);

  return (
    <section id="origin" ref={containerRef} className="bg-bg border-y border-border">
      <div className="grid grid-cols-1 lg:grid-cols-4">
        {originData.map((item, i) => (
          <div
            key={item.num}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-14 bg-bg hover:bg-bg-alt transition-colors duration-400 group
              ${i !== 0 ? 'border-t lg:border-t-0 lg:border-l' : ''} border-border`}
          >
            <span className="block font-ui text-[0.7rem] font-medium tracking-[0.1em] text-text-soft uppercase mb-5">
              {item.num}
            </span>
            <h3 className="text-[1.4rem] text-text mb-3">
              {item.title}
            </h3>
            <p className="text-body leading-[1.7]">
              {item.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

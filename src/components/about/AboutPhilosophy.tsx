'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PILLARS = [
  {
    number: '01',
    title: 'Intentional Sourcing',
    description: 'Every bean is chosen, not settled for. We work directly with estates in the Chikmagalur hills, shade-grown, single-origin, scoring 86+ on the SCA scale.',
  },
  {
    number: '02',
    title: 'Honest Craft',
    description: 'No shortcuts. No artificial syrups. Every extraction, every bake, every plate is the honest result of care and practice.',
  },
  {
    number: '03',
    title: 'Warm Belonging',
    description: "Wool Cup isn't just a café. It's a feeling. A place where strangers become regulars and every visit feels like coming home.",
  },
];

export function AboutPhilosophy() {
  const containerRef = useRef<HTMLElement>(null);
  const pillarsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.fromTo(
        pillarsRef.current.filter(Boolean),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: { trigger: pillarsRef.current[0], start: 'top 85%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-[#ead8b5]/20 py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
          {PILLARS.map((pillar, i) => (
            <div key={pillar.number} ref={(el) => { pillarsRef.current[i] = el; }}>
              <p className="font-ui text-[10px] uppercase tracking-widest text-dark/30 mb-4">
                {pillar.number}
              </p>
              <h3 className="font-display text-xl text-dark mb-3">{pillar.title}</h3>
              <p className="font-body text-sm text-dark/70 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

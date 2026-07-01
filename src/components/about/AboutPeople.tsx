'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FOUNDERS = [
  {
    name: 'Dia Perka',
    title: 'Founder',
    initials: 'DP',
    bio: "Dia founded Wool Cup from a lifelong passion for coffee and a belief in the power of meaningful spaces. What began with a home espresso machine and an obsession with craft evolved into a vision for a café where exceptional coffee, handcrafted food, and genuine human connection come together. Inspired by a quiet moment shared between three generations of her family, she set out to build a place where people could truly slow down, belong, and feel at home.",
  },
  {
    name: 'Vivek Mathur',
    title: 'Co-Founder & Head of Operations',
    initials: 'VM',
    bio: "Behind every dream is someone who quietly helps make it possible. As Co-Founder and Head of Operations, Vivek has been the steady force behind Wool Cup, building systems, leading the team, and ensuring that every visit reflects the values the café was founded upon. His strength lies not in seeking the spotlight, but in making sure everything runs seamlessly so the vision can flourish.",
  },
];

export function AboutPeople() {
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
          scrollTrigger: { trigger: containerRef.current, start: 'top 85%' },
        }
      );

      gsap.fromTo(
        cardRefs.current.filter(Boolean),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-[#ead8b5]/10 py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div ref={headerRef} className="text-center mb-16">
          <p className="font-ui uppercase tracking-[0.3em] text-xs text-brown/70 mb-6">
            The People
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-brown">
            The faces behind every cup.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {FOUNDERS.map((founder, i) => (
            <div
              key={founder.name}
              ref={(el) => { cardRefs.current[i] = el; }}
            >
              <div className="aspect-[3/4] rounded-2xl bg-[#ead8b5]/40 flex items-center justify-center mb-6 overflow-hidden">
                <span className="font-display text-6xl text-brown/25 select-none">
                  {founder.initials}
                </span>
              </div>
              <p className="font-ui text-[10px] uppercase tracking-widest text-brown/60 mb-1">
                {founder.title}
              </p>
              <h3 className="font-display text-2xl text-brown mb-4">
                {founder.name}
              </h3>
              <p className="font-body text-base text-dark/70 leading-relaxed">
                {founder.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

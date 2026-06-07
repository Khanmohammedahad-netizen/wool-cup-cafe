'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = [
  {
    number: '01',
    title: 'Imagine',
    description: 'Tell us about your celebration — the flavours you love, the colours you envision, the story you want to tell.',
  },
  {
    number: '02',
    title: 'Create',
    description: 'Our pastry team brings your vision to life with premium ingredients, artistic precision, and a whole lot of heart.',
  },
  {
    number: '03',
    title: 'Celebrate',
    description: 'Pick up your creation — or let us deliver it to your doorstep — and make your moment unforgettable.',
  },
];

export function CakesHowItWorks() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        stepRefs.current.filter((r): r is HTMLDivElement => r !== null),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: { trigger: stepRefs.current[0], start: 'top 85%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-ivory py-20 md:py-28">
      <div ref={headerRef} className="max-w-3xl mx-auto px-6 text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl text-[#231f20]">
          Made for <em>you.</em>
        </h2>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Dashed connector line — desktop only */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px border-t border-dashed border-[#ead8b5] z-0"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { stepRefs.current[i] = el; }}
              className="text-center"
            >
              <span className="font-display text-4xl text-[#ead8b5] mb-4 block">
                {step.number}
              </span>
              <h3 className="font-display text-lg text-[#231f20] mb-3">{step.title}</h3>
              <p className="font-body text-sm text-[#231f20]/70 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

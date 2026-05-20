'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AboutSpace() {
  const containerRef = useRef<HTMLElement>(null);
  const cell1Ref = useRef<HTMLDivElement>(null);
  const cell2Ref = useRef<HTMLDivElement>(null);
  const cell3Ref = useRef<HTMLDivElement>(null);
  const cell4Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        [cell1Ref.current, cell2Ref.current, cell3Ref.current, cell4Ref.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div ref={cell1Ref} className="md:row-span-2 rounded-2xl overflow-hidden min-h-[400px]">
            <img
              src="/images/new/interior-wide-cloud.jpg"
              alt="Wool Cup interior — wide view with cloud ceiling"
              className="object-cover w-full h-full"
            />
          </div>

          <div ref={cell2Ref} className="rounded-2xl overflow-hidden h-[280px]">
            <img
              src="/images/woolcup/food-01.jpg"
              alt="Wool Cup food"
              className="object-cover w-full h-full"
            />
          </div>

          <div ref={cell3Ref} className="rounded-2xl overflow-hidden h-[280px]">
            <img
              src="/images/new/exterior-wide.jpg"
              alt="Wool Cup exterior"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div ref={cell4Ref} className="mt-4 rounded-2xl overflow-hidden h-screen w-full">
          <img
            src="/images/new/barista-pour.jpg"
            alt="Barista pouring coffee"
            className="object-cover w-full h-full"
          />
        </div>

        <p className="font-body italic text-center text-dark/60 mt-8 text-base">
          Designed for slow mornings and conversations that matter.
        </p>
      </div>
    </section>
  );
}

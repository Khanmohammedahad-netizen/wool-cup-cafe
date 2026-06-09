'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PAST_EVENT_PHOTOS = [
  { src: '/images/shoots/AS_00760.jpg', label: 'Live Music Night', date: 'May 2026' },
  { src: '/images/shoots/AS_00683.jpg', label: "Chef's Table", date: 'Apr 2026' },
  { src: '/images/new/interior-dining.jpg', label: 'Community Night', date: 'Apr 2026' },
  { src: '/images/shoots/AS_00739.jpg', label: 'Private Gathering', date: 'Mar 2026' },
  { src: '/images/new/interior-sofa.jpg', label: 'Open Mic', date: 'Mar 2026' },
  { src: '/images/shoots/AS_00705.jpg', label: 'Art Evening', date: 'Feb 2026' },
];

export function EventsPast() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        itemRefs.current.filter((r): r is HTMLDivElement => r !== null),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: { trigger: itemRefs.current[0], start: 'top 85%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-[#ead8b5]/20 py-20 md:py-28">
      <div ref={headerRef} className="max-w-3xl mx-auto px-6 text-center mb-12">
        <p className="font-ui uppercase tracking-[0.3em] text-xs text-[#231f20]/50 mb-4">
          A Look Back
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-[#231f20]">
          Moments <em>we&apos;ve shared.</em>
        </h2>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 max-w-6xl mx-auto px-6">
        {PAST_EVENT_PHOTOS.map((photo, i) => (
          <div
            key={photo.src}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="relative break-inside-avoid mb-4 overflow-hidden rounded-xl group"
          >
            <img
              src={photo.src}
              alt={photo.label}
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-[#231f20]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
              <span className="font-display text-white text-lg">{photo.label}</span>
              <span className="font-ui text-[#ead8b5]/80 text-xs uppercase tracking-[0.2em] mt-1">
                {photo.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

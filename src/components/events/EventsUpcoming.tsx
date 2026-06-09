'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const UPCOMING_EVENTS = [
  {
    date: 'Jun 21',
    type: 'Live Music',
    title: 'Acoustic Evening',
    description: 'An intimate live set with local artists. Bring a friend, settle in.',
    time: '7:00 PM',
    location: 'Banjara Hills',
  },
  {
    date: 'Jun 28',
    type: 'Private Dining',
    title: "Chef's Table Night",
    description: 'A curated multi-course experience for small groups.',
    time: '7:30 PM',
    location: 'Financial District',
  },
  {
    date: 'Jul 5',
    type: 'Community Night',
    title: 'Open Mic Evening',
    description: 'Poetry, stories, and songs. The floor is yours.',
    time: '6:30 PM',
    location: 'Banjara Hills',
  },
];

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {UPCOMING_EVENTS.map((event, i) => (
          <div
            key={event.title}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="bg-cream/30 rounded-xl border border-[#ead8b5]/50 overflow-hidden flex flex-col"
          >
            {/* Image placeholder */}
            <div className="relative aspect-video bg-[#ead8b5]/40 flex-shrink-0">
              <span className="absolute bottom-3 left-3 bg-[#231f20] text-white font-ui text-xs px-3 py-1 rounded-full">
                {event.date}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <p className="font-ui uppercase tracking-[0.2em] text-xs text-[#231f20]/50 mb-2">
                {event.type}
              </p>
              <h3 className="font-display text-xl text-[#231f20]">{event.title}</h3>
              <p className="font-body text-sm text-[#231f20]/70 leading-relaxed mt-1 flex-1">
                {event.description}
              </p>

              {/* Footer row */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#ead8b5]/50">
                <span className="font-ui text-xs text-[#231f20]/50 uppercase tracking-[0.1em]">
                  {event.time} · {event.location}
                </span>
                <a
                  href={`https://wa.me/917292944244?text=${encodeURIComponent(`Hi Wool Cup! I'd like to enquire about ${event.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui text-xs uppercase tracking-[0.1em] text-[#231f20] hover:text-[#231f20]/60 transition-colors"
                >
                  Enquire →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

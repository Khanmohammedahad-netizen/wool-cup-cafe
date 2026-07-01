'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PARAGRAPHS = [
  "Every great story begins with a simple passion. For our founder, Dia Perka, that passion was coffee. What started as countless hours experimenting with a humble home espresso machine soon became an obsession with understanding the craft behind every perfect cup. As her curiosity grew, so did her dream to build a café where exceptional coffee met genuine human connection. That dream became Wool Cup.",
  "A defining milestone in our journey was bringing the Sanremo OPERA 2.0, one of the world's most advanced espresso machines and the first of its kind in the city. More than a machine, it represents our unwavering commitment to quality, precision, and innovation in every cup we serve.",
  "Yet Wool Cup was never created for coffee alone. It was inspired by a quiet moment shared between three generations: Dia, her mother, and her son. In that moment, she realised how rare it had become to find spaces where families, friends, colleagues, and communities could truly come together, slow down, and enjoy each other's company.",
  "Everything we do is guided by one belief: cafés are not just places to eat and drink; they are places where relationships grow, ideas begin, milestones are celebrated, and everyday moments become lasting memories. At Wool Cup, we don't simply serve coffee. We serve comfort, connection, and moments worth remembering.",
];

export function AboutOrigin() {
  const containerRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const parasRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        [eyebrowRef.current, ...parasRef.current.filter(Boolean), imageRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-ivory py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-12 lg:gap-20 items-center max-w-7xl mx-auto px-6 md:px-12">
        <div>
          <p
            ref={eyebrowRef}
            className="font-ui uppercase tracking-[0.3em] text-xs text-brown/70 mb-6"
          >
            The Beginning
          </p>
          {PARAGRAPHS.map((text, i) => (
            <p
              key={i}
              ref={(el) => { parasRef.current[i] = el; }}
              className="font-body text-lg text-dark/85 leading-loose mb-6"
            >
              {text}
            </p>
          ))}
        </div>

        <div ref={imageRef} className="rounded-2xl overflow-hidden shadow-md aspect-[3/4]">
          <img
            src="/images/new/interior-sofa.jpg"
            alt="Wool Cup sofa seating area"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}

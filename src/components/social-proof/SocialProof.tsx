'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const REVIEWS = [
  {
    name: 'Aryan M.',
    quote: 'Hands down the best coffee in Hyderabad. The pour over is a ritual — clean, bright, and completely unhurried.',
  },
  {
    name: 'Sneha R.',
    quote: 'Found my favourite corner of the city. The vanilla latte and the sofa section are my Sunday morning staples now.',
  },
  {
    name: 'Rahul K.',
    quote: 'Everything here is intentional — the music, the light, the coffee temperature. A rare place that gets hospitality right.',
  },
  {
    name: 'Priya S.',
    quote: 'The cloud ceiling alone is worth the visit, but the cold brew reserve kept me coming back. Exceptional.',
  },
  {
    name: 'Vikram A.',
    quote: "Not just a café — a proper third place. I've written three proposals here. The staff never rush you.",
  },
  {
    name: 'Meera T.',
    quote: 'The cake display changed my life. Genuinely. And the baristas know your order by the second visit.',
  },
];

const MARQUEE_IMAGES = [
  '/images/woolcup/interior-01.jpg',
  '/images/woolcup/food-01.jpg',
  '/images/woolcup/food-02.jpg',
  '/images/new/barista-pour.jpg',
  '/images/new/interior-hand-chairs.jpg',
  '/images/woolcup/interior-03.jpg',
  '/images/new/dessert-case.jpg',
  '/images/woolcup/food-03.jpg',
  '/images/new/exterior-wide.jpg',
  '/images/woolcup/interior-05.jpg',
];

export function SocialProof() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.fromTo(
        [eyebrowRef.current, headlineRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
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
          stagger: 0.1,
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <>
      {/* React 19 hoisted style — SSR-safe marquee keyframe */}
      <style href="wool-marquee" precedence="default">{`
        @keyframes wool-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .wool-marquee-track {
          animation: wool-marquee 40s linear infinite;
        }
        .wool-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <section
        id="reviews"
        ref={containerRef}
        className="bg-[#ead8b5]/15 py-24 md:py-32"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Header */}
          <div ref={headerRef} className="text-center mb-16 relative">
            <p
              ref={eyebrowRef}
              className="font-ui uppercase tracking-[0.3em] text-xs text-dark/50 mb-4"
            >
              Guest Voices
            </p>
            <h2
              ref={headlineRef}
              className="font-display text-4xl md:text-5xl text-dark"
            >
              Loved by <em>Hyderabad.</em>
            </h2>
            {/* Mascot — right of headline on desktop, hidden on smallest phones */}
            <img
              src="/images/mascot.png"
              alt=""
              aria-hidden="true"
              width={80}
              height={93}
              className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-[70px] md:w-[85px] pointer-events-none select-none opacity-85"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>

          {/* Review cards */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {REVIEWS.map((review, i) => (
              <div
                key={review.name}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="bg-white border border-[#ead8b5] rounded-xl p-6 md:p-8 relative overflow-hidden"
              >
                {/* Decorative quote mark */}
                <span
                  aria-hidden="true"
                  className="absolute top-2 left-4 font-display text-7xl text-[#ead8b5]/60 leading-none select-none pointer-events-none"
                >
                  &ldquo;
                </span>

                {/* Stars */}
                <p className="font-ui text-sm text-[#C9A84C] mb-4 relative z-10">
                  ★★★★★
                </p>

                {/* Quote */}
                <p className="font-body text-base md:text-lg text-dark/80 italic leading-relaxed mb-6 relative z-10">
                  {review.quote}
                </p>

                {/* Attribution */}
                <p className="font-ui text-sm text-dark/60">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Photo marquee strip */}
        <div className="overflow-hidden bg-white py-8 mt-16">
          <div className="wool-marquee-track flex gap-4">
            {[...MARQUEE_IMAGES, ...MARQUEE_IMAGES].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                aria-hidden="true"
                className="h-[200px] w-auto aspect-[4/3] object-cover rounded-lg flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

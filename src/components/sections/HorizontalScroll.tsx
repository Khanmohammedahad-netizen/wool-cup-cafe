'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';

const slides = [
  { 
    title: "The Pour", 
    sub: "Precision in every drop", 
    color: "from-roast to-bg-primary",
    image: "/images/ambience-1.jpg" // Placeholder or actual if generated
  },
  { 
    title: "The Craft", 
    sub: "Art you can taste", 
    color: "from-mocha to-bg-secondary",
    image: "/images/ambience-2.jpg"
  },
  { 
    title: "The Moment", 
    sub: "Your third place", 
    color: "from-espresso to-bg-primary",
    image: "/images/ambience-3.jpg"
  },
  { 
    title: "The Bean", 
    sub: "Single origin stories", 
    color: "from-brew to-bg-secondary",
    image: "/images/ambience-4.jpg"
  },
];

export default function HorizontalScroll() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollAmount = trackWidth - viewportWidth;

      gsap.to(track, {
        x: -scrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollAmount}`,
          invalidateOnRefresh: true,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-screen bg-bg-primary overflow-hidden">
      <div ref={containerRef} className="sticky top-0 h-full flex items-center">
        <div ref={trackRef} className="flex gap-10 px-[10vw]">
          {slides.map((slide, i) => (
            <div 
              key={i} 
              className="relative flex-shrink-0 w-[80vw] h-[70vh] rounded-3xl overflow-hidden group"
            >
              {/* Fallback Gradient / Image */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110",
                slide.color
              )} />
              
              {/* Overlay for text legibility */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg-primary to-transparent z-10" />

              <div className="absolute inset-0 z-10 opacity-30 mix-blend-overlay bg-[url('/textures/grain.png')] bg-repeat" />

              <div className="absolute bottom-12 left-12 z-20">
                <h3 className="font-display text-h2 text-cream mb-2 translate-y-4 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 italic">
                  {slide.title}
                </h3>
                <p className="font-body text-small text-latte tracking-widest uppercase translate-y-4 opacity-0 transition-all duration-700 delay-100 group-hover:translate-y-0 group-hover:opacity-100">
                  {slide.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

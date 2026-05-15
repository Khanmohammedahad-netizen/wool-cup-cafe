'use client';

import { useEffect, useRef } from 'react';

export function WoolcupHero() {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (indicatorRef.current) {
        indicatorRef.current.style.opacity = String(Math.max(0, 1 - window.scrollY / 80));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style href="hero-scroll-indicator" precedence="default">{`
        @keyframes scroll-wheel {
          0%   { transform: translateY(0);   opacity: 1; }
          60%  { transform: translateY(8px); opacity: 0; }
          61%  { transform: translateY(0);   opacity: 0; }
          100% { transform: translateY(0);   opacity: 1; }
        }
        .scroll-wheel-dot {
          animation: scroll-wheel 1.6s ease-in-out infinite;
        }
      `}</style>

      <section className="relative min-h-[100dvh] flex items-end overflow-hidden">
        {/* Fullscreen video background */}
        <video
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/new/interior-wide-cloud.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          disablePictureInPicture
          disableRemotePlayback
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60" />

        {/* Text — anchored bottom-left */}
        <div className="relative z-10 px-6 md:px-12 pb-16 md:pb-20 max-w-3xl">
          <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-[#ead8b5]/60 mb-4">
            Specialty Coffee · Hyderabad
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#ead8b5] leading-[1.05]">
            Coffee,<br />Quieted.
          </h1>
          <p className="font-body text-base md:text-lg italic text-[#ead8b5]/70 mt-5 max-w-md leading-relaxed">
            Where every cup is a quiet ritual.
          </p>
          <p className="font-ui text-xs uppercase tracking-[0.2em] text-[#ead8b5]/50 mt-6">
            Film Nagar · Financial District
          </p>
        </div>

        {/* Scroll indicator — fades on first scroll */}
        <div
          ref={indicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none select-none transition-opacity"
        >
          <span className="font-ui text-[10px] uppercase tracking-[0.3em] text-[#ead8b5]/70">Scroll</span>
          <svg width="22" height="34" viewBox="0 0 22 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="20" height="32" rx="10" stroke="rgba(234,216,181,0.45)" strokeWidth="1.5"/>
            <rect
              x="9.5"
              y="6"
              width="3"
              height="6"
              rx="1.5"
              fill="rgba(234,216,181,0.85)"
              className="scroll-wheel-dot"
            />
          </svg>
        </div>
      </section>
    </>
  );
}

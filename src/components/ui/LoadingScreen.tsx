'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLenis } from '@studio-freight/react-lenis';

export function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const brandNameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [done, setDone] = useState(false);
  const lenis = useLenis();

  // Keep Lenis paused while overlay is active
  useEffect(() => {
    if (done || !lenis) return;
    lenis.stop();
    return () => {
      lenis.start();
    };
  }, [lenis, done]);

  useEffect(() => {
    const shown = sessionStorage.getItem('wc-loading-shown');
    if (shown) {
      setDone(true);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('wc-loading-shown', '1');
        setDone(true);
      },
    });

    // 1. Fade in + scale (0 → 0.4s)
    tl.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
      0
    );

    // 2. Float ±8px (0.4s → 1.6s)
    tl.to(
      containerRef.current,
      { y: -8, duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: 1 },
      0.4
    );

    // 3. Warm glow pulse behind wordmark (0.6s → 1.4s)
    tl.fromTo(
      brandNameRef.current,
      { filter: 'drop-shadow(0 0 0px rgba(212,188,142,0))' },
      {
        filter: 'drop-shadow(0 0 18px rgba(212,188,142,0.55))',
        duration: 0.4,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: 1,
      },
      0.6
    );

    // 4. Brand name clip-path reveal left→right (1.0s → 1.6s)
    tl.fromTo(
      brandNameRef.current,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'power2.inOut' },
      1.0
    );

    // 5. Subtitle fade in (1.2s → 1.8s)
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0 },
      { opacity: 0.6, duration: 0.6, ease: 'power2.out' },
      1.2
    );

    // 6. Exit — slide overlay up (2.0s → 2.6s)
    tl.to(
      overlayRef.current,
      { yPercent: -100, duration: 0.6, ease: 'power3.inOut' },
      2.0
    );

    return () => {
      tl.kill();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-cream flex items-center justify-center"
    >
      <div ref={containerRef} className="flex flex-col items-center gap-4" style={{ opacity: 0 }}>
        {/* Mascot */}
        <img
          src="/images/caricature-girl.svg"
          alt="Wool Cup mascot"
          width={120}
          height={140}
          className="w-[90px] md:w-[120px] pointer-events-none select-none"
          style={{ mixBlendMode: 'multiply' }}
        />
        <div
          ref={brandNameRef}
          style={{ clipPath: 'inset(0 100% 0 0)' }}
        >
          <img
            src="/images/logo.png"
            alt="Wool Cup"
            className="w-[160px] md:w-[220px] pointer-events-none select-none"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>
        <p
          ref={subtitleRef}
          className="font-ui text-[10px] uppercase tracking-[0.3em] text-dark"
          style={{ opacity: 0 }}
        >
          Urban Café &amp; Bistro
        </p>
      </div>
    </div>
  );
}

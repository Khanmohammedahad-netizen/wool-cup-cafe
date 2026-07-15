'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLenis } from '@studio-freight/react-lenis';

export function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const girlRef = useRef<HTMLImageElement>(null);
  const [done, setDone] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (done || !lenis) return;
    lenis.stop();
    return () => { lenis.start(); };
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

    // Fade in + scale up
    tl.fromTo(
      girlRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
      0
    );

    // Gentle float
    tl.to(
      girlRef.current,
      { y: -10, duration: 0.7, ease: 'sine.inOut', yoyo: true, repeat: 1 },
      0.5
    );

    // Exit — slide overlay up
    tl.to(
      overlayRef.current,
      { yPercent: -100, duration: 0.6, ease: 'power3.inOut' },
      2.0
    );

    return () => { tl.kill(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-cream flex items-center justify-center"
    >
      <img
        ref={girlRef}
        src="/images/caricature-girl.svg"
        alt="Wool Cup mascot"
        className="w-[220px] md:w-[300px] pointer-events-none select-none"
        style={{ opacity: 0, mixBlendMode: 'multiply' }}
      />
    </div>
  );
}

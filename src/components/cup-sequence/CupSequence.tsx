'use client';

import { useRef } from 'react';
import { useScroll, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { CanvasPlayer } from './CanvasPlayer';
import { CopyBeat } from './CopyBeat';

export function CupSequence() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  if (reduce) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-white" aria-label="Signature Cup Sequence (Static)">
        <Image
          src="/images/cup-poster.jpg"
          alt="Wool Cup espresso"
          width={1200}
          height={1200}
          priority
          className="max-w-full h-auto"
        />
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[300vh] md:h-[400vh]" aria-label="Signature Cup Sequence">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        <CanvasPlayer scrollProgress={scrollYProgress} />
        
        <CopyBeat scrollProgress={scrollYProgress} enter={0.02} exit={0.24} position="left">
          <h3 className="font-serif text-display-md md:text-display-lg text-ink">Origin.</h3>
          <p className="mt-3 text-mute max-w-sm font-sans text-sm md:text-base">Single-estate Arabica, Chikmagalur hills.</p>
        </CopyBeat>
        
        <CopyBeat scrollProgress={scrollYProgress} enter={0.28} exit={0.50} position="right">
          <h3 className="font-serif text-display-md md:text-display-lg text-ink">Roast.</h3>
          <p className="mt-3 text-mute max-w-sm font-sans text-sm md:text-base">Slow, small-batch. A 14-minute profile.</p>
        </CopyBeat>
        
        <CopyBeat scrollProgress={scrollYProgress} enter={0.54} exit={0.76} position="left">
          <h3 className="font-serif text-display-md md:text-display-lg text-ink">Method.</h3>
          <p className="mt-3 text-mute max-w-sm font-sans text-sm md:text-base">Hand-pulled. 9 bar. 27 seconds.</p>
        </CopyBeat>
        
        <CopyBeat scrollProgress={scrollYProgress} enter={0.80} exit={1.00} position="center">
          <h3 className="font-serif text-display-md md:text-display-lg text-ink">Yours.</h3>
          <p className="mt-3 text-mute max-w-md font-sans text-sm md:text-base">One cup. One table. One quiet morning.</p>
        </CopyBeat>
      </div>
    </section>
  );
}

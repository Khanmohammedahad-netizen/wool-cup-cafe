'use client';

import { useEffect, useCallback } from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

export function WoolcupHero() {
  const lenis = useLenis(undefined);

  useEffect(() => {
    lenis?.stop();
  }, [lenis]);

  const handleExpansionChange = useCallback(
    (expanded: boolean) => {
      if (expanded) {
        lenis?.start();
      } else {
        lenis?.stop();
      }
    },
    [lenis]
  );

  return (
    <ScrollExpandMedia
      mediaType="video"
      mediaSrc="/hero.mp4"
      bgImageSrc="/images/hero-bg.jpg"
      bgVideoSrc="/hero.mp4"
      title="Quiet Ritual"
      date="Specialty Coffee · Hyderabad"
      scrollToExpand="Scroll to explore"
      textColorClass="text-[#ead8b5]"
      onExpansionChange={handleExpansionChange}
    >
      <div className="max-w-2xl mx-auto text-center py-4">
        <p className="font-display text-2xl md:text-3xl text-dark/80 italic leading-relaxed">
          Where every cup is a quiet ritual.
        </p>
        <p className="font-ui text-sm uppercase tracking-[0.2em] text-dark/50 mt-4">
          Film Nagar · Financial District · Hyderabad
        </p>
      </div>
    </ScrollExpandMedia>
  );
}

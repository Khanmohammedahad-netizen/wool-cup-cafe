'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import RevealText from '@/components/ui/RevealText';
import GoldDivider from '@/components/ui/GoldDivider';

const stats = [
  { value: 100, suffix: '%', label: 'Specialty Grade' },
  { value: 2023, suffix: '', label: 'Est.' },
  { value: '∞', suffix: '', label: 'Stories Brewed' },
];

export default function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.to('.story-headline .reveal-item', {
        y: 0,
        stagger: 0.06,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.story-headline',
          start: 'top 80%',
        },
      });

      // Stats count up
      stats.forEach((stat, i) => {
        if (typeof stat.value === 'number') {
          const obj = { val: stat.value === 2023 ? 2000 : 0 };
          gsap.to(obj, {
            val: stat.value,
            duration: 1.5,
            delay: 0.7 + (i * 0.15),
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.stats-row',
              start: 'top 85%',
            },
            onUpdate: () => {
              const el = document.getElementById(`stat-${i}`);
              if (el) el.textContent = Math.round(obj.val).toString();
            },
          });
        }
      });

      // Stats labels fade
      gsap.fromTo('.stat-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          delay: 0.5,
          scrollTrigger: {
            trigger: '.stats-row',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="experience"
      className="relative min-h-[100vh] flex items-center justify-center py-32 px-6 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary overflow-hidden"
    >
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-0 w-1/3 h-1/2 bg-caramel/5 rounded-full blur-[120px] -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-1/4 h-1/2 bg-gold/5 rounded-full blur-[120px] translate-x-1/2 animate-pulse" style={{ animationDuration: '10s' }} />

      <div ref={containerRef} className="max-w-[800px] w-full text-center relative z-10">
        <p className="text-micro font-light tracking-ultra text-caramel uppercase mb-4">
          The Experience
        </p>
        
        <GoldDivider />

        <h2 className="story-headline font-display text-h1 text-cream mb-8 leading-tight">
          <RevealText type="word">Not just coffee.</RevealText><br/>
          <RevealText type="word" className="text-caramel italic">An emotion.</RevealText>
        </h2>

        <p className="text-body text-smoke leading-relaxed font-light mb-16 max-w-[600px] mx-auto">
          In the heart of Filmnagar, Wool Cup Café isn&apos;t just a destination—it&apos;s a scene. 
          Sourced from high-altitude estates and brewed with cinematic precision, 
          every cup is a tribute to the art of the moment. 
          Welcome to your new third place, where cinema meets coffee.
        </p>

        <div className="stats-row flex flex-wrap justify-center gap-12 md:gap-24">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item flex flex-col items-center opacity-0">
              <span className="font-display text-4xl md:text-5xl text-caramel mb-2">
                <span id={`stat-${i}`}>
                   {typeof stat.value === 'string' ? stat.value : (stat.value === 2023 ? 2000 : 0)}
                </span>
                {stat.suffix}
              </span>
              <span className="text-micro text-ash uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

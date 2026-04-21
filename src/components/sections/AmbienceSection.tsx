'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import GoldDivider from '@/components/ui/GoldDivider';

export default function AmbienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backImgRef = useRef<HTMLDivElement>(null);
  const frontImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect
      gsap.to(backImgRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
          start: 'top bottom',
          end: 'bottom top',
        }
      });

      gsap.to(frontImgRef.current, {
        y: -200,
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
          start: 'top bottom',
          end: 'bottom top',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="ambience" ref={sectionRef} className="relative py-32 px-6 bg-gradient-to-b from-bg-primary to-bg-secondary overflow-hidden">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Column — Image Stack */}
        <div className="relative aspect-[3/4] w-full max-w-[500px] mx-auto lg:mx-0">
          {/* Back Image / Card */}
          <div 
            ref={backImgRef}
            className="absolute inset-0 bg-roast rounded-2xl overflow-hidden shadow-2xl border border-charcoal/10"
          >
             <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('/textures/grain.png')] bg-repeat" />
             <div className="absolute inset-0 bg-gradient-to-br from-caramel/20 to-transparent" />
             <div className="absolute bottom-8 left-8">
                <p className="text-micro text-cream/50 tracking-widest uppercase">The Space</p>
             </div>
          </div>

          {/* Front Image / Card */}
          <div 
            ref={frontImgRef}
            className="absolute bottom-[-10%] right-[-10%] w-[70%] aspect-[3/4] bg-bg-tertiary rounded-2xl overflow-hidden shadow-card border-[3px] border-bg-primary z-10"
          >
             <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('/textures/grain.png')] bg-repeat" />
             <div className="absolute inset-0 bg-gradient-to-tr from-caramel/30 via-transparent to-gold/20" />
             <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <span className="font-display text-2xl text-caramel italic">Where cinema meets coffee.</span>
             </div>
          </div>
        </div>

        {/* Right Column — Copy */}
        <div className="text-left">
          <p className="text-micro font-light tracking-ultra text-caramel uppercase mb-4">
            The Ambience
          </p>
          <h2 className="font-display text-h2 text-cream mb-8 leading-tight">
            Every corner,<br/>
            <span className="text-caramel italic">a scene.</span>
          </h2>
          
          <div className="space-y-6 mb-12">
            <p className="text-body text-smoke font-light leading-relaxed">
              Wool Cup Filmnagar is designed as a sanctuary for storytellers. Intimate lighting, textured surfaces, and quiet nooks provide the perfect backdrop for your next big idea or meaningful conversation.
            </p>
            <p className="text-body text-smoke font-light leading-relaxed">
              From the aroma of fresh beans to the soft hum of cinematic scores, 
              every detail is curated to transport you.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {["Cozy Nooks", "Film Screenings", "Live Acoustic", "Art Walls"].map(tag => (
              <span 
                key={tag}
                className="px-5 py-2 border border-caramel/20 rounded-full text-micro text-caramel tracking-wide uppercase hover:bg-caramel/10 transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import RevealText from '@/components/ui/RevealText';
import MagneticButton from '@/components/ui/MagneticButton';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Video load crossfade
    const video = videoRef.current;
    if (video) {
        if (video.readyState >= 3) {
            gsap.to(video, { opacity: 1, duration: 2, ease: 'power2.inOut' });
            gsap.to(posterRef.current, { opacity: 0, duration: 1.5, ease: 'power2.inOut' });
        } else {
            video.oncanplaythrough = () => {
                gsap.to(video, { opacity: 1, duration: 2, ease: 'power2.inOut' });
                gsap.to(posterRef.current, { opacity: 0, duration: 1.5, ease: 'power2.inOut' });
            };
        }
    }

    // 2. GSAP Text Animations
    const ctx = gsap.context(() => {
      // Overline stagger
      gsap.fromTo('.hero-overline', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
      );

      // Main Headline characters stagger
      gsap.to('.hero-headline .reveal-item', {
        y: 0,
        stagger: 0.03,
        duration: 0.8,
        delay: 0.8,
        ease: 'power3.out',
      });

      // Tagline fade up
      gsap.fromTo('.hero-tagline',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1.4, ease: 'power3.out' }
      );

      // CTA scale and fade up
      gsap.fromTo('.hero-cta',
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, delay: 1.8, ease: 'power3.out' }
      );

      // 3. Scroll Parallax
      gsap.to('.hero-video-wrapper', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        scale: 1.15,
        y: 100,
      });

      gsap.to('.hero-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        opacity: 0,
        y: -100,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-bg-primary">
      {/* Video Wrapper */}
      <div className="hero-video-wrapper absolute inset-0 z-0 will-change-transform">
        <img
          ref={posterRef}
          src="/videos/hero-poster.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-10 filter blur-[2px] brightness-[0.5]"
        />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-0"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-bg-primary/30 via-bg-primary/10 to-bg-primary" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_70%_70%_at_50%_45%,transparent,rgba(8,6,4,0.7))]" />
      </div>

      {/* Content */}
      <div ref={containerRef} className="hero-content relative z-20 h-full flex flex-col items-center justify-center text-center px-6 pt-[5vh]">
        <div className="max-w-[1200px] w-full">
          <p className="hero-overline text-micro tracking-ultra text-caramel uppercase mb-6 opacity-0">
            ✦  Filmnagar, Hyderabad  ✦
          </p>
          
          <h1 className="hero-headline font-display text-hero leading-tight text-cream mb-8">
            <RevealText className="block">Wool</RevealText>
            <RevealText className="block text-caramel italic">Cup</RevealText>
          </h1>

          <p className="hero-tagline text-body text-smoke tracking-wide max-w-sm mx-auto mb-12 opacity-0 font-light">
            Where every cup tells a story. Specialty coffee in the heart of the city.
          </p>

          <div className="hero-cta opacity-0">
            <MagneticButton>
              Explore the Experience →
            </MagneticButton>
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-pulse">
           <span className="text-micro text-ash tracking-widest uppercase">Scroll</span>
           <div className="w-[1px] h-10 bg-gradient-to-b from-caramel to-transparent" />
        </div>
      </div>
    </section>
  );
}

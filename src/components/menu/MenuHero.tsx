'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

export function MenuHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const flourishRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        [iconRef.current, headlineRef.current, subtitleRef.current, flourishRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.12 }
      );
    },
    { scope: sectionRef }
  );

  return (
    <>
      <style href="menu-grain" precedence="default">{`
        @keyframes menu-grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -3%); }
          30% { transform: translate(3%, 2%); }
          60% { transform: translate(-1%, 4%); }
          80% { transform: translate(4%, -1%); }
        }
        .menu-grain-overlay {
          position: relative;
          overflow: hidden;
        }
        .menu-grain-overlay::after {
          content: '';
          position: absolute;
          inset: -50%;
          width: 200%;
          height: 200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
          animation: menu-grain 8s steps(10) infinite;
          pointer-events: none;
          opacity: 0.5;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="menu-grain-overlay relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      >
        {/* Background video — swap src to /images/woolcup/menu-hero.mp4 when the new video arrives */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/woolcup/mango.mp4"
        />
        {/* Overlay so text stays readable */}
        <div className="absolute inset-0 bg-[#ead8b5]/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#231f20]/10 via-transparent to-[#ead8b5]/40" />

        <div ref={iconRef} className="relative z-10 text-[#231f20]/40 mb-6">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 14h18v14a4 4 0 01-4 4H12a4 4 0 01-4-4V14z" />
            <path d="M26 17h3a4 4 0 010 8h-3" />
            <path d="M13 8c0-2 3-2 3-4M20 8c0-2 3-2 3-4" />
          </svg>
        </div>

        <h1
          ref={headlineRef}
          className="relative z-10 font-display text-4xl md:text-5xl lg:text-6xl text-[#231f20]"
        >
          The Menu
        </h1>

        <p
          ref={subtitleRef}
          className="relative z-10 font-display text-xl md:text-2xl text-[#231f20] italic mt-3"
        >
          Coffees & Comfort
        </p>

        <div ref={flourishRef} className="relative z-10 mt-6 w-[100px] h-px bg-[#231f20]/40" />
      </section>
    </>
  );
}

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function FoundersPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        imageWrapperRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.0,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        [eyebrowRef.current, headlineRef.current, bodyRef.current, ctaRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: textColRef.current,
            start: 'top 85%',
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="founders" className="py-20 lg:py-32 bg-[#ead8b5]/30" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-20 items-center">

          {/* Image column — stacks on top on mobile */}
          <div
            ref={imageWrapperRef}
            className="relative overflow-hidden rounded-2xl aspect-[4/3] lg:aspect-[3/4] order-first lg:order-none"
          >
            {/* TODO: Replace with founder photo */}
            <img
              src="/images/new/interior-sofa.jpg"
              alt="Wool Cup interior"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-cream/10 mix-blend-multiply pointer-events-none" />
          </div>

          {/* Text column */}
          <div ref={textColRef} className="flex flex-col gap-6">
            <p
              ref={eyebrowRef}
              className="font-ui uppercase tracking-[0.3em] text-xs text-dark/50"
            >
              Our Story
            </p>
            <h2
              ref={headlineRef}
              className="font-display text-3xl md:text-4xl lg:text-5xl text-dark"
            >
              Where comfort meets <em>craft.</em>
            </h2>
            <p
              ref={bodyRef}
              className="font-body text-base md:text-lg text-dark/80 leading-relaxed"
            >
              Wool Cup was born from a simple belief — that every cup of coffee
              and every bite of food should feel like a warm embrace. Founded in
              the heart of Film Nagar, we set out to create a sanctuary where
              slow mornings, honest conversations, and handcrafted flavours come
              together.
            </p>
            <a
              ref={ctaRef}
              href="/about"
              className="font-ui text-sm uppercase tracking-wide text-dark w-fit relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-dark hover:after:w-full after:transition-all after:duration-500"
            >
              Read our full story →
            </a>
            <img
              src="/images/mascot.svg"
              alt=""
              aria-hidden="true"
              width={90}
              height={105}
              className="w-[70px] md:w-[90px] mt-2 pointer-events-none select-none opacity-80"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type CardSize = 'standard' | 'large' | 'tall';

interface GlimpseCardProps {
  image: string;
  label: string;
  title: string;
  description: string;
  href: string;
  size: CardSize;
  className?: string;
}

const SIZE_CLASSES: Record<CardSize, string> = {
  standard: 'min-h-[200px] md:min-h-[300px]',
  large: 'min-h-[240px] md:min-h-[400px]',
  tall: 'min-h-[260px] md:min-h-[500px]',
};

function GlimpseCard({ image, label, title, description, href, size, className }: GlimpseCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'relative overflow-hidden rounded-xl group block h-full',
        SIZE_CLASSES[size],
        className
      )}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent group-hover:from-dark/40 transition-all duration-[600ms]" />
      <div className="absolute bottom-0 left-0 p-5 md:p-6">
        <p className="font-ui uppercase tracking-widest text-[10px] text-cream mb-1 flex items-center gap-2">
          <span className="w-4 h-px bg-cream inline-block" />
          {label}
        </p>
        <h3 className="font-display text-xl md:text-2xl text-white">{title}</h3>
        <p className="font-body text-sm text-white/70">{description}</p>
      </div>
    </Link>
  );
}

interface CardData {
  image: string;
  label: string;
  title: string;
  description: string;
  href: string;
  size: CardSize;
  gridClass: string;
}

const CARDS: CardData[] = [
  {
    image: '/images/woolcup/food-03.jpg',
    label: 'Seasonal',
    title: 'Seasonal Dishes',
    description: 'Crafted with ingredients at their peak',
    href: '/menu#seasonal',
    size: 'large',
    gridClass: 'md:col-span-2',
  },
  {
    image: '/images/new/cake-slice.jpg',
    label: 'Must-Try',
    title: 'Must-Try',
    description: 'Our most loved bites and brews',
    href: '/menu',
    size: 'tall',
    gridClass: 'md:row-span-2',
  },
  {
    image: '/images/woolcup/interior-01.jpg',
    label: 'Reviews',
    title: 'What They Say',
    description: 'Stories from our regulars',
    href: '/about#reviews',
    size: 'standard',
    gridClass: '',
  },
  {
    image: '/images/new/interior-wide-cloud.jpg',
    label: 'Gallery',
    title: 'Gallery',
    description: 'A glimpse inside Wool Cup',
    href: '/gallery',
    size: 'large',
    gridClass: '',
  },
  {
    image: '/images/new/exterior-night.jpg',
    label: 'Locations',
    title: 'Find Us',
    description: 'Film Nagar, Hyderabad',
    href: '/visit',
    size: 'standard',
    gridClass: '',
  },
  {
    image: '/images/new/dessert-case.jpg',
    label: 'Bakery',
    title: 'The Bakery',
    description: 'Fresh pastries, daily',
    href: '/menu#bakery',
    size: 'standard',
    gridClass: '',
  },
  {
    image: '/images/new/interior-dining.jpg',
    label: 'Events',
    title: 'Celebrations',
    description: 'Private events and gatherings',
    href: '/cakes',
    size: 'standard',
    gridClass: '',
  },
];

export function GlimpseGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.fromTo(
        [eyebrowRef.current, headlineRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        cardRefs.current.filter((r): r is HTMLDivElement => r !== null),
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="explore" className="bg-ivory py-24 md:py-32" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section header */}
        <div ref={headerRef} className="mb-12 md:mb-16">
          <p
            ref={eyebrowRef}
            className="font-ui uppercase tracking-[0.3em] text-xs text-brown/70 mb-4"
          >
            The Experience
          </p>
          <h2
            ref={headlineRef}
            className="font-display text-4xl md:text-5xl text-brown"
          >
            Explore <em>Wool Cup</em>
          </h2>
        </div>

        {/* Bento grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {CARDS.map((card, i) => (
            <div
              key={card.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={card.gridClass}
            >
              <GlimpseCard
                image={card.image}
                label={card.label}
                title={card.title}
                description={card.description}
                href={card.href}
                size={card.size}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

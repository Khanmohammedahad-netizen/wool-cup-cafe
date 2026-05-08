# Custom Cakes Page + Celebrations Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/cakes` page for custom cake inquiries and integrate subtle celebrations messaging into the footer and locations section.

**Architecture:** Server component `src/app/cakes/page.tsx` renders 4 client section components. Footer and Locations receive targeted edits — no structural changes to either file. All new components follow the established `useGSAP` + ScrollTrigger pattern.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4, GSAP 3.15 + `@gsap/react`, Framer Motion v12

---

## File Map

| Action | Path |
|--------|------|
| Modify | `src/components/navbar/Navbar.tsx` |
| Modify | `src/components/footer/Footer.tsx` |
| Modify | `src/components/locations/Locations.tsx` |
| Create | `src/components/cakes/CakesHero.tsx` |
| Create | `src/components/cakes/CakesGallery.tsx` |
| Create | `src/components/cakes/CakesHowItWorks.tsx` |
| Create | `src/components/cakes/CakesInquiryCTA.tsx` |
| Create | `src/app/cakes/page.tsx` |

---

### Task 1: Navbar + Footer + Locations — site-wide updates

**Files:**
- Modify: `src/components/navbar/Navbar.tsx`
- Modify: `src/components/footer/Footer.tsx`
- Modify: `src/components/locations/Locations.tsx`

- [ ] **Step 1: Add Cakes to Navbar**

In `src/components/navbar/Navbar.tsx`, replace the `navLinks` array:

```tsx
  const navLinks = [
    { name: 'Story', href: '/about' },
    { name: 'Menu', href: '/menu' },
    { name: 'Cakes', href: '/cakes' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Origin', href: '#origin' },
    { name: 'Offerings', href: '#offerings' },
    { name: 'Space', href: '#space' },
    { name: 'Visit', href: '#locations' },
  ];
```

- [ ] **Step 2: Add "For Special Moments" row to Footer**

In `src/components/footer/Footer.tsx`, insert the special moments row inside the `<div className="max-w-[1200px] mx-auto">` wrapper, directly before the `<div className="grid grid-cols-1 md:grid-cols-3 ...">` line:

The full updated `Footer.tsx`:

```tsx
'use client';

import { HairlineRule } from '@/components/ui/HairlineRule';

export function Footer() {
  return (
    <footer className="bg-bg-secondary px-6 md:px-12 pb-16 pt-24 border-t border-border">
      <div className="max-w-[1200px] mx-auto">

        <div className="bg-[#ead8b5]/5 rounded-xl px-8 py-6 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h4 className="font-display text-lg text-text-primary mb-1">For Special Moments</h4>
            <p className="font-body text-sm text-text-tertiary max-w-md">
              Dessert platters, celebration cakes, curated spreads — crafted for your gatherings and events.
            </p>
          </div>
          <a
            href="https://wa.me/917292944244?text=Hi%20Wool%20Cup!%20I'd%20like%20to%20inquire%20about%20ordering%20for%20a%20special%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui text-xs uppercase tracking-wide text-text-secondary hover:text-text-primary transition-colors shrink-0"
          >
            Inquire →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20">
          <div>
            <span className="font-display text-[18px] tracking-[0.2em] font-medium text-text-primary block mb-4">
              WOOL CUP
            </span>
            <p className="font-body text-[14px] text-text-tertiary">
              Coffee, quieted.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-ui text-[11px] font-medium uppercase text-text-tertiary tracking-[0.2em] mb-4">Social</h4>
            <a href="https://instagram.com/woolcup" target="_blank" className="font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors">Instagram</a>
            <a href="https://wa.me/917292944244" target="_blank" className="font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors">WhatsApp</a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-ui text-[11px] font-medium uppercase text-text-tertiary tracking-[0.2em] mb-4">Legal</h4>
            <a href="#" className="font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors">Terms of Service</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border-light">
          <p className="font-ui text-[12px] text-text-tertiary">
            © 2026 WOOL CUP CAFE
          </p>
          <p className="font-ui text-[12px] text-text-tertiary">
            Designed in Hyderabad
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Add "Planning something special?" to Locations cards**

In `src/components/locations/Locations.tsx`, find the phone paragraph inside the card content block:

```tsx
                  <p className="font-body text-sm text-dark/70">{loc.phone}</p>
```

Replace it with (adds the inquiry line immediately after):

```tsx
                  <p className="font-body text-sm text-dark/70">{loc.phone}</p>
                  <p className="font-body text-sm italic text-dark/60 mt-2">
                    Planning something special?{' '}
                    <a
                      href="https://wa.me/917292944244?text=Hi%20Wool%20Cup!%20I'd%20like%20to%20inquire%20about%20a%20special%20event."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-dark transition-colors"
                    >
                      Inquire →
                    </a>
                  </p>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/navbar/Navbar.tsx src/components/footer/Footer.tsx src/components/locations/Locations.tsx
git commit -m "feat: cakes nav link, special moments footer row, location inquiry line"
```

---

### Task 2: CakesHero

**Files:**
- Create: `src/components/cakes/CakesHero.tsx`

60vh hero with `dessert-case.jpg` background, warm dark gradient overlay, GSAP mount-time stagger.

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

export function CakesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        [eyebrowRef.current, headlineRef.current, subtitleRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out', stagger: 0.15 }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background image — TODO: Replace with woolcup-cake-branded.jpg once available */}
      <img
        src="/images/new/dessert-case.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Warm dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#231f20]/80 via-[#231f20]/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <p
          ref={eyebrowRef}
          className="font-ui uppercase tracking-[0.3em] text-xs text-[#ead8b5]/70 mb-4"
        >
          The Bakery
        </p>
        <h1
          ref={headlineRef}
          className="font-display text-5xl md:text-6xl text-white"
        >
          Celebration <em>cakes.</em>
        </h1>
        <p
          ref={subtitleRef}
          className="font-body text-lg text-[#ead8b5]/80 mt-4 max-w-xl"
        >
          Handcrafted with love, designed for your moments.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/cakes/CakesHero.tsx
git commit -m "feat: CakesHero — 60vh hero with dessert-case background"
```

---

### Task 3: CakesGallery

**Files:**
- Create: `src/components/cakes/CakesGallery.tsx`

Cream-tinted background, CSS `columns` masonry, 6 placeholder cards alternating `aspect-square` / `aspect-[3/4]`. GSAP stagger on scroll.

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PLACEHOLDER_CARDS = [
  { aspect: 'aspect-square' },
  { aspect: 'aspect-[3/4]' },
  { aspect: 'aspect-square' },
  { aspect: 'aspect-[3/4]' },
  { aspect: 'aspect-square' },
  { aspect: 'aspect-[3/4]' },
];

export function CakesGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
        }
      );

      gsap.fromTo(
        cardRefs.current.filter((r): r is HTMLDivElement => r !== null),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: { trigger: cardRefs.current[0], start: 'top 85%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-[#ead8b5]/10 py-20 md:py-28">
      <div ref={headerRef} className="max-w-3xl mx-auto px-6 text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl text-[#231f20]">
          Our Creations
        </h2>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 max-w-6xl mx-auto px-6">
        {PLACEHOLDER_CARDS.map((card, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`break-inside-avoid mb-4 ${card.aspect} bg-[#ead8b5]/30 rounded-xl border border-[#ead8b5]/50 flex items-center justify-center`}
          >
            {/* TODO: Replace with cake photos */}
            <span className="font-display text-[#231f20]/30 text-2xl">Coming Soon</span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/cakes/CakesGallery.tsx
git commit -m "feat: CakesGallery — masonry placeholder grid"
```

---

### Task 4: CakesHowItWorks

**Files:**
- Create: `src/components/cakes/CakesHowItWorks.tsx`

White background, 3-step horizontal layout with dashed connector line (desktop only), GSAP stagger on scroll.

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = [
  {
    number: '01',
    title: 'Imagine',
    description: 'Tell us about your celebration — the flavours you love, the colours you envision, the story you want to tell.',
  },
  {
    number: '02',
    title: 'Create',
    description: 'Our pastry team brings your vision to life with premium ingredients, artistic precision, and a whole lot of heart.',
  },
  {
    number: '03',
    title: 'Celebrate',
    description: 'Pick up your creation — or let us deliver it to your doorstep — and make your moment unforgettable.',
  },
];

export function CakesHowItWorks() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
        }
      );

      gsap.fromTo(
        stepRefs.current.filter((r): r is HTMLDivElement => r !== null),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: { trigger: stepRefs.current[0], start: 'top 85%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-white py-20 md:py-28">
      <div ref={headerRef} className="max-w-3xl mx-auto px-6 text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl text-[#231f20]">
          Made for <em>you.</em>
        </h2>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Dashed connector line — desktop only */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px border-t border-dashed border-[#ead8b5] z-0"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { stepRefs.current[i] = el; }}
              className="text-center"
            >
              <span className="font-display text-4xl text-[#ead8b5] mb-4 block">
                {step.number}
              </span>
              <h3 className="font-display text-lg text-[#231f20] mb-3">{step.title}</h3>
              <p className="font-body text-sm text-[#231f20]/70 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/cakes/CakesHowItWorks.tsx
git commit -m "feat: CakesHowItWorks — 3-step process with dashed connector"
```

---

### Task 5: CakesInquiryCTA

**Files:**
- Create: `src/components/cakes/CakesInquiryCTA.tsx`

Dark background, WhatsApp primary CTA + tel secondary link + advance notice note.

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CakesInquiryCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-[#231f20] py-20 md:py-28">
      <div ref={contentRef} className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-display text-4xl text-white mb-4">
          Let's create something <em>beautiful.</em>
        </h2>
        <p className="font-body text-lg text-[#ead8b5]/70 mb-10">
          Tell us about your celebration and we'll craft something perfect.
        </p>

        <a
          href="https://wa.me/917292944244?text=Hi%20Wool%20Cup!%20I'd%20like%20to%20inquire%20about%20a%20custom%20cake."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#ead8b5] text-[#231f20] font-ui text-sm uppercase tracking-wide px-8 py-3 rounded-full hover:bg-white hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
        >
          Start a Conversation →
        </a>

        <a
          href="tel:+917292944244"
          className="font-body text-sm text-[#ead8b5]/70 hover:text-[#ead8b5] transition-colors mt-4 block"
        >
          or call us
        </a>

        <p className="font-ui text-xs text-white/40 mt-8">
          We recommend ordering at least 48 hours in advance for custom designs.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/cakes/CakesInquiryCTA.tsx
git commit -m "feat: CakesInquiryCTA — WhatsApp CTA + tel link"
```

---

### Task 6: page.tsx + build verify

**Files:**
- Create: `src/app/cakes/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
import type { Metadata } from 'next'
import { CakesHero } from '@/components/cakes/CakesHero'
import { CakesGallery } from '@/components/cakes/CakesGallery'
import { CakesHowItWorks } from '@/components/cakes/CakesHowItWorks'
import { CakesInquiryCTA } from '@/components/cakes/CakesInquiryCTA'

export const metadata: Metadata = {
  title: 'Custom Cakes — Wool Cup Urban Café & Bistro',
  description: 'Handcrafted celebration cakes designed for your special moments. Order custom cakes from Wool Cup, Hyderabad.',
}

export default function CakesPage() {
  return (
    <main>
      <CakesHero />
      <CakesGallery />
      <CakesHowItWorks />
      <CakesInquiryCTA />
    </main>
  )
}
```

- [ ] **Step 2: Run build**

```powershell
pnpm build
```

Expected: Build completes with `/cakes` listed as a static route alongside `/`, `/about`, `/menu`.

- [ ] **Step 3: Final commit**

```bash
git add src/app/cakes/page.tsx
git commit -m "feat: custom cakes page + celebrations integration across site"
```

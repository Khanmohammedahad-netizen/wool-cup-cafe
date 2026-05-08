# About Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create an editorial `/about` founders story page with 6 cinematic sections, plus update the Navbar to add a Story link and fix the broken Visit → #locations href.

**Architecture:** Server component `src/app/about/page.tsx` exports metadata and renders 6 client section components. Each section component uses `useGSAP()` + ScrollTrigger for scroll-driven animations, matching the pattern established throughout the codebase (see `src/components/locations/Locations.tsx` for reference). No new dependencies needed — `@gsap/react`, `gsap`, and `next/link` are already installed.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4, GSAP 3.15 + `@gsap/react`, `useGSAP()`

---

## File Map

| Action | Path |
|--------|------|
| Modify | `src/components/navbar/Navbar.tsx` |
| Create | `src/components/about/AboutHero.tsx` |
| Create | `src/components/about/AboutOrigin.tsx` |
| Create | `src/components/about/AboutPhilosophy.tsx` |
| Create | `src/components/about/AboutSpace.tsx` |
| Create | `src/components/about/AboutPeople.tsx` |
| Create | `src/components/about/AboutCTA.tsx` |
| Create | `src/app/about/page.tsx` |

---

### Task 1: Navbar — add Story link, fix Visit → #locations

**Files:**
- Modify: `src/components/navbar/Navbar.tsx:17-23` (navLinks array)
- Modify: `src/components/navbar/Navbar.tsx:49-54` (Reserve button href)

The `navLinks` array currently has `Visit` pointing to `#visit` — this is broken because Phase 3 renamed the section to `id="locations"`. The Reserve button also has the stale `#visit` href. Both must be fixed. Add `Story` before `Philosophy`.

- [ ] **Step 1: Update navLinks array and Reserve button href**

Replace lines 17-23 in `src/components/navbar/Navbar.tsx`:

```tsx
  const navLinks = [
    { name: 'Story', href: '/about' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Origin', href: '#origin' },
    { name: 'Offerings', href: '#offerings' },
    { name: 'Space', href: '#space' },
    { name: 'Visit', href: '#locations' },
  ];
```

Also update the Reserve button href on line ~51 from `href="#visit"` to `href="#locations"`:

```tsx
          <Link
            href="#locations"
            className="hidden lg:block border border-dark text-dark font-ui text-[0.8rem] tracking-[0.12em] font-medium uppercase px-5 py-2 rounded-full hover:bg-dark hover:text-white transition-all duration-300"
          >
            Reserve
          </Link>
```

- [ ] **Step 2: Verify build passes**

```powershell
pnpm build
```

Expected: No TypeScript errors. Ignore static export warnings about missing `generateStaticParams` — the about page is dynamic.

- [ ] **Step 3: Commit**

```bash
git add src/components/navbar/Navbar.tsx
git commit -m "fix: navbar — add Story link, fix Visit → #locations"
```

---

### Task 2: AboutHero — full-viewport parallax hero

**Files:**
- Create: `src/components/about/AboutHero.tsx`

Full-viewport section with `interior-wide-cloud.jpg` as background, GSAP parallax (`yPercent: 20, scrub: true`) on the image div, and a mount-time fade-in (no ScrollTrigger — it's the first thing the user sees).

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        [eyebrowRef.current, headlineRef.current],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', stagger: 0.15 }
      );

      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/images/new/interior-wide-cloud.jpg"
          alt=""
          aria-hidden="true"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#ead8b5]/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#231f20]/60 via-transparent to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p
          ref={eyebrowRef}
          className="font-ui uppercase tracking-[0.3em] text-xs text-white/70 mb-4"
        >
          Our Story
        </p>
        <h1
          ref={headlineRef}
          className="font-display text-5xl md:text-6xl lg:text-7xl text-white max-w-4xl leading-tight"
        >
          Born from a love of <em>slow mornings.</em>
        </h1>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/about/AboutHero.tsx
git commit -m "feat: AboutHero — full-viewport parallax section"
```

---

### Task 3: AboutOrigin — 2-column origin story

**Files:**
- Create: `src/components/about/AboutOrigin.tsx`

White background, 60/40 grid (text left, image right), 3 paragraphs about the café's founding, `interior-sofa.jpg` in a `aspect-[3/4]` container. GSAP stagger animates eyebrow + all 3 paragraphs + image on scroll.

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PARAGRAPHS = [
  "Every great café begins with a conversation. For us, it started over a cup of coffee that wasn't quite right — too rushed, too impersonal, too forgettable. We knew Hyderabad deserved something different.",
  "Wool Cup was born in 2024, not as a business plan, but as a promise — to create a space where every cup is pulled with intention, every dish is crafted with care, and every guest feels the warmth of belonging.",
  "We named it Wool Cup because wool is warm, familiar, comforting. It wraps around you. That's what we wanted our café to feel like — a place that wraps around you like your favourite sweater on a quiet morning.",
];

export function AboutOrigin() {
  const containerRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const parasRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        [eyebrowRef.current, ...parasRef.current.filter(Boolean), imageRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-white py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-12 lg:gap-20 items-center max-w-7xl mx-auto px-6 md:px-12">
        <div>
          <p
            ref={eyebrowRef}
            className="font-ui uppercase tracking-[0.3em] text-xs text-dark/50 mb-6"
          >
            The Beginning
          </p>
          {PARAGRAPHS.map((text, i) => (
            <p
              key={i}
              ref={(el) => { parasRef.current[i] = el; }}
              className="font-body text-lg text-dark/85 leading-loose mb-6"
            >
              {text}
            </p>
          ))}
        </div>

        <div ref={imageRef} className="rounded-2xl overflow-hidden shadow-md aspect-[3/4]">
          <img
            src="/images/new/interior-sofa.jpg"
            alt="Wool Cup sofa seating area"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/about/AboutOrigin.tsx
git commit -m "feat: AboutOrigin — 2-col origin story section"
```

---

### Task 4: AboutPhilosophy — pull quote + 3 value pillars

**Files:**
- Create: `src/components/about/AboutPhilosophy.tsx`

Cream background (`bg-[#ead8b5]/20`), centered layout, pull quote animates first then 3 pillars stagger up.

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PILLARS = [
  {
    number: '01',
    title: 'Intentional Sourcing',
    description: 'Every bean is chosen, not settled for. We work directly with estates in the Chikmagalur hills — shade-grown, single-origin, scoring 86+ on the SCA scale.',
  },
  {
    number: '02',
    title: 'Honest Craft',
    description: 'No shortcuts. No artificial syrups. Every extraction, every bake, every plate is the honest result of care and practice.',
  },
  {
    number: '03',
    title: 'Warm Belonging',
    description: "Wool Cup isn't just a café — it's a feeling. A place where strangers become regulars and every visit feels like coming home.",
  },
];

export function AboutPhilosophy() {
  const containerRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const attributionRef = useRef<HTMLParagraphElement>(null);
  const pillarsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.fromTo(
        [quoteRef.current, attributionRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: { trigger: quoteRef.current, start: 'top 85%' },
        }
      );

      gsap.fromTo(
        pillarsRef.current.filter(Boolean),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: { trigger: pillarsRef.current[0], start: 'top 85%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-[#ead8b5]/20 py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p
          ref={quoteRef}
          className="font-display text-3xl md:text-4xl lg:text-5xl text-dark italic leading-tight mb-4"
        >
          "We don't just serve coffee. We serve the pause."
        </p>
        <p ref={attributionRef} className="font-ui text-sm text-dark/50 mb-20">
          — The Founders
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left mt-16">
          {PILLARS.map((pillar, i) => (
            <div key={pillar.number} ref={(el) => { pillarsRef.current[i] = el; }}>
              <p className="font-ui text-[10px] uppercase tracking-widest text-dark/30 mb-4">
                {pillar.number}
              </p>
              <h3 className="font-display text-xl text-dark mb-3">{pillar.title}</h3>
              <p className="font-body text-sm text-dark/70 leading-relaxed">
                {pillar.description}
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
git add src/components/about/AboutPhilosophy.tsx
git commit -m "feat: AboutPhilosophy — pull quote + 3 value pillars"
```

---

### Task 5: AboutSpace — asymmetric photo gallery

**Files:**
- Create: `src/components/about/AboutSpace.tsx`

White background, 2-col CSS grid where cell 1 spans 2 rows (tall), cells 2 and 3 are half-height. A 4th full-width image sits below. All 4 cells stagger fade-in on scroll.

Images used:
- Cell 1 (row-span-2): `/images/new/interior-wide-cloud.jpg`
- Cell 2: `/images/woolcup/food-01.jpg`
- Cell 3: `/images/new/exterior-wide.jpg`
- Cell 4 (full width below): `/images/new/barista-pour.jpg`

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AboutSpace() {
  const containerRef = useRef<HTMLElement>(null);
  const cell1Ref = useRef<HTMLDivElement>(null);
  const cell2Ref = useRef<HTMLDivElement>(null);
  const cell3Ref = useRef<HTMLDivElement>(null);
  const cell4Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        [cell1Ref.current, cell2Ref.current, cell3Ref.current, cell4Ref.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div ref={cell1Ref} className="md:row-span-2 rounded-2xl overflow-hidden min-h-[400px]">
            <img
              src="/images/new/interior-wide-cloud.jpg"
              alt="Wool Cup interior — wide view with cloud ceiling"
              className="object-cover w-full h-full"
            />
          </div>

          <div ref={cell2Ref} className="rounded-2xl overflow-hidden h-[280px]">
            <img
              src="/images/woolcup/food-01.jpg"
              alt="Wool Cup food"
              className="object-cover w-full h-full"
            />
          </div>

          <div ref={cell3Ref} className="rounded-2xl overflow-hidden h-[280px]">
            <img
              src="/images/new/exterior-wide.jpg"
              alt="Wool Cup exterior"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div ref={cell4Ref} className="mt-4 rounded-2xl overflow-hidden h-[300px] w-full">
          <img
            src="/images/new/barista-pour.jpg"
            alt="Barista pouring coffee"
            className="object-cover w-full h-full"
          />
        </div>

        <p className="font-body italic text-center text-dark/60 mt-8 text-base">
          Designed for slow mornings and conversations that matter.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/about/AboutSpace.tsx
git commit -m "feat: AboutSpace — asymmetric 2×2 photo gallery"
```

---

### Task 6: AboutPeople — founder placeholder

**Files:**
- Create: `src/components/about/AboutPeople.tsx`

Warm cream background (`bg-[#ead8b5]/10`), centered placeholder text. No founder photos are available yet — the section uses a TODO comment for future replacement. Single content div fades in on scroll.

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AboutPeople() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 85%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-[#ead8b5]/10 py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* TODO: Replace with 2-column founder portrait grid once photos are available */}
        <div ref={contentRef}>
          <p className="font-ui uppercase tracking-[0.3em] text-xs text-dark/50 mb-6">
            The People
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-dark">
            The faces behind every cup.
          </h2>
          <p className="font-body text-base text-dark/60 mt-4">
            We'll introduce you soon.
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/about/AboutPeople.tsx
git commit -m "feat: AboutPeople — founder placeholder section"
```

---

### Task 7: AboutCTA — dark closing call-to-action

**Files:**
- Create: `src/components/about/AboutCTA.tsx`

Dark background (`bg-[#231f20]`), "WOOL CUP" text watermark in `text-white/5` behind content, two buttons: "Visit Us →" links to `/#locations`, "Follow Our Story →" links to the Instagram URL.

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AboutCTA() {
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
    <section ref={containerRef} className="bg-[#231f20] py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 text-center relative overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center font-display text-[clamp(80px,15vw,160px)] text-white/5 tracking-[0.3em] select-none pointer-events-none"
        >
          WOOL CUP
        </span>

        <div ref={contentRef} className="relative z-10">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            Come find us.
          </h2>
          <p className="font-body text-lg text-[#ead8b5]/70 mb-10">
            Film Nagar & Financial District, Hyderabad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#locations"
              className="bg-[#ead8b5] text-dark font-ui text-sm uppercase tracking-wide px-8 py-3 rounded-full hover:bg-white transition-colors duration-300"
            >
              Visit Us →
            </Link>
            <a
              href="https://www.instagram.com/woolcupcafe"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#ead8b5]/60 text-[#ead8b5] font-ui text-sm uppercase tracking-wide px-8 py-3 rounded-full hover:border-[#ead8b5] hover:bg-[#ead8b5]/10 transition-all duration-300"
            >
              Follow Our Story →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/about/AboutCTA.tsx
git commit -m "feat: AboutCTA — dark closing section with text watermark"
```

---

### Task 8: page.tsx + final commit

**Files:**
- Create: `src/app/about/page.tsx`

Server component — exports metadata, renders all 6 section components. No `'use client'` directive here; client boundaries are handled inside each section component.

- [ ] **Step 1: Create page.tsx**

```tsx
import type { Metadata } from 'next'
import { AboutHero } from '@/components/about/AboutHero'
import { AboutOrigin } from '@/components/about/AboutOrigin'
import { AboutPhilosophy } from '@/components/about/AboutPhilosophy'
import { AboutSpace } from '@/components/about/AboutSpace'
import { AboutPeople } from '@/components/about/AboutPeople'
import { AboutCTA } from '@/components/about/AboutCTA'

export const metadata: Metadata = {
  title: 'Our Story — Wool Cup Urban Café & Bistro',
  description: 'The journey behind Wool Cup. Born in Film Nagar, Hyderabad — a sanctuary of comfort, craft, and connection.',
}

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutOrigin />
      <AboutPhilosophy />
      <AboutSpace />
      <AboutPeople />
      <AboutCTA />
    </main>
  )
}
```

- [ ] **Step 2: Run build to verify no TypeScript errors**

```powershell
pnpm build
```

Expected: Build completes. The about route should appear in the output as a dynamic page (`/about`).

- [ ] **Step 3: Final commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: about/founders story page — editorial storytelling"
```

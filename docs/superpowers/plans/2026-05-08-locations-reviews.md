# Locations + Reviews Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Insert a warm cream-background SocialProof section (reviews + photo marquee) after Manifesto, and replace the single-location Visit section with a dual-location Locations section.

**Architecture:** Two new standalone components (`SocialProof`, `Locations`) wired into `page.tsx`. Existing components untouched. Marquee animation uses a React 19 `<style>` element with `href`/`precedence` props for SSR-safe hoisting. All scroll animations use `useGSAP()` + ScrollTrigger matching the Phase 2 pattern.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4, GSAP 3.15 + ScrollTrigger, `@gsap/react`

---

## AGENTS.md Requirement

Before touching any Next.js file, read the Next.js guide in `node_modules/next/dist/docs/`. Heed any notices about `<Link>`, `<style>`, or client components.

---

## File Map

| Action | Path |
|--------|------|
| Create | `src/components/social-proof/SocialProof.tsx` |
| Create | `src/components/locations/Locations.tsx` |
| Modify | `src/app/page.tsx` |

`src/components/visit/Visit.tsx` is no longer imported — leave the file on disk.

---

## Task 1: SocialProof section

**Files:**
- Create: `src/components/social-proof/SocialProof.tsx`

**What it builds:**
- Section `id="reviews"`, `bg-[#ead8b5]/15`
- Centered header: eyebrow "Guest Voices" + headline "Loved by *Hyderabad.*"
- 6 review cards in `grid-cols-1 md:grid-cols-3 gap-6`
- Each card: white bg, cream border, decorative `"`, gold stars, italic quote, attribution
- GSAP ScrollTrigger stagger on card entrance
- CSS auto-scrolling photo marquee strip below cards (React 19 `<style>` element for keyframe)

- [ ] **Step 1: Create directory**

```powershell
New-Item -ItemType Directory -Force -Path "src/components/social-proof"
```

- [ ] **Step 2: Write `src/components/social-proof/SocialProof.tsx`**

```tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const REVIEWS = [
  {
    name: 'Aryan M.',
    quote: 'Hands down the best coffee in Hyderabad. The pour over is a ritual — clean, bright, and completely unhurried.',
  },
  {
    name: 'Sneha R.',
    quote: 'Found my favourite corner of the city. The vanilla latte and the sofa section are my Sunday morning staples now.',
  },
  {
    name: 'Rahul K.',
    quote: 'Everything here is intentional — the music, the light, the coffee temperature. A rare place that gets hospitality right.',
  },
  {
    name: 'Priya S.',
    quote: 'The cloud ceiling alone is worth the visit, but the cold brew reserve kept me coming back. Exceptional.',
  },
  {
    name: 'Vikram A.',
    quote: "Not just a café — a proper third place. I've written three proposals here. The staff never rush you.",
  },
  {
    name: 'Meera T.',
    quote: 'The cake display changed my life. Genuinely. And the baristas know your order by the second visit.',
  },
];

const MARQUEE_IMAGES = [
  '/images/woolcup/interior-01.jpg',
  '/images/woolcup/food-01.jpg',
  '/images/woolcup/food-02.jpg',
  '/images/new/barista-pour.jpg',
  '/images/new/interior-hand-chairs.jpg',
  '/images/woolcup/interior-03.jpg',
  '/images/new/dessert-case.jpg',
  '/images/woolcup/food-03.jpg',
  '/images/new/exterior-wide.jpg',
  '/images/woolcup/interior-05.jpg',
];

export function SocialProof() {
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
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
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
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <>
      {/* React 19 hoisted style — SSR-safe marquee keyframe */}
      <style href="wool-marquee" precedence="default">{`
        @keyframes wool-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .wool-marquee-track {
          animation: wool-marquee 40s linear infinite;
        }
        .wool-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <section
        id="reviews"
        ref={containerRef}
        className="bg-[#ead8b5]/15 py-24 md:py-32"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Header */}
          <div ref={headerRef} className="text-center mb-16">
            <p
              ref={eyebrowRef}
              className="font-ui uppercase tracking-[0.3em] text-xs text-dark/50 mb-4"
            >
              Guest Voices
            </p>
            <h2
              ref={headlineRef}
              className="font-display text-4xl md:text-5xl text-dark"
            >
              Loved by <em>Hyderabad.</em>
            </h2>
          </div>

          {/* Review cards */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {REVIEWS.map((review, i) => (
              <div
                key={review.name}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="bg-white border border-[#ead8b5] rounded-xl p-6 md:p-8 relative overflow-hidden"
              >
                {/* Decorative quote mark */}
                <span
                  aria-hidden="true"
                  className="absolute top-2 left-4 font-display text-7xl text-[#ead8b5]/60 leading-none select-none pointer-events-none"
                >
                  &ldquo;
                </span>

                {/* Stars */}
                <p className="font-ui text-sm text-[#C9A84C] mb-4 relative z-10">
                  ★★★★★
                </p>

                {/* Quote */}
                <p className="font-body text-base md:text-lg text-dark/80 italic leading-relaxed mb-6 relative z-10">
                  {review.quote}
                </p>

                {/* Attribution */}
                <p className="font-ui text-sm text-dark/60">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Photo marquee strip */}
        <div className="overflow-hidden bg-white py-8 mt-16">
          <div className="wool-marquee-track flex gap-4">
            {[...MARQUEE_IMAGES, ...MARQUEE_IMAGES].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                aria-hidden="true"
                className="h-[200px] w-auto aspect-[4/3] object-cover rounded-lg flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Type-check**

```powershell
pnpm build 2>&1 | Select-String -Pattern "error TS" | Select-Object -First 20
```

Expected: no TypeScript errors from SocialProof.

- [ ] **Step 4: Commit**

```powershell
git add src/components/social-proof/SocialProof.tsx
git commit -m "feat: warm social proof section with reviews and photo marquee"
```

---

## Task 2: Locations section

**Files:**
- Create: `src/components/locations/Locations.tsx`

**What it builds:**
- Section `id="locations"`, white bg + radial cream gradient overlay
- Centered header: "Find Us" + "Two homes, one *soul.*"
- 2-column card grid (1-col mobile)
- Each card: image with badge pill, location details, CTA with underline animation
- Hover lift + shadow on each card
- Google Maps embed with grayscale filter → full color on hover
- GSAP ScrollTrigger stagger on card + header entrance

- [ ] **Step 1: Create directory**

```powershell
New-Item -ItemType Directory -Force -Path "src/components/locations"
```

- [ ] **Step 2: Write `src/components/locations/Locations.tsx`**

```tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LOCATIONS = [
  {
    image: '/images/new/exterior-wide.jpg',
    badge: 'Flagship',
    name: 'Film Nagar',
    address: 'CC 55, Road No. 1, Film Nagar, Opposite Papaya, Jubilee Hills, Hyderabad 500033',
    hours: 'Mon — Sun · 8:00 AM — 11:30 PM',
    phone: '+91 72929 44244',
    ctaLabel: 'Get Directions →',
    ctaHref: 'https://www.google.com/maps?q=17.4137993,78.4062934',
  },
  {
    image: '/images/woolcup/interior-01.jpg',
    badge: 'New',
    name: 'Financial District',
    address: 'Coming Soon — Financial District, Hyderabad',
    hours: 'Opening hours to be announced',
    phone: '+91 72929 44244',
    ctaLabel: 'Follow for updates →',
    ctaHref: 'https://www.instagram.com/woolcupcafe',
  },
];

export function Locations() {
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
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
        }
      );

      gsap.fromTo(
        cardRefs.current.filter((r): r is HTMLDivElement => r !== null),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="locations"
      ref={containerRef}
      className="relative bg-white py-24 md:py-32 overflow-hidden"
    >
      {/* Radial cream gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(234,216,181,0.2) 0%, transparent 100%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p
            ref={eyebrowRef}
            className="font-ui uppercase tracking-[0.3em] text-xs text-dark/50 mb-4"
          >
            Find Us
          </p>
          <h2
            ref={headlineRef}
            className="font-display text-4xl md:text-5xl text-dark"
          >
            Two homes, one <em>soul.</em>
          </h2>
        </div>

        {/* Location cards */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {LOCATIONS.map((loc, i) => (
            <div
              key={loc.name}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="rounded-2xl overflow-hidden bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-[400ms]"
            >
              {/* Image */}
              <div className="relative h-[280px] overflow-hidden">
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent" />
                <span className="absolute top-4 right-4 font-ui text-[10px] uppercase tracking-widest bg-[#ead8b5] text-dark px-3 py-1 rounded-full">
                  {loc.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="font-display text-2xl md:text-3xl text-dark mb-4">
                  {loc.name}
                </h3>
                <div className="space-y-2 mb-6">
                  <p className="font-body text-sm text-dark/70 leading-relaxed">
                    {loc.address}
                  </p>
                  <p className="font-body text-sm text-dark/70 leading-relaxed">
                    {loc.hours}
                  </p>
                  <p className="font-body text-sm text-dark/70">{loc.phone}</p>
                </div>
                <a
                  href={loc.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui text-sm uppercase tracking-wide text-dark w-fit relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-dark hover:after:w-full after:transition-all after:duration-500"
                >
                  {loc.ctaLabel}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Embedded map */}
        <div className="mt-12 rounded-2xl overflow-hidden h-[300px] md:h-[400px] w-full border border-[#ead8b5] group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.037130635467!2d78.40618067606774!3d17.41113060237905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96bc72e8211b%3A0xc3c5d6e2467d022b!2sFilm%20Nagar%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            className="[filter:grayscale(100%)_contrast(0.9)_brightness(1.1)] group-hover:[filter:none] transition-all duration-[600ms]"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </section>
  );
}
```

- [ ] **Step 3: Type-check**

```powershell
pnpm build 2>&1 | Select-String -Pattern "error TS" | Select-Object -First 20
```

Expected: no TypeScript errors from Locations.

- [ ] **Step 4: Commit**

```powershell
git add src/components/locations/Locations.tsx
git commit -m "feat: dual-location cards with map"
```

---

## Task 3: Wire page.tsx + final build + commit

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write `src/app/page.tsx`**

```tsx
import { Navbar } from '@/components/navbar/Navbar';
import { HeroFilm } from '@/components/hero/HeroFilm';
import { FoundersPreview } from '@/components/founders/FoundersPreview';
import { GlimpseGrid } from '@/components/glimpse/GlimpseGrid';
import { Manifesto } from '@/components/manifesto/Manifesto';
import { SocialProof } from '@/components/social-proof/SocialProof';
import { CupSequence } from '@/components/cup-sequence/CupSequence';
import { CraftTriptych } from '@/components/craft/CraftTriptych';
import { Ambience } from '@/components/ambience/Ambience';
import { MenuHighlight } from '@/components/menu/MenuHighlight';
import { InstagramFeed } from '@/components/instagram/InstagramFeed';
import { Locations } from '@/components/locations/Locations';
import { Footer } from '@/components/footer/Footer';

export default function Home() {
  return (
    <main className="relative flex flex-col bg-bg-primary min-h-screen noise-overlay fade-up-enter fade-up-enter-active">
      <Navbar />
      <HeroFilm />
      <FoundersPreview />
      <GlimpseGrid />
      <Manifesto />
      <SocialProof />
      <CupSequence />
      <CraftTriptych />
      <Ambience />
      <MenuHighlight />
      <InstagramFeed />
      <Locations />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Full build**

```powershell
pnpm build
```

Expected: build completes, route `/` compiles with no errors.

- [ ] **Step 3: Smoke-test**

```powershell
pnpm dev
```

Open `http://localhost:3000` and verify:
- Scrolling past Manifesto reveals "Guest Voices / Loved by *Hyderabad.*" section on cream bg
- 6 white review cards fade up in stagger
- Photo strip below cards scrolls automatically, pauses on hover, no dark bg
- CupSequence and CraftTriptych unchanged
- Scrolling to bottom shows "Find Us / Two homes, one *soul.*" section on white+cream gradient
- Two location cards side by side on desktop, stacked on mobile
- Flagship and New badges visible on card images
- Card hover lifts and shadows
- Map renders grayscale, turns full color on hover
- No `<Visit />` section visible (it's been replaced)

- [ ] **Step 4: Final commit**

```powershell
git add src/app/page.tsx
git commit -m "feat: warm reviews section + dual-location cards with map"
```

---

## Self-Review

**Spec coverage:**
- Reviews section: cream bg ✓, eyebrow/headline ✓, 6 named reviews ✓, white cards with cream border ✓, gold stars ✓, italic quote ✓, attribution ✓, GSAP stagger ✓
- Photo marquee: existing café images ✓, CSS animation ✓, white bg ✓, pauses on hover ✓
- Locations section: cream gradient bg ✓, centered header ✓, 2-col grid ✓, image+badge+details+CTA per card ✓, hover lift ✓, grayscale map → hover color ✓
- page.tsx: SocialProof after Manifesto ✓, Locations replaces Visit ✓, all other sections preserved ✓
- Commit message matches spec ✓

**Type consistency:** `REVIEWS`, `MARQUEE_IMAGES`, `LOCATIONS` all typed inline — no cross-task dependencies.

**React 19 style element:** `<style href="wool-marquee" precedence="default">` — unique `href` prevents duplicate injection across re-renders; `precedence` enables SSR streaming deduplication.

# Founders Preview + Glimpse Grid + Hero Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Founders Preview section and an editorial Glimpse Grid section after the hero, and swap the hero scroll arrow's Framer Motion animation for GSAP.

**Architecture:** Three isolated changes — minimal edit to HeroFilm, two new standalone components (FoundersPreview and GlimpseGrid), and a one-line page composition change. New components use `useGSAP()` from `@gsap/react` with ScrollTrigger; HeroFilm keeps its existing `useEffect` pattern. All animations are GSAP ScrollTrigger only — no AOS.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4, GSAP 3.15 + ScrollTrigger, `@gsap/react` (new dep), `@studio-freight/react-lenis`

---

## File Map

| Action | Path |
|--------|------|
| Modify | `src/components/hero/HeroFilm.tsx` |
| Create | `src/components/founders/FoundersPreview.tsx` |
| Create | `src/components/glimpse/GlimpseGrid.tsx` |
| Modify | `src/app/page.tsx` |

---

## AGENTS.md Requirement

Before touching any Next.js file, read the Next.js guide:
```
node_modules/next/dist/docs/
```
Heed any deprecation notices about `<Link>`, `<Image>`, or server/client component boundaries.

---

## Task 1: Install @gsap/react

**Files:**
- Modify: `package.json` (via pnpm)

- [ ] **Step 1: Install the package**

```powershell
pnpm add @gsap/react
```

Expected output: a line like `+ @gsap/react 2.x.x` and no errors.

- [ ] **Step 2: Verify package.json**

Open `package.json` and confirm `"@gsap/react"` appears in `dependencies`.

- [ ] **Step 3: Commit**

```powershell
git add package.json pnpm-lock.yaml
git commit -m "chore: add @gsap/react dependency"
```

---

## Task 2: Hero scroll arrow — replace Framer bounce with GSAP

**Files:**
- Modify: `src/components/hero/HeroFilm.tsx`

**What changes:**
- Add `useRef`, `useEffect` imports from React (keep existing framer-motion import — `motion.span` / `motion.h1` stay)
- Add `import gsap from 'gsap'`
- Add `arrowRef` on the SVG
- Replace `motion.div` wrapper around the arrow with a plain `div`
- Add GSAP infinite bounce in `useEffect`
- Add `font-ui uppercase tracking-widest` classes to the SCROLL `<span>`

- [ ] **Step 1: Replace the file**

Write `src/components/hero/HeroFilm.tsx` with this exact content:

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { HeroVideo } from './HeroVideo';

export function HeroFilm() {
  const arrowRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!arrowRef.current) return;
    const tween = gsap.to(arrowRef.current, {
      y: 6,
      duration: 1.5,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });
    return () => { tween.kill(); };
  }, []);

  return (
    <section className="relative w-full">
      <HeroVideo />

      {/* Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16">
        <div className="max-w-[1100px] mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="block text-label text-white/70 mb-2 md:mb-4"
          >
            Specialty Coffee · Hyderabad
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-white text-display-xl max-w-[850px]"
          >
            Where every cup is a quiet ritual.
          </motion.h1>
        </div>
      </div>

      {/* Scroll Cue */}
      <div className="flex flex-col items-center justify-center pt-8 pb-12">
        <div className="text-text-soft">
          <svg
            ref={arrowRef}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        <span className="text-label font-ui uppercase tracking-widest mt-2">SCROLL</span>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```powershell
pnpm build 2>&1 | Select-String -Pattern "error|Error" | Select-Object -First 20
```

Expected: no TypeScript errors related to HeroFilm.

- [ ] **Step 3: Commit**

```powershell
git add src/components/hero/HeroFilm.tsx
git commit -m "feat: replace framer bounce with GSAP on hero scroll arrow"
```

---

## Task 3: FoundersPreview section

**Files:**
- Create: `src/components/founders/FoundersPreview.tsx`

**Layout recap:**
- Section bg: `bg-[#ead8b5]/30` (cream at 30% opacity)
- 2-column grid: `lg:grid-cols-[55fr_45fr]` — image left, text right
- Mobile: single column, image stacks on top
- Image: `/images/new/interior-sofa.jpg` placeholder with TODO comment
- GSAP clip-path reveal on image, stagger reveal on text elements
- CTA underline animates via CSS `after:` pseudo-element hover

- [ ] **Step 1: Create the directory and file**

```powershell
New-Item -ItemType Directory -Force -Path "src/components/founders"
```

- [ ] **Step 2: Write `src/components/founders/FoundersPreview.tsx`**

```tsx
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
          </div>

        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Type-check**

```powershell
pnpm build 2>&1 | Select-String -Pattern "error|Error" | Select-Object -First 20
```

Expected: no errors related to FoundersPreview.

- [ ] **Step 4: Commit**

```powershell
git add src/components/founders/FoundersPreview.tsx
git commit -m "feat: founders preview section"
```

---

## Task 4: GlimpseGrid section

**Files:**
- Create: `src/components/glimpse/GlimpseGrid.tsx`

**Grid layout (3 columns, desktop):**

CSS grid auto-placement gives this result with just `col-span-2` on Seasonal and `row-span-2` on Must-Try:

```
Row 1: [Seasonal: cols 1-2        ] [Must-Try: col 3 ↕ rows 1-2]
Row 2: [Reviews: col 1] [Gallery: col 2] [Must-Try: col 3       ]
Row 3: [Locations: col 1] [Bakery: col 2] [Celebrations: col 3  ]
```

> Note: the spec listed Gallery as col-span-2 in row 2, but with Must-Try occupying col 3 of that row, only 1 column remains — Gallery takes that single column. The layout still looks intentional and balanced.

**Images (all verified in `public/images/`):**

| Card | File |
|------|------|
| Seasonal Dishes | `/images/woolcup/food-01.jpg` |
| Must-Try | `/images/new/cake-slice.jpg` |
| What They Say (Reviews) | `/images/woolcup/interior-01.jpg` |
| Gallery | `/images/new/interior-wide-cloud.jpg` |
| Find Us (Locations) | `/images/new/exterior-night.jpg` |
| The Bakery | `/images/new/dessert-case.jpg` |
| Celebrations | `/images/new/interior-dining.jpg` |

- [ ] **Step 1: Create the directory**

```powershell
New-Item -ItemType Directory -Force -Path "src/components/glimpse"
```

- [ ] **Step 2: Write `src/components/glimpse/GlimpseGrid.tsx`**

```tsx
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
  standard: 'min-h-[300px]',
  large: 'min-h-[400px]',
  tall: 'min-h-[500px]',
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
    image: '/images/woolcup/food-01.jpg',
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
    <section id="explore" className="bg-white py-24 md:py-32" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section header */}
        <div ref={headerRef} className="mb-12 md:mb-16">
          <p
            ref={eyebrowRef}
            className="font-ui uppercase tracking-[0.3em] text-xs text-dark/50 mb-4"
          >
            The Experience
          </p>
          <h2
            ref={headlineRef}
            className="font-display text-4xl md:text-5xl text-dark"
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
```

- [ ] **Step 3: Type-check**

```powershell
pnpm build 2>&1 | Select-String -Pattern "error|Error" | Select-Object -First 20
```

Expected: no errors related to GlimpseGrid.

- [ ] **Step 4: Commit**

```powershell
git add src/components/glimpse/GlimpseGrid.tsx
git commit -m "feat: editorial glimpse grid section"
```

---

## Task 5: Wire up page.tsx and final commit

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write `src/app/page.tsx`**

```tsx
import { Navbar } from '@/components/navbar/Navbar';
import { HeroFilm } from '@/components/hero/HeroFilm';
import { FoundersPreview } from '@/components/founders/FoundersPreview';
import { GlimpseGrid } from '@/components/glimpse/GlimpseGrid';
import { Manifesto } from '@/components/manifesto/Manifesto';
import { CupSequence } from '@/components/cup-sequence/CupSequence';
import { CraftTriptych } from '@/components/craft/CraftTriptych';
import { Ambience } from '@/components/ambience/Ambience';
import { MenuHighlight } from '@/components/menu/MenuHighlight';
import { InstagramFeed } from '@/components/instagram/InstagramFeed';
import { Visit } from '@/components/visit/Visit';
import { Footer } from '@/components/footer/Footer';

export default function Home() {
  return (
    <main className="relative flex flex-col bg-bg-primary min-h-screen noise-overlay fade-up-enter fade-up-enter-active">
      <Navbar />
      <HeroFilm />
      <FoundersPreview />
      <GlimpseGrid />
      <Manifesto />
      <CupSequence />
      <CraftTriptych />
      <Ambience />
      <MenuHighlight />
      <InstagramFeed />
      <Visit />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Full build check**

```powershell
pnpm build
```

Expected: Build completes with no TypeScript errors. Route `/` compiles successfully.

- [ ] **Step 3: Smoke-test in dev server**

```powershell
pnpm dev
```

Open `http://localhost:3000` and verify:
- Hero scroll arrow bounces (GSAP, not Framer Motion)
- "SCROLL" text is uppercase with wide tracking
- Scrolling past hero shows FoundersPreview with cream-tinted background
- Image reveals left-to-right via clip-path
- Text elements fade up in sequence (eyebrow → headline → body → CTA)
- CTA underline animates on hover
- GlimpseGrid section appears below FoundersPreview
- "The Experience / Explore Wool Cup" header fades in
- 7 grid cards appear with staggered fade-up (desktop: bento layout; mobile: single column)
- Card images scale slightly on hover

- [ ] **Step 4: Final commit**

```powershell
git add src/app/page.tsx
git commit -m "feat: founders preview section + editorial glimpse grid"
```

---

## Self-Review Notes

**Spec coverage:**
- Task 1: `@gsap/react` install ✓
- Task 2: HeroFilm — GSAP bounce, arrowRef, `font-ui uppercase tracking-widest` on SCROLL ✓
- Task 3: FoundersPreview — `bg-[#ead8b5]/30`, 55/45 grid, clip-path image reveal, text stagger, warm overlay, CTA underline, TODO comment for founder photo ✓
- Task 4: GlimpseGrid — 3-col bento, 7 cards with correct images, hover scale, gradient overlay, stagger animation ✓
- Task 5: page.tsx insertion order: HeroFilm → FoundersPreview → GlimpseGrid → Manifesto ✓
- Commit message matches spec ✓

**Grid note:** The spec lists Gallery as `col-span-2` in row 2, but with Must-Try occupying col 3 of that row, Gallery can only be 1 column wide. The auto-placed layout is: `[Seasonal cols 1-2][Must-Try col 3 row-span-2]` / `[Reviews col 1][Gallery col 2][Must-Try col 3]` / `[Locations][Bakery][Celebrations]`. This is visually intentional and balanced.

**Type consistency:** `CardSize`, `CardData`, and `GlimpseCardProps` all defined in Task 4 — no cross-task type references. `useGSAP` registered at module level in both new components.

# Brand System Overhaul + Loading Screen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update Wool Cup's design tokens to the official brand palette (cream/dark/white) and three-font system, then add a GSAP-animated loading screen.

**Architecture:** Tailwind v4 CSS-first config — all tokens live in `globals.css` `@theme {}` block, no `tailwind.config.ts` exists. Google Fonts loaded via `next/font/google` with CSS variable injection into the `<html>` element. `LoadingScreen` sits inside `LenisProvider` so `useLenis()` is accessible.

**Tech Stack:** Next.js 16 / React 19, Tailwind v4, GSAP 3, `@studio-freight/react-lenis` v0.0.47, Framer Motion 12.

**Key constraints:**
- Do NOT redesign existing components — only update font/color class names.
- No `tailwind.config.ts` exists. Brand tokens go in `globals.css`.
- `EdhanMartine-Regular.woff2` does NOT exist → use Cormorant Garamond.
- No illustrated logo asset → wordmark-only loading screen.
- `--gold: #B8975A` maps to cream `#ead8b5` (user decision).
- Loading screen must be inside `<LenisProvider>` to call `useLenis()`.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/app/globals.css` | Modify | CSS vars, @theme tokens, font utilities, base rules |
| `src/app/layout.tsx` | Modify | Swap fonts, add LoadingScreen |
| `src/components/ui/LoadingScreen.tsx` | Create | GSAP animated intro overlay |
| `src/components/navbar/Navbar.tsx` | Modify | Font + color class sweep |
| `src/components/hero/HeroFilm.tsx` | Modify | .text-label gets font-ui |
| `src/components/manifesto/Manifesto.tsx` | Modify | font-serif → font-display |
| `src/components/cup-sequence/CupSequence.tsx` | Modify | font-sans → font-ui |
| `src/components/craft/CraftTriptych.tsx` | Modify | font-serif/sans → display/ui/body, gold→cream |
| `src/components/ambience/Ambience.tsx` | Modify | font-serif → font-display |
| `src/components/menu/MenuHighlight.tsx` | Modify | font-serif/sans → display/ui/body, accent→cream |
| `src/components/instagram/InstagramFeed.tsx` | Modify | font-serif/sans → display/ui, accent→cream |
| `src/components/visit/Visit.tsx` | Modify | font-serif/sans → display/ui/body, accent→cream |
| `src/components/footer/Footer.tsx` | Modify | font-serif/sans → display/ui/body |
| `src/components/ui/GhostButton.tsx` | Modify | font-sans → font-ui, brew→cream |

---

## Task 1: Update `globals.css` — Brand Tokens + Font System

**Files:**
- Modify: `src/app/globals.css`

The current file uses Tailwind v4 `@import "tailwindcss"` with `@theme {}` for tokens. Replace the entire file content.

**Key mapping:**
- `--font-serif` variable renamed to `--font-display` (Tailwind class: `font-display`)
- `--font-sans` variable renamed to `--font-ui` (Tailwind class: `font-ui`)
- New `--font-body` variable for Libre Baskerville (Tailwind class: `font-body`)
- `--gold: #B8975A` → `#ead8b5` (cream)
- All component-used color vars (`text-text-primary`, `bg-bg-secondary`, etc.) added to `@theme`

- [ ] **Step 1: Replace globals.css**

```css
@import "tailwindcss";

@theme {
  /* ── Brand palette ── */
  --color-white: #FFFFFF;
  --color-dark: #231f20;
  --color-cream: #ead8b5;

  /* ── Background tokens ── */
  --color-bg: #FDFAF5;
  --color-bg-alt: #ead8b5;
  --color-bg-primary: #FDFAF5;
  --color-bg-secondary: #ead8b5;
  --color-surface: #FFFFFF;

  /* ── Text tokens ── */
  --color-text: #231f20;
  --color-text-mid: #57504e;
  --color-text-soft: #9a9390;
  --color-text-primary: #231f20;
  --color-text-secondary: #57504e;
  --color-text-tertiary: #9a9390;
  --color-text-muted: #9a9390;

  /* ── Accent tokens (gold mapped → cream) ── */
  --color-gold: #ead8b5;
  --color-gold-hover: #d4bc8e;
  --color-accent: #ead8b5;
  --color-brew: #ead8b5;

  /* ── Border/line tokens ── */
  --color-line: rgba(35, 31, 32, 0.12);
  --color-border: rgba(35, 31, 32, 0.12);
  --color-border-light: rgba(35, 31, 32, 0.06);

  /* ── Font tokens (values injected by Next.js font classes on <html>) ── */
  --font-display: var(--font-display);
  --font-body: var(--font-body);
  --font-ui: var(--font-ui);
}

:root {
  /* Typography scale */
  --display-xl: clamp(2.5rem, 6vw, 5rem);
  --display-lg: clamp(2rem, 4.5vw, 3.25rem);
  --display-md: clamp(1.25rem, 2.5vw, 1.5rem);
  --body: clamp(0.95rem, 1.8vw, 1.05rem);
  --label: 0.75rem;
}

@layer base {
  * {
    @apply border-border;
  }

  html {
    @apply antialiased;
    scroll-behavior: auto;
  }

  body {
    @apply bg-bg text-text font-body;
    line-height: 1.75;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-display text-text;
    line-height: 1.1;
  }
}

@layer utilities {
  .text-display-xl { font-size: var(--display-xl); line-height: 1.05; letter-spacing: -0.02em; }
  .text-display-lg { font-size: var(--display-lg); line-height: 1.1; }
  .text-display-md { font-size: var(--display-md); line-height: 1.3; }
  .text-body       { font-size: var(--body); line-height: 1.75; color: var(--color-text-mid); }
  .text-label      { font-size: var(--label); font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-text-soft); font-family: var(--font-ui); }

  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  .glass {
    @apply backdrop-blur-md bg-white/75 border border-border;
  }
}
```

- [ ] **Step 2: Verify file saved correctly** — open `src/app/globals.css`, confirm `--color-cream: #ead8b5` is present and `--color-gold: #B8975A` is gone.

---

## Task 2: Update `layout.tsx` — Three-Font System

**Files:**
- Modify: `src/app/layout.tsx`

Replace `Playfair_Display + Inter` with `Cormorant_Garamond + Libre_Baskerville + DM_Sans`. All three must be added to the `<html>` className so their CSS variables are available.

- [ ] **Step 1: Replace layout.tsx**

```tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Libre_Baskerville, DM_Sans } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wool-cup-cafe.vercel.app"),
  title: "Wool Cup — Coffee, Quieted.",
  description:
    "Single-estate specialty coffee, hand-pulled espresso, and quiet mornings. Film Nagar, Hyderabad.",
  keywords:
    "wool cup, specialty coffee, hyderabad, film nagar, single-estate arabica, espresso, cafe",
  openGraph: {
    title: "Wool Cup — Coffee, Quieted.",
    description:
      "Single-estate specialty coffee, hand-pulled espresso, and quiet mornings.",
    type: "website",
    locale: "en_IN",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${libreBaskerville.variable} ${dmSans.variable}`}
    >
      <body className="antialiased bg-bg text-text selection:bg-cream selection:text-dark">
        <LenisProvider>
          <LoadingScreen />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify** — confirm `LoadingScreen` import and all three font variables are in the `<html>` className.

---

## Task 3: Create `LoadingScreen.tsx`

**Files:**
- Create: `src/components/ui/LoadingScreen.tsx`

GSAP timeline. `useLenis()` pauses scroll during display. `sessionStorage` flag prevents repeat shows. Component returns `null` after exit animation.

- [ ] **Step 1: Create the file**

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLenis } from '@studio-freight/react-lenis';

export function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const brandNameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [done, setDone] = useState(false);
  const lenis = useLenis();

  // Keep Lenis paused while overlay is active
  useEffect(() => {
    if (done || !lenis) return;
    lenis.stop();
    return () => {
      lenis.start();
    };
  }, [lenis, done]);

  useEffect(() => {
    const shown = sessionStorage.getItem('wc-loading-shown');
    if (shown) {
      setDone(true);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('wc-loading-shown', '1');
        setDone(true);
      },
    });

    // 1. Fade in + scale (0 → 0.4s)
    tl.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
      0
    );

    // 2. Float ±8px (0.4s → 1.6s)
    tl.to(
      containerRef.current,
      { y: -8, duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: 1 },
      0.4
    );

    // 3. Warm glow pulse behind wordmark (0.6s → 1.4s)
    tl.fromTo(
      brandNameRef.current,
      { filter: 'drop-shadow(0 0 0px rgba(212,188,142,0))' },
      {
        filter: 'drop-shadow(0 0 18px rgba(212,188,142,0.55))',
        duration: 0.4,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: 1,
      },
      0.6
    );

    // 4. Brand name clip-path reveal left→right (1.0s → 1.6s)
    tl.fromTo(
      brandNameRef.current,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'power2.inOut' },
      1.0
    );

    // 5. Subtitle fade in (1.2s → 1.8s)
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0 },
      { opacity: 0.6, duration: 0.6, ease: 'power2.out' },
      1.2
    );

    // 6. Exit — slide overlay up (2.0s → 2.6s)
    tl.to(
      overlayRef.current,
      { yPercent: -100, duration: 0.6, ease: 'power3.inOut' },
      2.0
    );

    return () => {
      tl.kill();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-cream flex items-center justify-center"
    >
      <div ref={containerRef} className="flex flex-col items-center gap-6" style={{ opacity: 0 }}>
        <div
          ref={brandNameRef}
          className="font-display text-[72px] leading-none tracking-[0.15em] text-dark lowercase"
          style={{ clipPath: 'inset(0 100% 0 0)' }}
        >
          wool cup
        </div>
        <p
          ref={subtitleRef}
          className="font-ui text-[10px] uppercase tracking-[0.3em] text-dark"
          style={{ opacity: 0 }}
        >
          Urban Café &amp; Bistro
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify file exists** at `src/components/ui/LoadingScreen.tsx`.

---

## Task 4: Sweep `Navbar.tsx`

**Files:**
- Modify: `src/components/navbar/Navbar.tsx`

- [ ] **Step 1: Apply changes**

Changes from current file:
- Line 34: `font-serif` → `font-display`
- Line 44: `font-sans` → `font-ui`, `hover:text-gold` → `hover:text-cream`
- Line 53: `border-gold text-gold font-sans` → `border-dark text-dark font-ui`, `hover:bg-gold hover:text-white` → `hover:bg-dark hover:text-white`
- Line 102: `font-serif` → `font-display`

Full updated Navbar.tsx:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Origin', href: '#origin' },
    { name: 'Offerings', href: '#offerings' },
    { name: 'Space', href: '#space' },
    { name: 'Visit', href: '#visit' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? 'bg-surface/80 backdrop-blur-md shadow-sm' : 'bg-surface'
        } border-b border-border px-5 py-4 lg:bg-transparent lg:border-none lg:shadow-none lg:pt-6`}
      >
        <div className="max-w-[1100px] mx-auto flex items-center justify-between lg:glass lg:rounded-full lg:px-8 lg:py-3 lg:shadow-xl lg:shadow-black/5">
          {/* Logo */}
          <Link href="/" className="font-display text-[1rem] tracking-[0.18em] font-medium text-text uppercase">
            WOOL CUP
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-ui text-[0.8rem] tracking-[0.1em] font-medium uppercase text-text/70 hover:text-cream transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            href="#visit"
            className="hidden lg:block border border-dark text-dark font-ui text-[0.8rem] tracking-[0.12em] font-medium uppercase px-5 py-2 rounded-full hover:bg-dark hover:text-white transition-all duration-300"
          >
            Reserve
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden flex flex-col gap-[6px] w-[22px] group"
            aria-label="Open menu"
          >
            <span className="w-full h-[1.5px] bg-text" />
            <span className="w-full h-[1.5px] bg-text" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] bg-bg flex flex-col items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center"
              aria-label="Close menu"
            >
              <div className="relative w-6 h-6">
                <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-text rotate-45" />
                <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-text -rotate-45" />
              </div>
            </button>

            {/* Links */}
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-display text-[2rem] text-text hover:text-cream transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

## Task 5: Sweep `HeroFilm.tsx`

**Files:**
- Modify: `src/components/hero/HeroFilm.tsx`

Only change: `.text-label` utility already uses `font-ui` via the globals update. The `<h1>` inherits `font-display` from the base `h1` rule. No explicit `font-serif`/`font-sans` classes here — only the `text-label` class on the eyebrow and on the SCROLL text, which now get `font-ui` via the `.text-label` utility definition. No code changes needed.

- [ ] **Step 1: Verify no changes needed** — confirm HeroFilm.tsx has no `font-serif` or `font-sans` explicit classes. The h1 and label classes inherit correctly from globals.

---

## Task 6: Sweep `Manifesto.tsx`

**Files:**
- Modify: `src/components/manifesto/Manifesto.tsx`

- [ ] **Step 1: Apply changes**

Change line 37: `font-serif` → `font-display`

```tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%' },
      }
    );
  }, []);

  return (
    <section id="philosophy" ref={containerRef} className="bg-bg py-16 px-6 lg:py-24">
      <div className="max-w-[680px] mx-auto text-center">
        <p
          ref={textRef}
          className="font-display text-[1.25rem] md:text-[1.65rem] text-text leading-[1.6] lg:leading-[1.7]"
        >
          We don't rush coffee. We don't rush mornings. Every cup is slowed down, stripped back, and made to be remembered.
        </p>
      </div>
    </section>
  );
}
```

---

## Task 7: Sweep `CupSequence.tsx`

**Files:**
- Modify: `src/components/cup-sequence/CupSequence.tsx`

- [ ] **Step 1: Apply changes**

Change line 65: `font-sans` → `font-ui`

```tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const originData = [
  {
    num: '01',
    title: 'Origin',
    copy: 'Single-estate Arabica from the Chikmagalur hills. Sourced directly, traded fairly, picked at peak ripeness.',
  },
  {
    num: '02',
    title: 'Roast',
    copy: "Small-batch. Fourteen-minute profile. Light to medium, roasted weekly to honour the bean's origin character.",
  },
  {
    num: '03',
    title: 'Method',
    copy: 'Hand-pulled. Nine bars of pressure. Twenty-seven seconds of extraction. Precision in every shot.',
  },
  {
    num: '04',
    title: 'Yours',
    copy: 'One cup. Your table. A morning that belongs to you.',
  },
];

export function CupSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(cardRefs.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
      }
    );
  }, []);

  return (
    <section id="origin" ref={containerRef} className="bg-bg border-y border-border">
      <div className="grid grid-cols-1 lg:grid-cols-4">
        {originData.map((item, i) => (
          <div
            key={item.num}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`px-6 py-10 lg:px-8 lg:py-14 bg-bg hover:bg-bg-alt transition-colors duration-400 group
              ${i !== 0 ? 'border-t lg:border-t-0 lg:border-l' : ''} border-border`}
          >
            <span className="block font-ui text-[0.7rem] font-medium tracking-[0.1em] text-text-soft uppercase mb-5">
              {item.num}
            </span>
            <h3 className="text-[1.4rem] text-text mb-3">
              {item.title}
            </h3>
            <p className="text-body leading-[1.7]">
              {item.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## Task 8: Sweep `CraftTriptych.tsx`

**Files:**
- Modify: `src/components/craft/CraftTriptych.tsx`

- [ ] **Step 1: Apply changes**

- `font-serif` → `font-display` on stat counter div (line 39)
- `text-gold` → `text-cream` (line 39)
- `text-eyebrow` removed (undefined class) → `font-ui text-[10px] tracking-[0.2em] uppercase` (line 43)
- `font-serif` → `font-display` on h3 (line 79)
- `font-sans` → `font-body` on paragraph (line 83)

```tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';

const stats = [
  { label: 'Cups Served', value: 12000, suffix: '+' },
  { label: 'Rating', value: 4.9, suffix: '' },
  { label: 'Bean Score', value: 86, suffix: '+' },
  { label: 'Est.', value: 2024, suffix: '' },
];

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <div className="text-[clamp(1.5rem,4vw,2.5rem)] font-display text-cream mb-2">
        {value % 1 === 0 ? Math.floor(count).toLocaleString() : count.toFixed(1)}
        {suffix}
      </div>
      <div className="font-ui text-text-muted text-[10px] tracking-[0.2em] uppercase">
        {label}
      </div>
    </div>
  );
}

const craftItems = [
  {
    title: 'Sourcing',
    desc: 'Direct trade with shade-grown estates. We pay premiums for lots that score 86+ points, ensuring sustainability and quality in every bean.',
  },
  {
    title: 'Roasting',
    desc: 'Light-to-medium profiles that honor the origin character. Each batch is roasted weekly in our small-lot facility to preserve delicate aromatics.',
  },
  {
    title: 'Serving',
    desc: 'Dialed in daily. Served in warm ceramic. We believe in the ritual of coffee—no artificial syrups, no shortcuts, just pure intention.',
  },
];

export function CraftTriptych() {
  return (
    <Section className="bg-bg-primary py-24">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 lg:gap-20">
          {craftItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              <h3 className="font-display text-[24px] font-medium text-text-primary">
                {item.title}
              </h3>
              <div className="w-10 h-px bg-accent my-5" />
              <p className="font-body text-[16px] text-text-secondary leading-[1.7]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
```

---

## Task 9: Sweep `Ambience.tsx`

**Files:**
- Modify: `src/components/ambience/Ambience.tsx`

- [ ] **Step 1: Apply changes**

- `font-serif` → `font-display` on h2 (line 44)
- `bg-accent` on scrub bar → `bg-cream`

```tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const IMAGES = [
  { src: '/images/new/exterior-wide.jpg', alt: 'Wool Cup café exterior' },
  { src: '/images/new/interior-sofa.jpg', alt: 'Cozy interior seating' },
  { src: '/images/new/interior-hand-chairs.jpg', alt: 'Unique hand-shaped chairs' },
  { src: '/images/new/dessert-case.jpg', alt: 'Fresh dessert display' },
  { src: '/images/new/interior-dining.jpg', alt: 'Elegant dining area' },
  { src: '/images/new/interior-wide-cloud.jpg', alt: 'Atmospheric cloud lighting' },
];

export function Ambience() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const handleScroll = () => {
      const progress = el.scrollLeft / (el.scrollWidth - el.clientWidth);
      setScrollProgress(progress || 0);
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="ambience"
      className="py-24 bg-bg-secondary overflow-hidden"
      aria-label="Cafe Ambience"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-[300] text-[56px] text-text-primary text-center"
        >
          The Space.
        </motion.h2>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 px-[8vw] overflow-x-auto scrollbar-hide scroll-snap-x mandatory pb-12 cursor-grab active:cursor-grabbing"
      >
        {IMAGES.map((img, i) => (
          <div
            key={i}
            className="min-w-[85vw] md:min-w-[45vw] aspect-[4/3] rounded-2xl overflow-hidden scroll-snap-start relative group"
          >
            <motion.img
              initial={{ scale: 1.1, opacity: 0.3 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <div className="relative w-[200px] h-[2px] bg-border">
          <motion.div
            className="absolute top-0 left-0 h-full bg-cream"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
```

---

## Task 10: Sweep `MenuHighlight.tsx`

**Files:**
- Modify: `src/components/menu/MenuHighlight.tsx`

- [ ] **Step 1: Apply changes**

- h2: `font-serif` → `font-display`
- subtitle p: `font-sans` → `font-ui`
- item h3: `font-serif` → `font-display`
- price span: `font-sans text-accent` → `font-ui text-dark`
- desc p: `font-sans` → `font-body`
- hover: `hover:bg-accent/5` → `hover:bg-cream/5`

```tsx
'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';

const menuItems = [
  { name: 'House Espresso', price: '₹240', desc: 'Washed SL9. Notes of jaggery, dark chocolate, and roasted nuts.' },
  { name: 'Pour Over', price: '₹320', desc: 'Rotating single estates. Clean, bright, and nuanced.' },
  { name: 'Vanilla Bean Latte', price: '₹340', desc: 'House-made Madagascar vanilla syrup, silky microfoam.' },
  { name: 'Cold Brew Reserve', price: '₹290', desc: '24-hour steep. Bold, sweet, zero bitterness.' },
];

export function MenuHighlight() {
  return (
    <Section id="menu" className="bg-bg-primary py-24">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-light text-[56px] text-text-primary"
          >
            Offerings.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-ui text-[16px] text-text-tertiary tracking-[0.1em] mt-4"
          >
            Crafted with intention.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
          {menuItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`
                px-10 py-12 flex flex-col justify-center
                border-b border-border transition-colors duration-500 hover:bg-cream/5
                ${i % 2 === 0 ? 'md:border-r' : ''}
                ${i >= menuItems.length - 2 ? 'md:border-b-0' : ''}
                ${i === menuItems.length - 1 ? 'border-b-0' : ''}
              `}
            >
              <div className="flex justify-between items-baseline mb-3">
                <h3 className="font-display text-[26px] font-medium text-text-primary">
                  {item.name}
                </h3>
                <span className="font-ui font-medium text-[18px] text-dark">
                  {item.price}
                </span>
              </div>
              <p className="font-body text-[15px] text-text-secondary leading-[1.6]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
```

---

## Task 11: Sweep `InstagramFeed.tsx`

**Files:**
- Modify: `src/components/instagram/InstagramFeed.tsx`

- [ ] **Step 1: Apply changes**

- h2: `font-serif` → `font-display`
- handle p: `font-sans` → `font-ui`
- Follow Us button: `font-sans`, `border-accent text-accent hover:bg-accent hover:text-white` → `font-ui`, `border-dark text-dark hover:bg-dark hover:text-white`

```tsx
'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { staggerContainer, fadeUp } from '@/lib/motion';
import { InstagramTile } from './InstagramTile';

const placeholders = [
  "/images/new/cake-slice.jpg",
  "/images/new/barista-pour.jpg",
  "/images/new/exterior-night.jpg",
  "/images/new/interior-hand-chairs.jpg",
  "/images/new/dessert-case.jpg",
  "/images/new/interior-sofa.jpg",
];

export function InstagramFeed() {
  return (
    <Section className="bg-bg-secondary py-24">
      <div className="max-w-[1000px] mx-auto px-[5vw]">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-light text-[56px] text-text-primary"
          >
            Community.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-ui text-[14px] text-text-tertiary tracking-[0.15em] mt-2"
          >
            @woolcupcafe
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1, once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          {placeholders.map((src, i) => (
            <motion.div key={i} variants={fadeUp}>
              <InstagramTile src={src} index={i} />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-12">
          <motion.a
            href="https://instagram.com/woolcup"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border border-dark text-dark px-10 py-3 rounded-full font-ui font-medium text-[13px] uppercase tracking-[0.15em] hover:bg-dark hover:text-white transition-all duration-300"
          >
            Follow Us
          </motion.a>
        </div>
      </div>
    </Section>
  );
}
```

---

## Task 12: Sweep `Visit.tsx`

**Files:**
- Modify: `src/components/visit/Visit.tsx`

- [ ] **Step 1: Apply changes**

- h2: `font-serif` → `font-display`
- LOCATION/HOURS h4: `font-sans` → `font-ui`
- Address/hours p: `font-sans` → `font-body`
- Directions link: `font-sans text-accent` → `font-ui text-dark`, `bg-accent` → `bg-dark`

```tsx
'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';

export function Visit() {
  return (
    <Section id="visit" className="bg-bg-primary py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.3, once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start"
          >
            <h2 className="font-display text-[56px] font-light text-text-primary mb-12">Visit Us.</h2>

            <div className="space-y-10 mb-12">
              <div>
                <h4 className="font-ui text-[12px] font-medium uppercase text-text-tertiary tracking-[0.15em] mb-3">LOCATION</h4>
                <p className="font-body text-[17px] text-text-secondary leading-[1.7]">
                  CC 55, Road No. 1, Film Nagar,<br />
                  opposite Papaya, Jubilee Hills,<br />
                  Hyderabad, Telangana 500033
                </p>
              </div>

              <div>
                <h4 className="font-ui text-[12px] font-medium uppercase text-text-tertiary tracking-[0.15em] mb-3">HOURS</h4>
                <p className="font-body text-[17px] text-text-secondary leading-[1.7]">
                  Monday — Sunday<br />
                  8:00 AM — 11:30 PM
                </p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps?q=17.4137993,78.4062934"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative font-ui font-medium text-[14px] text-dark flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Get Directions →</span>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-dark group-hover:w-full transition-all duration-500 ease-out" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.3, once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-video lg:aspect-square w-full bg-bg-secondary overflow-hidden rounded-2xl group"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.037130635467!2d78.40618067606774!3d17.41113060237905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96bc72e8211b%3A0xc3c5d6e2467d022b!2sFilm%20Nagar%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(1) opacity(0.9)' }}
              className="group-hover:grayscale-0 transition-all duration-700 ease-out"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

        </div>
      </div>
    </Section>
  );
}
```

---

## Task 13: Sweep `Footer.tsx`

**Files:**
- Modify: `src/components/footer/Footer.tsx`

- [ ] **Step 1: Apply changes**

- Brand name span: `font-serif` → `font-display`
- Tagline p: `font-sans` → `font-body`
- Social/Legal h4: `font-sans` → `font-ui`
- All links: `font-sans` → `font-body`
- Copyright/credit: `font-sans` → `font-ui`

```tsx
'use client';

import { HairlineRule } from '@/components/ui/HairlineRule';

export function Footer() {
  return (
    <footer className="bg-bg-secondary px-6 md:px-12 pb-16 pt-24 border-t border-border">
      <div className="max-w-[1200px] mx-auto">

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

---

## Task 14: Sweep `GhostButton.tsx`

**Files:**
- Modify: `src/components/ui/GhostButton.tsx`

- [ ] **Step 1: Apply changes**

- `font-sans` → `font-ui`
- `border-brew text-brew hover:bg-brew hover:text-white focus-visible:outline-brew` → `border-dark text-dark hover:bg-dark hover:text-white focus-visible:outline-dark`

```tsx
'use client';

import { cn } from '@/lib/utils';

interface GhostButtonProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
  href?: string;
  onClick?: () => void;
}

export function GhostButton({
  children,
  className,
  size = 'md',
  href,
  onClick,
}: GhostButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center',
    'border border-dark text-dark',
    'font-ui font-medium tracking-wide',
    'transition-colors duration-300',
    'hover:bg-dark hover:text-white',
    'focus-visible:outline-1 focus-visible:outline-dark focus-visible:outline-offset-2',
    size === 'sm' ? 'text-[13px] px-5 py-2' : 'text-sm px-8 py-3',
    className
  );

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}
```

---

## Task 15: Build Check + Commit

**Files:** All modified files

- [ ] **Step 1: Run build**

```bash
cd "C:\Users\ahad\.gemini\antigravity\scratch\wool-cup-cafe"
pnpm build
```

Expected: build completes with no TypeScript errors. Warnings about `@studio-freight/react-lenis` types are acceptable.

- [ ] **Step 2: Fix any type errors** — if `Libre_Baskerville` or `Cormorant_Garamond` import names cause TypeScript errors, verify spelling against `next/font/google` exports. Correct names: `Cormorant_Garamond`, `Libre_Baskerville`, `DM_Sans`.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/components/ui/LoadingScreen.tsx src/components/navbar/Navbar.tsx src/components/hero/HeroFilm.tsx src/components/manifesto/Manifesto.tsx src/components/cup-sequence/CupSequence.tsx src/components/craft/CraftTriptych.tsx src/components/ambience/Ambience.tsx src/components/menu/MenuHighlight.tsx src/components/instagram/InstagramFeed.tsx src/components/visit/Visit.tsx src/components/footer/Footer.tsx src/components/ui/GhostButton.tsx
git commit -m "feat: brand system overhaul + animated loading screen"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|-----------------|------|
| Update tailwind config (v4 = CSS-only) | Task 1 |
| Brand colors: cream/dark/white | Task 1 |
| Color distribution target 40/40/20 | Task 1 (bg-secondary = cream, bg-primary = warm-white, surface = white) |
| font-display = Cormorant Garamond | Task 2 |
| font-body = Libre Baskerville | Task 2 |
| font-ui = DM Sans | Task 2 |
| Check for EdhanMartine woff2 (does not exist → skip) | Task 1 note |
| Every heading uses font-display | Tasks 4–14 |
| Every paragraph uses font-body | Tasks 4–14 |
| Every nav/button/label uses font-ui | Tasks 4–14 |
| Gold → cream | Tasks 1, 4, 8–14 |
| .text-label uses font-ui | Task 1 |
| Marquee ticker uses font-ui | Task 1 (.text-label utility) |
| Loading screen: cream bg | Task 3 |
| Loading screen: wordmark fallback | Task 3 |
| GSAP timeline (6 phases) | Task 3 |
| Min 2.6s display time | Task 3 (exit at 2.0+0.6=2.6s) |
| sessionStorage first-visit flag | Task 3 |
| z-index 9999 | Task 3 |
| Lenis pause during loading | Task 3 |
| Lenis resume after exit | Task 3 |
| display:none after exit | Task 3 (returns null via `done` state) |
| Only on initial load, not nav | Task 3 (sessionStorage flag) |

**Placeholder scan:** None found — all steps include full code.

**Type consistency:** `useLenis()` returns `Lenis | undefined`. All calls use optional chaining `lenis?.stop()`. `tl.kill()` in cleanup. `done` state controls null return. Consistent.

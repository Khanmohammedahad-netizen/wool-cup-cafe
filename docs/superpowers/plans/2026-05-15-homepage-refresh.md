# Homepage Refresh, Font Overhaul & Gallery Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Swap body font to Cormorant Garamond, trim the homepage to 7 calm sections, change the footer from near-black to light brown, and add a `/gallery` photo page.

**Architecture:** All changes are in existing Next.js App Router pages and components. No new libraries needed — CSS columns for masonry, `useState` for gallery filter tabs, `next/font/google` for the new typeface.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, pnpm

---

## File Map

| Action | File |
|---|---|
| Modify | `src/app/layout.tsx` |
| Modify | `src/app/page.tsx` |
| Modify | `src/components/footer/Footer.tsx` |
| Modify | `src/components/navbar/Navbar.tsx` |
| Create | `src/components/gallery/GalleryGrid.tsx` |
| Create | `src/components/gallery/GalleryTeaser.tsx` |
| Create | `src/app/gallery/page.tsx` |

---

## Task 1: Swap body font — Libre Baskerville → Cormorant Garamond

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Edit layout.tsx**

Replace the full import + font config block. The `--font-body` variable stays the same so zero downstream CSS changes are needed.

```tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Navbar } from "@/components/navbar/Navbar";

const edhanMartine = localFont({
  src: "../fonts/edhan-martine.ttf",
  variable: "--font-display",
  display: "swap",
  weight: "400",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
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
      className={`${edhanMartine.variable} ${cormorantGaramond.variable} ${dmSans.variable}`}
    >
      <body className="antialiased bg-bg text-text selection:bg-cream selection:text-dark">
        <LenisProvider>
          <LoadingScreen />
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify**

Run `pnpm dev` and open http://localhost:3000. Body text on the homepage (e.g. the manifesto quote, founder text, review quotes) should now be noticeably airier and lighter-weight — the thin elegant serifs of Cormorant Garamond instead of the heavier Libre Baskerville. Display headings (edhan-martine) unchanged.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(font): swap body font to Cormorant Garamond"
```

---

## Task 2: Trim homepage sections

**Files:**
- Modify: `src/app/page.tsx`

Remove the five dense sections. Leave component files on disk — just delete the imports and JSX.

- [ ] **Step 1: Replace page.tsx**

```tsx
import type { Metadata } from 'next';
import { WoolcupHero } from '@/components/hero/WoolcupHero';
import { Manifesto } from '@/components/manifesto/Manifesto';
import { FoundersPreview } from '@/components/founders/FoundersPreview';
import { SocialProof } from '@/components/social-proof/SocialProof';
import { MenuHighlight } from '@/components/menu/MenuHighlight';
import { Locations } from '@/components/locations/Locations';
import { Footer } from '@/components/footer/Footer';

export const metadata: Metadata = {
  title: 'Wool Cup Urban Café & Bistro — Hyderabad',
  description: 'A slow café for honest coffee, handcrafted food, and quiet mornings. Located in Hyderabad.',
  openGraph: {
    title: 'Wool Cup Urban Café & Bistro',
    description: 'Honest coffee. Handcrafted food. Hyderabad.',
  },
};

export default function Home() {
  return (
    <main className="relative flex flex-col bg-bg-primary min-h-screen noise-overlay fade-up-enter fade-up-enter-active">
      <WoolcupHero />
      <Manifesto />
      <FoundersPreview />
      <SocialProof />
      <MenuHighlight />
      <Locations />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verify**

Reload http://localhost:3000. The page should be noticeably shorter and quieter — no bento grid, no animation sequence, no triptych, no ambience section, no Instagram feed. Scroll should feel calm.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(home): trim to 7 serene sections"
```

---

## Task 3: Footer light brown + add Gallery nav link

**Files:**
- Modify: `src/components/footer/Footer.tsx`
- Modify: `src/components/navbar/Navbar.tsx`

- [ ] **Step 1: Replace Footer.tsx**

Background changes from `#231f20` (near-black) to `#c4a87a` (warm light brown). All text flips from white to dark variants. Logo uses `variant="dark"`.

```tsx
'use client';

import Link from 'next/link';
import { WoolcupLogo } from '@/components/ui/WoolcupLogo';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Story', href: '/about' },
  { name: 'Menu', href: '/menu' },
  { name: 'Cakes', href: '/cakes' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Visit', href: '/#locations' },
];

export function Footer() {
  return (
    <footer className="bg-[#c4a87a]">
      {/* For Special Moments CTA */}
      <div className="border-b border-dark/15 px-6 md:px-12 py-8">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h4 className="font-display text-lg text-dark mb-1">For Special Moments</h4>
            <p className="font-body text-sm text-dark/55 max-w-md">
              Dessert platters, celebration cakes, curated spreads — crafted for your gatherings and events.
            </p>
          </div>
          <a
            href="https://wa.me/917292944244?text=Hi%20Wool%20Cup!%20I'd%20like%20to%20inquire%20about%20ordering%20for%20a%20special%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui text-xs uppercase tracking-wide text-dark/70 hover:text-dark transition-colors shrink-0"
          >
            Inquire →
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="px-6 md:px-12 pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-dark/15">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center mb-5 w-fit">
                <WoolcupLogo variant="dark" width={160} height={111} />
              </Link>
              <p className="font-body text-sm text-dark/55 leading-relaxed max-w-[220px]">
                Coffee, quieted. A place for slow mornings and honest meals.
              </p>
            </div>

            {/* Navigate */}
            <div>
              <h4 className="font-ui text-[10px] uppercase tracking-[0.25em] text-dark/40 mb-5">Navigate</h4>
              <div className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="font-body text-sm text-dark/60 hover:text-dark transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Find Us + Hours */}
            <div>
              <h4 className="font-ui text-[10px] uppercase tracking-[0.25em] text-dark/40 mb-5">Find Us</h4>
              <address className="not-italic font-body text-sm text-dark/60 leading-relaxed mb-5">
                Film Nagar, Hyderabad<br />
                Financial District, Hyderabad<br />
                Telangana, India
              </address>
              <h4 className="font-ui text-[10px] uppercase tracking-[0.25em] text-dark/40 mb-3">Hours</h4>
              <p className="font-body text-sm text-dark/60">Mon–Fri: 8am – 9pm</p>
              <p className="font-body text-sm text-dark/60">Sat–Sun: 9am – 10pm</p>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-ui text-[10px] uppercase tracking-[0.25em] text-dark/40 mb-5">Connect</h4>
              <div className="flex flex-col gap-3">
                <a
                  href="https://instagram.com/woolcup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-dark/60 hover:text-dark transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/woolcup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-dark/60 hover:text-dark transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="https://wa.me/917292944244"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-dark/60 hover:text-dark transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-8">
            <p className="font-ui text-[11px] text-dark/40 tracking-wide">
              © 2026 Wool Cup Urban Café &amp; Bistro. All rights reserved.
            </p>
            <p className="font-ui text-[11px] text-dark/40 tracking-wide">
              Designed in Hyderabad · Film Nagar
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Add Gallery link to Navbar.tsx**

Find the `NAV_LINKS` array in `src/components/navbar/Navbar.tsx` (line 9) and replace it:

```tsx
const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Story', href: '/about' },
  { name: 'Menu', href: '/menu' },
  { name: 'Cakes', href: '/cakes' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Visit', href: '/#locations' },
];
```

- [ ] **Step 3: Verify**

Reload http://localhost:3000 and scroll to the footer. Background should be warm caramel brown, all text in dark/muted dark tones. Logo should be readable (dark ink on brown). Navbar desktop links should show "Gallery" between Cakes and Visit.

- [ ] **Step 4: Commit**

```bash
git add src/components/footer/Footer.tsx src/components/navbar/Navbar.tsx
git commit -m "feat(footer): light brown bg, dark text, add Gallery nav link"
```

---

## Task 4: Create GalleryGrid component

**Files:**
- Create: `src/components/gallery/GalleryGrid.tsx`

CSS columns masonry — no extra library. Filter tabs via `useState`. `'use client'` required.

- [ ] **Step 1: Create the file**

```tsx
'use client';

import { useState } from 'react';

type Category = 'all' | 'interior' | 'coffee' | 'food' | 'exterior';

interface GalleryImage {
  src: string;
  alt: string;
  category: Exclude<Category, 'all'>;
}

const IMAGES: GalleryImage[] = [
  // Interior — woolcup
  { src: '/images/woolcup/interior-01.jpg', alt: 'Interior seating area', category: 'interior' },
  { src: '/images/woolcup/interior-02.jpg', alt: 'Interior detail', category: 'interior' },
  { src: '/images/woolcup/interior-03.jpg', alt: 'Interior corner', category: 'interior' },
  { src: '/images/woolcup/interior-04.jpg', alt: 'Interior ambience', category: 'interior' },
  { src: '/images/woolcup/interior-05.jpg', alt: 'Interior lounge', category: 'interior' },
  { src: '/images/woolcup/interior-06.jpg', alt: 'Interior space', category: 'interior' },
  { src: '/images/woolcup/interior-07.jpg', alt: 'Interior view', category: 'interior' },
  { src: '/images/woolcup/interior-08.jpg', alt: 'Interior atmosphere', category: 'interior' },
  { src: '/images/woolcup/interior-10.jpg', alt: 'Interior feature', category: 'interior' },
  // Interior — new
  { src: '/images/new/interior-sofa.jpg', alt: 'Sofa seating', category: 'interior' },
  { src: '/images/new/interior-dining.jpg', alt: 'Dining area', category: 'interior' },
  { src: '/images/new/interior-hand-chairs.jpg', alt: 'Hand chairs', category: 'interior' },
  { src: '/images/new/interior-wide-cloud.jpg', alt: 'Cloud ceiling interior', category: 'interior' },
  // Interior — gallery
  { src: '/images/gallery/interior-01.jpg', alt: 'Gallery interior 1', category: 'interior' },
  { src: '/images/gallery/interior-02.jpg', alt: 'Gallery interior 2', category: 'interior' },
  { src: '/images/gallery/interior-03.jpg', alt: 'Gallery interior 3', category: 'interior' },
  { src: '/images/gallery/interior-04.jpg', alt: 'Gallery interior 4', category: 'interior' },
  { src: '/images/gallery/interior-05.jpg', alt: 'Gallery interior 5', category: 'interior' },
  { src: '/images/gallery/interior-06.jpg', alt: 'Gallery interior 6', category: 'interior' },
  // Coffee — gallery
  { src: '/images/gallery/coffee-01.jpg', alt: 'Coffee craft 1', category: 'coffee' },
  { src: '/images/gallery/coffee-02.jpg', alt: 'Coffee craft 2', category: 'coffee' },
  { src: '/images/gallery/coffee-03.jpg', alt: 'Coffee craft 3', category: 'coffee' },
  { src: '/images/gallery/coffee-04.jpg', alt: 'Coffee craft 4', category: 'coffee' },
  { src: '/images/gallery/coffee-05.jpg', alt: 'Coffee craft 5', category: 'coffee' },
  { src: '/images/gallery/coffee-06.jpg', alt: 'Coffee craft 6', category: 'coffee' },
  // Coffee — new
  { src: '/images/new/barista-pour.jpg', alt: 'Barista pour over', category: 'coffee' },
  // Food — woolcup
  { src: '/images/woolcup/food-01.jpg', alt: 'Seasonal dish', category: 'food' },
  { src: '/images/woolcup/food-02.jpg', alt: 'Plated food', category: 'food' },
  { src: '/images/woolcup/food-03.jpg', alt: 'Kitchen creation', category: 'food' },
  { src: '/images/woolcup/food-04.jpg', alt: 'Fresh dish', category: 'food' },
  { src: '/images/woolcup/mango-dish.jpg', alt: 'Mango dish', category: 'food' },
  { src: '/images/woolcup/misc-01.jpg', alt: 'Café detail', category: 'food' },
  { src: '/images/woolcup/misc-02.jpg', alt: 'Café moment', category: 'food' },
  // Food — new
  { src: '/images/new/dessert-case.jpg', alt: 'Dessert display case', category: 'food' },
  { src: '/images/new/cake-slice.jpg', alt: 'Cake slice', category: 'food' },
  // Exterior — new
  { src: '/images/new/exterior-night.jpg', alt: 'Exterior at night', category: 'exterior' },
  { src: '/images/new/exterior-wide.jpg', alt: 'Exterior wide view', category: 'exterior' },
  // Exterior — financial district
  { src: '/images/financial-district/fd-01.webp', alt: 'Financial District branch', category: 'exterior' },
  { src: '/images/financial-district/fd-02.webp', alt: 'Financial District exterior', category: 'exterior' },
  { src: '/images/financial-district/fd-03.webp', alt: 'Financial District detail', category: 'exterior' },
  { src: '/images/financial-district/fd-04.webp', alt: 'Financial District view', category: 'exterior' },
  { src: '/images/financial-district/fd-05.webp', alt: 'Financial District branch 2', category: 'exterior' },
  { src: '/images/financial-district/fd-06.webp', alt: 'Financial District entrance', category: 'exterior' },
  { src: '/images/financial-district/fd-07.webp', alt: 'Financial District ambience', category: 'exterior' },
];

const TABS: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Interior', value: 'interior' },
  { label: 'Coffee', value: 'coffee' },
  { label: 'Food', value: 'food' },
  { label: 'Exterior', value: 'exterior' },
];

export function GalleryGrid() {
  const [active, setActive] = useState<Category>('all');

  const filtered =
    active === 'all' ? IMAGES : IMAGES.filter((img) => img.category === active);

  return (
    <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`font-ui text-[11px] uppercase tracking-[0.18em] px-4 py-2 rounded-full border transition-all duration-300 ${
              active === tab.value
                ? 'bg-dark text-white border-dark'
                : 'bg-transparent text-dark/60 border-dark/20 hover:border-dark/50 hover:text-dark'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CSS columns masonry */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
        {filtered.map((img) => (
          <div key={img.src} className="break-inside-avoid mb-3">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-auto rounded-xl object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify file exists**

```bash
ls src/components/gallery/GalleryGrid.tsx
```

- [ ] **Step 3: Commit**

```bash
git add src/components/gallery/GalleryGrid.tsx
git commit -m "feat(gallery): add GalleryGrid masonry component with category filter"
```

---

## Task 5: Create GalleryTeaser component

**Files:**
- Create: `src/components/gallery/GalleryTeaser.tsx`

Simple homepage section — 3 photos in a 2-column grid (left = tall spanning 2 rows, right = 2 stacked), cream background, CTA linking to `/gallery`.

- [ ] **Step 1: Create the file**

```tsx
import Link from 'next/link';

export function GalleryTeaser() {
  return (
    <section className="bg-bg-secondary py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="font-ui uppercase tracking-[0.3em] text-xs text-dark/50 mb-3">
            The Space
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-dark">
            A glimpse inside.
          </h2>
        </div>

        {/* 3-photo grid: left tall, 2 stacked right */}
        <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[420px] md:h-[540px]">
          <div className="row-span-2 relative overflow-hidden rounded-2xl">
            <img
              src="/images/new/interior-wide-cloud.jpg"
              alt="Wool Cup interior"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="/images/new/barista-pour.jpg"
              alt="Barista at work"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="/images/woolcup/food-01.jpg"
              alt="Seasonal dish"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-end">
          <Link
            href="/gallery"
            className="font-ui text-sm uppercase tracking-[0.2em] text-dark/60 hover:text-dark transition-colors"
          >
            Explore the Gallery →
          </Link>
        </div>

      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify file exists**

```bash
ls src/components/gallery/GalleryTeaser.tsx
```

- [ ] **Step 3: Commit**

```bash
git add src/components/gallery/GalleryTeaser.tsx
git commit -m "feat(gallery): add GalleryTeaser homepage section"
```

---

## Task 6: Create /gallery page

**Files:**
- Create: `src/app/gallery/page.tsx`

Server component with metadata. Navbar is already in `layout.tsx` — do not add it again. Include Footer.

- [ ] **Step 1: Create the file**

```tsx
import type { Metadata } from 'next';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { Footer } from '@/components/footer/Footer';

export const metadata: Metadata = {
  title: 'Gallery — Wool Cup Urban Café',
  description: 'Photos of the space, the coffee, and the quiet moments at Wool Cup, Hyderabad.',
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Page hero — pt-28 clears the fixed navbar */}
      <div className="pt-28 pb-4 px-6 md:px-12 max-w-7xl mx-auto">
        <p className="font-ui uppercase tracking-[0.3em] text-xs text-dark/50 mb-4">
          Photos
        </p>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-dark leading-none">
          A glimpse inside.
        </h1>
        <p className="font-body text-base text-dark/50 mt-4 max-w-md">
          Spaces, coffee, and quiet moments from both our locations in Hyderabad.
        </p>
      </div>

      <GalleryGrid />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verify**

Run `pnpm dev` and open http://localhost:3000/gallery. Page should show the page hero, filter tabs (All / Interior / Coffee / Food / Exterior), and the masonry photo grid. Click each filter tab to confirm it narrows the grid. Check that the footer appears at the bottom with the light brown colour. Navbar should appear at the top (from layout).

- [ ] **Step 3: Commit**

```bash
git add src/app/gallery/page.tsx
git commit -m "feat(gallery): add /gallery page with masonry grid"
```

---

## Task 7: Add GalleryTeaser to homepage

**Files:**
- Modify: `src/app/page.tsx`

Insert `GalleryTeaser` after `MenuHighlight`, before `Locations`.

- [ ] **Step 1: Edit page.tsx**

```tsx
import type { Metadata } from 'next';
import { WoolcupHero } from '@/components/hero/WoolcupHero';
import { Manifesto } from '@/components/manifesto/Manifesto';
import { FoundersPreview } from '@/components/founders/FoundersPreview';
import { SocialProof } from '@/components/social-proof/SocialProof';
import { MenuHighlight } from '@/components/menu/MenuHighlight';
import { GalleryTeaser } from '@/components/gallery/GalleryTeaser';
import { Locations } from '@/components/locations/Locations';
import { Footer } from '@/components/footer/Footer';

export const metadata: Metadata = {
  title: 'Wool Cup Urban Café & Bistro — Hyderabad',
  description: 'A slow café for honest coffee, handcrafted food, and quiet mornings. Located in Hyderabad.',
  openGraph: {
    title: 'Wool Cup Urban Café & Bistro',
    description: 'Honest coffee. Handcrafted food. Hyderabad.',
  },
};

export default function Home() {
  return (
    <main className="relative flex flex-col bg-bg-primary min-h-screen noise-overlay fade-up-enter fade-up-enter-active">
      <WoolcupHero />
      <Manifesto />
      <FoundersPreview />
      <SocialProof />
      <MenuHighlight />
      <GalleryTeaser />
      <Locations />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verify full homepage flow**

Open http://localhost:3000 and scroll top to bottom. Verify:
- Hero video loads and expands on scroll
- Manifesto quote is airy with Cormorant Garamond
- Founders section present
- Social proof / reviews present with marquee strip
- Menu highlight present
- Gallery teaser shows 3-photo grid with "Explore the Gallery →" link — clicking it navigates to `/gallery`
- Locations section present
- Footer is warm light brown with dark text

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(home): add GalleryTeaser section linking to /gallery"
```

---

## Done

All 7 tasks complete. Run `pnpm build` to confirm no TypeScript or build errors before shipping.

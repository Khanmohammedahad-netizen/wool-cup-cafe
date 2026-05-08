# About / Founders Story Page Design

**Goal:** Create an editorial `/about` page — cinematic, slow, Kinfolk-style storytelling — plus update the navbar to include a "Story" link.

**Brand system:** Phase 1 complete — cream/dark/white palette, font-display/body/ui tokens.

**Animation library:** GSAP ScrollTrigger via `useGSAP()` + Framer Motion (already installed).

---

## Routing

App Router confirmed. Page at `src/app/about/page.tsx` (server component — exports metadata, renders client section components).

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `src/app/about/page.tsx` | Metadata export, page shell |
| Create | `src/components/about/AboutHero.tsx` | Full-vh parallax hero |
| Create | `src/components/about/AboutOrigin.tsx` | 2-col origin story |
| Create | `src/components/about/AboutPhilosophy.tsx` | Pull quote + 3 value pillars |
| Create | `src/components/about/AboutSpace.tsx` | 2×2 photo gallery |
| Create | `src/components/about/AboutPeople.tsx` | Founder placeholder |
| Create | `src/components/about/AboutCTA.tsx` | Dark closing CTA |
| Modify | `src/components/navbar/Navbar.tsx` | Add Story link, fix Visit → #locations |

`src/components/founders/FoundersPreview.tsx` CTA already points to `/about` — no change needed.

---

## Section 1: AboutHero

**File:** `src/components/about/AboutHero.tsx`

- Full-viewport (`min-h-screen`) section
- Background image: `/images/new/interior-wide-cloud.jpg`
  - `object-cover w-full h-full absolute inset-0`
- Gradient overlay (two layers stacked):
  - Top: `from-[#ead8b5]/30 via-transparent to-transparent` (cream from top)
  - Bottom: `from-transparent via-transparent to-[#231f20]/60` (dark at bottom)
- Centered text container: `absolute inset-0 flex flex-col items-center justify-center text-center px-6`
  - Eyebrow: `"Our Story"` — `font-ui uppercase tracking-[0.3em] text-xs text-white/70 mb-4`
  - Headline: `"Born from a love of "` + `<em>slow mornings.</em>` — `font-display text-5xl md:text-6xl lg:text-7xl text-white max-w-4xl leading-tight`
- Parallax: GSAP ScrollTrigger on the image element
  ```js
  gsap.to(imageRef.current, {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true }
  })
  ```
- Entrance: `useGSAP` fade-in on mount (no ScrollTrigger — already at top of page)
  ```js
  gsap.fromTo([eyebrowRef.current, headlineRef.current],
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', stagger: 0.15 }
  )
  ```

---

## Section 2: AboutOrigin

**File:** `src/components/about/AboutOrigin.tsx`

- Background: `bg-white py-24 md:py-32`
- Grid: `grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-12 lg:gap-20 items-center max-w-7xl mx-auto px-6 md:px-12`
- **Text column (left):**
  - Eyebrow: `"The Beginning"` — standard eyebrow style (`font-ui uppercase tracking-[0.3em] text-xs text-dark/50 mb-6`)
  - 3 paragraphs, each `font-body text-lg text-dark/85 leading-loose mb-6`:
    1. "Every great café begins with a conversation. For us, it started over a cup of coffee that wasn't quite right — too rushed, too impersonal, too forgettable. We knew Hyderabad deserved something different."
    2. "Wool Cup was born in 2024, not as a business plan, but as a promise — to create a space where every cup is pulled with intention, every dish is crafted with care, and every guest feels the warmth of belonging."
    3. "We named it Wool Cup because wool is warm, familiar, comforting. It wraps around you. That's what we wanted our café to feel like — a place that wraps around you like your favourite sweater on a quiet morning."
- **Image column (right):**
  - `/images/new/interior-sofa.jpg`
  - `rounded-2xl overflow-hidden shadow-md aspect-[3/4] object-cover w-full`
- **Animation:** `useGSAP` stagger on scroll — eyebrow, paragraphs, image all fade up with 0.1s stagger

---

## Section 3: AboutPhilosophy

**File:** `src/components/about/AboutPhilosophy.tsx`

- Background: `bg-[#ead8b5]/20 py-24 md:py-32`
- Centered layout: `max-w-4xl mx-auto px-6 text-center`
- **Pull quote:**
  - `"We don't just serve coffee. We serve the pause."` — `font-display text-3xl md:text-4xl lg:text-5xl text-dark italic leading-tight mb-4`
  - `"— The Founders"` — `font-ui text-sm text-dark/50 mb-20`
- **Three value pillars:** `grid grid-cols-1 md:grid-cols-3 gap-10 text-left mt-16`
  Each pillar:
  - Number: `01` / `02` / `03` — `font-ui text-[10px] uppercase tracking-widest text-dark/30 mb-4`
  - Title: `font-display text-xl text-dark mb-3`
  - Description: `font-body text-sm text-dark/70 leading-relaxed`

  | # | Title | Description |
  |---|-------|-------------|
  | 01 | Intentional Sourcing | "Every bean is chosen, not settled for. We work directly with estates in the Chikmagalur hills — shade-grown, single-origin, scoring 86+ on the SCA scale." |
  | 02 | Honest Craft | "No shortcuts. No artificial syrups. Every extraction, every bake, every plate is the honest result of care and practice." |
  | 03 | Warm Belonging | "Wool Cup isn't just a café — it's a feeling. A place where strangers become regulars and every visit feels like coming home." |

- **Animation:** pull quote fades in, then pillars stagger up on scroll

---

## Section 4: AboutSpace

**File:** `src/components/about/AboutSpace.tsx`

- Background: `bg-white py-24 md:py-32`
- **2×2 asymmetric grid** (`max-w-7xl mx-auto px-6 md:px-12`):
  ```
  [Large: interior-wide-cloud.jpg, row-span-2] [food-01.jpg]
                                               [exterior-wide.jpg]
  ```
  Plus a 4th image below spanning: `barista-pour.jpg` (full width below grid)
  
  Simpler implementation: `grid grid-cols-1 md:grid-cols-2 gap-4`
  - Cell 1 (`md:row-span-2`): `/images/new/interior-wide-cloud.jpg` — tall, `rounded-2xl overflow-hidden min-h-[400px]`
  - Cell 2: `/images/woolcup/food-01.jpg` — `rounded-2xl overflow-hidden h-[280px]`
  - Cell 3: `/images/new/exterior-wide.jpg` — `rounded-2xl overflow-hidden h-[280px]`
  - Below grid (full width): `/images/new/barista-pour.jpg` — `rounded-2xl overflow-hidden h-[300px] w-full mt-4 object-cover`

- **Caption:** `"Designed for slow mornings and conversations that matter."` — `font-body italic text-center text-dark/60 mt-8 text-base`
- **Animation:** images stagger fade-in on scroll

---

## Section 5: AboutPeople

**File:** `src/components/about/AboutPeople.tsx`

- Background: `bg-[#ead8b5]/10 py-24 md:py-32`
- No founder photos available → elegant placeholder
- Centered: `max-w-4xl mx-auto px-6 text-center`
- Eyebrow: `"The People"` — standard eyebrow
- Headline: `"The faces behind every cup."` — `font-display text-3xl md:text-4xl text-dark`
- Body: `"We'll introduce you soon."` — `font-body text-base text-dark/60 mt-4`
- `{/* TODO: Replace with 2-column founder portrait grid once photos are available */}`
- Simple fade-in on scroll

---

## Section 6: AboutCTA

**File:** `src/components/about/AboutCTA.tsx`

- Background: `bg-[#231f20] py-24 md:py-32`
- Centered: `max-w-3xl mx-auto px-6 text-center relative overflow-hidden`
- **Text watermark (no illustrated logo):**
  - `"WOOL CUP"` — `absolute inset-0 flex items-center justify-center font-display text-[clamp(80px,15vw,160px)] text-white/5 tracking-[0.3em] select-none pointer-events-none`
- **Content (relative z-10):**
  - `"Come find us."` — `font-display text-4xl md:text-5xl text-white mb-4`
  - `"Film Nagar & Financial District, Hyderabad"` — `font-body text-lg text-[#ead8b5]/70 mb-10`
  - Two buttons side by side: `flex flex-col sm:flex-row gap-4 justify-center`
    - "Visit Us →" → `href="/#locations"` — `bg-[#ead8b5] text-dark font-ui text-sm uppercase tracking-wide px-8 py-3 rounded-full hover:bg-white transition-colors duration-300`
    - "Follow Our Story →" → `href="https://www.instagram.com/woolcupcafe"` — `border border-[#ead8b5]/60 text-[#ead8b5] font-ui text-sm uppercase tracking-wide px-8 py-3 rounded-full hover:border-[#ead8b5] hover:bg-[#ead8b5]/10 transition-all duration-300`
- **Animation:** fade-up entrance on scroll

---

## page.tsx

**File:** `src/app/about/page.tsx`

Server component — exports metadata, renders all 6 section components inside a Framer Motion fade-in wrapper (client boundary handled by child components).

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

Page fade-in handled within `AboutHero` (first component seen by user — animates in on mount rather than scroll).

---

## Navbar Update

**File:** `src/components/navbar/Navbar.tsx`

Two changes to the `navLinks` array:
1. Add `{ name: 'Story', href: '/about' }` — inserted before "Philosophy"
2. Change `{ name: 'Visit', href: '#visit' }` → `{ href: '#locations' }` (Phase 3 renamed the section)

---

## SEO

```ts
export const metadata: Metadata = {
  title: 'Our Story — Wool Cup Urban Café & Bistro',
  description: 'The journey behind Wool Cup. Born in Film Nagar, Hyderabad — a sanctuary of comfort, craft, and connection.',
}
```

---

## Self-Review

- **Placeholder scan:** AboutPeople has intentional TODO comment — documented, not a gap. No other TODOs.
- **Internal consistency:** All image paths verified against actual files in `public/images/`. CTA links use `/#locations` (same-domain hash) and Instagram URL.
- **Scope check:** One page + one navbar edit. Self-contained. No other pages affected.
- **Ambiguity resolved:** "Illustrated logo" → text watermark (no asset exists). "Page transition" → mount fade-in in AboutHero. "The People" → placeholder section. Navbar "Visit" fix included as it was broken by Phase 3.

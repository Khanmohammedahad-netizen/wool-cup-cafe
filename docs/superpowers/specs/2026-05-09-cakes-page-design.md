# Custom Cakes Page + Celebrations Integration Design

**Goal:** Create a `/cakes` page for custom cake inquiries, plus add subtle celebrations integration to the footer and locations section.

**Brand system:** Cream/dark/white palette, `font-display`/`font-body`/`font-ui` tokens. No new dependencies.

---

## Routing

App Router. Page at `src/app/cakes/page.tsx` (server component — exports metadata, renders client section components).

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `src/app/cakes/page.tsx` | Metadata, page shell |
| Create | `src/components/cakes/CakesHero.tsx` | 60vh hero with dessert-case.jpg |
| Create | `src/components/cakes/CakesGallery.tsx` | 3-col CSS columns masonry, 6 placeholder cards |
| Create | `src/components/cakes/CakesHowItWorks.tsx` | 3-step process with dashed connector |
| Create | `src/components/cakes/CakesInquiryCTA.tsx` | Dark bg, WhatsApp + tel CTAs |
| Modify | `src/components/navbar/Navbar.tsx` | Add Cakes link after Menu |
| Modify | `src/components/footer/Footer.tsx` | Add "For Special Moments" row above grid |
| Modify | `src/components/locations/Locations.tsx` | Add "Planning something special?" line |

---

## Section 1: CakesHero

**File:** `src/components/cakes/CakesHero.tsx`

- Height: `min-h-[60vh]`
- Background: `/images/new/dessert-case.jpg` — `object-cover w-full h-full absolute inset-0`
  - `{/* TODO: Replace with woolcup-cake-branded.jpg once available */}`
- Gradient overlay: `bg-gradient-to-t from-[#231f20]/80 via-[#231f20]/30 to-transparent` (warm dark from bottom)
- Centered content: `absolute inset-0 flex flex-col items-center justify-center text-center px-6`
  - Eyebrow: `"The Bakery"` — `font-ui uppercase tracking-[0.3em] text-xs text-[#ead8b5]/70 mb-4`
  - Headline: `"Celebration "` + `<em>cakes.</em>` — `font-display text-5xl md:text-6xl text-white`
  - Subtitle: `"Handcrafted with love, designed for your moments."` — `font-body text-lg text-[#ead8b5]/80 mt-4`
- **Animation:** `useGSAP` stagger fade-in on mount (eyebrow → headline → subtitle, `stagger: 0.15`)

---

## Section 2: CakesGallery

**File:** `src/components/cakes/CakesGallery.tsx`

- Background: `bg-[#ead8b5]/10 py-20 md:py-28`
- Header: `max-w-3xl mx-auto px-6 text-center mb-12`
  - `"Our Creations"` — `font-display text-3xl md:text-4xl text-[#231f20]`
- **Masonry grid** via CSS columns: `columns-1 md:columns-2 lg:columns-3 gap-4 max-w-6xl mx-auto px-6`
  - Each card: `break-inside-avoid mb-4`
- No `/public/images/cakes/` directory exists → 6 placeholder cards. Vary heights for masonry effect using `aspect-square` for cards 1, 3, 5 and `aspect-[3/4]` for cards 2, 4, 6:
  ```tsx
  const PLACEHOLDER_CARDS = [
    { aspect: 'aspect-square' },
    { aspect: 'aspect-[3/4]' },
    { aspect: 'aspect-square' },
    { aspect: 'aspect-[3/4]' },
    { aspect: 'aspect-square' },
    { aspect: 'aspect-[3/4]' },
  ]
  ```
  Each card:
  - `bg-[#ead8b5]/30 rounded-xl border border-[#ead8b5]/50 flex items-center justify-center`
  - `"Coming Soon"` — `font-display text-[#231f20]/30 text-2xl`
  - `{/* TODO: Replace with cake photos */}`
- **Animation:** GSAP stagger fade-up on scroll

---

## Section 3: CakesHowItWorks

**File:** `src/components/cakes/CakesHowItWorks.tsx`

- Background: `bg-white py-20 md:py-28`
- Header: `max-w-3xl mx-auto px-6 text-center mb-16`
  - `"Made for "` + `<em>you.</em>` — `font-display text-3xl md:text-4xl text-[#231f20]`
- **Three steps** — `max-w-5xl mx-auto px-6 relative`
  - Dashed connector line (desktop only): `hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px border-t border-dashed border-[#ead8b5] z-0`
  - Grid: `grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10`
  - Each step: `text-center`
    - Number: `font-display text-4xl text-[#ead8b5] mb-4 block` — `"01"` / `"02"` / `"03"`
    - Title: `font-display text-lg text-[#231f20] mb-3`
    - Description: `font-body text-sm text-[#231f20]/70 leading-relaxed`

  | # | Title | Description |
  |---|-------|-------------|
  | 01 | Imagine | "Tell us about your celebration — the flavours you love, the colours you envision, the story you want to tell." |
  | 02 | Create | "Our pastry team brings your vision to life with premium ingredients, artistic precision, and a whole lot of heart." |
  | 03 | Celebrate | "Pick up your creation — or let us deliver it to your doorstep — and make your moment unforgettable." |

- **Animation:** GSAP stagger fade-up on scroll

---

## Section 4: CakesInquiryCTA

**File:** `src/components/cakes/CakesInquiryCTA.tsx`

- Background: `bg-[#231f20] py-20 md:py-28`
- Centered: `max-w-2xl mx-auto px-6 text-center`
- Headline: `"Let's create something "` + `<em>beautiful.</em>` — `font-display text-4xl text-white mb-4`
- Description: `"Tell us about your celebration and we'll craft something perfect."` — `font-body text-lg text-[#ead8b5]/70 mb-10`
- **Primary CTA:** WhatsApp button
  - `href="https://wa.me/917292944244?text=Hi%20Wool%20Cup!%20I'd%20like%20to%20inquire%20about%20a%20custom%20cake."`
  - `target="_blank" rel="noopener noreferrer"`
  - `bg-[#ead8b5] text-[#231f20] font-ui text-sm uppercase tracking-wide px-8 py-3 rounded-full hover:bg-white hover:scale-[1.02] hover:shadow-lg transition-all duration-300`
  - Label: `"Start a Conversation →"`
- **Secondary CTA:** `href="tel:+917292944244"` — `font-body text-sm text-[#ead8b5]/70 hover:text-[#ead8b5] transition-colors mt-4 block` — `"or call us"`
- **Note:** `"We recommend ordering at least 48 hours in advance for custom designs."` — `font-ui text-xs text-white/40 mt-8`
- **Animation:** GSAP fade-up on scroll

---

## page.tsx

**File:** `src/app/cakes/page.tsx`

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

---

## Navbar Update

**File:** `src/components/navbar/Navbar.tsx`

Add `{ name: 'Cakes', href: '/cakes' }` after Menu:

```ts
const navLinks = [
  { name: 'Story', href: '/about' },
  { name: 'Menu', href: '/menu' },
  { name: 'Cakes', href: '/cakes' },
  { name: 'Philosophy', href: '#philosophy' },
  { name: 'Origin', href: '#origin' },
  { name: 'Offerings', href: '#offerings' },
  { name: 'Space', href: '#space' },
  { name: 'Visit', href: '#locations' },
]
```

---

## Footer Update

**File:** `src/components/footer/Footer.tsx`

Add a "For Special Moments" row between the `<footer>` opening and the existing `<div className="grid ...">`. The row has a cream-tinted background at 5% and a thin top-to-bottom separator below it:

```tsx
{/* Special Moments row */}
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
```

---

## Locations Update

**File:** `src/components/locations/Locations.tsx`

In each location card's content block, after the `{loc.phone}` paragraph and before the CTA `<a>`, add:

```tsx
<p className="font-body text-sm italic text-[#ead8b5]/80 mt-3">
  Planning something special?{' '}
  <a
    href="https://wa.me/917292944244?text=Hi%20Wool%20Cup!%20I'd%20like%20to%20inquire%20about%20a%20special%20event."
    target="_blank"
    rel="noopener noreferrer"
    className="underline underline-offset-2 hover:text-[#ead8b5] transition-colors"
  >
    Inquire →
  </a>
</p>
```

Note: The Locations section has `bg-white` background with dark card text — the italic line should use `text-dark/60` (not cream) to stay legible on white:

```tsx
<p className="font-body text-sm italic text-dark/60 mt-3">
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

---

## SEO

```ts
export const metadata: Metadata = {
  title: 'Custom Cakes — Wool Cup Urban Café & Bistro',
  description: 'Handcrafted celebration cakes designed for your special moments. Order custom cakes from Wool Cup, Hyderabad.',
}
```

---

## Self-Review

- **Placeholder scan:** Gallery has intentional `{/* TODO: Replace with cake photos */}` — documented. Hero has `{/* TODO: Replace with woolcup-cake-branded.jpg */}` — documented. No accidental TBDs.
- **Internal consistency:** `Visit.tsx` is NOT modified — it's a dead component (replaced by `Locations.tsx` in Phase 3, removed from `page.tsx`). Confirmed: special orders line goes into `Locations.tsx` only.
- **Scope check:** One new page (4 components) + 3 file modifications. Self-contained.
- **Ambiguity resolved:** `woolcup-cake-branded.jpg` → `dessert-case.jpg` fallback. Locations text color → `text-dark/60` (white card background, not cream). No "catering" word used anywhere — "special orders", "gatherings", "curated spreads" throughout.

# Founders Preview + Glimpse Grid + Hero Update Design

**Goal:** Add Founders Preview and Glimpse Grid sections after the hero, and update the hero's scroll indicator animation.

**Brand system:** Phase 1 is complete — cream/dark/white palette, font-display/body/ui tokens, all in globals.css.

**Animation library:** GSAP ScrollTrigger via `useGSAP()` from `@gsap/react` (new dependency to install). Existing components use bare `useEffect` — new components use `useGSAP`. No regression.

---

## Task 1: Hero Section Update

**File:** `src/components/hero/HeroFilm.tsx`

**Changes only:**
- No `hero-new.mp4` exists → video src unchanged
- `h1` inherits `font-display` from base rules → no change needed
- `.text-label` already uses `font-ui` via globals.css `.text-label` utility → no change needed
- **Only real change:** SCROLL indicator at bottom of hero
  - Add classes: `font-ui uppercase tracking-widest`
  - Add GSAP infinite bounce on the arrow SVG:
    ```js
    gsap.to(arrowRef.current, {
      y: 6, duration: 1.5, ease: "power1.inOut", yoyo: true, repeat: -1
    })
    ```
  - Uses `useEffect` (not `useGSAP`) to stay consistent with HeroFilm's existing pattern
  - Arrow needs a `ref` added

---

## Task 2: Founders Preview Section

**New file:** `src/components/founders/FoundersPreview.tsx`

### Layout
- Section: `id="founders"`, `py-20 lg:py-32`, background `bg-[#ead8b5]/30` (cream 30% opacity)
- Container: `max-w-7xl mx-auto px-6 md:px-12`
- Grid: `grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-20 items-center`
- Mobile: image stacks on top

### Image Column
- Placeholder: `/images/new/interior-sofa.jpg` with `{/* TODO: Replace with founder photo */}` comment
- Wrapper: `relative overflow-hidden rounded-2xl aspect-[4/3] lg:aspect-[3/4]`
- `<img>` with `object-cover w-full h-full`
- Warm overlay: `absolute inset-0 bg-cream/10 mix-blend-multiply pointer-events-none`
- GSAP clip-path reveal on scroll:
  ```js
  gsap.fromTo(imageWrapperRef.current,
    { clipPath: "inset(0 100% 0 0)" },
    { clipPath: "inset(0 0% 0 0)", duration: 1.0, ease: "power2.inOut",
      scrollTrigger: { trigger: imageWrapperRef.current, start: "top 85%" } }
  )
  ```

### Text Column
- Eyebrow: `"Our Story"` — `font-ui uppercase tracking-[0.3em] text-xs text-dark/50`
- Headline: `"Where comfort meets "` + `<em>craft.</em>` — `font-display text-3xl md:text-4xl lg:text-5xl text-dark`
- Body: `font-body text-base md:text-lg text-dark/80 leading-relaxed`
  > "Wool Cup was born from a simple belief — that every cup of coffee and every bite of food should feel like a warm embrace. Founded in the heart of Film Nagar, we set out to create a sanctuary where slow mornings, honest conversations, and handcrafted flavours come together."
- CTA: `"Read our full story →"` — `font-ui text-sm uppercase tracking-wide text-dark`
  - Underline animation: `relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-dark hover:after:w-full after:transition-all after:duration-500`
  - `href="/about"`

### Text stagger animation
```js
gsap.fromTo(
  [eyebrowRef, headlineRef, bodyRef, ctaRef].map(r => r.current),
  { opacity: 0, y: 40 },
  { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.12,
    scrollTrigger: { trigger: textColRef.current, start: "top 85%" } }
)
```

### page.tsx insertion
```tsx
<HeroFilm />
<FoundersPreview />   {/* NEW — inserted here */}
<Manifesto />
```

---

## Task 3: Glimpse Grid Section ("Explore Wool Cup")

**New file:** `src/components/glimpse/GlimpseGrid.tsx`

### Section Header
- Section: `id="explore"`, `bg-white py-24 md:py-32`
- Eyebrow: `"The Experience"` — `font-ui uppercase tracking-[0.3em] text-xs text-dark/50`
- Headline: `"Explore "` + `<em>Wool Cup</em>` — `font-display text-4xl md:text-5xl text-dark`
- Header stagger-animates in on scroll (eyebrow then headline, 0.12s stagger)

### Grid Layout (CSS Grid, 3 columns desktop)

```
Row 1: [Seasonal - col-span-2, min-h-400] [Must-Try - row-span-2, min-h-500]
Row 2: [Reviews - col-span-1, min-h-300] [Gallery - col-span-2, min-h-400]  ← total: 1+2=3 ✓
Row 3: [Locations - col-span-1] [Bakery - col-span-1] [Celebrations - col-span-1] min-h-300 each
```

CSS:
```css
.glimpse-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem; /* gap-4 */
}
```

Item grid-area assignments via inline style or Tailwind `col-span-*` / `row-span-*`:
- Seasonal: `col-span-2`
- Must-Try: `row-span-2`  
- Reviews: default (1 col)
- Gallery: `col-span-2`
- Locations/Bakery/Celebrations: default (1 col each)

Mobile: `grid-cols-1`, all items `col-span-1 row-span-1`

### Each Card Component
Extracted as `GlimpseCard` sub-component:
```tsx
interface GlimpseCardProps {
  image: string
  label: string
  title: string
  description: string
  href: string
  size: 'standard' | 'large' | 'tall'
  className?: string
}
```

Card structure:
```tsx
<Link href={href} className={cn("relative overflow-hidden rounded-xl group block", minHeightClass, className)}>
  <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.03]" />
  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent group-hover:from-dark/40 transition-all duration-600" />
  <div className="absolute bottom-0 left-0 p-5 md:p-6">
    <p className="font-ui uppercase tracking-widest text-[10px] text-cream mb-1 flex items-center gap-2">
      <span className="w-4 h-px bg-cream inline-block" />{label}
    </p>
    <h3 className="font-display text-xl md:text-2xl text-white">{title}</h3>
    <p className="font-body text-sm text-white/70">{description}</p>
  </div>
</Link>
```

### Image mapping
| Item | Actual file |
|------|------------|
| Seasonal Dishes | `/images/woolcup/food-01.jpg` |
| Must-Try | `/images/new/cake-slice.jpg` |
| Reviews | `/images/woolcup/interior-01.jpg` |
| Gallery | `/images/new/interior-wide-cloud.jpg` |
| Locations | `/images/new/exterior-night.jpg` |
| Bakery | `/images/new/dessert-case.jpg` |
| Celebrations | `/images/new/interior-dining.jpg` |

### Animations
All 7 cards animate with stagger triggered by section entering viewport:
```js
gsap.fromTo(cardRefs.current,
  { opacity: 0, y: 40, scale: 0.95 },
  { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out", stagger: 0.12,
    scrollTrigger: { trigger: gridRef.current, start: "top 80%" } }
)
```

### page.tsx insertion
```tsx
<HeroFilm />
<FoundersPreview />
<GlimpseGrid />      {/* NEW — inserted here */}
<Manifesto />
```

---

## New Dependency

`@gsap/react` — provides `useGSAP()` hook for proper React integration with automatic cleanup.

Install: `pnpm add @gsap/react`

Usage pattern:
```tsx
import { useGSAP } from "@gsap/react"
gsap.registerPlugin(ScrollTrigger, useGSAP)

useGSAP(() => {
  // gsap animations here — auto-cleanup on unmount
}, { scope: containerRef })
```

---

## Files Summary

| File | Action |
|------|--------|
| `package.json` | Add `@gsap/react` dependency |
| `src/components/hero/HeroFilm.tsx` | Minimal: add ref + GSAP bounce to scroll arrow |
| `src/components/founders/FoundersPreview.tsx` | New |
| `src/components/glimpse/GlimpseGrid.tsx` | New (includes GlimpseCard sub-component) |
| `src/app/page.tsx` | Insert FoundersPreview + GlimpseGrid after HeroFilm |

---

## Self-Review

- **Placeholders:** Image paths are all resolved to actual files. `/about`, `/menu#seasonal`, `/cakes` links are acknowledged as future pages (consistent with spec).
- **Consistency:** All animations use the exact GSAP pattern specified by user. `useGSAP` used in new components; existing components untouched.
- **Scope:** No existing sections removed or modified beyond HeroFilm scroll indicator.
- **Ambiguity resolved:** "italic" for "craft" and "Wool Cup" = `<em>` tag, styled `italic` via CSS.
- **Grid math verified:** Row 1: Seasonal(2) + Must-Try(1) = 3 ✓. Row 2: Reviews(1) + Gallery(2) = 3 ✓. Row 3: Locations(1) + Bakery(1) + Celebrations(1) = 3 ✓.

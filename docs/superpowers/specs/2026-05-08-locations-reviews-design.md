# Phase 3: Locations + Reviews Overhaul Design

**Goal:** Insert a warm reviews/social-proof section after Manifesto, and replace the single-location Visit section with a premium dual-location section with embedded map.

**Brand system:** Phase 1 complete — cream/dark/white palette, font-display/body/ui tokens.

**Animation library:** GSAP ScrollTrigger via `useGSAP()` from `@gsap/react` (already installed in Phase 2).

---

## Context

- "Guest Experiences / Loved by Hyderabad" dark section was removed in a prior rebuild — no deletion needed
- Review data (`Aryan M`, `Sneha R` etc.) no longer exists in codebase — written directly into new component
- All existing sections (CupSequence, CraftTriptych, Ambience, MenuHighlight, InstagramFeed) preserved exactly

---

## Files

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `src/components/social-proof/SocialProof.tsx` | Review cards + photo marquee |
| Create | `src/components/locations/Locations.tsx` | Dual location cards + map |
| Modify | `src/app/page.tsx` | Insert SocialProof, swap Visit → Locations |

Old `Visit.tsx` stays on disk but is no longer imported.

---

## Task 1: SocialProof Section

**Position in page:** after `<Manifesto />`, before `<CupSequence />`

### Section wrapper
- `id="reviews"`
- Background: `bg-[#ead8b5]/15`
- Padding: `py-24 md:py-32`

### Header
- Eyebrow: `"Guest Voices"` — `font-ui uppercase tracking-[0.3em] text-xs text-dark/50`
- Headline: `"Loved by "` + `<em>Hyderabad.</em>` — `font-display text-4xl md:text-5xl text-dark`
- Centered: `text-center mb-16`

### Review cards

6 cards, data defined as a const array in the component:

```ts
const REVIEWS = [
  {
    name: "Aryan M.",
    quote: "Hands down the best coffee in Hyderabad. The pour over is a ritual — clean, bright, and completely unhurried.",
  },
  {
    name: "Sneha R.",
    quote: "Found my favourite corner of the city. The vanilla latte and the sofa section are my Sunday morning staples now.",
  },
  {
    name: "Rahul K.",
    quote: "Everything here is intentional — the music, the light, the coffee temperature. A rare place that gets hospitality right.",
  },
  {
    name: "Priya S.",
    quote: "The cloud ceiling alone is worth the visit, but the cold brew reserve kept me coming back. Exceptional.",
  },
  {
    name: "Vikram A.",
    quote: "Not just a café — a proper third place. I've written three proposals here. The staff never rush you.",
  },
  {
    name: "Meera T.",
    quote: "The cake display changed my life. Genuinely. And the baristas know your order by the second visit.",
  },
]
```

**Desktop grid:** `grid grid-cols-3 gap-6` (hidden on mobile)

**Mobile:** `flex overflow-x-auto gap-4 scroll-snap-x mandatory pb-4` with each card `min-w-[85vw] scroll-snap-start` (hidden on desktop via responsive classes, or same element with different layout via Tailwind)

**Implementation note:** Use a single element with Tailwind responsive classes:
- Container: `grid grid-cols-1 md:grid-cols-3 gap-6` — on mobile each card is full width, user can scroll vertically. The horizontal scroll-snap is a mobile UX enhancement applied via an outer wrapper only on small screens via CSS.

Simpler approach: single `grid grid-cols-1 md:grid-cols-3 gap-6` — natural stacking on mobile, 3-col on desktop. No horizontal scroll complexity.

**Card structure:**
- `bg-white border border-[#ead8b5] rounded-xl p-6 md:p-8 relative overflow-hidden`
- Decorative quote mark: `absolute top-4 left-4 font-display text-7xl text-[#ead8b5]/60 leading-none select-none pointer-events-none` — renders `"` character
- Stars: `★★★★★` in `text-[#C9A84C]`, `font-ui text-sm mb-4`
- Quote: `font-body text-base md:text-lg text-dark/80 italic leading-relaxed mb-6`
- Attribution: `— Name` — `font-ui text-sm text-dark/60`

### Animation
```js
useGSAP(() => {
  gsap.fromTo(cardRefs.current.filter(Boolean),
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.1,
      scrollTrigger: { trigger: gridRef.current, start: "top 80%" } }
  )
}, { scope: containerRef })
```

### Photo marquee

Below the cards, `mt-16`.

```
[duplicate set of images] → seamless loop via CSS animation
```

**Images (10 items, duplicated for seamless loop):**
```
/images/woolcup/interior-01.jpg
/images/woolcup/food-01.jpg
/images/woolcup/food-02.jpg
/images/new/barista-pour.jpg
/images/new/interior-hand-chairs.jpg
/images/woolcup/interior-03.jpg
/images/new/dessert-case.jpg
/images/woolcup/food-03.jpg
/images/new/exterior-wide.jpg
/images/woolcup/interior-05.jpg
```

**Marquee CSS (in globals.css or inline `<style>`):**
```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.marquee-track {
  animation: marquee 40s linear infinite;
}
.marquee-track:hover {
  animation-play-state: paused;
}
```

Track: `flex gap-4` containing all 20 images (10 + 10 duplicated). Each image: `h-[200px] w-auto aspect-[4/3] object-cover rounded-lg flex-shrink-0`.

Container: `overflow-hidden bg-white py-8`. No dark background.

---

## Task 2: Locations Section

**Position in page:** replaces `<Visit />`

### Section wrapper
- `id="locations"`
- Background: `bg-[radial-gradient(ellipse_at_center,_#ead8b5_0%,_transparent_70%)]` overlaid on white — achieved via `relative bg-white` + absolute pseudo-element, or Tailwind arbitrary: `bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(234,216,181,0.2)_0%,transparent_100%)]`
- Padding: `py-24 md:py-32`

### Header
- Eyebrow: `"Find Us"` — `font-ui uppercase tracking-[0.3em] text-xs text-dark/50 text-center`
- Headline: `"Two homes, one "` + `<em>soul.</em>` — `font-display text-4xl md:text-5xl text-dark text-center`
- `mb-16`

### Location cards grid
- `grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto`
- Each card: `rounded-2xl overflow-hidden bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-[400ms]`

**Card structure:**
```tsx
<div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-[400ms]">
  {/* Image top */}
  <div className="relative h-[280px] overflow-hidden">
    <img src={image} alt={name} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent" />
    {/* Badge */}
    <span className="absolute top-4 right-4 font-ui text-[10px] uppercase tracking-widest bg-[#ead8b5] text-dark px-3 py-1 rounded-full">
      {badge}
    </span>
  </div>
  {/* Content bottom */}
  <div className="p-6 md:p-8">
    <h3 className="font-display text-2xl md:text-3xl text-dark mb-4">{name}</h3>
    <div className="space-y-2 mb-6">
      <p className="font-body text-sm text-dark/70 leading-relaxed">{address}</p>
      <p className="font-body text-sm text-dark/70 leading-relaxed">{hours}</p>
      <p className="font-body text-sm text-dark/70">{phone}</p>
    </div>
    <a href={ctaHref} target="_blank" rel="noopener noreferrer"
       className="font-ui text-sm uppercase tracking-wide text-dark w-fit relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-dark hover:after:w-full after:transition-all after:duration-500">
      {ctaLabel}
    </a>
  </div>
</div>
```

**Card 1 — Film Nagar:**
- Image: `/images/new/exterior-wide.jpg`
- Badge: `"Flagship"`
- Name: `"Film Nagar"`
- Address: `"CC 55, Road No. 1, Film Nagar, Opposite Papaya, Jubilee Hills, Hyderabad 500033"`
- Hours: `"Mon — Sun · 8:00 AM — 11:30 PM"`
- Phone: `"+91 72929 44244"`
- CTA label: `"Get Directions →"`, href: `"https://www.google.com/maps?q=17.4137993,78.4062934"`

**Card 2 — Financial District:**
- Image: `/images/woolcup/interior-01.jpg`
- Badge: `"New"`
- Name: `"Financial District"`
- Address: `"Coming Soon — Financial District, Hyderabad"`
- Hours: `"Opening hours to be announced"`
- Phone: `"+91 72929 44244"`
- CTA label: `"Follow for updates →"`, href: `"https://www.instagram.com/woolcupcafe"`

### Embedded map

Below cards, `mt-12`.

```tsx
<div className="rounded-2xl overflow-hidden h-[300px] md:h-[400px] w-full border border-[#ead8b5] group">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.037130635467!2d78.40618067606774!3d17.41113060237905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96bc72e8211b%3A0xc3c5d6e2467d022b!2sFilm%20Nagar%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
    width="100%"
    height="100%"
    style={{ border: 0, filter: 'grayscale(1) contrast(0.9) brightness(1.1)' }}
    className="group-hover:filter-none transition-all duration-[600ms]"
    allowFullScreen={false}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>
```

Note: Tailwind `group-hover:filter-none` removes the CSS filter on iframe hover. This works in Tailwind v4.

### Animations
Both cards fade in on scroll with slight stagger:
```js
useGSAP(() => {
  gsap.fromTo(cardRefs.current.filter(Boolean),
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.15,
      scrollTrigger: { trigger: gridRef.current, start: "top 80%" } }
  )
}, { scope: containerRef })
```

---

## page.tsx changes

```tsx
// Remove:
import { Visit } from '@/components/visit/Visit'

// Add:
import { SocialProof } from '@/components/social-proof/SocialProof'
import { Locations } from '@/components/locations/Locations'

// Order:
<Manifesto />
<SocialProof />      {/* NEW */}
<CupSequence />
<CraftTriptych />
<Ambience />
<MenuHighlight />
<InstagramFeed />
<Locations />        {/* replaces <Visit /> */}
<Footer />
```

---

## Self-Review

- **Placeholder scan:** No TBD/TODO. All image paths verified against actual files. Google Maps embed URL copied from existing Visit.tsx. Instagram href uses known handle `woolcupcafe`.
- **Internal consistency:** `useGSAP` pattern matches Phase 2 exactly. `@gsap/react` already installed. `cn` utility available at `@/lib/utils`.
- **Scope check:** Two focused components. Single page.tsx edit. No existing components modified.
- **Ambiguity resolved:** Mobile reviews = simple single-column grid (no horizontal scroll complexity). CSS marquee is simpler and sufficient for the photo strip. `group-hover:filter-none` handles map hover in Tailwind v4.

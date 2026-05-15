# Wool Cup — Homepage Refresh, Font Overhaul & Gallery Page

**Date:** 2026-05-15  
**Status:** Approved

---

## 1. Goals

- Make the homepage feel serene and peaceful — less dense, more breathing room
- Replace body font with one that matches the quiet, artisan aesthetic
- Change footer from near-black to warm light brown
- Add a dedicated gallery page for all cafe photos

---

## 2. Font Changes

### Body font: Libre Baskerville → Cormorant Garamond

**Why:** Cormorant Garamond is thinner, airier, and more contemplative. It reads quietly on the page — a natural fit for a slow-coffee brand. Libre Baskerville is heavier and more editorial/newspaper in character.

**Change in `layout.tsx`:**
- Remove `Libre_Baskerville` import
- Add `Cormorant_Garamond` with weights `300`, `400`, `600` and styles `normal`, `italic`
- Variable stays `--font-body`

**Unchanged:**
- `edhan-martine` (local, display) — brand font, keep
- `DM_Sans` (UI labels, buttons) — keep

---

## 3. Homepage Section Trim

### Removed sections (delete from `page.tsx` imports + JSX)

| Component | File | Reason |
|---|---|---|
| `GlimpseGrid` | `src/components/glimpse/GlimpseGrid.tsx` | Dense 7-card bento — primary clutter source |
| `CupSequence` | `src/components/cup-sequence/CupSequence.tsx` | Visual noise, redundant with hero |
| `CraftTriptych` | `src/components/craft/CraftTriptych.tsx` | Overlaps with MenuHighlight content |
| `Ambience` | `src/components/ambience/Ambience.tsx` | Redundant with new gallery teaser |
| `InstagramFeed` | `src/components/instagram/InstagramFeed.tsx` | Photos move to /gallery page |

### Kept sections (in order)

1. `WoolcupHero` — unchanged
2. `Manifesto` — unchanged
3. `FoundersPreview` — unchanged
4. `SocialProof` — unchanged (reviews + marquee strip)
5. `MenuHighlight` — unchanged
6. `GalleryTeaser` — **new**, simple 3-photo strip → links to `/gallery`
7. `Locations` — unchanged
8. `Footer` — color change only

### New: GalleryTeaser component

Simple section, not animated, no dependencies.

```
src/components/gallery/GalleryTeaser.tsx
```

- Cream background
- Heading: "The Space" (font-display)
- 3 photos in a row (1 tall left, 2 stacked right) — picks from `/images/new/` and `/images/woolcup/`
- CTA: "Explore the Gallery →" links to `/gallery`

---

## 4. Footer Color Change

**File:** `src/components/footer/Footer.tsx`

| Token | Before | After |
|---|---|---|
| `bg` | `bg-[#231f20]` | `bg-[#c4a87a]` |
| Primary text | `text-white` | `text-dark` |
| Muted text | `text-white/60` | `text-dark/60` |
| Faint text | `text-white/30` | `text-dark/40` |
| Very faint | `text-white/25` | `text-dark/35` |
| Muted copy | `text-white/50` | `text-dark/55` |
| Accent text | `text-[#ead8b5]/70` | `text-dark/70` |
| Accent hover | `hover:text-[#ead8b5]` | `hover:text-dark` |
| Border | `border-white/10` | `border-dark/15` |
| Logo variant | `variant="light"` | `variant="dark"` |

---

## 5. Gallery Page

**Route:** `src/app/gallery/page.tsx`  
**Component dir:** `src/components/gallery/`

### Images used

All existing public images, organised into 4 categories:

| Category | Sources |
|---|---|
| Interior | `/images/woolcup/interior-*.jpg`, `/images/new/interior-*.jpg`, `/images/gallery/interior-*.jpg` |
| Coffee | `/images/gallery/coffee-*.jpg`, `/images/new/barista-pour.jpg` |
| Food | `/images/woolcup/food-*.jpg`, `/images/new/dessert-case.jpg`, `/images/new/cake-slice.jpg` |
| Exterior | `/images/new/exterior-*.jpg`, `/images/financial-district/fd-*.webp` |

### Layout

- Page-level hero: minimal — eyebrow label + `"A glimpse inside."` heading
- Category filter tabs (All / Interior / Coffee / Food / Exterior)
- Masonry grid — 3 columns desktop, 2 tablet, 1 mobile
- Hover: subtle scale + cream overlay with category label
- No lightbox (keep scope simple)
- Background: `bg-bg` (white)

### Metadata

```ts
title: 'Gallery — Wool Cup Urban Café'
description: 'Photos of the space, the coffee, and the quiet moments at Wool Cup, Hyderabad.'
```

### Navigation

- Add `{ name: 'Gallery', href: '/gallery' }` to `Navbar` nav links
- Add `{ name: 'Gallery', href: '/gallery' }` to `Footer` `NAV_LINKS`

---

## 6. Files Changed / Created

| Action | File |
|---|---|
| Edit | `src/app/layout.tsx` — swap body font |
| Edit | `src/app/page.tsx` — trim sections, add GalleryTeaser |
| Edit | `src/components/footer/Footer.tsx` — light brown, dark text |
| Edit | `src/components/navbar/Navbar.tsx` — add Gallery link |
| Create | `src/app/gallery/page.tsx` |
| Create | `src/components/gallery/GalleryGrid.tsx` |
| Create | `src/components/gallery/GalleryTeaser.tsx` |

---

## 7. Out of Scope

- No lightbox / modal image viewer
- No lazy-loading beyond browser defaults
- No changes to removed component files (leave on disk, just not imported)
- No changes to About, Menu, Cakes pages

# Events Page — Design Spec
**Date:** 2026-06-09
**Route:** `/events`
**Status:** Approved

---

## Overview

Standalone events page accessible via navbar. Zero homepage mentions. Warm, intimate tone matching existing site palette. Four stacked sections: Hero → Upcoming Events → Past Events → Inquiry Form.

---

## Navigation

Add `{ name: 'Events', href: '/events' }` to `NAV_LINKS` in `Navbar.tsx` after Gallery, before Cakes (Cakes is last).

Final nav order: Home → Story → Menu → Gallery → **Events** → Cakes → Visit

---

## Section 1 — Hero

**Pattern:** Matches `CakesHero` exactly.

- Full-bleed background image: `/images/new/interior-wide-cloud.jpg`
- Dark gradient overlay: `bg-gradient-to-t from-[#231f20]/80 via-[#231f20]/30 to-transparent`
- GSAP `fromTo` fade + slide-up on mount (stagger eyebrow → headline → subtitle)
- Eyebrow: `"Events"` — `font-ui uppercase tracking-[0.3em] text-xs text-[#ead8b5]/70`
- Headline: `Gather here.` — `font-display text-5xl md:text-6xl text-white`, `here.` in `<em>`
- Subtitle: `"Live music, intimate dinners, community nights — all at Wool Cup."` — `font-body text-lg text-[#ead8b5]/80`
- Height: `min-h-[60vh]`

---

## Section 2 — Upcoming Events

**Component:** `EventsUpcoming`  
**Background:** `bg-ivory`  
**Padding:** `py-20 md:py-28`

### Header
- Eyebrow: `"What's On"`
- Headline: `Upcoming events.` — `events.` in `<em>`
- Centered, `max-w-3xl mx-auto`

### Event Cards
3-column grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6`

Each card (`bg-cream/30 rounded-xl border border-[#ead8b5]/50`):
- **Image area:** `aspect-video bg-[#ead8b5]/40` placeholder (replace with photo when available)
- **Content padding:** `p-5`
- **Date badge:** Top-left pill `bg-[#231f20] text-white font-ui text-xs px-3 py-1 rounded-full` (absolute, overlapping image bottom-left)
- **Type tag:** `font-ui uppercase tracking-[0.2em] text-xs text-[#231f20]/50 mb-2`
- **Title:** `font-display text-xl text-[#231f20]`
- **Description:** `font-body text-sm text-[#231f20]/70 leading-relaxed mt-1`
- **Footer row:** Time + location left, `"Enquire →"` right — opens WhatsApp with event name pre-filled: `https://wa.me/917292944244?text=Hi+Wool+Cup!+I'd+like+to+enquire+about+[Event+Name].`

### Placeholder Data
```ts
const UPCOMING_EVENTS = [
  {
    date: 'Jun 21',
    type: 'Live Music',
    title: 'Acoustic Evening',
    description: 'An intimate live set with local artists. Bring a friend, settle in.',
    time: '7:00 PM',
    location: 'Banjara Hills',
  },
  {
    date: 'Jun 28',
    type: 'Private Dining',
    title: 'Chef\'s Table Night',
    description: 'A curated multi-course experience for small groups.',
    time: '7:30 PM',
    location: 'Financial District',
  },
  {
    date: 'Jul 5',
    type: 'Community Night',
    title: 'Open Mic Evening',
    description: 'Poetry, stories, and songs. The floor is yours.',
    time: '6:30 PM',
    location: 'Banjara Hills',
  },
];
```

### Animation
GSAP `ScrollTrigger` stagger on cards, same pattern as `CakesHowItWorks`.

---

## Section 3 — Past Events

**Component:** `EventsPast`  
**Background:** `bg-[#ead8b5]/20`  
**Padding:** `py-20 md:py-28`

### Header
- Eyebrow: `"A Look Back"`
- Headline: `Moments we've shared.` — `we've shared.` in `<em>`
- Centered

### Masonry Grid
`columns-1 md:columns-2 lg:columns-3 gap-4 max-w-6xl mx-auto px-6`

6 items using existing shoot photos:
```ts
const PAST_EVENT_PHOTOS = [
  { src: '/images/shoots/AS_00760.jpg', label: 'Live Music Night', date: 'May 2026' },
  { src: '/images/shoots/AS_00683.jpg', label: 'Chef\'s Table', date: 'Apr 2026' },
  { src: '/images/new/interior-dining.jpg', label: 'Community Night', date: 'Apr 2026' },
  { src: '/images/shoots/AS_00739.jpg', label: 'Private Gathering', date: 'Mar 2026' },
  { src: '/images/new/interior-sofa.jpg', label: 'Open Mic', date: 'Mar 2026' },
  { src: '/images/shoots/AS_00705.jpg', label: 'Art Evening', date: 'Feb 2026' },
];
```

Each item: `relative break-inside-avoid mb-4 overflow-hidden rounded-xl group`
- Image: `w-full object-cover`
- Hover overlay: `absolute inset-0 bg-[#231f20]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center`
  - Label: `font-display text-white text-lg`
  - Date: `font-ui text-[#ead8b5]/80 text-xs uppercase tracking-[0.2em] mt-1`

### Animation
GSAP `ScrollTrigger` stagger, same pattern as `CakesGallery`.

---

## Section 4 — Inquiry Form

**Component:** `EventsInquiry`  
**Background:** `bg-ivory`  
**Padding:** `py-20 md:py-28`

### Header
- Eyebrow: `"Host With Us"`
- Headline: `Plan your event.` — `event.` in `<em>`
- Subtext: `"Tell us what you have in mind — we'll get back to you on WhatsApp."`
- Centered, `max-w-2xl mx-auto`

### Form
`max-w-xl mx-auto mt-10 px-6` — all fields styled with `bg-cream/30 border border-[#ead8b5] rounded-lg px-4 py-3 font-body text-sm text-[#231f20] w-full focus:outline-none focus:border-[#231f20]/40`

| Field | Type | Required |
|---|---|---|
| Name | `text` | Yes |
| Event type | `select` | Yes |
| Preferred date | `date` | No |
| Guest count | `number` | No |
| Message | `textarea` (4 rows) | No |

**Event type options:** Live Music Night / Private Dining / Corporate Gathering / Community Event / Other

### Submit — WhatsApp redirect
`'use client'` component. On submit, build URL:

```ts
const lines = [
  `Hi Wool Cup! I'd like to enquire about hosting an event.`,
  `Name: ${name}`,
  `Event Type: ${eventType}`,
  date ? `Preferred Date: ${date}` : null,
  guestCount ? `Guests: ${guestCount}` : null,
  details ? `Details: ${details}` : null,
].filter(Boolean).join('\n');

window.open(`https://wa.me/917292944244?text=${encodeURIComponent(lines)}`, '_blank');
```

Button: `"Send via WhatsApp →"` — full-width, `bg-[#231f20] text-white font-ui uppercase tracking-[0.2em] text-sm py-4 rounded-xl hover:bg-[#231f20]/80 transition-colors`

Basic validation: name + event type required, show inline error if missing before opening WhatsApp.

---

## File Structure

```
src/
  app/
    events/
      page.tsx
  components/
    events/
      EventsHero.tsx
      EventsUpcoming.tsx
      EventsPast.tsx
      EventsInquiry.tsx
```

---

## Constraints

- No backend, no API — WhatsApp redirect only
- All event data hardcoded as constants (editable in place)
- No homepage mentions, no homepage component changes
- Follow existing GSAP patterns exactly (useGSAP + ScrollTrigger)
- `'use client'` only on components that need GSAP or form state
- `page.tsx` stays server component with `export const metadata`

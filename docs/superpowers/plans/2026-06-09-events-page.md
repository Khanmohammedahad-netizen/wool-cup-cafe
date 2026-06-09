# Events Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone `/events` page with four sections — Hero, Upcoming Events, Past Events, and a WhatsApp inquiry form — accessible via navbar with zero homepage changes.

**Architecture:** Four focused client components (GSAP animations) plus one server `page.tsx`. Event data is hardcoded constants inside each component. Inquiry form builds a WhatsApp `wa.me` URL from form state and opens it in a new tab — no backend.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, GSAP + `@gsap/react` + ScrollTrigger, `useGSAP` hook

---

## File Map

| Action | Path | Purpose |
|---|---|---|
| Modify | `src/components/navbar/Navbar.tsx` | Add Events nav link between Gallery and Cakes |
| Create | `src/app/events/page.tsx` | Server component, metadata, assembles sections |
| Create | `src/components/events/EventsHero.tsx` | Full-bleed hero with GSAP entrance |
| Create | `src/components/events/EventsUpcoming.tsx` | 3-col card grid with WhatsApp per-card links |
| Create | `src/components/events/EventsPast.tsx` | Masonry photo grid with hover overlays |
| Create | `src/components/events/EventsInquiry.tsx` | Form → WhatsApp redirect |

---

### Task 1: Add Events to navbar

**Files:**
- Modify: `src/components/navbar/Navbar.tsx:9-16`

- [ ] **Step 1: Add the nav link**

In `Navbar.tsx`, the current `NAV_LINKS` array is:
```ts
const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Story', href: '/about' },
  { name: 'Menu', href: '/menu' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Cakes', href: '/cakes' },
  { name: 'Visit', href: '/#locations' },
];
```

Replace with:
```ts
const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Story', href: '/about' },
  { name: 'Menu', href: '/menu' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Events', href: '/events' },
  { name: 'Cakes', href: '/cakes' },
  { name: 'Visit', href: '/#locations' },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/components/navbar/Navbar.tsx
git commit -m "feat(nav): add Events link between Gallery and Cakes"
```

---

### Task 2: Create EventsHero component

**Files:**
- Create: `src/components/events/EventsHero.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

export function EventsHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        [eyebrowRef.current, headlineRef.current, subtitleRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out', stagger: 0.15 }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <img
        src="/images/new/interior-wide-cloud.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#231f20]/80 via-[#231f20]/30 to-transparent" />
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <p
          ref={eyebrowRef}
          className="font-ui uppercase tracking-[0.3em] text-xs text-[#ead8b5]/70 mb-4"
        >
          Events
        </p>
        <h1
          ref={headlineRef}
          className="font-display text-5xl md:text-6xl text-white"
        >
          Gather <em>here.</em>
        </h1>
        <p
          ref={subtitleRef}
          className="font-body text-lg text-[#ead8b5]/80 mt-4 max-w-xl"
        >
          Live music, intimate dinners, community nights — all at Wool Cup.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/events/EventsHero.tsx
git commit -m "feat(events): add EventsHero component"
```

---

### Task 3: Create EventsUpcoming component

**Files:**
- Create: `src/components/events/EventsUpcoming.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
    title: "Chef's Table Night",
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

export function EventsUpcoming() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
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
          stagger: 0.15,
          scrollTrigger: { trigger: cardRefs.current[0], start: 'top 85%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-ivory py-20 md:py-28">
      <div ref={headerRef} className="max-w-3xl mx-auto px-6 text-center mb-12">
        <p className="font-ui uppercase tracking-[0.3em] text-xs text-[#231f20]/50 mb-4">
          What&apos;s On
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-[#231f20]">
          Upcoming <em>events.</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {UPCOMING_EVENTS.map((event, i) => (
          <div
            key={event.title}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="bg-cream/30 rounded-xl border border-[#ead8b5]/50 overflow-hidden flex flex-col"
          >
            {/* Image placeholder */}
            <div className="relative aspect-video bg-[#ead8b5]/40 flex-shrink-0">
              <span className="absolute bottom-3 left-3 bg-[#231f20] text-white font-ui text-xs px-3 py-1 rounded-full">
                {event.date}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <p className="font-ui uppercase tracking-[0.2em] text-xs text-[#231f20]/50 mb-2">
                {event.type}
              </p>
              <h3 className="font-display text-xl text-[#231f20]">{event.title}</h3>
              <p className="font-body text-sm text-[#231f20]/70 leading-relaxed mt-1 flex-1">
                {event.description}
              </p>

              {/* Footer row */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#ead8b5]/50">
                <span className="font-ui text-xs text-[#231f20]/50 uppercase tracking-[0.1em]">
                  {event.time} · {event.location}
                </span>
                <a
                  href={`https://wa.me/917292944244?text=${encodeURIComponent(`Hi Wool Cup! I'd like to enquire about ${event.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui text-xs uppercase tracking-[0.1em] text-[#231f20] hover:text-[#231f20]/60 transition-colors"
                >
                  Enquire →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/events/EventsUpcoming.tsx
git commit -m "feat(events): add EventsUpcoming component"
```

---

### Task 4: Create EventsPast component

**Files:**
- Create: `src/components/events/EventsPast.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PAST_EVENT_PHOTOS = [
  { src: '/images/shoots/AS_00760.jpg', label: 'Live Music Night', date: 'May 2026' },
  { src: '/images/shoots/AS_00683.jpg', label: "Chef's Table", date: 'Apr 2026' },
  { src: '/images/new/interior-dining.jpg', label: 'Community Night', date: 'Apr 2026' },
  { src: '/images/shoots/AS_00739.jpg', label: 'Private Gathering', date: 'Mar 2026' },
  { src: '/images/new/interior-sofa.jpg', label: 'Open Mic', date: 'Mar 2026' },
  { src: '/images/shoots/AS_00705.jpg', label: 'Art Evening', date: 'Feb 2026' },
];

export function EventsPast() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
        }
      );
      gsap.fromTo(
        itemRefs.current.filter((r): r is HTMLDivElement => r !== null),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: { trigger: itemRefs.current[0], start: 'top 85%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-[#ead8b5]/20 py-20 md:py-28">
      <div ref={headerRef} className="max-w-3xl mx-auto px-6 text-center mb-12">
        <p className="font-ui uppercase tracking-[0.3em] text-xs text-[#231f20]/50 mb-4">
          A Look Back
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-[#231f20]">
          Moments <em>we&apos;ve shared.</em>
        </h2>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 max-w-6xl mx-auto px-6">
        {PAST_EVENT_PHOTOS.map((photo, i) => (
          <div
            key={photo.src}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="relative break-inside-avoid mb-4 overflow-hidden rounded-xl group"
          >
            <img
              src={photo.src}
              alt={photo.label}
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-[#231f20]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
              <span className="font-display text-white text-lg">{photo.label}</span>
              <span className="font-ui text-[#ead8b5]/80 text-xs uppercase tracking-[0.2em] mt-1">
                {photo.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/events/EventsPast.tsx
git commit -m "feat(events): add EventsPast masonry component"
```

---

### Task 5: Create EventsInquiry component

**Files:**
- Create: `src/components/events/EventsInquiry.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { useState, FormEvent } from 'react';

const EVENT_TYPES = [
  'Live Music Night',
  'Private Dining',
  'Corporate Gathering',
  'Community Event',
  'Other',
];

const fieldClass =
  'bg-cream/30 border border-[#ead8b5] rounded-lg px-4 py-3 font-body text-sm text-[#231f20] w-full focus:outline-none focus:border-[#231f20]/40 transition-colors';

export function EventsInquiry() {
  const [name, setName] = useState('');
  const [eventType, setEventType] = useState('');
  const [date, setDate] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState<{ name?: string; eventType?: string }>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const newErrors: { name?: string; eventType?: string } = {};
    if (!name.trim()) newErrors.name = 'Please enter your name.';
    if (!eventType) newErrors.eventType = 'Please select an event type.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const lines = [
      "Hi Wool Cup! I'd like to enquire about hosting an event.",
      `Name: ${name}`,
      `Event Type: ${eventType}`,
      date ? `Preferred Date: ${date}` : null,
      guestCount ? `Guests: ${guestCount}` : null,
      details ? `Details: ${details}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(
      `https://wa.me/917292944244?text=${encodeURIComponent(lines)}`,
      '_blank'
    );
  }

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="font-ui uppercase tracking-[0.3em] text-xs text-[#231f20]/50 mb-4">
          Host With Us
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-[#231f20]">
          Plan your <em>event.</em>
        </h2>
        <p className="font-body text-base text-[#231f20]/60 mt-4">
          Tell us what you have in mind — we&apos;ll get back to you on WhatsApp.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="max-w-xl mx-auto mt-10 px-6 flex flex-col gap-4"
      >
        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
          />
          {errors.name && (
            <p className="font-ui text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Event type */}
        <div>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className={`${fieldClass} ${!eventType ? 'text-[#231f20]/40' : ''}`}
          >
            <option value="" disabled>
              Event type
            </option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.eventType && (
            <p className="font-ui text-xs text-red-500 mt-1">{errors.eventType}</p>
          )}
        </div>

        {/* Date + guest count row */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={fieldClass}
          />
          <input
            type="number"
            placeholder="Guest count"
            min={1}
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            className={fieldClass}
          />
        </div>

        {/* Details */}
        <textarea
          rows={4}
          placeholder="Any details or requests (optional)"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className={`${fieldClass} resize-none`}
        />

        <button
          type="submit"
          className="w-full bg-[#231f20] text-white font-ui uppercase tracking-[0.2em] text-sm py-4 rounded-xl hover:bg-[#231f20]/80 transition-colors mt-2"
        >
          Send via WhatsApp →
        </button>
      </form>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/events/EventsInquiry.tsx
git commit -m "feat(events): add EventsInquiry WhatsApp form"
```

---

### Task 6: Create the events page

**Files:**
- Create: `src/app/events/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
import type { Metadata } from 'next';
import { EventsHero } from '@/components/events/EventsHero';
import { EventsUpcoming } from '@/components/events/EventsUpcoming';
import { EventsPast } from '@/components/events/EventsPast';
import { EventsInquiry } from '@/components/events/EventsInquiry';
import { Footer } from '@/components/footer/Footer';

export const metadata: Metadata = {
  title: 'Events — Wool Cup Urban Café & Bistro',
  description: 'Live music, private dining, community nights and more at Wool Cup, Hyderabad. Host your next event with us.',
};

export default function EventsPage() {
  return (
    <main>
      <EventsHero />
      <EventsUpcoming />
      <EventsPast />
      <EventsInquiry />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/events/page.tsx
git commit -m "feat(events): wire up events page route"
```

---

### Task 7: Verify in browser

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Check each section**

Navigate to `http://localhost:3000/events` and verify:
- Navbar shows Events between Gallery and Cakes (desktop + mobile)
- Hero image loads, GSAP entrance fires
- 3 upcoming event cards render with date badges and Enquire links
- Enquire → link opens WhatsApp with correct pre-filled message
- Past events masonry grid shows 6 photos with hover overlays
- Inquiry form: submit with empty fields shows validation errors
- Inquiry form: fill name + event type → Send via WhatsApp → opens WhatsApp with all fields in message

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat(events): complete events page — hero, upcoming, past, inquiry form"
```

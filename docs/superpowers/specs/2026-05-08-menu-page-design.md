# Menu Page Design

**Goal:** Create a handcrafted `/menu` page — parchment aesthetic, editorial typography, Kinfolk-style — plus update Navbar and MenuHighlight.

**Brand system:** Cream/dark/white palette, `font-display`/`font-body`/`font-ui` tokens. Established in Phase 1.

**Animation library:** GSAP ScrollTrigger via `useGSAP()` (already installed). `IntersectionObserver` for category nav active state (no extra deps).

---

## Routing

App Router. Page at `src/app/menu/page.tsx` (server component — exports metadata, renders client section components).

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `src/app/menu/page.tsx` | Metadata export, page shell |
| Create | `src/components/menu/MenuHero.tsx` | 60–70vh parchment hero |
| Create | `src/components/menu/MenuSeasonalSpecials.tsx` | Featured seasonal cards |
| Create | `src/components/menu/MenuMustTries.tsx` | Editor's pick cards |
| Create | `src/components/menu/MenuCategoryNav.tsx` | Sticky sidebar (desktop) + horizontal pills (mobile) |
| Create | `src/components/menu/MenuFullMenu.tsx` | All 9 categories with menu items |
| Create | `src/components/menu/MenuDietary.tsx` | Dietary info note |
| Create | `src/components/menu/MenuCTAFooter.tsx` | Dark closing CTA |
| Modify | `src/components/navbar/Navbar.tsx` | Add Menu link after Story |
| Modify | `src/components/menu/MenuHighlight.tsx` | Add "View Full Menu →" link |

---

## Section 1: MenuHero

**File:** `src/components/menu/MenuHero.tsx`

- Height: `min-h-[60vh]` — not full viewport
- Background: `bg-[#ead8b5]` with CSS noise grain via pseudo-element (inline `<style>` — React 19 pattern)

```css
@keyframes menu-grain {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-2%, -3%); }
  30% { transform: translate(3%, 2%); }
  60% { transform: translate(-1%, 4%); }
  80% { transform: translate(4%, -1%); }
}
.menu-grain-overlay::after {
  content: '';
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
  animation: menu-grain 8s steps(10) infinite;
  pointer-events: none;
  opacity: 0.5;
}
```

- Centered content: `flex flex-col items-center justify-center text-center px-6`
  - **Decorative coffee cup icon** (inline SVG, 40px, `text-dark/25`, `mb-6`):
    ```svg
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 14h18v14a4 4 0 01-4 4H12a4 4 0 01-4-4V14z"/>
      <path d="M26 17h3a4 4 0 010 8h-3"/>
      <path d="M13 8c0-2 3-2 3-4M20 8c0-2 3-2 3-4"/>
    </svg>
    ```
  - Headline: `"The Menu"` — `font-display text-5xl md:text-6xl lg:text-7xl text-[#231f20]`
  - Subtitle: `"Coffees & Comfort"` — `font-display text-xl md:text-2xl text-[#231f20] italic mt-3`
  - Decorative flourish: `<div className="mt-6 w-[100px] h-px bg-[#231f20]/20" />`

- **Animation:** `useGSAP` stagger fade-in on mount (already at top of page, no ScrollTrigger):
  ```js
  gsap.fromTo([iconRef, headlineRef, subtitleRef, flourishRef],
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.12 }
  )
  ```

---

## Section 2: MenuSeasonalSpecials

**File:** `src/components/menu/MenuSeasonalSpecials.tsx`

- `id="seasonal"` on section element
- Background: `bg-white py-20 md:py-28`
- Thin cream top border: `border-t border-[#ead8b5]`
- Header: centered, `max-w-3xl mx-auto px-6 text-center mb-12`
  - Label: `"What's in Season"` — `font-display text-3xl md:text-4xl text-[#231f20]`
  - Description: `"Our kitchen follows the calendar..."` — `font-body text-base text-[#231f20]/70 mt-4 max-w-xl mx-auto`
- Cards grid: `grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-6`
- **Placeholder card** (no photos exist yet):
  - `bg-[#ead8b5]/20 border border-[#ead8b5] rounded-2xl overflow-hidden`
  - Image area: `h-[220px] flex items-center justify-center` with `"Photograph coming soon"` — `font-body italic text-dark/40 text-sm`
  - Content: `p-6`
    - Badge: `"Seasonal"` — `font-ui text-[10px] uppercase tracking-widest bg-[#ead8b5] text-dark px-3 py-1 rounded-full w-fit mb-3`
    - Dish name: `font-display text-2xl text-[#231f20]`
    - Description: `font-body text-sm italic text-[#231f20]/70 mt-1`
    - Price: `font-ui text-lg text-[#231f20] mt-3`

Seasonal items:
| Name | Description | Price |
|------|-------------|-------|
| Mango Cold Brew | "Alphonso mango cold brew. Natural sweetness, zero sugar added." | ₹320 |
| Summer Berry Tart | "Seasonal berries, vanilla custard, almond crust. Limited daily." | ₹360 |

- **Animation:** cards stagger fade-up on scroll

---

## Section 3: MenuMustTries

**File:** `src/components/menu/MenuMustTries.tsx`

- `id="must-tries"` on section element
- Background: `bg-[#ead8b5]/15 py-20 md:py-28`
- Header: same centered pattern as Seasonal
  - Label: `"The Must-Tries"`
  - Description: `"The dishes that keep Hyderabad coming back. Updated fortnightly."`
- Cards: `grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6`
- Same placeholder card structure + `"★ Must-Try"` badge (gold `#C9A84C`)

Must-Try items:
| Name | Description | Price |
|------|-------------|-------|
| Vanilla Bean Latte | "House-made Madagascar vanilla syrup, silky microfoam." | ₹340 |
| Chocolate Strawberries | "Belgian couverture, fresh strawberries. Hyderabad's favourite." | ₹380 |
| Cold Brew Reserve | "24-hour steep. Bold, sweet, zero bitterness." | ₹290 |

- **Animation:** stagger fade-up on scroll

---

## Section 4: MenuCategoryNav

**File:** `src/components/menu/MenuCategoryNav.tsx`

Shared navigation component consumed by the full-menu section wrapper. Two modes:

**Desktop (lg+):** Sticky left sidebar
- `hidden lg:block sticky top-24 w-44 shrink-0`
- Label above links: `"Menu"` — `font-ui text-[10px] uppercase tracking-widest text-dark/40 mb-4`
- Each link: `font-body text-sm text-[#231f20]/60 hover:text-[#231f20] py-1.5 block cursor-pointer transition-colors`
- Active state: `text-[#231f20] font-medium border-l-2 border-[#231f20] pl-2`
- Active detection: `IntersectionObserver` on each category section; updates `activeCategory` state
- Click: `element.scrollIntoView({ behavior: 'smooth', block: 'start' })`

**Mobile (< lg):** Horizontal scrollable pills
- `lg:hidden sticky top-[57px] z-50 bg-[#ead8b5]/95 backdrop-blur-sm py-3 px-4`
- `flex gap-2 overflow-x-auto scrollbar-none`
- Each pill: `font-ui text-xs uppercase tracking-wide px-4 py-1.5 rounded-full border border-[#231f20]/20 whitespace-nowrap text-[#231f20]/70 cursor-pointer transition-all`
- Active pill: `bg-[#231f20] text-white border-[#231f20]`

Categories (9 total):
```ts
const CATEGORIES = [
  { id: 'espresso', label: 'Espresso Bar' },
  { id: 'pour-over', label: 'Pour Over' },
  { id: 'cold-brew', label: 'Cold Brews' },
  { id: 'signature', label: 'Signature' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'light-bites', label: 'Light Bites' },
  { id: 'mains', label: 'Mains' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'beverages', label: 'Beverages' },
]
```

Props interface:
```ts
interface MenuCategoryNavProps {
  activeCategory: string
  onCategoryClick: (id: string) => void
}
```

---

## Section 5: MenuFullMenu

**File:** `src/components/menu/MenuFullMenu.tsx`

- `id="full-menu"` on outer section element
- Background: `bg-white py-20 md:py-28`
- Layout: `max-w-6xl mx-auto px-6 md:px-12 flex gap-16`
  - Left: `<MenuCategoryNav>` (sticky sidebar, desktop only)
  - Right: `flex-1` — all category sections stacked

**Category section structure** (repeated for each of 9 categories):
```tsx
<div id={category.id} className="mb-20 scroll-mt-28">
  {/* Category header */}
  <div className="flex items-center gap-4 mb-8">
    <h2 className="font-display text-2xl md:text-3xl text-[#231f20] shrink-0">{category.label}</h2>
    <div className="flex-1 h-px bg-[#ead8b5]" />
  </div>
  {/* Items */}
  {category.items.map((item) => <MenuItem key={item.name} {...item} />)}
</div>
```

**MenuItem sub-component** (internal to MenuFullMenu.tsx):
```tsx
function MenuItem({ name, description, price }: { name: string; description: string; price: string }) {
  return (
    <div className="py-4 border-b border-[#ead8b5]/50 last:border-0">
      <div className="flex items-baseline gap-0">
        <span className="font-display text-lg text-[#231f20]">{name}</span>
        <div className="flex-1 border-b border-dotted border-[#231f20]/20 mx-3 mb-1" />
        <span className="font-ui text-lg text-[#231f20] shrink-0">{price}</span>
      </div>
      <p className="font-body text-sm text-[#231f20]/60 italic mt-1">{description}</p>
    </div>
  )
}
```

**Menu data** (populated where known; `{/* TODO: Add remaining menu items from client */}` where not):

```ts
const MENU_DATA = [
  {
    id: 'espresso', label: 'Espresso Bar',
    items: [
      { name: 'House Espresso', description: 'Washed SL9. Notes of jaggery, dark chocolate, and roasted nuts.', price: '₹240' },
      { name: 'Vanilla Bean Latte', description: 'House-made Madagascar vanilla syrup, silky microfoam.', price: '₹340' },
      { name: 'Cappuccino', description: 'Double shot, textured milk, dusted cocoa.', price: '₹280' },
      { name: 'Cortado', description: 'Equal parts espresso and velvety steamed milk.', price: '₹260' },
      { name: 'Flat White', description: 'Silky, strong, Melbourne-inspired.', price: '₹300' },
    ],
  },
  {
    id: 'pour-over', label: 'Pour Over & Filter',
    items: [
      { name: 'Pour Over', description: 'Rotating single estates. Clean, bright, and nuanced.', price: '₹320' },
      { name: 'South Indian Filter', description: 'Traditional brass drip. Bold and nostalgic.', price: '₹180' },
    ],
  },
  {
    id: 'cold-brew', label: 'Cold Brews & Iced',
    items: [
      { name: 'Cold Brew Reserve', description: '24-hour steep. Bold, sweet, zero bitterness.', price: '₹290' },
      { name: 'Iced Americano', description: 'Double shot over ice. Clean and strong.', price: '₹260' },
    ],
  },
  {
    id: 'signature', label: 'Signature Drinks',
    items: [], // TODO: Add remaining menu items from client
  },
  {
    id: 'breakfast', label: 'All-Day Breakfast',
    items: [], // TODO: Add remaining menu items from client
  },
  {
    id: 'light-bites', label: 'Light Bites & Toasts',
    items: [], // TODO: Add remaining menu items from client
  },
  {
    id: 'mains', label: 'Mains',
    items: [], // TODO: Add remaining menu items from client
  },
  {
    id: 'desserts', label: 'Artisanal Desserts',
    items: [
      { name: 'Chocolate Strawberries', description: 'Belgian couverture, fresh strawberries. Hyderabad\'s favourite.', price: '₹380' },
      { name: 'Signature Cake Slice', description: 'Rotating seasonal flavour. Ask us what\'s in today.', price: '₹320' },
    ],
  },
  {
    id: 'beverages', label: 'Beverages (Non-Coffee)',
    items: [], // TODO: Add remaining menu items from client
  },
]
```

Categories with empty `items` arrays render a subtle placeholder:
```tsx
{category.items.length === 0 && (
  <p className="font-body text-sm text-[#231f20]/40 italic py-4">
    More items coming soon — ask our team today.
  </p>
)}
```

- `activeCategory` state lives in the parent wrapper (`MenuFullMenu`) which owns both nav and content. `IntersectionObserver` in `MenuFullMenu` updates state; passed down to `MenuCategoryNav`.
- **Animation:** GSAP stagger on each category block as it enters viewport.

---

## Section 6: MenuDietary

**File:** `src/components/menu/MenuDietary.tsx`

- `bg-white py-12 max-w-2xl mx-auto px-6 text-center`
- Thin horizontal rules above and below: `<div className="w-full h-px bg-[#231f20]/10" />`
- Text: `"Please inform our team of any dietary requirements or allergies. Our kitchen is happy to accommodate."` — `font-body text-sm italic text-[#231f20]/50`
- No GSAP — simple Framer Motion `initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}` suffices

---

## Section 7: MenuCTAFooter

**File:** `src/components/menu/MenuCTAFooter.tsx`

- Background: `bg-[#231f20] py-24 md:py-32`
- Centered: `max-w-2xl mx-auto px-6 text-center`
- `"Can't decide? Visit us."` — `font-display text-3xl md:text-4xl text-white mb-4`
- `"Our team will guide you to your perfect cup."` — `font-body text-lg text-[#ead8b5]/70 mb-10`
- Button: `"Find Us →"` — `href="/#locations"`, `bg-[#ead8b5] text-[#231f20] font-ui text-sm uppercase tracking-wide px-8 py-3 rounded-full hover:bg-white transition-colors duration-300`
- **Animation:** fade-up on scroll

---

## page.tsx

**File:** `src/app/menu/page.tsx`

Server component:

```tsx
import type { Metadata } from 'next'
import { MenuHero } from '@/components/menu/MenuHero'
import { MenuSeasonalSpecials } from '@/components/menu/MenuSeasonalSpecials'
import { MenuMustTries } from '@/components/menu/MenuMustTries'
import { MenuFullMenu } from '@/components/menu/MenuFullMenu'
import { MenuDietary } from '@/components/menu/MenuDietary'
import { MenuCTAFooter } from '@/components/menu/MenuCTAFooter'

export const metadata: Metadata = {
  title: 'Menu — Wool Cup Urban Café & Bistro',
  description: 'Specialty coffee, artisanal desserts, and handcrafted dishes at Wool Cup. View our full menu.',
}

export default function MenuPage() {
  return (
    <main>
      <MenuHero />
      <MenuSeasonalSpecials />
      <MenuMustTries />
      <MenuFullMenu />
      <MenuDietary />
      <MenuCTAFooter />
    </main>
  )
}
```

---

## Navbar Update

**File:** `src/components/navbar/Navbar.tsx`

Add `{ name: 'Menu', href: '/menu' }` after Story, before Philosophy:

```ts
const navLinks = [
  { name: 'Story', href: '/about' },
  { name: 'Menu', href: '/menu' },
  { name: 'Philosophy', href: '#philosophy' },
  { name: 'Origin', href: '#origin' },
  { name: 'Offerings', href: '#offerings' },
  { name: 'Space', href: '#space' },
  { name: 'Visit', href: '#locations' },
]
```

---

## MenuHighlight Update

**File:** `src/components/menu/MenuHighlight.tsx`

Add "View Full Menu →" link at bottom of existing section. Exact position: after the last menu item card, before the section closing tag. Style to match existing CTA link pattern:

```tsx
<div className="text-center mt-12">
  <a
    href="/menu"
    className="font-ui text-sm uppercase tracking-wide text-dark relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-dark hover:after:w-full after:transition-all after:duration-500"
  >
    View Full Menu →
  </a>
</div>
```

---

## SEO

```ts
export const metadata: Metadata = {
  title: 'Menu — Wool Cup Urban Café & Bistro',
  description: 'Specialty coffee, artisanal desserts, and handcrafted dishes at Wool Cup. View our full menu.',
}
```

---

## Self-Review

- **Placeholder scan:** Empty category `items` arrays use `{/* TODO */}` comments — intentional, documented, marked as client-supplied content. No accidental TBDs elsewhere.
- **Internal consistency:** `MenuCategoryNav` props (`activeCategory`, `onCategoryClick`) match usage in `MenuFullMenu`. `CATEGORIES` constant referenced in both — lives in `MenuFullMenu.tsx`, passed as data to `MenuCategoryNav`.
- **Scope check:** Single page + 2 component modifications. Self-contained.
- **Ambiguity resolved:** Logo → inline SVG coffee cup. Grain texture → CSS SVG filter pseudo-element. Empty categories → "More items coming soon" placeholder. Mobile nav sticky top accounts for Navbar height (`top-[57px]`).

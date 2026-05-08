'use client';

import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MenuCategoryNav } from './MenuCategoryNav';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface MenuItemData {
  name: string;
  description: string;
  price: string;
}

interface CategoryData {
  id: string;
  label: string;
  items: MenuItemData[];
}

const MENU_DATA: CategoryData[] = [
  {
    id: 'espresso',
    label: 'Espresso Bar',
    items: [
      { name: 'House Espresso', description: 'Washed SL9. Notes of jaggery, dark chocolate, and roasted nuts.', price: '₹240' },
      { name: 'Vanilla Bean Latte', description: 'House-made Madagascar vanilla syrup, silky microfoam.', price: '₹340' },
      { name: 'Cappuccino', description: 'Double shot, textured milk, dusted cocoa.', price: '₹280' },
      { name: 'Cortado', description: 'Equal parts espresso and velvety steamed milk.', price: '₹260' },
      { name: 'Flat White', description: 'Silky, strong, Melbourne-inspired.', price: '₹300' },
    ],
  },
  {
    id: 'pour-over',
    label: 'Pour Over & Filter',
    items: [
      { name: 'Pour Over', description: 'Rotating single estates. Clean, bright, and nuanced.', price: '₹320' },
      { name: 'South Indian Filter', description: 'Traditional brass drip. Bold and nostalgic.', price: '₹180' },
    ],
  },
  {
    id: 'cold-brew',
    label: 'Cold Brews & Iced',
    items: [
      { name: 'Cold Brew Reserve', description: '24-hour steep. Bold, sweet, zero bitterness.', price: '₹290' },
      { name: 'Iced Americano', description: 'Double shot over ice. Clean and strong.', price: '₹260' },
    ],
  },
  {
    id: 'signature',
    label: 'Signature Drinks',
    items: [],
    // TODO: Add remaining menu items from client
  },
  {
    id: 'breakfast',
    label: 'All-Day Breakfast',
    items: [],
    // TODO: Add remaining menu items from client
  },
  {
    id: 'light-bites',
    label: 'Light Bites & Toasts',
    items: [],
    // TODO: Add remaining menu items from client
  },
  {
    id: 'mains',
    label: 'Mains',
    items: [],
    // TODO: Add remaining menu items from client
  },
  {
    id: 'desserts',
    label: 'Artisanal Desserts',
    items: [
      { name: 'Chocolate Strawberries', description: "Belgian couverture, fresh strawberries. Hyderabad's favourite.", price: '₹380' },
      { name: 'Signature Cake Slice', description: "Rotating seasonal flavour. Ask us what's in today.", price: '₹320' },
    ],
  },
  {
    id: 'beverages',
    label: 'Beverages (Non-Coffee)',
    items: [],
    // TODO: Add remaining menu items from client
  },
];

function MenuItem({ name, description, price }: MenuItemData) {
  return (
    <div className="py-4 border-b border-[#ead8b5]/50 last:border-0">
      <div className="flex items-baseline">
        <span className="font-display text-lg text-[#231f20]">{name}</span>
        <div className="flex-1 border-b border-dotted border-[#231f20]/20 mx-3 mb-1" />
        <span className="font-ui text-lg text-[#231f20] shrink-0">{price}</span>
      </div>
      <p className="font-body text-sm text-[#231f20]/60 italic mt-1">{description}</p>
    </div>
  );
}

export function MenuFullMenu() {
  const [activeCategory, setActiveCategory] = useState('espresso');
  const containerRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    MENU_DATA.forEach(({ id }, i) => {
      const el = sectionRefs.current[i];
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveCategory(id);
        },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    const idx = MENU_DATA.findIndex((c) => c.id === id);
    const el = sectionRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useGSAP(
    () => {
      sectionRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="full-menu" ref={containerRef} className="bg-white">
      {/* Mobile sticky pills */}
      <div className="lg:hidden sticky top-[57px] z-50 bg-[#ead8b5]/95 backdrop-blur-sm py-3 px-4">
        <MenuCategoryNav
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
          variant="mobile"
        />
      </div>

      {/* Desktop: sidebar + content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex gap-16">
        <div className="hidden lg:block pt-20">
          <MenuCategoryNav
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
            variant="desktop"
          />
        </div>

        <div className="flex-1 min-w-0 py-20 md:py-28">
          {MENU_DATA.map((category, i) => (
            <div
              key={category.id}
              id={category.id}
              ref={(el) => { sectionRefs.current[i] = el; }}
              className="mb-20 scroll-mt-28"
            >
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-display text-2xl md:text-3xl text-[#231f20] shrink-0">
                  {category.label}
                </h2>
                <div className="flex-1 h-px bg-[#ead8b5]" />
              </div>

              {category.items.length > 0 ? (
                category.items.map((item) => (
                  <MenuItem key={item.name} {...item} />
                ))
              ) : (
                <p className="font-body text-sm text-[#231f20]/40 italic py-4">
                  More items coming soon — ask our team today.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
            aria-pressed={active === tab.value}
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

'use client';

import { useState, useMemo } from 'react';

const PAGE_SIZE = 12;

type Category = 'all' | 'ambience' | 'food';

interface GalleryImage {
  src: string;
  alt: string;
  category: Exclude<Category, 'all'>;
}

const IMAGES: GalleryImage[] = [
  // Ambience — interior woolcup
  { src: '/images/woolcup/interior-01.jpg', alt: 'Interior seating area', category: 'ambience' },
  { src: '/images/woolcup/interior-02.jpg', alt: 'Interior detail', category: 'ambience' },
  { src: '/images/woolcup/interior-03.jpg', alt: 'Interior corner', category: 'ambience' },
  { src: '/images/woolcup/interior-04.jpg', alt: 'Interior ambience', category: 'ambience' },
  { src: '/images/woolcup/interior-05.jpg', alt: 'Interior lounge', category: 'ambience' },
  { src: '/images/woolcup/interior-06.jpg', alt: 'Interior space', category: 'ambience' },
  { src: '/images/woolcup/interior-07.jpg', alt: 'Interior view', category: 'ambience' },
  { src: '/images/woolcup/interior-08.jpg', alt: 'Interior atmosphere', category: 'ambience' },
  { src: '/images/woolcup/interior-10.jpg', alt: 'Interior feature', category: 'ambience' },
  // Ambience — new shots
  { src: '/images/new/interior-sofa.jpg', alt: 'Sofa seating', category: 'ambience' },
  { src: '/images/new/interior-dining.jpg', alt: 'Dining area', category: 'ambience' },
  { src: '/images/new/interior-hand-chairs.jpg', alt: 'Seating area', category: 'ambience' },
  { src: '/images/new/interior-wide-cloud.jpg', alt: 'Cloud ceiling interior', category: 'ambience' },
  { src: '/images/new/barista-pour.jpg', alt: 'Barista at work', category: 'ambience' },
  { src: '/images/new/exterior-night.jpg', alt: 'Exterior at night', category: 'ambience' },
  { src: '/images/new/exterior-wide.jpg', alt: 'Exterior wide view', category: 'ambience' },
  // Ambience — Financial District
  { src: '/images/financial-district/fd-01.webp', alt: 'Financial District branch', category: 'ambience' },
  { src: '/images/financial-district/fd-02.webp', alt: 'Financial District exterior', category: 'ambience' },
  { src: '/images/financial-district/fd-03.webp', alt: 'Financial District detail', category: 'ambience' },
  { src: '/images/financial-district/fd-04.webp', alt: 'Financial District view', category: 'ambience' },
  { src: '/images/financial-district/fd-05.webp', alt: 'Financial District branch 2', category: 'ambience' },
  { src: '/images/financial-district/fd-06.webp', alt: 'Financial District entrance', category: 'ambience' },
  { src: '/images/financial-district/fd-07.webp', alt: 'Financial District ambience', category: 'ambience' },
  // Food — woolcup
  { src: '/images/woolcup/food-02.jpg', alt: 'Plated food', category: 'food' },
  { src: '/images/woolcup/food-03.jpg', alt: 'Kitchen creation', category: 'food' },
  { src: '/images/woolcup/food-04.jpg', alt: 'Fresh dish', category: 'food' },
  { src: '/images/woolcup/mango-dish.jpg', alt: 'Mango dish', category: 'food' },
  { src: '/images/new/dessert-case.jpg', alt: 'Dessert display case', category: 'food' },
  { src: '/images/new/cake-slice.jpg', alt: 'Cake slice', category: 'food' },
  // Food — professional shoots (curated selection)
  { src: '/images/shoots/AS_00638.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00660.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00683.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00705.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00727.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00756.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00784.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00816.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00844.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00883.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00917.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00944.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00972.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01001.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01036.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01062.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01086.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/DSC02060.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/DSC02101.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/DSC02135.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/DSC02163.jpg', alt: 'Food', category: 'food' },
];

const TABS: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Ambience', value: 'ambience' },
  { label: 'Food', value: 'food' },
];

export function GalleryGrid() {
  const [active, setActive] = useState<Category>('all');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () => active === 'all' ? IMAGES : IMAGES.filter((img) => img.category === active),
    [active]
  );

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const handleTabChange = (val: Category) => {
    setActive(val);
    setVisible(PAGE_SIZE);
  };

  return (
    <section aria-label="Photo gallery" className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            aria-pressed={active === tab.value}
            className={`font-ui text-[11px] uppercase tracking-[0.18em] px-4 py-2 rounded-full border transition-all duration-300 ${
              active === tab.value
                ? 'bg-brown text-white border-brown'
                : 'bg-transparent text-dark/60 border-dark/20 hover:border-brown/50 hover:text-brown'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CSS columns masonry */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
        {shown.map((img) => (
          <div key={img.src} className="break-inside-avoid mb-3">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-auto rounded-xl object-cover"
              loading="lazy"
              fetchPriority="low"
            />
          </div>
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="font-ui text-[11px] uppercase tracking-[0.18em] px-8 py-3 rounded-full border border-dark/20 text-dark/60 hover:border-dark/50 hover:text-dark transition-all duration-300"
          >
            Load more ({filtered.length - visible} remaining)
          </button>
        </div>
      )}
    </section>
  );
}

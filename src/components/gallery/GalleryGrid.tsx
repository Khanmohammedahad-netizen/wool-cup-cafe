'use client';

import { useState } from 'react';

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
  { src: '/images/woolcup/food-01.jpg', alt: 'Seasonal dish', category: 'food' },
  { src: '/images/woolcup/food-02.jpg', alt: 'Plated food', category: 'food' },
  { src: '/images/woolcup/food-03.jpg', alt: 'Kitchen creation', category: 'food' },
  { src: '/images/woolcup/food-04.jpg', alt: 'Fresh dish', category: 'food' },
  { src: '/images/woolcup/mango-dish.jpg', alt: 'Mango dish', category: 'food' },
  { src: '/images/new/dessert-case.jpg', alt: 'Dessert display case', category: 'food' },
  { src: '/images/new/cake-slice.jpg', alt: 'Cake slice', category: 'food' },
  // Food — professional shoots
  { src: '/images/shoots/AS_00638.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00645.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00653.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00660.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00662.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00665.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00670.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00675.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00678.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00683.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00688.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00693.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00694.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00697.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00702.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00703.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00705.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00712.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00716.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00718.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00727.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00730.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00739.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00743.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00747.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00753.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00756.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00760.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00766.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00770.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00771.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00775.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00780.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00784.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00791.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00796.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00801.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00802.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00805.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00809.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00810.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00816.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00817.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00820.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00827.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00831.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00835.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00838.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00844.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00852.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00859.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00864.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00883.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00891.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00893.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00897.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00899.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00903.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00907.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00911.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00917.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00927.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00929.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00932.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00938.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00942.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00944.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00947.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00952.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00953.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00958.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00964.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00972.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00974.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00977.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00979.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00986.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_00991.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01001.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01004.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01007.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01023.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01030.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01036.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01038.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01044.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01046.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01054.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01056.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01062.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01064.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01065.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01073.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01075.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01078.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01081.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01086.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01092.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/AS_01096.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/DSC02060.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/DSC02073.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/DSC02101.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/DSC02108.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/DSC02135.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/DSC02136.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/DSC02138.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/DSC02146.jpg', alt: 'Food', category: 'food' },
  { src: '/images/shoots/DSC02163.jpg', alt: 'Food', category: 'food' },
];

const TABS: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Ambience', value: 'ambience' },
  { label: 'Food', value: 'food' },
];

export function GalleryGrid() {
  const [active, setActive] = useState<Category>('all');

  const filtered =
    active === 'all' ? IMAGES : IMAGES.filter((img) => img.category === active);

  return (
    <section aria-label="Photo gallery" className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
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
              fetchPriority="low"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

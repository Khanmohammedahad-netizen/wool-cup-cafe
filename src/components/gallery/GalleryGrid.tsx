'use client';

import { useState } from 'react';

const PAGE_SIZE = 12;

const IMAGES = [
  // Interior — woolcup
  { src: '/images/woolcup/interior-01.jpg', alt: 'Interior seating area' },
  { src: '/images/woolcup/interior-02.jpg', alt: 'Interior detail' },
  { src: '/images/woolcup/interior-03.jpg', alt: 'Interior corner' },
  { src: '/images/woolcup/interior-04.jpg', alt: 'Interior ambience' },
  { src: '/images/woolcup/interior-05.jpg', alt: 'Interior lounge' },
  { src: '/images/woolcup/interior-10.jpg', alt: 'Interior feature' },
  // Interior — new shots
  { src: '/images/new/interior-sofa.jpg',        alt: 'Sofa seating' },
  { src: '/images/new/interior-dining.jpg',       alt: 'Dining area' },
  { src: '/images/new/interior-hand-chairs.jpg',  alt: 'Seating area' },
  { src: '/images/new/interior-wide-cloud.jpg',   alt: 'Cloud ceiling interior' },
  { src: '/images/new/barista-pour.jpg',          alt: 'Barista at work' },
  { src: '/images/new/exterior-night.jpg',        alt: 'Exterior at night' },
  { src: '/images/new/exterior-wide.jpg',         alt: 'Exterior wide view' },
  // Financial District branch
  { src: '/images/financial-district/fd-01.webp', alt: 'Financial District branch' },
  { src: '/images/financial-district/fd-02.webp', alt: 'Financial District exterior' },
  { src: '/images/financial-district/fd-03.webp', alt: 'Financial District detail' },
  { src: '/images/financial-district/fd-04.webp', alt: 'Financial District view' },
  { src: '/images/financial-district/fd-05.webp', alt: 'Financial District branch 2' },
  { src: '/images/financial-district/fd-06.webp', alt: 'Financial District entrance' },
  { src: '/images/financial-district/fd-07.webp', alt: 'Financial District ambience' },
];

export function GalleryGrid() {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = IMAGES.slice(0, visible);
  const hasMore = visible < IMAGES.length;

  return (
    <section aria-label="Photo gallery" className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
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

      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="font-ui text-[11px] uppercase tracking-[0.18em] px-8 py-3 rounded-full border border-dark/20 text-dark/60 hover:border-dark/50 hover:text-dark transition-all duration-300"
          >
            Load more ({IMAGES.length - visible} remaining)
          </button>
        </div>
      )}
    </section>
  );
}

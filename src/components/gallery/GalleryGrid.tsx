'use client';

const HERO_IMAGES = [
  {
    src: '/images/film-nagar-exterior.jpg',
    alt: 'Wool Cup Film Nagar exterior',
    label: 'Film Nagar',
  },
  {
    src: '/images/financial-district/fd-exterior.jpg',
    alt: 'Wool Cup Financial District exterior',
    label: 'Financial District',
  },
];

const CAROUSEL_IMAGES = [
  // Interiors
  { src: '/images/woolcup/interior-01.jpg',          alt: 'Interior seating area' },
  { src: '/images/woolcup/interior-02.jpg',          alt: 'Interior detail' },
  { src: '/images/woolcup/interior-03.jpg',          alt: 'Interior corner' },
  { src: '/images/woolcup/interior-04.jpg',          alt: 'Interior ambience' },
  { src: '/images/woolcup/interior-05.jpg',          alt: 'Interior lounge' },
  { src: '/images/woolcup/interior-06.jpg',          alt: 'Interior space' },
  { src: '/images/woolcup/interior-07.jpg',          alt: 'Interior view' },
  { src: '/images/woolcup/interior-08.jpg',          alt: 'Interior atmosphere' },
  { src: '/images/woolcup/interior-10.jpg',          alt: 'Interior feature' },
  { src: '/images/woolcup/food-02.jpg',              alt: 'Food' },
  { src: '/images/woolcup/food-03.jpg',              alt: 'Food item' },
  { src: '/images/woolcup/food-04.jpg',              alt: 'Dish' },
  { src: '/images/woolcup/misc-01.jpg',              alt: 'Café detail' },
  { src: '/images/woolcup/misc-02.jpg',              alt: 'Café moment' },
  { src: '/images/new/interior-sofa.jpg',            alt: 'Sofa seating' },
  { src: '/images/new/interior-dining.jpg',          alt: 'Dining area' },
  { src: '/images/new/interior-hand-chairs.jpg',     alt: 'Seating area' },
  { src: '/images/new/interior-wide-cloud.jpg',      alt: 'Cloud ceiling interior' },
  { src: '/images/new/barista-pour.jpg',             alt: 'Barista at work' },
  { src: '/images/new/cake-slice.jpg',               alt: 'Cake slice' },
  { src: '/images/new/dessert-case.jpg',             alt: 'Dessert case' },
  { src: '/images/new/exterior-night.jpg',           alt: 'Exterior at night' },
  { src: '/images/new/exterior-wide.jpg',            alt: 'Exterior wide view' },
  // Financial District
  { src: '/images/financial-district/fd-01.webp',   alt: 'Financial District branch' },
  { src: '/images/financial-district/fd-03.webp',   alt: 'Financial District detail' },
  { src: '/images/financial-district/fd-04.webp',   alt: 'Financial District view' },
  { src: '/images/financial-district/fd-05.webp',   alt: 'Financial District interior' },
  { src: '/images/financial-district/fd-06.webp',   alt: 'Financial District entrance' },
  { src: '/images/financial-district/fd-07.webp',   alt: 'Financial District ambience' },
  // New product shots
  { src: '/Beverages/Banana Cream Latte.jpg',        alt: 'Banana Cream Latte' },
  { src: '/Beverages/Black Forest mocha.jpg',        alt: 'Black Forest Mocha' },
  { src: '/Beverages/Blueberry Pancake Latte.jpg',   alt: 'Blueberry Pancake Latte' },
  { src: '/Beverages/Cheese Mont Blanc.jpg',         alt: 'Cheese Mont Blanc' },
  { src: '/Beverages/Hazelnut Latte.jpg',            alt: 'Hazelnut Latte' },
  { src: '/Beverages/Seasalt Vanilla Mont Blanc.jpg',alt: 'Sea Salt Vanilla Mont Blanc' },
  { src: '/Beverages/Ube Frappe.jpg',                alt: 'Ube Frappe' },
  { src: '/Beverages/Ube Lemonade.jpg',              alt: 'Ube Lemonade' },
  { src: '/Food/Acai Smoothie Bowl.JPG',             alt: 'Acai Smoothie Bowl' },
  { src: '/Food/Cocoa Bowl.JPG',                     alt: 'Cocoa Bowl' },
  { src: '/Food/Creamy Chicken Toast.JPG',           alt: 'Creamy Chicken Toast' },
  { src: '/Food/Green Power.JPG',                    alt: 'Green Power Bowl' },
  { src: '/Food/Honey Garlic Shrimps.JPG',           alt: 'Honey Garlic Shrimps' },
  { src: '/Food/Meditrrainean Avocado Toast.JPG',    alt: 'Mediterranean Avocado Toast' },
];

const LOOPED = [...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES];

export function GalleryGrid() {
  return (
    <>
      <style href="gallery-carousel" precedence="default">{`
        @keyframes gallery-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .gallery-strip {
          animation: gallery-scroll 60s linear infinite;
        }
        .gallery-strip:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Two big hero branch photos */}
      <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HERO_IMAGES.map((img) => (
            <div
              key={img.src}
              className="relative rounded-2xl overflow-hidden aspect-[4/3]"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#231f20]/60 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-6 font-display text-2xl md:text-3xl text-white drop-shadow">
                {img.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Auto-revolving carousel strip */}
      <section aria-label="Gallery carousel" className="py-10 overflow-hidden">
        <div className="gallery-strip flex gap-3" style={{ width: 'max-content' }}>
          {LOOPED.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className="w-72 h-52 shrink-0 rounded-xl overflow-hidden"
            >
              <img
                src={encodeURI(img.src)}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

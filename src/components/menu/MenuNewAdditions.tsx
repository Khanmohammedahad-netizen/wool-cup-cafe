'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlagshipItem {
  name: string;
  category: string;
  price: string;
  image: string;
}

const FLAGSHIP_ITEMS: FlagshipItem[] = [
  // ── Specialty Drinks ──────────────────────────────────────────────
  { name: 'Ube Cloud',                    category: 'Signature',  price: '₹430',   image: '/images/flagship/ube-cloud.jpg' },
  { name: 'Felix Felicis Fizz',           category: 'Signature',  price: '₹380',   image: '/images/beverages/Juices/Felix Felicis Fizz.jpg' },
  { name: 'Banana Buzz Latte',            category: 'Signature',  price: '₹390',   image: '/images/flagship/banana-buzz-latte.jpg' },
  { name: 'Cranberry Cinnamon Cold Brew', category: 'Cold Brew',  price: '₹360',   image: '/images/flagship/cranberry-cinnamon-cold-brew.jpg' },
  { name: 'Strawberry Coffee',            category: 'Signature',  price: '₹380',   image: '/images/flagship/strawberry-coffee.jpg' },
  { name: 'Ube Coffee',                   category: 'Signature',  price: '₹420',   image: '/images/flagship/ube-coffee.jpg' },
  { name: 'Strawberry Matcha',            category: 'Matcha',     price: '₹430',   image: '/images/flagship/strawberry-matcha.jpg' },
  { name: 'Cold Brew Cloud',              category: 'Cold Brew',  price: '₹320',   image: '/images/flagship/cold-brew-cloud.jpg' },
  { name: 'Butterfly Pea Latte',          category: 'Signature',  price: '₹390',   image: '/images/flagship/butterfly-pea-latte.jpg' },
  { name: 'Cortado',                      category: 'Classics',   price: '₹260',   image: '/images/beverages/Juices/Cortado.jpg' },
  { name: 'Honey Cinnamon Latte',         category: 'Latte',      price: '₹340',   image: '/images/beverages/Juices/Honey cinnamon Latte.jpg' },
  // ── Wellness Bowls ────────────────────────────────────────────────
  { name: 'Acai Power Bowl',              category: 'Wellness',   price: '₹490',   image: '/images/flagship/acai-bowl.jpg' },
  { name: 'Coconut Granola Bowl',         category: 'Wellness',   price: '₹450',   image: '/images/flagship/coconut-bowl.jpg' },
  { name: 'Green Detox Bowl',             category: 'Wellness',   price: '₹490',   image: '/images/flagship/green-bowl.jpg' },
  // ── Food ─────────────────────────────────────────────────────────
  { name: 'Avocado Bloom Toast',          category: 'Toast',      price: '₹445',   image: '/images/flagship/avocado-bloom-toast.jpg' },
  { name: 'BBQ Chicken & Quinoa',         category: 'Mains',      price: '₹545',   image: '/images/flagship/bbq-chicken-quinoa.jpg' },
  { name: 'Chipotle Prawns',              category: 'Seafood',    price: 'Ask us', image: '/images/flagship/chipotle-prawns.jpg' },
  { name: 'Chicken Sloppy Toast',         category: 'Toast',      price: '₹495',   image: '/images/flagship/chicken-toast.jpg' },
];

function PhotoCard({
  item,
  index,
  onOpen,
}: {
  item: FlagshipItem;
  index: number;
  onOpen: (item: FlagshipItem) => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onOpen(item)}
      className="group relative w-full overflow-hidden rounded-2xl bg-[#ead8b5]/40 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6c3b11]/40"
      style={{ aspectRatio: '3/4' }}
      aria-label={`View ${item.name}`}
    >
      <img
        src={encodeURI(item.image)}
        alt={item.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#231f20]/80 via-[#231f20]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Category badge */}
      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="font-ui text-[10px] uppercase tracking-widest text-white bg-[#231f20]/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {item.category}
        </span>
      </div>

      {/* Name + price */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
        <p className="font-display text-white text-lg leading-tight">{item.name}</p>
        <p className="font-ui text-white/80 text-sm mt-0.5">{item.price}</p>
      </div>

      {/* Zoom hint */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <svg width="14" height="14" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}

export function MenuNewAdditions() {
  const [selected, setSelected] = useState<FlagshipItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const open = useCallback((item: FlagshipItem) => {
    const idx = FLAGSHIP_ITEMS.indexOf(item);
    setSelected(item);
    setSelectedIndex(idx);
  }, []);

  const close = useCallback(() => setSelected(null), []);

  const prev = useCallback(() => {
    const idx = (selectedIndex - 1 + FLAGSHIP_ITEMS.length) % FLAGSHIP_ITEMS.length;
    setSelectedIndex(idx);
    setSelected(FLAGSHIP_ITEMS[idx]);
  }, [selectedIndex]);

  const next = useCallback(() => {
    const idx = (selectedIndex + 1) % FLAGSHIP_ITEMS.length;
    setSelectedIndex(idx);
    setSelected(FLAGSHIP_ITEMS[idx]);
  }, [selectedIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!selected) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, close, prev, next]);

  return (
    <>
      {/* ── Lightbox ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] bg-[#231f20]/92 backdrop-blur-md flex items-center justify-center p-4"
            onClick={close}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-5 right-5 font-ui text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              Close ×
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Previous"
            >
              <svg width="18" height="18" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Next"
            >
              <svg width="18" height="18" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            <motion.div
              key={selected.name}
              initial={{ scale: 0.88, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 16 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="relative flex flex-col items-center max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={encodeURI(selected.image)}
                alt={selected.name}
                className="w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="mt-5 text-center">
                <span className="font-ui text-[10px] uppercase tracking-widest text-white/50">
                  {selected.category}
                </span>
                <p className="font-display text-white text-2xl mt-1">{selected.name}</p>
                <p className="font-ui text-white/70 text-lg mt-1">{selected.price}</p>
              </div>
              <p className="mt-4 font-ui text-[10px] uppercase tracking-widest text-white/30">
                {selectedIndex + 1} / {FLAGSHIP_ITEMS.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Section ───────────────────────────────────────────────── */}
      <section className="bg-ivory py-20 md:py-28 border-t border-[#ead8b5]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 flex flex-col items-start gap-3"
          >
            <span className="font-ui text-[10px] uppercase tracking-[0.2em] text-[#6c3b11]">
              Fresh Off The Menu
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[#231f20]">
              New Additions
            </h2>
            <p className="font-body text-base italic text-[#231f20]/60 max-w-sm">
              Tap any photo to explore it in full.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {FLAGSHIP_ITEMS.map((item, i) => (
              <PhotoCard key={item.name} item={item} index={i} onOpen={open} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

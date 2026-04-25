'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { staggerContainer, fadeUp } from '@/lib/motion';
import { InstagramTile } from './InstagramTile';
import { GhostButton } from '@/components/ui/GhostButton';

const placeholders = [
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80",
  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80",
  "https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=600&q=80",
  "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&q=80",
];

export function InstagramFeed() {
  return (
    <Section className="bg-bg-cream">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-6">
          <div>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-text-dark mb-4">Community.</h2>
            <p className="font-sans text-[16px] text-text-muted">@woolcupcafe</p>
          </div>
          <a href="https://instagram.com/woolcup" target="_blank" rel="noopener noreferrer" className="border border-gold text-gold px-8 py-3 rounded-full font-sans font-medium text-[14px] hover:bg-gold hover:text-bg-dark transition-all duration-300">
            Follow Us
          </a>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1, once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          {placeholders.map((src, i) => (
            <motion.div key={i} variants={fadeUp}>
              <InstagramTile src={src} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

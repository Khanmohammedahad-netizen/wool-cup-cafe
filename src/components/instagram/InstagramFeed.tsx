'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { staggerContainer, fadeUp } from '@/lib/motion';
import { InstagramTile } from './InstagramTile';
import { GhostButton } from '@/components/ui/GhostButton';

const placeholders = [
  "/images/woolcup/food-01.jpg",
  "/images/woolcup/food-02.jpg",
  "/images/woolcup/interior-03.jpg",
  "/images/woolcup/food-03.jpg",
  "/images/woolcup/interior-05.jpg",
  "/images/woolcup/food-04.jpg",
];

export function InstagramFeed() {
  return (
    <Section className="bg-bg-secondary">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-6">
          <div>
            <h2 className="font-serif text-display-md text-ink mb-2">Community.</h2>
            <p className="font-accent italic text-[16px] text-mute">@woolcup</p>
          </div>
          <a href="https://instagram.com/woolcup" target="_blank" rel="noopener noreferrer" className="bg-accent text-white px-8 py-3 rounded-full font-sans font-medium text-[14px] hover:bg-accent-hover transition-colors duration-300">
            Follow Us
          </a>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1, once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-[4px]"
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

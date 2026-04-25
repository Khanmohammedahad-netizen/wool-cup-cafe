'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { staggerContainer, fadeUp } from '@/lib/motion';
import { InstagramTile } from './InstagramTile';
import { GhostButton } from '@/components/ui/GhostButton';

const placeholders = [
  "/images/new/cake-slice.jpg",
  "/images/new/barista-pour.jpg",
  "/images/new/exterior-night.jpg",
  "/images/new/interior-hand-chairs.jpg",
  "/images/new/dessert-case.jpg",
  "/images/new/interior-sofa.jpg",
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

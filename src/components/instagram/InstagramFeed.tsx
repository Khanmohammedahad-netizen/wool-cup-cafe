'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { staggerContainer, fadeUp } from '@/lib/motion';
import { InstagramTile } from './InstagramTile';

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
    <Section className="bg-bg-secondary py-24">
      <div className="max-w-[1000px] mx-auto px-[5vw]">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-light text-[32px] sm:text-[40px] md:text-[56px] text-text-primary"
          >
            Community.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-ui text-[14px] text-text-tertiary tracking-[0.15em] mt-2"
          >
            @woolcupcafe
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1, once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          {placeholders.map((src, i) => (
            <motion.div key={i} variants={fadeUp}>
              <InstagramTile src={src} index={i} />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-12">
          <motion.a
            href="https://instagram.com/woolcup"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border border-dark text-dark px-10 py-3 rounded-full font-ui font-medium text-[13px] uppercase tracking-[0.15em] hover:bg-dark hover:text-white transition-all duration-300"
          >
            Follow Us
          </motion.a>
        </div>
      </div>
    </Section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { fadeUp, staggerContainer } from '@/lib/motion';

const craftItems = [
  {
    title: 'Sourcing',
    desc: 'Direct trade with shade-grown estates. We pay premiums for lots that score 86+ points.',
  },
  {
    title: 'Roasting',
    desc: 'Light-to-medium profiles that honor the origin character, roasted weekly in small batches.',
  },
  {
    title: 'Serving',
    desc: 'Dialed in daily. Served in warm ceramic. No artificial syrups, no compromises.',
  },
];

export function CraftTriptych() {
  return (
    <Section id="story" className="bg-bg-secondary">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16"
        >
          {craftItems.map((item, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp} 
              className="flex flex-col bg-surface border-t-2 border-accent px-8 py-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-[400ms] ease-out"
            >
              <h3 className="font-serif text-[24px] text-ink mb-4">{item.title}</h3>
              <p className="font-sans text-[16px] text-mute leading-relaxed max-w-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

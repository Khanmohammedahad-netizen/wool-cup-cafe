'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { fadeUp, staggerContainer } from '@/lib/motion';

const stats = [
  { label: 'Cups Served', value: 12000, suffix: '+' },
  { label: 'Rating', value: 4.9, suffix: '' },
  { label: 'Bean Score', value: 86, suffix: '+' },
  { label: 'Est.', value: 2024, suffix: '' },
];

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <div className="text-[clamp(1.5rem,4vw,2.5rem)] font-serif text-gold mb-2">
        {value % 1 === 0 ? Math.floor(count).toLocaleString() : count.toFixed(1)}
        {suffix}
      </div>
      <div className="text-eyebrow text-text-muted text-[10px] tracking-[0.2em]">
        {label}
      </div>
    </div>
  );
}

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
    <Section id="story" className="bg-bg-cream">
      <div className="max-w-[1400px] mx-auto">
        {/* Stats Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32"
        >
          {stats.map((stat, i) => (
            <StatCounter key={i} {...stat} />
          ))}
        </motion.div>

        {/* Craft Cards */}
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
              className="flex flex-col bg-bg-latte border border-border-light border-t-4 border-t-gold px-10 py-12 shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-[500ms] ease-out group"
            >
              <h3 className="font-serif text-[28px] text-text-dark mb-6 group-hover:text-gold transition-colors">{item.title}</h3>
              <p className="font-sans text-[16px] text-text-muted leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}


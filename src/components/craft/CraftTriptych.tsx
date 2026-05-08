'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';

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
      <div className="text-[clamp(1.5rem,4vw,2.5rem)] font-display text-cream mb-2">
        {value % 1 === 0 ? Math.floor(count).toLocaleString() : count.toFixed(1)}
        {suffix}
      </div>
      <div className="font-ui text-text-muted text-[10px] tracking-[0.2em] uppercase">
        {label}
      </div>
    </div>
  );
}

const craftItems = [
  {
    title: 'Sourcing',
    desc: 'Direct trade with shade-grown estates. We pay premiums for lots that score 86+ points, ensuring sustainability and quality in every bean.',
  },
  {
    title: 'Roasting',
    desc: 'Light-to-medium profiles that honor the origin character. Each batch is roasted weekly in our small-lot facility to preserve delicate aromatics.',
  },
  {
    title: 'Serving',
    desc: 'Dialed in daily. Served in warm ceramic. We believe in the ritual of coffee—no artificial syrups, no shortcuts, just pure intention.',
  },
];

export function CraftTriptych() {
  return (
    <Section className="bg-bg-primary py-24">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 lg:gap-20">
          {craftItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              <h3 className="font-display text-[24px] font-medium text-text-primary">
                {item.title}
              </h3>
              <div className="w-10 h-px bg-border my-5" />
              <p className="font-body text-[16px] text-text-secondary leading-[1.7]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';

const menuItems = [
  { name: 'House Espresso', price: '₹240', desc: 'Washed SL9. Notes of jaggery, dark chocolate, and roasted nuts.' },
  { name: 'Pour Over', price: '₹320', desc: 'Rotating single estates. Clean, bright, and nuanced.' },
  { name: 'Vanilla Bean Latte', price: '₹340', desc: 'House-made Madagascar vanilla syrup, silky microfoam.' },
  { name: 'Cold Brew Reserve', price: '₹290', desc: '24-hour steep. Bold, sweet, zero bitterness.' },
];

export function MenuHighlight() {
  return (
    <Section id="menu" className="bg-bg-primary py-24">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-light text-[56px] text-text-primary"
          >
            Offerings.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-ui text-[16px] text-text-tertiary tracking-[0.1em] mt-4"
          >
            Crafted with intention.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
          {menuItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`
                px-10 py-12 flex flex-col justify-center
                border-b border-border transition-colors duration-500 hover:bg-cream/5
                ${i % 2 === 0 ? 'md:border-r' : ''}
                ${i >= menuItems.length - 2 ? 'md:border-b-0' : ''}
                ${i === menuItems.length - 1 ? 'border-b-0' : ''}
              `}
            >
              <div className="flex justify-between items-baseline mb-3">
                <h3 className="font-display text-[26px] font-medium text-text-primary">
                  {item.name}
                </h3>
                <span className="font-ui font-medium text-[18px] text-dark">
                  {item.price}
                </span>
              </div>
              <p className="font-body text-[15px] text-text-secondary leading-[1.6]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/menu"
            className="font-ui text-sm uppercase tracking-wide text-dark relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-dark hover:after:w-full after:transition-all after:duration-500"
          >
            View Full Menu →
          </a>
        </div>
      </div>
    </Section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { fadeUp, staggerContainer } from '@/lib/motion';

const menuItems = [
  { name: 'House Espresso', price: '₹240', desc: 'Washed SL9. Notes of jaggery, dark chocolate, and roasted nuts.' },
  { name: 'Pour Over', price: '₹320', desc: 'Rotating single estates. Clean, bright, and nuanced.' },
  { name: 'Vanilla Bean Latte', price: '₹340', desc: 'House-made Madagascar vanilla syrup, silky microfoam.' },
  { name: 'Cold Brew Reserve', price: '₹290', desc: '24-hour steep. Bold, sweet, zero bitterness.' },
];

export function MenuHighlight() {
  return (
    <Section id="menu" className="bg-bg-dark">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="mb-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-text-light"
          >
            Offerings.
          </motion.h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1, once: true }}
          className="space-y-12"
        >
          {menuItems.map((item, i) => (
            <motion.div 
              key={i} 
              variants={{
                hidden: { opacity: 0, x: -40 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="group"
            >
              <div className="flex items-end justify-between mb-3">
                <h3 className="font-serif italic text-[clamp(1.5rem,3vw,2rem)] text-text-light group-hover:text-gold transition-colors duration-300">
                  {item.name}
                </h3>
                <div className="dotted-leader hidden md:block" />
                <span className="font-sans font-medium text-[clamp(1.1rem,2vw,1.25rem)] text-gold">
                  {item.price}
                </span>
              </div>
              <p className="font-sans text-[14px] md:text-[15px] text-text-muted max-w-[85%]">
                {item.desc}
              </p>
              <div className="mt-8 border-b border-border-dark" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}


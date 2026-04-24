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
    <Section id="menu" className="bg-bg-primary">
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-20 text-center">
          <h2 className="font-serif text-display-md text-ink">Offerings.</h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, once: true }}
          className="flex flex-col"
        >
          {menuItems.map((item, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp}
              className="group border-b border-cream py-8 px-4 transition-colors duration-300 hover:bg-bg-secondary/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div>
                <h3 className="font-serif italic text-[28px] text-ink mb-2">
                  {item.name}
                </h3>
                <p className="font-accent italic text-[16px] text-mute">
                  {item.desc}
                </p>
              </div>
              <span className="font-sans font-medium text-[18px] text-accent">
                {item.price}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { wordStagger, wordChild } from '@/lib/motion';

const manifesto = "Every cup is a pause. We make pauses worth keeping.";

export function Manifesto() {
  const words = manifesto.split(' ');

  return (
    <section
      aria-label="Manifesto"
      className="py-section bg-bg-secondary flex flex-col items-center justify-center px-6 relative"
      style={{ minHeight: '80vh' }}
    >
      <div className="w-[60px] h-px bg-rule mb-12"></div>
      
      <motion.p
        variants={wordStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3, once: true }}
        className="font-serif italic text-display-lg text-ink text-center max-w-[720px] flex flex-wrap justify-center gap-x-[0.35em] gap-y-[0.1em]"
      >
        {words.map((word, i) => {
          const isEmphasis = i >= 7; // "pauses worth keeping."
          return (
            <motion.span
              key={i}
              variants={wordChild}
              className={`inline-block ${isEmphasis ? 'text-accent' : ''}`}
            >
              {isEmphasis ? <em>{word}</em> : word}&nbsp;
            </motion.span>
          );
        })}
      </motion.p>
      
      <div className="w-[60px] h-px bg-rule mt-12"></div>
    </section>
  );
}

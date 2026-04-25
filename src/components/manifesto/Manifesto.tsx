'use client';

import { motion } from 'framer-motion';

export function Manifesto() {
  const text = "Every cup is a pause. We make pauses worth keeping.";
  
  return (
    <section
      aria-label="Manifesto"
      className="py-20 bg-bg-dark border-y border-border-dark overflow-hidden flex items-center justify-center relative"
    >
      <div className="flex whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex items-center gap-12 px-6"
          >
            <span className="font-serif text-[clamp(2rem,6vw,4rem)] uppercase tracking-[0.3em] text-gold py-4">
              {text}
            </span>
            <span className="text-gold text-2xl">•</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


'use client';

import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const feedItems = [
  { id: 1, color: "from-espresso to-mocha" },
  { id: 2, color: "from-roast to-caramel" },
  { id: 3, color: "from-bg-tertiary to-espresso" },
  { id: 4, color: "from-mocha to-roast" },
  { id: 5, color: "from-caramel to-bg-secondary" },
  { id: 6, color: "from-espresso to-bg-primary" },
];

export default function InstagramFeed() {
  return (
    <section className="py-32 px-6 bg-bg-primary overflow-hidden">
      <div className="max-w-[900px] mx-auto text-center">
        <p className="text-micro font-light tracking-spread text-caramel uppercase mb-4">
          @woolcup
        </p>
        <h2 className="font-display text-h2 text-cream mb-12">
          The <span className="text-caramel italic">Feed</span>
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {feedItems.map((item, i) => (
            <motion.a
              key={item.id}
              href="https://www.instagram.com/woolcup"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative aspect-square rounded-lg overflow-hidden bg-bg-tertiary border border-charcoal/10"
            >
              {/* Fallback Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110 ${item.color}`} />
              
              {/* Grain */}
              <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('/textures/grain.png')] bg-repeat" />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
                <Camera size={24} className="text-caramel mb-4" />
                <p className="text-micro text-cream font-light tracking-wide uppercase">
                  View post
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

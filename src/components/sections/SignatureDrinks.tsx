'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const CoffeeCupScene = dynamic(() => import('../three/CoffeeCupScene'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-bg-secondary/50 animate-pulse rounded-xl" />
});

const drinks = [
  { name: "Velvet Latte",     desc: "Silky oat milk, house espresso, vanilla bean",       price: "₹280", accent: "#D4A574" },
  { name: "Noir Americano",   desc: "Double-shot darkness, smoky, unapologetic",          price: "₹220", accent: "#8B7355" },
  { name: "Caramel Cloud",    desc: "Cold brew, salted caramel, whipped cream art",        price: "₹320", accent: "#C8956C" },
  { name: "Matcha Ceremony",  desc: "Ceremonial grade, oat foam, honey drizzle",          price: "₹300", accent: "#7B9B6F" },
  { name: "Mocha Velour",     desc: "Belgian chocolate, espresso, steamed milk",           price: "₹340", accent: "#6B4226" },
  { name: "Rose Cortado",     desc: "Rose water, double ristretto, micro foam",            price: "₹260", accent: "#C9867A" },
];

export default function SignatureDrinks() {
  return (
    <section id="menu" className="relative py-32 px-6 bg-bg-primary overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-20">
          <p className="text-micro font-light tracking-ultra text-caramel uppercase mb-4">
            Curated Brews
          </p>
          <h2 className="font-display text-h2 text-cream">Signature Selection</h2>
        </div>

        {/* 3D Showcase */}
        <div className="w-full h-[400px] md:h-[500px] mb-20">
           <CoffeeCupScene />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drinks.map((drink, i) => (
            <motion.div
              key={drink.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-glass backdrop-blur-2xl border border-glass-border p-8 rounded-lg flex flex-col justify-between min-h-[240px] hover:-translate-y-2 transition-all duration-500 hover:border-caramel/20 overflow-hidden"
            >
              {/* Hover Glow */}
              <div 
                className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none blur-[80px]"
                style={{ backgroundColor: drink.accent }}
              />

              <div>
                <div 
                  className="w-10 h-1 bg-gradient-to-r mb-6 group-hover:w-16 transition-all duration-500 origin-left"
                  style={{ backgroundImage: `linear-gradient(to right, ${drink.accent}, transparent)` }}
                />
                <h3 className="font-display text-2xl text-cream mb-4 group-hover:text-caramel transition-colors">
                  {drink.name}
                </h3>
                <p className="text-small text-smoke font-light leading-relaxed">
                  {drink.desc}
                </p>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <span className="font-body text-lg text-latte group-hover:text-amber transition-colors">
                  {drink.price}
                </span>
                <button className="text-micro tracking-widest text-ash group-hover:text-caramel uppercase transition-colors">
                  Details +
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

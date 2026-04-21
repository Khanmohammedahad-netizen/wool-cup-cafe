'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Experience', href: '#experience' },
  { name: 'Menu', href: '#menu' },
  { name: 'Ambience', href: '#ambience' },
  { name: 'Visit', href: '#visit' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-6 px-6 md:px-12 flex justify-between items-center',
        scrolled ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-charcoal/10 py-4' : 'bg-transparent'
      )}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group">
        <span className="font-display text-2xl tracking-tighter">
          <span className="text-caramel">WOOL</span>
          <span className="text-cream ml-1 group-hover:text-caramel transition-colors">CUP</span>
        </span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-micro font-body font-light uppercase tracking-spread text-latte hover:text-caramel transition-colors relative group"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-caramel transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </div>

      {/* Mobile Toggle */}
      <button
        className="md:hidden text-cream p-2"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-bg-primary/95 backdrop-blur-2xl z-[99] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="font-display text-4xl text-cream hover:text-caramel transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

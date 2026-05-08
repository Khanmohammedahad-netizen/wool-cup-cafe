'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Story', href: '/about' },
    { name: 'Menu', href: '/menu' },
    { name: 'Cakes', href: '/cakes' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Origin', href: '#origin' },
    { name: 'Offerings', href: '#offerings' },
    { name: 'Space', href: '#space' },
    { name: 'Visit', href: '#locations' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? 'bg-surface/80 backdrop-blur-md shadow-sm' : 'bg-surface'
        } border-b border-border px-5 py-4 lg:bg-transparent lg:border-none lg:shadow-none lg:pt-6`}
      >
        <div className="max-w-[1100px] mx-auto flex items-center justify-between lg:glass lg:rounded-full lg:px-8 lg:py-3 lg:shadow-xl lg:shadow-black/5">
          <Link href="/" className="font-display text-[1rem] tracking-[0.18em] font-medium text-text uppercase">
            WOOL CUP
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-ui text-[0.8rem] tracking-[0.1em] font-medium uppercase text-text/70 hover:text-dark transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link
            href="#locations"
            className="hidden lg:block border border-dark text-dark font-ui text-[0.8rem] tracking-[0.12em] font-medium uppercase px-5 py-2 rounded-full hover:bg-dark hover:text-white transition-all duration-300"
          >
            Reserve
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden flex flex-col gap-[6px] w-[22px] group"
            aria-label="Open menu"
          >
            <span className="w-full h-[1.5px] bg-text" />
            <span className="w-full h-[1.5px] bg-text" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] bg-bg flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center"
              aria-label="Close menu"
            >
              <div className="relative w-6 h-6">
                <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-text rotate-45" />
                <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-text -rotate-45" />
              </div>
            </button>

            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-display text-[2rem] text-text hover:text-dark transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

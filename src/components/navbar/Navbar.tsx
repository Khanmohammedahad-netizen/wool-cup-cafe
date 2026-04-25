'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { GhostButton } from '@/components/ui/GhostButton';
import { MobileNavSheet } from './MobileNavSheet';

const navLinks = [
  { name: 'Story', href: '#story' },
  { name: 'Menu', href: '#menu' },
  { name: 'Ambience', href: '#ambience' },
  { name: 'Visit', href: '#visit' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  const bg = useTransform(
    scrollY,
    [0, 60],
    ['rgba(10,10,10,0)', 'rgba(10,10,10,0.85)']
  );
  const blur = useTransform(
    scrollY,
    [0, 60],
    ['blur(0px)', 'blur(12px)']
  );
  const borderOpacity = useTransform(scrollY, [0, 60], [0, 1]);

  return (
    <>
      <motion.nav
        aria-label="Primary"
        style={{ backgroundColor: bg, backdropFilter: blur, WebkitBackdropFilter: blur }}
        className="fixed top-0 left-0 right-0 z-50 h-[52px] md:h-[56px]"
      >
        {/* Bottom border */}
        <motion.div
          style={{ opacity: borderOpacity }}
          className="absolute bottom-0 left-0 right-0 h-px bg-white/10"
        />

        <div className="h-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-[20px] font-normal tracking-[0.25em] text-text-light transition-all duration-300"
          >
            WOOL CUP
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-sans text-[14px] font-normal tracking-[0.08em] text-text-light/70 hover:text-gold transition-all duration-300 ease-in-out"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <button className="hidden md:inline-flex border border-gold text-gold rounded-full px-6 py-2 text-sm font-sans font-medium transition-all duration-400 ease-in-out hover:bg-gold hover:text-bg-dark">
              Reserve
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
              aria-label="Open menu"
            >
              <span className="block w-5 h-[1px] bg-text-light" />
              <span className="block w-5 h-[1px] bg-text-light" />
            </button>
          </div>
        </div>
      </motion.nav>

      <MobileNavSheet
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  );
}

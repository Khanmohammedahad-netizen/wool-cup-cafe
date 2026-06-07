'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WoolcupLogo } from '@/components/ui/WoolcupLogo';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Story', href: '/about' },
  { name: 'Menu', href: '/menu' },
  { name: 'Cakes', href: '/cakes' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Visit', href: '/#locations' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false;
    if (href === '/') return pathname === '/';
    return pathname === href;
  };

  const dark = pathname !== '/' || scrolled;

  const textColor = dark ? 'text-[#231f20]' : 'text-white';
  const linkColor = dark
    ? 'text-[#231f20]/70 hover:text-[#231f20]'
    : 'text-white/70 hover:text-white';
  const activeColor = dark ? 'text-[#231f20]' : 'text-white';
  const borderColor = dark ? 'border-[#231f20]' : 'border-white';
  const hamburgerColor = dark ? 'bg-[#231f20]' : 'bg-white';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          dark ? 'bg-ivory/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        } px-5 py-4 lg:pt-6`}
      >
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <WoolcupLogo
              variant={dark ? 'brown' : 'light'}
              width={150}
              height={104}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-ui text-[0.8rem] tracking-[0.1em] font-medium uppercase transition-colors duration-300 ${
                  isActive(link.href) ? activeColor : linkColor
                } relative group`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className={`absolute -bottom-1 left-0 right-0 h-px ${dark ? 'bg-[#231f20]' : 'bg-white'}`} />
                )}
              </Link>
            ))}
          </div>

          {/* Reserve CTA */}
          <a
            href="https://www.instagram.com/woolcup/"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden lg:block border font-ui text-[0.8rem] tracking-[0.12em] font-medium uppercase px-5 py-2 rounded-full transition-all duration-300 ${
              dark
                ? 'border-[#231f20] text-[#231f20] hover:bg-[#231f20] hover:text-white'
                : 'border-white text-white hover:bg-white hover:text-[#231f20]'
            }`}
          >
            Reserve
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden flex flex-col gap-[6px] w-[22px]"
            aria-label="Open menu"
          >
            <span className={`w-full h-[1.5px] transition-colors duration-300 ${hamburgerColor}`} />
            <span className={`w-full h-[1.5px] transition-colors duration-300 ${hamburgerColor}`} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] bg-[#7B4A2E] flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center"
              aria-label="Close menu"
            >
              <div className="relative w-6 h-6">
                <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-white rotate-45" />
                <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-white -rotate-45" />
              </div>
            </button>

            <div className="flex flex-col items-center gap-8 mb-12">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-display text-[2rem] transition-colors ${
                      isActive(link.href) ? 'text-[#ead8b5]' : 'text-white hover:text-[#ead8b5]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile footer links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex items-center gap-6"
            >
              <a
                href="https://instagram.com/woolcup"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui text-xs uppercase tracking-[0.15em] text-white/40 hover:text-white/80 transition-colors"
              >
                Instagram
              </a>
              <span className="text-white/20">·</span>
              <a
                href="tel:+917292944244"
                className="font-ui text-xs uppercase tracking-[0.15em] text-white/40 hover:text-white/80 transition-colors"
              >
                +91 72929 44244
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cinematic } from '@/lib/motion';
import { GhostButton } from '@/components/ui/GhostButton';

interface MobileNavSheetProps {
  open: boolean;
  onClose: () => void;
  links: { name: string; href: string }[];
}

export function MobileNavSheet({ open, onClose, links }: MobileNavSheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: cinematic }}
          className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center gap-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-6 w-8 h-8 flex items-center justify-center"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          </button>

          {/* Nav links */}
          {links.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={onClose}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: cinematic }}
              className="font-serif text-display-md text-ink"
            >
              {link.name}
            </motion.a>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <GhostButton size="md">Reserve</GhostButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

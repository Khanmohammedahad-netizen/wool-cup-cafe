'use client';

import { HairlineRule } from '@/components/ui/HairlineRule';

export function Footer() {
  return (
    <footer className="bg-bg-secondary px-6 md:px-12 pb-12 pt-24">
      <div className="max-w-[1400px] mx-auto">
        <HairlineRule className="mb-16" />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24">
          <div className="md:col-span-5">
            <span className="font-accent text-[24px] tracking-[0.25em] text-ink block mb-6">
              WOOL CUP
            </span>
            <p className="font-sans text-sm text-mute max-w-xs leading-relaxed">
              Coffee, quieted. A space designed for slow mornings and intentional conversations.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7 flex flex-col gap-4">
            <h4 className="text-eyebrow text-mute mb-2">Social</h4>
            <a href="https://instagram.com/woolcup" className="font-sans text-sm text-ink hover:text-brew transition-colors">Instagram</a>
            <a href="https://wa.me/917292944244" className="font-sans text-sm text-ink hover:text-brew transition-colors">WhatsApp</a>
          </div>

          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-eyebrow text-mute mb-2">Legal</h4>
            <a href="#" className="font-sans text-sm text-ink hover:text-brew transition-colors">Privacy Policy</a>
            <a href="#" className="font-sans text-sm text-ink hover:text-brew transition-colors">Terms of Service</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-rule">
          <p className="text-eyebrow text-mute">
            © {new Date().getFullYear()} WOOL CUP CAFE
          </p>
          <p className="text-eyebrow text-mute">
            Designed in Hyderabad
          </p>
        </div>
      </div>
    </footer>
  );
}

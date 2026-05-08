'use client';

import { HairlineRule } from '@/components/ui/HairlineRule';

export function Footer() {
  return (
    <footer className="bg-bg-secondary px-6 md:px-12 pb-16 pt-24 border-t border-border">
      <div className="max-w-[1200px] mx-auto">

        <div className="bg-[#ead8b5]/5 rounded-xl px-8 py-6 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h4 className="font-display text-lg text-text-primary mb-1">For Special Moments</h4>
            <p className="font-body text-sm text-text-tertiary max-w-md">
              Dessert platters, celebration cakes, curated spreads — crafted for your gatherings and events.
            </p>
          </div>
          <a
            href="https://wa.me/917292944244?text=Hi%20Wool%20Cup!%20I'd%20like%20to%20inquire%20about%20ordering%20for%20a%20special%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui text-xs uppercase tracking-wide text-text-secondary hover:text-text-primary transition-colors shrink-0"
          >
            Inquire →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20">
          <div>
            <span className="font-display text-[18px] tracking-[0.2em] font-medium text-text-primary block mb-4">
              WOOL CUP
            </span>
            <p className="font-body text-[14px] text-text-tertiary">
              Coffee, quieted.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-ui text-[11px] font-medium uppercase text-text-tertiary tracking-[0.2em] mb-4">Social</h4>
            <a href="https://instagram.com/woolcup" target="_blank" className="font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors">Instagram</a>
            <a href="https://wa.me/917292944244" target="_blank" className="font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors">WhatsApp</a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-ui text-[11px] font-medium uppercase text-text-tertiary tracking-[0.2em] mb-4">Legal</h4>
            <a href="#" className="font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="font-body text-[14px] text-text-secondary hover:text-text-primary transition-colors">Terms of Service</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border-light">
          <p className="font-ui text-[12px] text-text-tertiary">
            © 2026 WOOL CUP CAFE
          </p>
          <p className="font-ui text-[12px] text-text-tertiary">
            Designed in Hyderabad
          </p>
        </div>
      </div>
    </footer>
  );
}

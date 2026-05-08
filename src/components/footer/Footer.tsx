'use client';

import Link from 'next/link';

const NAV_LINKS = [
  { name: 'Story', href: '/about' },
  { name: 'Menu', href: '/menu' },
  { name: 'Cakes', href: '/cakes' },
  { name: 'Space', href: '/#ambience' },
  { name: 'Visit', href: '/#locations' },
];

export function Footer() {
  return (
    <footer className="bg-[#231f20]">
      {/* For Special Moments CTA */}
      <div className="border-b border-white/10 px-6 md:px-12 py-8">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h4 className="font-display text-lg text-white mb-1">For Special Moments</h4>
            <p className="font-body text-sm text-white/50 max-w-md">
              Dessert platters, celebration cakes, curated spreads — crafted for your gatherings and events.
            </p>
          </div>
          <a
            href="https://wa.me/917292944244?text=Hi%20Wool%20Cup!%20I'd%20like%20to%20inquire%20about%20ordering%20for%20a%20special%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui text-xs uppercase tracking-wide text-[#ead8b5]/70 hover:text-[#ead8b5] transition-colors shrink-0"
          >
            Inquire →
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="px-6 md:px-12 pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex flex-col leading-none mb-5 w-fit">
                <span className="font-display text-[1rem] tracking-[0.2em] font-medium uppercase text-white">
                  WOOL CUP
                </span>
                <span className="font-ui text-[0.55rem] tracking-[0.22em] uppercase text-white/40">
                  URBAN CAFÉ &amp; BISTRO
                </span>
              </Link>
              <p className="font-body text-sm text-white/50 leading-relaxed max-w-[220px]">
                Coffee, quieted. A place for slow mornings and honest meals.
              </p>
            </div>

            {/* Navigate */}
            <div>
              <h4 className="font-ui text-[10px] uppercase tracking-[0.25em] text-white/30 mb-5">Navigate</h4>
              <div className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="font-body text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Find Us + Hours */}
            <div>
              <h4 className="font-ui text-[10px] uppercase tracking-[0.25em] text-white/30 mb-5">Find Us</h4>
              <address className="not-italic font-body text-sm text-white/60 leading-relaxed mb-5">
                Film Nagar, Hyderabad<br />
                Financial District, Hyderabad<br />
                Telangana, India
              </address>
              <h4 className="font-ui text-[10px] uppercase tracking-[0.25em] text-white/30 mb-3">Hours</h4>
              <p className="font-body text-sm text-white/60">Mon–Fri: 8am – 9pm</p>
              <p className="font-body text-sm text-white/60">Sat–Sun: 9am – 10pm</p>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-ui text-[10px] uppercase tracking-[0.25em] text-white/30 mb-5">Connect</h4>
              <div className="flex flex-col gap-3">
                <a
                  href="https://instagram.com/woolcup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-white/60 hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/woolcup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-white/60 hover:text-white transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="https://wa.me/917292944244"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-white/60 hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-8">
            <p className="font-ui text-[11px] text-white/25 tracking-wide">
              © 2026 Wool Cup Urban Café &amp; Bistro. All rights reserved.
            </p>
            <p className="font-ui text-[11px] text-white/25 tracking-wide">
              Designed in Hyderabad · Film Nagar
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}

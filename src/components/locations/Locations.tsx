'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LOCATIONS = [
  {
    image: '/images/new/exterior-wide.jpg',
    badge: 'Flagship',
    name: 'Film Nagar',
    address: 'CC 55, Road No. 1, Film Nagar, Opposite Papaya, Jubilee Hills, Hyderabad 500033',
    hours: 'Mon — Sun · 8:00 AM — 11:30 PM',
    phone: '+91 72929 44244',
    ctaLabel: 'Get Directions →',
    ctaHref: 'https://www.google.com/maps?q=17.4137993,78.4062934',
  },
  {
    image: '/images/financial-district/fd-02.webp',
    badge: 'New',
    name: 'Financial District',
    address: 'Ground Floor Survey 88AA, My Space Properties, ADP Blvd, Financial District, Hyderabad, Makthakousarali, Telangana 500032',
    hours: 'Mon — Sun · 8:00 AM — 11:30 PM',
    phone: '+91 72929 44244',
    ctaLabel: 'Get Directions →',
    ctaHref: 'https://www.google.com/maps/search/Ground+Floor+Survey+88AA+My+Space+Properties+ADP+Blvd+Financial+District+Hyderabad+Telangana+500032',
  },
];

export function Locations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.fromTo(
        [eyebrowRef.current, headlineRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
        }
      );

      gsap.fromTo(
        cardRefs.current.filter((r): r is HTMLDivElement => r !== null),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="locations"
      ref={containerRef}
      className="relative bg-white py-24 md:py-32 overflow-hidden"
    >
      {/* Radial cream gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(234,216,181,0.2) 0%, transparent 100%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p
            ref={eyebrowRef}
            className="font-ui uppercase tracking-[0.3em] text-xs text-dark/50 mb-4"
          >
            Find Us
          </p>
          <h2
            ref={headlineRef}
            className="font-display text-4xl md:text-5xl text-dark"
          >
            Two homes, one <em>soul.</em>
          </h2>
        </div>

        {/* Location cards */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {LOCATIONS.map((loc, i) => (
            <div
              key={loc.name}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="rounded-2xl overflow-hidden bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-[400ms]"
            >
              {/* Image */}
              <div className="relative h-[280px] overflow-hidden">
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent" />
                <span className="absolute top-4 right-4 font-ui text-[10px] uppercase tracking-widest bg-[#ead8b5] text-dark px-3 py-1 rounded-full">
                  {loc.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="font-display text-2xl md:text-3xl text-dark mb-4">
                  {loc.name}
                </h3>
                <div className="space-y-2 mb-6">
                  <p className="font-body text-sm text-dark/70 leading-relaxed">
                    {loc.address}
                  </p>
                  <p className="font-body text-sm text-dark/70 leading-relaxed">
                    {loc.hours}
                  </p>
                  <p className="font-body text-sm text-dark/70">{loc.phone}</p>
                  <p className="font-body text-sm italic text-dark/60 mt-2">
                    Planning something special?{' '}
                    <a
                      href="https://wa.me/917292944244?text=Hi%20Wool%20Cup!%20I'd%20like%20to%20inquire%20about%20a%20special%20event."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-dark transition-colors"
                    >
                      Inquire →
                    </a>
                  </p>
                </div>
                <a
                  href={loc.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui text-sm uppercase tracking-wide text-dark w-fit relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-dark hover:after:w-full after:transition-all after:duration-500"
                >
                  {loc.ctaLabel}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Embedded map */}
        <div className="mt-12 rounded-2xl overflow-hidden h-[300px] md:h-[400px] w-full border border-[#ead8b5] group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.037130635467!2d78.40618067606774!3d17.41113060237905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96bc72e8211b%3A0xc3c5d6e2467d022b!2sFilm%20Nagar%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            className="[filter:grayscale(100%)_contrast(0.9)_brightness(1.1)] group-hover:[filter:none] transition-all duration-[600ms]"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </section>
  );
}

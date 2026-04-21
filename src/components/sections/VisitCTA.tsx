'use client';

import MagneticButton from '@/components/ui/MagneticButton';
import RevealText from '@/components/ui/RevealText';
import { MapPin } from 'lucide-react';

export default function VisitCTA() {
  return (
    <section id="visit" className="relative h-[80vh] min-h-[600px] bg-gradient-to-t from-bg-secondary via-espresso/10 to-bg-primary flex items-center justify-center p-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vmax] h-[60vmax] bg-caramel/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[800px] w-full text-center relative z-10">
        <h2 className="font-display text-h1 text-cream mb-12">
          Your table<br/>
          <span className="text-caramel italic">awaits.</span>
        </h2>

        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-wrap justify-center gap-6">
            <MagneticButton className="border-caramel bg-caramel/5">
              Reserve a Seat
            </MagneticButton>
            <MagneticButton className="border-ash/50 hover:border-caramel">
              View Full Menu
            </MagneticButton>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-latte">
               <MapPin size={16} className="text-caramel" />
               <p className="text-body font-light">Film Nagar, Hyderabad</p>
            </div>
            <p className="text-small text-ash uppercase tracking-widest">
              Open daily · 8 AM – 11 PM
            </p>
            <a 
              href="https://maps.google.com/?q=CC55, Road No. 1, Giani Zail Singh Nagar, Film Nagar, Hyderabad, Telangana 500096"
              target="_blank"
              rel="noopener noreferrer"
              className="text-micro text-caramel tracking-widest underline mt-4 hover:text-amber transition-colors"
            >
              Get Directions →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

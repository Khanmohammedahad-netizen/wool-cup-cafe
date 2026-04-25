'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { GhostButton } from '@/components/ui/GhostButton';

export function Visit() {
  return (
    <Section id="visit" className="bg-bg-dark">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Info Column */}
          <motion.div 
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.3, once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start"
          >
            <div className="w-[40px] h-[1px] bg-gold mb-10"></div>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-text-light mb-14">Visit Us.</h2>
            
            <div className="space-y-10 mb-12">
              <div>
                <h4 className="text-eyebrow text-gold tracking-[0.4em] mb-4">LOCATION</h4>
                <p className="font-sans text-[15px] text-text-light leading-relaxed">
                  CC 55, Road No. 1, Film Nagar,<br />
                  opposite Papaya, Jubilee Hills,<br />
                  Hyderabad, Telangana 500033
                </p>
              </div>
              
              <div>
                <h4 className="text-eyebrow text-gold tracking-[0.4em] mb-4">HOURS</h4>
                <p className="font-sans text-[15px] text-text-light leading-relaxed">
                  Monday — Sunday<br />
                  8:00 AM — 11:30 PM
                </p>
              </div>
              <div>
                <h4 className="text-eyebrow text-gold tracking-[0.4em] mb-4">CONTACT</h4>
                <p className="font-sans text-[15px] text-text-light leading-relaxed">
                  +91 72929 44244<br />
                  Spandana@woolcup.com
                </p>
              </div>
            </div>

            <a 
              href="https://www.google.com/maps?q=17.4137993,78.4062934"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gold text-gold font-sans font-medium text-[13px] tracking-[0.2em] px-10 py-4 uppercase hover:bg-gold hover:text-bg-dark transition-all duration-300"
            >
              Get Directions
            </a>
          </motion.div>

          {/* Map Placeholder Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.3, once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square md:aspect-video lg:aspect-square w-full bg-bg-footer border border-gold/20 overflow-hidden rounded-xl shadow-2xl"
          >
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.037130635467!2d78.40618067606774!3d17.41113060237905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96bc72e8211b%3A0xc3c5d6e2467d022b!2sFilm%20Nagar%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(0.9) opacity(0.7)' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
          </motion.div>

        </div>
      </div>
    </Section>
  );
}

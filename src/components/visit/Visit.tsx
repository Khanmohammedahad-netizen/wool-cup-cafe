'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';

export function Visit() {
  return (
    <Section id="visit" className="bg-bg-primary py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.3, once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start"
          >
            <h2 className="font-display text-[56px] font-light text-text-primary mb-12">Visit Us.</h2>

            <div className="space-y-10 mb-12">
              <div>
                <h4 className="font-ui text-[12px] font-medium uppercase text-text-tertiary tracking-[0.15em] mb-3">LOCATION</h4>
                <p className="font-body text-[17px] text-text-secondary leading-[1.7]">
                  CC 55, Road No. 1, Film Nagar,<br />
                  opposite Papaya, Jubilee Hills,<br />
                  Hyderabad, Telangana 500033
                </p>
              </div>

              <div>
                <h4 className="font-ui text-[12px] font-medium uppercase text-text-tertiary tracking-[0.15em] mb-3">HOURS</h4>
                <p className="font-body text-[17px] text-text-secondary leading-[1.7]">
                  Monday — Sunday<br />
                  8:00 AM — 11:30 PM
                </p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps?q=17.4137993,78.4062934"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative font-ui font-medium text-[14px] text-dark flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Get Directions →</span>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-dark group-hover:w-full transition-all duration-500 ease-out" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.3, once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-video lg:aspect-square w-full bg-bg-secondary overflow-hidden rounded-2xl group"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.037130635467!2d78.40618067606774!3d17.41113060237905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96bc72e8211b%3A0xc3c5d6e2467d022b!2sFilm%20Nagar%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(1) opacity(0.9)' }}
              className="group-hover:grayscale-0 transition-all duration-700 ease-out"
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

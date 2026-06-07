'use client';

import { motion } from 'framer-motion';

export function MenuDietary() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-ivory py-12 max-w-2xl mx-auto px-6 text-center"
    >
      <div className="w-full h-px bg-[#231f20]/10 mb-6" />
      <p className="font-body text-sm italic text-[#231f20]/50">
        Please inform our team of any dietary requirements or allergies. Our kitchen is happy to accommodate.
      </p>
      <div className="w-full h-px bg-[#231f20]/10 mt-6" />
    </motion.div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function GoldDivider() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { width: 0 },
        {
          width: 60,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={ref}
      className="h-px mx-auto my-8 bg-gradient-to-r from-transparent via-caramel to-transparent"
    />
  );
}

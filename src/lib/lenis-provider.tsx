'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import { useEffect, useState } from 'react';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
  }, []);

  // Skip Lenis on touch devices — native scroll feels better
  if (isTouchDevice) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential out
        smoothWheel: true,
        touchMultiplier: 0, // disable on touch
      }}
    >
      {children as any}
    </ReactLenis>
  );
}

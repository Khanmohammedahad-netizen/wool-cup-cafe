'use client';

import Image from 'next/image';

interface WoolcupLogoProps {
  /** 'dark' = logo on light bg (multiply blend), 'light' = logo on dark bg (invert+screen) */
  variant: 'dark' | 'light';
  width?: number;
  height?: number;
  className?: string;
}

export function WoolcupLogo({ variant, width = 110, height = 76, className = '' }: WoolcupLogoProps) {
  const style =
    variant === 'light'
      ? { filter: 'invert(1)', mixBlendMode: 'screen' as const }
      : { mixBlendMode: 'multiply' as const };

  return (
    <Image
      src="/images/logo.png"
      alt="Wool Cup Urban Café & Bistro"
      width={width}
      height={height}
      priority
      className={className}
      style={style}
    />
  );
}

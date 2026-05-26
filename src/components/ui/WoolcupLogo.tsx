'use client';

import Image from 'next/image';

interface WoolcupLogoProps {
  /** 'dark' = black on light bg, 'light' = white on dark bg, 'brown' = brand brown #6c3b11 on light bg */
  variant: 'dark' | 'light' | 'brown';
  width?: number;
  height?: number;
  className?: string;
}

export function WoolcupLogo({ variant, width = 110, height = 76, className = '' }: WoolcupLogoProps) {
  const style =
    variant === 'light'
      ? { filter: 'invert(1)', mixBlendMode: 'screen' as const }
      : variant === 'brown'
      ? { filter: 'url(#logo-brown)' }
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

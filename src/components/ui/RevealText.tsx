'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface RevealTextProps {
  children: string;
  className?: string;
  type?: 'char' | 'word';
}

export default function RevealText({ children, className, type = 'char' }: RevealTextProps) {
  if (type === 'word') {
    return (
      <span className={cn('inline-block overflow-hidden', className)}>
        {children.split(' ').map((word, i) => (
          <span key={i} className="inline-block relative overflow-hidden mr-[0.2em] last:mr-0">
            <span className="reveal-item inline-block transform translate-y-[110%]">
              {word}
            </span>
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={cn('inline-block', className)}>
      {children.split('').map((char, i) => (
        <span key={i} className="inline-block relative overflow-hidden">
          <span className="reveal-item inline-block transform translate-y-[110%] whitespace-pre">
            {char}
          </span>
        </span>
      ))}
    </span>
  );
}

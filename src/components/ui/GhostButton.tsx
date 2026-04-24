'use client';

import { cn } from '@/lib/utils';

interface GhostButtonProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
  href?: string;
  onClick?: () => void;
}

export function GhostButton({
  children,
  className,
  size = 'md',
  href,
  onClick,
}: GhostButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center',
    'border border-brew text-brew',
    'font-sans font-medium tracking-wide',
    'transition-colors duration-300',
    'hover:bg-brew hover:text-white',
    'focus-visible:outline-1 focus-visible:outline-brew focus-visible:outline-offset-2',
    size === 'sm' ? 'text-[13px] px-5 py-2' : 'text-sm px-8 py-3',
    className
  );

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}

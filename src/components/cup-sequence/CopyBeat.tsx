'use client';

import { MotionValue, motion, useTransform } from 'framer-motion';

interface CopyBeatProps {
  scrollProgress: MotionValue<number>;
  enter: number;
  exit: number;
  position: 'left' | 'right' | 'center';
  children: React.ReactNode;
}

const positionClasses = {
  left: 'left-8 md:left-24 bottom-24 md:bottom-32 text-left items-start',
  right: 'right-8 md:right-24 bottom-24 md:bottom-32 text-right items-end',
  center: 'left-1/2 -translate-x-1/2 bottom-24 md:bottom-32 text-center items-center',
};

export function CopyBeat({
  scrollProgress,
  enter,
  exit,
  position,
  children,
}: CopyBeatProps) {
  const opacity = useTransform(
    scrollProgress,
    [enter, enter + 0.06, exit - 0.04, exit],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollProgress,
    [enter, enter + 0.06, exit - 0.04, exit],
    [24, 0, 0, -24]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute flex flex-col gap-2 pointer-events-none ${positionClasses[position]}`}
    >
      {children}
    </motion.div>
  );
}

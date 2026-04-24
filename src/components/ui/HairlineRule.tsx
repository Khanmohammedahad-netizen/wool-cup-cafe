import { cn } from '@/lib/utils';

export function HairlineRule({ className }: { className?: string }) {
  return <hr className={cn('border-0 h-px bg-rule', className)} />;
}

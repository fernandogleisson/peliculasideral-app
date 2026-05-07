import { cn } from '@/lib/utils';
import type { Element } from './ElementColors';

const LABELS_PT: Record<Element, string> = {
  fogo: 'FOGO',
  terra: 'TERRA',
  ar: 'AR',
  agua: 'ÁGUA',
};

const COLOR_CLASSES: Record<Element, string> = {
  fogo: 'bg-fogo text-on-primary',
  terra: 'bg-terra text-on-primary',
  ar: 'bg-ar text-surface',
  agua: 'bg-agua text-on-primary',
};

export interface ElementBadgeProps {
  element: Element;
  className?: string;
}

export function ElementBadge({ element, className }: ElementBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        'rounded-full',
        'px-2 py-0.5',
        'text-[10px] font-mono font-bold tracking-[0.4em]',
        COLOR_CLASSES[element],
        className,
      )}
    >
      {LABELS_PT[element]}
    </span>
  );
}

import { cn } from '@/lib/utils';
import { ELEMENT_COLORS, type Element } from '@/components/astro/ElementColors';

export interface MandalaSegmentProps {
  element: Element;
  variant?: 'default' | 'highlighted' | 'dimmed';
  pathD: string;
  onClick?: () => void;
  className?: string;
}

const VARIANT_OPACITY: Record<NonNullable<MandalaSegmentProps['variant']>, number> = {
  default: 0.1,
  highlighted: 0.4,
  dimmed: 0.05,
};

export function MandalaSegment({
  element,
  variant = 'default',
  pathD,
  onClick,
  className,
}: MandalaSegmentProps) {
  const elementColor = ELEMENT_COLORS[element].primary;

  return (
    <path
      d={pathD}
      fill={elementColor}
      fillOpacity={VARIANT_OPACITY[variant]}
      stroke="var(--color-border-element, var(--color-border))"
      strokeWidth={variant === 'highlighted' ? 1.5 : 1}
      onClick={onClick}
      data-variant={variant}
      className={cn(
        'transition-opacity cursor-pointer',
        'hover:[fill-opacity:0.20] data-[variant=highlighted]:hover:[fill-opacity:0.50]',
        className,
      )}
    />
  );
}

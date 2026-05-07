import { cn } from '@/lib/utils';

type Size = 'sm' | 'md' | 'lg';

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-2xl',
};

export interface SparkleProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: Size;
  animated?: boolean;
}

export function Sparkle({ size = 'md', animated, className, ...props }: SparkleProps) {
  return (
    <span
      role="img"
      className={cn(
        'inline-block leading-none select-none',
        SIZE_CLASSES[size],
        animated && 'animate-pulse',
        className,
      )}
      {...props}
    >
      ✦
    </span>
  );
}

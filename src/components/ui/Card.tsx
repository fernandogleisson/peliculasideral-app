import { cn } from '@/lib/utils';

type Variant = 'default' | 'elevated' | 'interactive';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  ref?: React.Ref<HTMLDivElement>;
}

export function Card({ variant = 'default', className, ref, ...props }: CardProps) {
  return (
    <div
      ref={ref}
      className={cn(
        'border rounded-md p-6',
        variant === 'default' && 'bg-surface-1 border-border',
        variant === 'elevated' && 'bg-surface-2 border-border-strong shadow-md rounded-lg',
        variant === 'interactive' &&
          'bg-surface-1 border-border hover:bg-surface-2 cursor-pointer transition',
        className,
      )}
      {...props}
    />
  );
}

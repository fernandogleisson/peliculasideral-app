import { cn } from '@/lib/utils';

type Variant = 'default' | 'ghost';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  'aria-label': string;
  ref?: React.Ref<HTMLButtonElement>;
}

export function IconButton({ variant = 'default', className, ref, ...props }: IconButtonProps) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'inline-flex items-center justify-center',
        'h-10 w-10 rounded-full transition',
        variant === 'default' && 'bg-surface-1 text-ink hover:bg-surface-2',
        variant === 'ghost' && 'bg-transparent text-ink-2 hover:text-ink hover:bg-surface-2',
        className,
      )}
      {...props}
    />
  );
}

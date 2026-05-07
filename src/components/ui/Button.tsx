import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-primary text-on-primary hover:bg-primary-light active:bg-primary-dark',
  secondary: 'border border-primary text-primary hover:bg-primary/10',
  ghost: 'bg-transparent text-ink hover:bg-surface-2',
  danger: 'bg-danger text-on-primary hover:opacity-90',
  link: 'bg-transparent text-primary underline-offset-4 hover:underline px-0 h-auto',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  ref?: React.Ref<HTMLButtonElement>;
}

export function Button({ variant = 'primary', className, ref, ...props }: ButtonProps) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded transition',
        'h-12 px-6',
        'font-mono text-sm font-semibold tracking-[0.15em] uppercase',
        'disabled:opacity-50 disabled:pointer-events-none',
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    />
  );
}

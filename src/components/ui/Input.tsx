import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

export function Input({ error, className, ref, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full bg-surface-1 text-ink',
        'h-12 px-4 rounded-sm',
        'font-serif text-base',
        'border border-border',
        'placeholder:text-ink-3',
        'focus:outline-none focus:border-primary',
        error && 'border-danger',
        'disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

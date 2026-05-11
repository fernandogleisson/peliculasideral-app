import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  ref?: React.Ref<HTMLTextAreaElement>;
}

export function Textarea({ error, className, ref, ...props }: TextareaProps) {
  return (
    <textarea
      ref={ref}
      className={cn(
        'w-full min-h-24 bg-surface-1 text-ink',
        'p-4 rounded-sm',
        'font-serif text-base',
        'border border-border',
        'placeholder:text-ink-3',
        'focus:outline-none focus:border-primary',
        error && 'border-danger',
        'resize-y',
        className,
      )}
      {...props}
    />
  );
}

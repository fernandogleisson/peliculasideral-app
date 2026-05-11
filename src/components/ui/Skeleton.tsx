import { cn } from '@/lib/utils';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="status"
      aria-label="Carregando"
      className={cn('animate-pulse bg-surface-2 rounded-md', className)}
      {...props}
    />
  );
}

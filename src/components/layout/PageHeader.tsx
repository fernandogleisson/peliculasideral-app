import { cn } from '@/lib/utils';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  variant?: 'default' | 'with-action';
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  variant = 'default',
  action,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn('flex items-start justify-between gap-4 py-6', className)}>
      <div>
        <h1 className="font-serif text-3xl font-semibold tracking-[-0.01em] text-ink">{title}</h1>
        {subtitle && <p className="mt-2 font-serif text-base text-ink-2">{subtitle}</p>}
      </div>
      {variant === 'with-action' && action && <div>{action}</div>}
    </header>
  );
}

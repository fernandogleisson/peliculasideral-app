import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RateLimitMessageProps {
  retryAfterSeconds: number;
  message?: string;
  className?: string;
}

function formatRetry(seconds: number): string {
  const days = Math.ceil(seconds / 86400);
  if (days <= 1) {
    const hours = Math.ceil(seconds / 3600);
    return `${hours} hora${hours === 1 ? '' : 's'}`;
  }
  return `${days} dia${days === 1 ? '' : 's'}`;
}

export function RateLimitMessage({ retryAfterSeconds, message, className }: RateLimitMessageProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 p-4 bg-surface-1 border-l-2 border-warning rounded-sm',
        className,
      )}
    >
      <Clock size={18} className="text-warning shrink-0 mt-0.5" />
      <div>
        <p className="font-serif text-base text-ink">
          {message ?? 'Próxima alteração disponível em'}{' '}
          <strong className="text-warning">{formatRetry(retryAfterSeconds)}</strong>
        </p>
      </div>
    </div>
  );
}

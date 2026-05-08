import { Lock } from 'lucide-react';

import { cn } from '@/lib/utils';

type Variant = 'short' | 'long' | 'paywall-locked';

export interface InterpretationCardProps {
  variant: Variant;
  title: string;
  shortText: string;
  longText?: string;
  paywallCta?: React.ReactNode;
  className?: string;
}

export function InterpretationCard({
  variant,
  title,
  shortText,
  longText,
  paywallCta,
  className,
}: InterpretationCardProps) {
  return (
    <article className={cn('relative', className)}>
      <h3 className="font-serif text-2xl font-medium text-ink mb-3">{title}</h3>

      <p className="font-serif text-base text-ink leading-relaxed max-w-[65ch]">{shortText}</p>

      {variant === 'long' && longText && (
        <div className="mt-6 space-y-4">
          <hr className="border-border" />
          <p className="font-serif text-lg text-ink leading-relaxed max-w-[65ch]">{longText}</p>
        </div>
      )}

      {variant === 'paywall-locked' && (
        <div className="mt-6 relative rounded-lg border border-border bg-surface-1 p-6 overflow-hidden">
          <div className="absolute inset-0 backdrop-blur-sm bg-surface/40" aria-hidden />
          <div className="relative flex flex-col items-center text-center gap-3">
            <Lock size={24} className="text-primary" />
            <p className="font-serif text-base text-ink-2">
              Quer a leitura completa do Victor sobre este aspecto?
            </p>
            {paywallCta}
          </div>
        </div>
      )}
    </article>
  );
}

import Link from 'next/link';

import { Sparkle } from '@/components/identity/Sparkle';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type Variant = 'default' | 'inline-card' | 'full-screen';

export interface PaywallOverlayProps {
  variant?: Variant;
  benefits: string[];
  socialProof?: string;
  ctaHref: string;
  ctaLabel?: string;
  className?: string;
}

export function PaywallOverlay({
  variant = 'default',
  benefits,
  socialProof,
  ctaHref,
  ctaLabel = 'Assinar agora',
  className,
}: PaywallOverlayProps) {
  return (
    <div
      data-variant={variant}
      className={cn(
        'flex flex-col items-center gap-4 text-center',
        variant === 'full-screen' &&
          'fixed inset-0 z-40 justify-center bg-overlay/70 p-8 backdrop-blur-md',
        variant === 'inline-card' && 'rounded-lg border border-border bg-surface-1 p-8',
        variant === 'default' && 'p-6',
        className,
      )}
    >
      <Sparkle size="lg" className="text-primary" />

      <h2 className="max-w-md font-serif text-3xl leading-tight text-ink">
        Sua pelicula sideral completa espera você
      </h2>

      <ul className="mt-2 flex max-w-sm flex-col gap-2">
        {benefits.map((b, i) => (
          <li key={i} className="font-serif text-base leading-relaxed text-ink-2">
            {b}
          </li>
        ))}
      </ul>

      {socialProof && (
        <p className="mt-2 font-mono text-[11px] tracking-[0.3em] text-ink-3 uppercase">
          {socialProof}
        </p>
      )}

      <Link href={ctaHref}>
        <Button variant="primary">{ctaLabel}</Button>
      </Link>
    </div>
  );
}

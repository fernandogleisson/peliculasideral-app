'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export interface BackButtonProps {
  variant?: 'default' | 'ghost';
  showLabel?: boolean;
  className?: string;
}

export function BackButton({ variant = 'default', showLabel = true, className }: BackButtonProps) {
  const router = useRouter();
  const t = useTranslations('nav');

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label={t('back')}
      className={cn(
        'inline-flex items-center gap-2 transition-colors',
        'text-ink-2 hover:text-ink',
        variant === 'default' && 'h-10 px-3 -ml-3',
        variant === 'ghost' && 'h-10 w-10 justify-center rounded-full hover:bg-surface-2',
        className,
      )}
    >
      <ArrowLeft size={20} strokeWidth={1.5} />
      {showLabel && variant === 'default' && (
        <span className="font-mono text-xs font-semibold tracking-[0.2em]">{t('back')}</span>
      )}
    </button>
  );
}

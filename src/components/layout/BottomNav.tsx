'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const TABS = [
  { href: '/eu', key: 'eu' },
  { href: '/cursos', key: 'cursos' },
  { href: '/pelicula-da-semana', key: 'semana' },
  { href: '/pelicula-do-dia', key: 'dia' },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  return (
    <nav
      className={cn(
        'fixed bottom-0 inset-x-0 z-10',
        'h-16 pb-safe',
        'border-t border-border bg-surface-1',
        'flex items-stretch',
      )}
    >
      {TABS.map((tab) => {
        const active = pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex-1 flex flex-col items-center justify-center gap-1',
              active ? 'text-primary' : 'text-ink-2',
            )}
          >
            <span className="font-mono text-xs font-semibold tracking-[0.2em]">{t(tab.key)}</span>
          </Link>
        );
      })}
    </nav>
  );
}

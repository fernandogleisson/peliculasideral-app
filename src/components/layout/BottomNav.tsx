'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function BottomNav() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  const tabs = [
    { href: '/eu', label: t('eu') },
    { href: '/cursos', label: t('cursos') },
    { href: '/pelicula-da-semana', label: t('semana') },
    { href: '/pelicula-do-dia', label: t('dia') },
  ] as const;

  return (
    <nav className="bg-background fixed right-0 bottom-0 left-0 flex border-t" aria-label="Primary">
      {tabs.map((tab) => {
        const active = pathname.includes(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex-1 p-3 text-center text-xs ${
              active ? 'text-fogo-primary font-semibold' : 'text-muted-foreground'
            }`}
            aria-current={active ? 'page' : undefined}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

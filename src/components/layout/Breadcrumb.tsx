import Link from 'next/link';
import { Fragment } from 'react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
      <ol className="flex items-center gap-2">
        {items.map((item, idx) => (
          <Fragment key={idx}>
            <li>
              {item.href ? (
                <Link
                  href={item.href}
                  className="font-mono text-[11px] font-semibold tracking-[0.2em] text-ink-2 hover:text-ink"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-ink">
                  {item.label}
                </span>
              )}
            </li>
            {idx < items.length - 1 && (
              <li aria-hidden className="text-ink-3">
                ›
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

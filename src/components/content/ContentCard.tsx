import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

type Variant = 'course' | 'article' | 'pelicula-do-dia' | 'pelicula-da-semana';

export interface ContentCardProps {
  variant: Variant;
  href: string;
  title: string;
  meta?: string;
  description?: string;
  imageSrc?: string;
  aspectRatio?: '16:9' | '9:16' | '1:1';
  className?: string;
}

export function ContentCard({
  variant,
  href,
  title,
  meta,
  description,
  imageSrc,
  aspectRatio = '16:9',
  className,
}: ContentCardProps) {
  const aspectClass = {
    '16:9': 'aspect-video',
    '9:16': 'aspect-[9/16]',
    '1:1': 'aspect-square',
  }[aspectRatio];

  return (
    <Link href={href} data-variant={variant} className={cn('block group', className)}>
      {imageSrc && (
        <div
          className={cn('relative w-full overflow-hidden rounded-md', aspectClass, 'bg-surface-1')}
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition"
          />
        </div>
      )}
      <div className="mt-3">
        {meta && (
          <p className="font-mono text-[11px] font-semibold tracking-[0.3em] text-ink-3 uppercase mb-1">
            {meta}
          </p>
        )}
        <h3 className="font-serif text-2xl font-medium text-ink leading-snug">{title}</h3>
        {description && (
          <p className="mt-2 font-serif text-sm text-ink-2 leading-relaxed">{description}</p>
        )}
      </div>
    </Link>
  );
}

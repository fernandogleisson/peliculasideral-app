'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface HeroSlide {
  imageSrc: string;
  title: string;
  href: string;
  meta?: string;
}

export interface HeroBannerProps {
  variant?: 'carousel' | 'static';
  slides: HeroSlide[];
  autoplayInterval?: number;
  className?: string;
}

export function HeroBanner({
  variant = 'carousel',
  slides,
  autoplayInterval = 10000,
  className,
}: HeroBannerProps) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (variant !== 'carousel' || slides.length <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % slides.length), autoplayInterval);
    return () => clearInterval(id);
  }, [variant, slides.length, autoplayInterval]);

  if (slides.length === 0) return null;
  const slide = slides[idx];

  return (
    <div className={cn('relative aspect-video w-full overflow-hidden rounded-md', className)}>
      <Link href={slide.href}>
        <Image src={slide.imageSrc} alt={slide.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {slide.meta && (
            <p className="font-mono text-[11px] tracking-[0.3em] text-ink-2 uppercase mb-2">
              {slide.meta}
            </p>
          )}
          <h2 className="font-serif text-3xl text-ink font-semibold leading-tight">
            {slide.title}
          </h2>
        </div>
      </Link>

      {variant === 'carousel' && slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIdx(i)}
              className={cn('w-2 h-2 rounded-full transition', i === idx ? 'bg-ink' : 'bg-ink-3')}
            />
          ))}
        </div>
      )}
    </div>
  );
}

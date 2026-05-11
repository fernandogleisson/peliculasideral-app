import { ASPECT_PATHS, type Aspect } from './aspect-paths';
import { cn } from '@/lib/utils';

const ASPECT_NAMES_PT: Record<Aspect, string> = {
  conjunction: 'Conjunção',
  opposition: 'Oposição',
  trine: 'Trígono',
  square: 'Quadratura',
  sextile: 'Sextil',
  semi_sextile: 'Semi-sextil',
  semi_square: 'Semi-quadratura',
  sesquiquadrate: 'Sesqui-quadratura',
  quincunx: 'Quincunce',
};

export interface AspectGlyphProps {
  aspect: Aspect;
  size?: number;
  className?: string;
}

export function AspectGlyph({ aspect, size = 18, className }: AspectGlyphProps) {
  const { path, major } = ASPECT_PATHS[aspect];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={major ? 'var(--color-ink)' : 'var(--color-ink-2)'}
      strokeWidth={major ? 1.5 : 1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label={ASPECT_NAMES_PT[aspect]}
      className={cn(major ? 'opacity-100' : 'opacity-80', className)}
    >
      <path d={path} />
    </svg>
  );
}

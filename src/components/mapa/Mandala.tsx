import { cn } from '@/lib/utils';
import type { Sign } from '@/components/astro/ElementColors';

export interface ChartData {
  planets: Array<{
    name: string;
    sign: Sign;
    house?: number;
    degree: number;
    isRetrograde?: boolean;
  }>;
  houses?: Array<{ number: number; sign: Sign; cuspDegree: number }>;
  aspects?: Array<{ from: string; to: string; aspect: string; orb: number }>;
}

export interface MandalaProps {
  variant?: 'full' | 'simplified-solar';
  chart: ChartData;
  size?: number;
  className?: string;
  onElementClick?: (type: string, key: string) => void;
}

export function Mandala({ variant = 'full', chart, size = 320, className }: MandalaProps) {
  const showHouses = variant === 'full' && !!chart.houses;

  return (
    <svg
      role="img"
      aria-label="Mandala astral"
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={cn('mandala-root', className)}
    >
      {/* Outer ring */}
      <circle
        cx="200"
        cy="200"
        r="190"
        fill="none"
        stroke="var(--color-surface-2)"
        strokeWidth="1.5"
      />
      {/* Inner ring */}
      <circle
        cx="200"
        cy="200"
        r="120"
        fill="none"
        stroke="var(--color-surface-1)"
        strokeWidth="1"
      />

      {showHouses && <g aria-label="Casas">{/* HouseRing rendered separately by consumer */}</g>}

      <g aria-label="Planetas">
        {/* Planets rendered as PlanetGlyph at proper positions — Phase 1 do app */}
      </g>

      <g aria-label="Aspectos" stroke="var(--color-ink-2)" strokeWidth="1">
        {/* Aspects rendered as lines — Phase 1 do app */}
      </g>
    </svg>
  );
}

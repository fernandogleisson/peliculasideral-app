import type { Sign } from '@/components/astro/ElementColors';

export interface HouseCusp {
  number: number;
  sign: Sign;
  cuspDegree: number;
}

export interface HouseRingProps {
  variant?: 'default' | 'cusps-only';
  houses: HouseCusp[];
  centerX?: number;
  centerY?: number;
  outerRadius?: number;
  innerRadius?: number;
}

export function HouseRing({
  variant = 'default',
  houses,
  centerX = 200,
  centerY = 200,
  outerRadius = 190,
  innerRadius = 120,
}: HouseRingProps) {
  return (
    <g aria-label="Casas">
      {houses.map((house, idx) => {
        const angle = (house.cuspDegree * Math.PI) / 180;
        const x1 = centerX + Math.cos(angle) * innerRadius;
        const y1 = centerY + Math.sin(angle) * innerRadius;
        const x2 = centerX + Math.cos(angle) * outerRadius;
        const y2 = centerY + Math.sin(angle) * outerRadius;

        return (
          <g key={idx}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-border)" strokeWidth={1} />
            {variant === 'default' && (
              <text
                x={centerX + Math.cos(angle + Math.PI / 12) * (innerRadius + 15)}
                y={centerY + Math.sin(angle + Math.PI / 12) * (innerRadius + 15)}
                fill="var(--color-ink-3)"
                fontSize="10"
                fontFamily="JetBrains Mono"
                fontWeight="700"
                letterSpacing="0.4em"
                textAnchor="middle"
              >
                {house.number}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

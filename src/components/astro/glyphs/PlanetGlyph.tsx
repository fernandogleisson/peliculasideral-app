import { PLANET_PATHS, type Planet } from './planet-paths';
import { SIGN_TO_ELEMENT, ELEMENT_COLORS, type Sign } from '@/components/astro/ElementColors';
import { cn } from '@/lib/utils';

const PLANET_NAMES_PT: Record<Planet, string> = {
  sun: 'Sol',
  moon: 'Lua',
  mercury: 'Mercúrio',
  venus: 'Vênus',
  mars: 'Marte',
  jupiter: 'Júpiter',
  saturn: 'Saturno',
  uranus: 'Urano',
  neptune: 'Netuno',
  pluto: 'Plutão',
  north_node: 'Nodo Norte',
  south_node: 'Nodo Sul',
  chiron: 'Quirão',
  lilith: 'Lilith',
};

export interface PlanetGlyphProps {
  planet: Planet;
  sign?: Sign;
  retrograde?: boolean;
  uncertain?: boolean;
  size?: number;
  className?: string;
}

export function PlanetGlyph({
  planet,
  sign,
  retrograde,
  uncertain,
  size = 24,
  className,
}: PlanetGlyphProps) {
  const path = PLANET_PATHS[planet];
  const elementColor = sign ? ELEMENT_COLORS[SIGN_TO_ELEMENT[sign]].primary : 'currentColor';

  return (
    <span className={cn('inline-flex items-center gap-0.5', className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label={PLANET_NAMES_PT[planet]}
        style={{ color: elementColor }}
      >
        <path d={path} />
      </svg>
      {retrograde && <sup className="text-[10px] font-mono ml-0.5">R</sup>}
      {uncertain && <span className="text-xs ml-0.5">~</span>}
    </span>
  );
}

// Placeholder SVG paths for traditional astrological planet glyphs.
// All paths target viewBox "0 0 24 24" and are designed for stroke rendering.
// These approximations will be refined when final design assets land.

export type Planet =
  | 'sun'
  | 'moon'
  | 'mercury'
  | 'venus'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'pluto'
  | 'north_node'
  | 'south_node'
  | 'chiron'
  | 'lilith';

export const PLANET_PATHS: Record<Planet, string> = {
  // Sun: ☉ — circle with center dot
  sun: 'M12 5a7 7 0 1 0 0 14a7 7 0 1 0 0 -14 M12 11.5a0.5 0.5 0 1 0 0 1a0.5 0.5 0 1 0 0 -1',
  // Moon: ☽ — crescent
  moon: 'M16 4a8 8 0 1 0 0 16a6 6 0 1 1 0 -16',
  // Mercury: ☿ — circle with horns above and cross below
  mercury: 'M9 4a3 3 0 0 0 6 0 M12 7v5 M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M12 16v4 M10 18h4',
  // Venus: ♀ — circle with cross below
  venus: 'M8 9a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M12 13v6 M10 17h4',
  // Mars: ♂ — circle with arrow upper right
  mars: 'M8 15a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M14 11l5 -5 M19 6h-4 M19 6v4',
  // Jupiter: ♃ — stylized 4
  jupiter: 'M5 7h6 M9 7v10 M9 17a4 4 0 0 0 8 0',
  // Saturn: ♄ — stylized h with cross
  saturn: 'M7 5h4 M9 5v12 M9 17a3 3 0 0 0 6 0a3 3 0 0 0 -6 0',
  // Uranus: ♅ — H with circle below
  uranus: 'M6 4v8 M18 4v8 M6 12h12 M12 8v9 M9 19a3 3 0 1 0 6 0a3 3 0 1 0 -6 0',
  // Neptune: ♆ — trident
  neptune: 'M5 5l3 6 M19 5l-3 6 M12 4v15 M5 19h14 M9 11h6',
  // Pluto: ♇ — circle on cross with horns
  pluto: 'M7 7a5 5 0 0 1 10 0 M12 7v6 M9 13h6 M12 13v7 M10 18h4',
  // North Node: ☊ — horseshoe up with feet
  north_node:
    'M6 18a6 6 0 0 1 12 0 M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0 M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0',
  // South Node: ☋ — horseshoe down with feet
  south_node:
    'M6 6a6 6 0 0 0 12 0 M5 7a2 2 0 1 0 4 0a2 2 0 1 0 -4 0 M15 7a2 2 0 1 0 4 0a2 2 0 1 0 -4 0',
  // Chiron: ⚷ — K shape with circle
  chiron: 'M9 4v10 M9 9l5 -3 M9 9l5 3 M7 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0',
  // Lilith (Black Moon): ⚸ — crescent on cross
  lilith: 'M16 4a6 6 0 1 0 0 12a4 4 0 1 1 0 -12 M12 16v4 M10 18h4',
};

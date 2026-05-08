/**
 * Transformers entre o snapshot bruto do Astrologer e os shapes
 * usados pelos componentes de display.
 */
import type { Sign } from '@/components/astro/ElementColors';
import type { Planet } from '@/components/astro/glyphs/planet-paths';
import type { ChartSnapshot } from './queries';

export interface PlanetEntry {
  planet: Planet;
  sign: Sign;
  house: number;
  degree: number;
  retrograde?: boolean;
}

const PLANET_GROUPS = {
  luminaries: ['sun', 'moon'] as const,
  personal: ['mercury', 'venus', 'mars'] as const,
  social: ['jupiter', 'saturn'] as const,
  transpersonal: ['uranus', 'neptune', 'pluto'] as const,
  asteroids: ['north_node', 'chiron', 'lilith', 'south_node'] as const,
};

export interface PlanetGroups {
  luminaries: PlanetEntry[];
  personal: PlanetEntry[];
  social: PlanetEntry[];
  transpersonal: PlanetEntry[];
  asteroids: PlanetEntry[];
}

function normalizePlanetName(name: string): Planet | null {
  const k = name.toLowerCase().replace(/\s+/g, '_');
  const valid: Planet[] = [
    'sun',
    'moon',
    'mercury',
    'venus',
    'mars',
    'jupiter',
    'saturn',
    'uranus',
    'neptune',
    'pluto',
    'north_node',
    'south_node',
    'chiron',
    'lilith',
  ];
  return valid.includes(k as Planet) ? (k as Planet) : null;
}

function normalizeSign(sign: string): Sign | null {
  const k = sign.toLowerCase();
  const valid: Sign[] = [
    'aries',
    'taurus',
    'gemini',
    'cancer',
    'leo',
    'virgo',
    'libra',
    'scorpio',
    'sagittarius',
    'capricorn',
    'aquarius',
    'pisces',
  ];
  return valid.includes(k as Sign) ? (k as Sign) : null;
}

export function chartToPlanetGroups(chart: ChartSnapshot): PlanetGroups {
  const entries: PlanetEntry[] = [];
  for (const p of chart.planets) {
    const planet = normalizePlanetName(p.name);
    const sign = normalizeSign(p.sign);
    if (!planet || !sign) continue;
    entries.push({
      planet,
      sign,
      house: p.house,
      degree: Math.round(p.degree),
      retrograde: p.isRetrograde,
    });
  }
  if (chart.nodes?.north) {
    const sign = normalizeSign(chart.nodes.north.sign);
    if (sign) {
      entries.push({
        planet: 'north_node',
        sign,
        house: chart.nodes.north.house,
        degree: Math.round(chart.nodes.north.degree),
      });
    }
  }
  if (chart.chiron) {
    const sign = normalizeSign(chart.chiron.sign);
    if (sign) {
      entries.push({
        planet: 'chiron',
        sign,
        house: chart.chiron.house,
        degree: Math.round(chart.chiron.degree),
        retrograde: chart.chiron.isRetrograde,
      });
    }
  }
  if (chart.lilith) {
    const sign = normalizeSign(chart.lilith.sign);
    if (sign) {
      entries.push({
        planet: 'lilith',
        sign,
        house: chart.lilith.house,
        degree: Math.round(chart.lilith.degree),
      });
    }
  }

  function pick(group: ReadonlyArray<Planet>): PlanetEntry[] {
    return group
      .map((g) => entries.find((e) => e.planet === g))
      .filter((e): e is PlanetEntry => Boolean(e));
  }

  return {
    luminaries: pick(PLANET_GROUPS.luminaries),
    personal: pick(PLANET_GROUPS.personal),
    social: pick(PLANET_GROUPS.social),
    transpersonal: pick(PLANET_GROUPS.transpersonal),
    asteroids: pick(PLANET_GROUPS.asteroids),
  };
}

/**
 * Converte planet groups + chart em lista de chaves de interpretation
 * que precisamos buscar (planet_in_sign_house, planet_aspect_planet, etc).
 */
export function chartToInterpretationKeys(
  chart: ChartSnapshot,
): Array<{ type: string; key: string }> {
  const out: Array<{ type: string; key: string }> = [];
  for (const p of chart.planets) {
    const planet = normalizePlanetName(p.name);
    const sign = normalizeSign(p.sign);
    if (!planet || !sign) continue;
    out.push({ type: 'planet_in_sign_house', key: `${planet}:${sign}:${p.house}` });
  }
  for (const a of chart.aspects ?? []) {
    const from = normalizePlanetName(a.from);
    const to = normalizePlanetName(a.to);
    if (!from || !to) continue;
    out.push({ type: 'planet_aspect_planet', key: `${from}:${a.aspect}:${to}` });
  }
  for (const h of chart.houses ?? []) {
    const sign = normalizeSign(h.sign);
    if (!sign) continue;
    out.push({ type: 'house_in_sign', key: `house${h.number}:${sign}` });
  }
  return out;
}

export function findSunSummary(
  chart: ChartSnapshot,
): { sign: Sign; house: number; degree: number } | null {
  const sun = chart.planets.find((p) => p.name.toLowerCase() === 'sun');
  if (!sun) return null;
  const sign = normalizeSign(sun.sign);
  if (!sign) return null;
  return { sign, house: sun.house, degree: Math.round(sun.degree) };
}

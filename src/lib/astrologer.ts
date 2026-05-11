/**
 * Low-level Astrologer (RapidAPI) client — v5 API.
 *
 * Astrologer v5 mudou shape em 2025: o request precisa ser envelopado em
 * `subject` e o response retorna planetas/casas como keys do objeto, não
 * arrays. Este módulo expõe um shape interno (`BirthChartOutput`) que o resto
 * do código consome, e isola a conversão aqui.
 *
 * Cache logic lives in `src/features/mapa-natal/astrologer.ts`.
 */
import crypto from 'crypto';
import { env } from './env';

export interface BirthChartInput {
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  lat: number;
  lng: number;
  tz: string; // IANA, e.g. 'America/Sao_Paulo'
  houseSystem?: 'placidus' | 'koch' | 'whole_sign';
  /** Used by Astrologer in the response payload; defaults to placeholder. */
  name?: string;
  /** Astrologer v5 exige city + nation no body. */
  city?: string;
  nation?: string; // ISO-2 code, e.g. 'BR'
}

export interface BirthChartOutput {
  planets: Array<{
    name: string;
    sign: string;
    house: number;
    degree: number;
    isRetrograde: boolean;
  }>;
  houses: Array<{ number: number; sign: string; cuspDegree: number }>;
  aspects: Array<{ from: string; to: string; aspect: string; orb: number }>;
  nodes: {
    north: { sign: string; house: number; degree: number };
    south: { sign: string; house: number; degree: number };
  };
  chiron?: { sign: string; house: number; degree: number; isRetrograde: boolean };
  lilith?: { sign: string; house: number; degree: number };
  svg: string;
  api_version: string;
}

/**
 * Deterministic hash of the chart input. Coordinates are rounded to 5 decimal
 * places (~1.1 m) so trivially-different lat/lng still hit the same cache.
 * NB: `name`, `city`, `nation` are NOT in the hash — they are display-only.
 */
export function chartHash(input: BirthChartInput): string {
  const norm = JSON.stringify({
    date: input.date,
    time: input.time,
    lat: Math.round(input.lat * 100000) / 100000,
    lng: Math.round(input.lng * 100000) / 100000,
    tz: input.tz,
    system: input.houseSystem ?? 'placidus',
  });
  return crypto.createHash('sha256').update(norm).digest('hex');
}

const HOUSE_SYSTEM_CODE: Record<NonNullable<BirthChartInput['houseSystem']>, string> = {
  placidus: 'P',
  koch: 'K',
  whole_sign: 'W',
};

export async function fetchBirthChart(input: BirthChartInput): Promise<BirthChartOutput> {
  if (!env.RAPIDAPI_KEY) {
    return mockBirthChart(input);
  }

  const [year, month, day] = input.date.split('-').map((s) => parseInt(s, 10));
  const [hour, minute] = input.time.split(':').map((s) => parseInt(s, 10));

  const body = {
    subject: {
      year,
      month,
      day,
      hour,
      minute,
      latitude: input.lat,
      longitude: input.lng,
      city: input.city ?? 'Unknown',
      nation: input.nation ?? 'BR',
      timezone: input.tz,
      name: input.name ?? 'User',
      zodiac_type: 'Tropical',
      houses_system_identifier: HOUSE_SYSTEM_CODE[input.houseSystem ?? 'placidus'],
    },
  };

  const res = await fetch(`https://${env.ASTROLOGER_HOST}/api/v5/chart-data/birth-chart`, {
    method: 'POST',
    headers: {
      'X-RapidAPI-Key': env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': env.ASTROLOGER_HOST,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    if (res.status === 429) throw new Error('ASTROLOGER_RATE_LIMITED');
    const text = await res.text().catch(() => '');
    throw new Error(`astrologer ${res.status}: ${text.slice(0, 200)}`);
  }
  const raw = (await res.json()) as AstrologerV5Response;
  return adaptAstrologerV5(raw);
}

// ─── Astrologer v5 raw response shape (partial) ─────────────────────────────

interface AstrologerV5Point {
  name: string;
  sign: string; // "Aqu", "Tau" etc — 3-letter abbreviation, capitalized
  position: number; // float, degrees within sign
  abs_pos: number;
  house: string | null; // "Second_House" etc, or null for cusp points
  retrograde: boolean | null;
}

interface AstrologerV5Aspect {
  p1_name: string;
  p2_name: string;
  aspect: string; // "trine", "conjunction", etc — lowercase
  orbit: number;
}

interface AstrologerV5Subject {
  [planet: string]: AstrologerV5Point | unknown;
}

interface AstrologerV5Response {
  status: string;
  chart_data: {
    subject: AstrologerV5Subject;
    aspects: AstrologerV5Aspect[];
  };
}

// ─── Adapters ───────────────────────────────────────────────────────────────

const SIGN_ABBR_TO_FULL: Record<string, string> = {
  Ari: 'aries',
  Tau: 'taurus',
  Gem: 'gemini',
  Can: 'cancer',
  Leo: 'leo',
  Vir: 'virgo',
  Lib: 'libra',
  Sco: 'scorpio',
  Sag: 'sagittarius',
  Cap: 'capricorn',
  Aqu: 'aquarius',
  Pis: 'pisces',
};

const HOUSE_STR_TO_NUM: Record<string, number> = {
  First_House: 1,
  Second_House: 2,
  Third_House: 3,
  Fourth_House: 4,
  Fifth_House: 5,
  Sixth_House: 6,
  Seventh_House: 7,
  Eighth_House: 8,
  Ninth_House: 9,
  Tenth_House: 10,
  Eleventh_House: 11,
  Twelfth_House: 12,
};

const HOUSE_KEY_TO_NUM: Record<string, number> = {
  first_house: 1,
  second_house: 2,
  third_house: 3,
  fourth_house: 4,
  fifth_house: 5,
  sixth_house: 6,
  seventh_house: 7,
  eighth_house: 8,
  ninth_house: 9,
  tenth_house: 10,
  eleventh_house: 11,
  twelfth_house: 12,
};

const ASPECT_PLANET_RENAME: Record<string, string> = {
  Sun: 'sun',
  Moon: 'moon',
  Mercury: 'mercury',
  Venus: 'venus',
  Mars: 'mars',
  Jupiter: 'jupiter',
  Saturn: 'saturn',
  Uranus: 'uranus',
  Neptune: 'neptune',
  Pluto: 'pluto',
  Mean_North_Lunar_Node: 'north_node',
  True_North_Lunar_Node: 'north_node',
  Mean_South_Lunar_Node: 'south_node',
  True_South_Lunar_Node: 'south_node',
  Chiron: 'chiron',
  Mean_Lilith: 'lilith',
  True_Lilith: 'lilith',
};

function pickPoint(subject: AstrologerV5Subject, key: string): AstrologerV5Point | undefined {
  const v = subject[key];
  if (v && typeof v === 'object' && 'sign' in v && 'position' in v) {
    return v as AstrologerV5Point;
  }
  return undefined;
}

function adaptPoint(p: AstrologerV5Point, normalizedName: string) {
  return {
    name: normalizedName,
    sign: SIGN_ABBR_TO_FULL[p.sign] ?? p.sign.toLowerCase(),
    house: p.house ? (HOUSE_STR_TO_NUM[p.house] ?? 0) : 0,
    degree: Math.round(p.position * 10) / 10,
    isRetrograde: p.retrograde ?? false,
  };
}

function adaptAstrologerV5(raw: AstrologerV5Response): BirthChartOutput {
  const sub = raw.chart_data.subject;

  // 10 main planets
  const planetKeys: [string, string][] = [
    ['sun', 'sun'],
    ['moon', 'moon'],
    ['mercury', 'mercury'],
    ['venus', 'venus'],
    ['mars', 'mars'],
    ['jupiter', 'jupiter'],
    ['saturn', 'saturn'],
    ['uranus', 'uranus'],
    ['neptune', 'neptune'],
    ['pluto', 'pluto'],
  ];
  const planets = planetKeys
    .map(([key, name]) => {
      const p = pickPoint(sub, key);
      return p ? adaptPoint(p, name) : null;
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  // 12 houses
  const houses = Object.entries(HOUSE_KEY_TO_NUM)
    .map(([key, number]) => {
      const p = pickPoint(sub, key);
      if (!p) return null;
      return {
        number,
        sign: SIGN_ABBR_TO_FULL[p.sign] ?? p.sign.toLowerCase(),
        cuspDegree: Math.round(p.position * 10) / 10,
      };
    })
    .filter((h): h is NonNullable<typeof h> => h !== null);

  // Aspects: normalize planet names + orbit→orb
  const aspects = raw.chart_data.aspects
    .map((a) => {
      const from = ASPECT_PLANET_RENAME[a.p1_name];
      const to = ASPECT_PLANET_RENAME[a.p2_name];
      if (!from || !to) return null;
      return { from, to, aspect: a.aspect, orb: Math.round(a.orbit * 100) / 100 };
    })
    .filter((a): a is NonNullable<typeof a> => a !== null);

  // Nodes (prefer mean, fallback true)
  const meanNorth = pickPoint(sub, 'mean_north_lunar_node');
  const meanSouth = pickPoint(sub, 'mean_south_lunar_node');
  const trueNorth = pickPoint(sub, 'true_north_lunar_node');
  const trueSouth = pickPoint(sub, 'true_south_lunar_node');
  const north = meanNorth ?? trueNorth;
  const south = meanSouth ?? trueSouth;
  const nodes = {
    north: north
      ? {
          sign: SIGN_ABBR_TO_FULL[north.sign] ?? north.sign.toLowerCase(),
          house: north.house ? (HOUSE_STR_TO_NUM[north.house] ?? 0) : 0,
          degree: Math.round(north.position * 10) / 10,
        }
      : { sign: 'aries', house: 0, degree: 0 },
    south: south
      ? {
          sign: SIGN_ABBR_TO_FULL[south.sign] ?? south.sign.toLowerCase(),
          house: south.house ? (HOUSE_STR_TO_NUM[south.house] ?? 0) : 0,
          degree: Math.round(south.position * 10) / 10,
        }
      : { sign: 'libra', house: 0, degree: 0 },
  };

  // Chiron + Lilith
  const chironRaw = pickPoint(sub, 'chiron');
  const chiron = chironRaw
    ? {
        sign: SIGN_ABBR_TO_FULL[chironRaw.sign] ?? chironRaw.sign.toLowerCase(),
        house: chironRaw.house ? (HOUSE_STR_TO_NUM[chironRaw.house] ?? 0) : 0,
        degree: Math.round(chironRaw.position * 10) / 10,
        isRetrograde: chironRaw.retrograde ?? false,
      }
    : undefined;

  const lilithRaw = pickPoint(sub, 'mean_lilith') ?? pickPoint(sub, 'true_lilith');
  const lilith = lilithRaw
    ? {
        sign: SIGN_ABBR_TO_FULL[lilithRaw.sign] ?? lilithRaw.sign.toLowerCase(),
        house: lilithRaw.house ? (HOUSE_STR_TO_NUM[lilithRaw.house] ?? 0) : 0,
        degree: Math.round(lilithRaw.position * 10) / 10,
      }
    : undefined;

  return {
    planets,
    houses,
    aspects,
    nodes,
    chiron,
    lilith,
    svg: '',
    api_version: 'v5',
  };
}

// ─── Mock fallback ──────────────────────────────────────────────────────────

const SIGN_CYCLE = [
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
] as const;

/**
 * Deterministic placeholder chart so onboarding works without an Astrologer
 * subscription. Distributes planets across signs by birthDate hash —
 * different users get different mocks, same user gets same mock.
 */
function mockBirthChart(input: BirthChartInput): BirthChartOutput {
  const seed = parseInt(input.date.replaceAll('-', ''), 10) % 12;
  const planetNames = [
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
  ];
  return {
    planets: planetNames.map((name, idx) => ({
      name,
      sign: SIGN_CYCLE[(seed + idx) % 12],
      house: ((seed + idx) % 12) + 1,
      degree: (idx * 17 + seed * 3) % 30,
      isRetrograde: idx % 5 === 0,
    })),
    houses: Array.from({ length: 12 }, (_, i) => ({
      number: i + 1,
      sign: SIGN_CYCLE[(seed + i) % 12],
      cuspDegree: i * 30,
    })),
    aspects: [
      { from: 'sun', to: 'moon', aspect: 'trine', orb: 2.4 },
      { from: 'sun', to: 'mars', aspect: 'square', orb: 1.8 },
      { from: 'venus', to: 'jupiter', aspect: 'sextile', orb: 0.9 },
    ],
    nodes: {
      north: { sign: SIGN_CYCLE[seed], house: 1, degree: 4 },
      south: { sign: SIGN_CYCLE[(seed + 6) % 12], house: 7, degree: 4 },
    },
    chiron: {
      sign: SIGN_CYCLE[(seed + 3) % 12],
      house: 4,
      degree: 11,
      isRetrograde: false,
    },
    lilith: { sign: SIGN_CYCLE[(seed + 7) % 12], house: 8, degree: 20 },
    svg: '',
    api_version: 'mock-1.0',
  };
}

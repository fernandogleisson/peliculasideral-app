/**
 * Low-level Astrologer (RapidAPI) client.
 *
 * Pure HTTP. Cache logic lives in `src/features/mapa-natal/astrologer.ts`.
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

export async function fetchBirthChart(input: BirthChartInput): Promise<BirthChartOutput> {
  if (!env.RAPIDAPI_KEY) {
    // Closed beta: mock chart when Astrologer key absent. Lets onboarding flow
    // complete end-to-end before RapidAPI subscription is provisioned (PL-150).
    return mockBirthChart(input);
  }

  const [year, month, day] = input.date.split('-').map((s) => parseInt(s, 10));
  const [hour, minute] = input.time.split(':').map((s) => parseInt(s, 10));

  const res = await fetch(`https://${env.ASTROLOGER_HOST}/api/v5/chart-data/birth-chart`, {
    method: 'POST',
    headers: {
      'X-RapidAPI-Key': env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': env.ASTROLOGER_HOST,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      year,
      month,
      day,
      hour,
      minute,
      latitude: input.lat,
      longitude: input.lng,
      timezone: input.tz,
      house_system: input.houseSystem ?? 'placidus',
    }),
  });

  if (!res.ok) {
    if (res.status === 429) throw new Error('ASTROLOGER_RATE_LIMITED');
    throw new Error(`astrologer ${res.status}`);
  }
  return res.json() as Promise<BirthChartOutput>;
}

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
 * Replace by real fetch once RAPIDAPI_KEY is provisioned (PL-150).
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

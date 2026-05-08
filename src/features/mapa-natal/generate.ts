/**
 * Generate (or refresh) the mapa natal of a profile and persist into `mapas`.
 *
 * Idempotent: chartHash uniquely identifies a (date,time,lat,lng,tz,system)
 * combination. If a mapa with the same hash already exists for the profile,
 * we just bump updated_at and return.
 */
import { eq, and } from 'drizzle-orm';
import { db } from '@/db/client';
import { profiles, mapas } from '@/db/schema';
import { getBirthChart } from './astrologer';

export type GenerateMapaResult =
  | { ok: true; mapaId: string; source: 'cache' | 'api' | 'noop' }
  | { ok: false; error: string };

export async function generateMapaForProfile(profileId: string): Promise<GenerateMapaResult> {
  const [profile] = await db.select().from(profiles).where(eq(profiles.id, profileId)).limit(1);

  if (!profile) {
    return { ok: false, error: 'Perfil não encontrado.' };
  }
  if (!profile.birthTimeKnown || !profile.birthTime) {
    return { ok: false, error: 'Hora de nascimento necessária para o mapa natal.' };
  }

  const input = {
    date: profile.birthDate,
    time: profile.birthTime,
    lat: Number(profile.birthLat),
    lng: Number(profile.birthLng),
    tz: profile.birthTz,
    houseSystem: 'placidus' as const,
  };

  let chart;
  try {
    chart = await getBirthChart(input);
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Falha ao gerar mapa.',
    };
  }

  const [existing] = await db
    .select({ id: mapas.id })
    .from(mapas)
    .where(and(eq(mapas.profileId, profileId), eq(mapas.chartHash, chart.hash)))
    .limit(1);

  if (existing) {
    await db.update(mapas).set({ updatedAt: new Date() }).where(eq(mapas.id, existing.id));
    return { ok: true, mapaId: existing.id, source: 'noop' };
  }

  const [inserted] = await db
    .insert(mapas)
    .values({
      profileId,
      chartHash: chart.hash,
      chartData: chart.data,
      chartVersion: chart.data.api_version,
      houseSystem: 'placidus',
    })
    .returning({ id: mapas.id });

  return { ok: true, mapaId: inserted.id, source: chart.source };
}

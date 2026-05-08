/**
 * Server-side queries pra tela /eu.
 *
 * Tudo via Drizzle (RLS-bypass via service-role) ou via supabase server client
 * (RLS-respect via auth.uid()).
 */
import { eq, desc, and, inArray } from 'drizzle-orm';
import { db } from '@/db/client';
import {
  profiles,
  mapas,
  interpretations,
  type Profile,
  type Mapa,
  type Interpretation,
} from '@/db/schema';
import type { BirthChartOutput } from '@/lib/astrologer';

export type ChartSnapshot = BirthChartOutput;

export interface EuViewData {
  profile: Profile;
  mapa: Mapa;
  chart: ChartSnapshot;
}

/**
 * Carrega profile + mapa mais recente do user. Retorna null se algum dos dois
 * estiver ausente — caller deve redirecionar pra /onboarding.
 */
export async function loadEuView(userId: string): Promise<EuViewData | null> {
  const [profile] = await db.select().from(profiles).where(eq(profiles.id, userId)).limit(1);
  if (!profile) return null;

  const [mapa] = await db
    .select()
    .from(mapas)
    .where(eq(mapas.profileId, userId))
    .orderBy(desc(mapas.updatedAt))
    .limit(1);
  if (!mapa) return null;

  return {
    profile,
    mapa,
    chart: mapa.chartData as ChartSnapshot,
  };
}

/**
 * Carrega interpretations published cujas keys estão no array.
 * Retorna apenas {type, key, short_text} (long_text vai via RPC com gate de tier).
 */
export async function loadShortInterpretations(
  keys: Array<{ type: string; key: string }>,
): Promise<Pick<Interpretation, 'type' | 'key' | 'shortText' | 'id'>[]> {
  if (keys.length === 0) return [];

  // Trick to query (type,key) tuples in one round-trip: build OR conditions
  const types = [...new Set(keys.map((k) => k.type))];
  const allKeys = [...new Set(keys.map((k) => k.key))];

  const rows = await db
    .select({
      id: interpretations.id,
      type: interpretations.type,
      key: interpretations.key,
      shortText: interpretations.shortText,
    })
    .from(interpretations)
    .where(
      and(
        eq(interpretations.status, 'published'),
        inArray(interpretations.type, types),
        inArray(interpretations.key, allKeys),
      ),
    );

  // Filter on the client side to keep only exact (type,key) pairs requested
  const want = new Set(keys.map((k) => `${k.type}::${k.key}`));
  return rows.filter((r) => want.has(`${r.type}::${r.key}`));
}

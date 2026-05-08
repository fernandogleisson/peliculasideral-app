/**
 * Astrologer wrapper with cross-user cache.
 *
 * Looks up `astrologer_chart_cache` by SHA256 hash of normalized birth input.
 * Hits avoid a RapidAPI call (cost + rate limit).
 */
import { eq } from 'drizzle-orm';
import { db } from '@/db/client';
import { astrologerChartCache } from '@/db/schema';
import {
  chartHash,
  fetchBirthChart,
  type BirthChartInput,
  type BirthChartOutput,
} from '@/lib/astrologer';

export type ChartFetchResult = {
  data: BirthChartOutput;
  source: 'cache' | 'api';
  hash: string;
};

export async function getBirthChart(input: BirthChartInput): Promise<ChartFetchResult> {
  const hash = chartHash(input);

  // 1. cache lookup
  const [cached] = await db
    .select()
    .from(astrologerChartCache)
    .where(eq(astrologerChartCache.chartHash, hash))
    .limit(1);

  if (cached) {
    // bump usage counters (best-effort, fire-and-forget if you prefer)
    await db
      .update(astrologerChartCache)
      .set({ lastUsedAt: new Date(), hitCount: cached.hitCount + 1 })
      .where(eq(astrologerChartCache.chartHash, hash));
    return { data: cached.chartData as BirthChartOutput, source: 'cache', hash };
  }

  // 2. fetch + populate cache
  const data = await fetchBirthChart(input);
  await db.insert(astrologerChartCache).values({
    chartHash: hash,
    chartData: data,
    chartVersion: data.api_version,
  });
  return { data, source: 'api', hash };
}

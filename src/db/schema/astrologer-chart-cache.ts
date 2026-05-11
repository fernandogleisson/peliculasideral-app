import { pgTable, text, jsonb, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const astrologerChartCache = pgTable(
  'astrologer_chart_cache',
  {
    chartHash: text('chart_hash').primaryKey(),
    chartData: jsonb('chart_data').notNull(),
    chartVersion: text('chart_version').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    lastUsedAt: timestamp('last_used_at', { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    hitCount: integer('hit_count').default(1).notNull(),
  },
  (t) => ({
    lastUsedIdx: index('astrologer_cache_last_used_idx').on(t.lastUsedAt),
  }),
);

export type AstrologerChartCache = typeof astrologerChartCache.$inferSelect;
export type NewAstrologerChartCache = typeof astrologerChartCache.$inferInsert;

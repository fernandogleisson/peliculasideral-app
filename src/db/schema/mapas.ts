import { pgTable, uuid, text, jsonb, timestamp, index, check, integer } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { profiles } from './profiles';

export const mapas = pgTable(
  'mapas',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`)
      .notNull(),
    profileId: uuid('profile_id')
      .references(() => profiles.id, { onDelete: 'cascade' })
      .notNull(),
    chartHash: text('chart_hash').notNull(),
    chartData: jsonb('chart_data').notNull(),
    chartVersion: text('chart_version').notNull(),
    houseSystem: text('house_system').default('placidus').notNull(),
    revision: integer('revision').default(1).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (t) => ({
    profileIdx: index('mapas_profile_idx').on(t.profileId),
    chartHashIdx: index('mapas_chart_hash_idx').on(t.chartHash),
    houseSystemCheck: check(
      'mapas_house_system_check',
      sql`${t.houseSystem} IN ('placidus','koch','whole_sign')`,
    ),
  }),
);

export type Mapa = typeof mapas.$inferSelect;
export type NewMapa = typeof mapas.$inferInsert;

import { pgTable, uuid, text, timestamp, integer, index, unique, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const interpretations = pgTable(
  'interpretations',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`)
      .notNull(),
    type: text('type').notNull(),
    key: text('key').notNull(),
    shortText: text('short_text').notNull(),
    longText: text('long_text').notNull(),
    status: text('status').default('draft').notNull(),
    authorId: uuid('author_id'),
    revision: integer('revision').default(1).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (t) => ({
    typeKeyUnique: unique('interpretations_type_key_unique').on(t.type, t.key),
    typeIdx: index('interpretations_type_idx').on(t.type),
    statusIdx: index('interpretations_status_idx').on(t.status),
    publishedIdx: index('interpretations_published_idx')
      .on(t.type, t.key)
      .where(sql`${t.status} = 'published'`),
    typeCheck: check(
      'interpretations_type_check',
      sql`${t.type} IN ('planet_in_sign_house','planet_aspect_planet','house_in_sign','ascendant_sign')`,
    ),
    statusCheck: check(
      'interpretations_status_check',
      sql`${t.status} IN ('draft','review','published','archived')`,
    ),
  }),
);

export type Interpretation = typeof interpretations.$inferSelect;
export type NewInterpretation = typeof interpretations.$inferInsert;

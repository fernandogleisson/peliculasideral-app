import { pgTable, uuid, text, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { interpretations } from './interpretations';

export const interpretationRevisions = pgTable(
  'interpretation_revisions',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`)
      .notNull(),
    interpretationId: uuid('interpretation_id')
      .references(() => interpretations.id, { onDelete: 'cascade' })
      .notNull(),
    revision: integer('revision').notNull(),
    shortText: text('short_text').notNull(),
    longText: text('long_text').notNull(),
    statusAtSave: text('status_at_save').notNull(),
    authorId: uuid('author_id'),
    note: text('note'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (t) => ({
    interpIdx: index('interp_rev_interp_idx').on(t.interpretationId),
    interpRevIdx: index('interp_rev_interp_revision_idx').on(t.interpretationId, t.revision),
  }),
);

export type InterpretationRevision = typeof interpretationRevisions.$inferSelect;
export type NewInterpretationRevision = typeof interpretationRevisions.$inferInsert;

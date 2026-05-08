import { pgTable, uuid, text, timestamp, jsonb, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { interpretations } from './interpretations';

export const interpretationReviewAssists = pgTable(
  'interpretation_review_assists',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`)
      .notNull(),
    interpretationId: uuid('interpretation_id')
      .references(() => interpretations.id, { onDelete: 'cascade' })
      .notNull(),
    agent: text('agent').notNull(),
    promptUsed: text('prompt_used').notNull(),
    aiOutput: text('ai_output').notNull(),
    aiMetadata: jsonb('ai_metadata'),
    requestedBy: uuid('requested_by'),
    accepted: text('accepted').default('pending').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (t) => ({
    interpIdx: index('interp_assists_interp_idx').on(t.interpretationId),
    agentIdx: index('interp_assists_agent_idx').on(t.agent),
  }),
);

export type InterpretationReviewAssist = typeof interpretationReviewAssists.$inferSelect;
export type NewInterpretationReviewAssist = typeof interpretationReviewAssists.$inferInsert;

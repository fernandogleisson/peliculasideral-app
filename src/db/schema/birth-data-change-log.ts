import { pgTable, uuid, jsonb, timestamp, index, inet } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { profiles } from './profiles';

export const birthDataChangeLog = pgTable(
  'birth_data_change_log',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    profileId: uuid('profile_id')
      .references(() => profiles.id, { onDelete: 'cascade' })
      .notNull(),
    oldData: jsonb('old_data').notNull(),
    newData: jsonb('new_data').notNull(),
    changedAt: timestamp('changed_at', { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    ipAddress: inet('ip_address'),
  },
  (t) => ({
    profileChangedAtIdx: index('birth_change_profile_at_idx').on(t.profileId, t.changedAt),
  }),
);

export type BirthDataChange = typeof birthDataChangeLog.$inferSelect;
export type NewBirthDataChange = typeof birthDataChangeLog.$inferInsert;

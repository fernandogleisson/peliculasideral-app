import { pgTable, uuid, text, timestamp, index, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { profiles } from './profiles';

export const substackSubscribers = pgTable(
  'substack_subscribers',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    substackId: text('substack_id').notNull().unique(),
    email: text('email').notNull(),
    displayName: text('display_name'),
    plan: text('plan'),
    subscribedAt: timestamp('subscribed_at', { withTimezone: true }),
    status: text('status'),
    migrationToken: text('migration_token').unique(),
    migrationEmailSentAt: timestamp('migration_email_sent_at', { withTimezone: true }),
    profileId: uuid('profile_id').references(() => profiles.id, { onDelete: 'set null' }),
    migratedAt: timestamp('migrated_at', { withTimezone: true }),
  },
  (t) => ({
    statusCheck: check(
      'substack_status_check',
      sql`${t.status} IS NULL OR ${t.status} IN ('active','expired','cancelled')`,
    ),
    emailIdx: index('substack_email_idx').on(t.email),
    tokenIdx: index('substack_token_idx')
      .on(t.migrationToken)
      .where(sql`${t.migrationToken} IS NOT NULL`),
    profileIdx: index('substack_profile_idx')
      .on(t.profileId)
      .where(sql`${t.profileId} IS NOT NULL`),
  }),
);

export type SubstackSubscriber = typeof substackSubscribers.$inferSelect;
export type NewSubstackSubscriber = typeof substackSubscribers.$inferInsert;

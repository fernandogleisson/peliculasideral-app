import { pgTable, uuid, text, boolean, timestamp, inet, index, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { profiles } from './profiles';

export const lgpdConsentLog = pgTable(
  'lgpd_consent_log',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    profileId: uuid('profile_id')
      .references(() => profiles.id, { onDelete: 'cascade' })
      .notNull(),
    consentType: text('consent_type').notNull(),
    granted: boolean('granted').notNull(),
    version: text('version').notNull(),
    ipAddress: inet('ip_address'),
    userAgent: text('user_agent'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (t) => ({
    typeCheck: check(
      'lgpd_consent_type_check',
      sql`${t.consentType} IN ('terms','privacy','marketing_email','marketing_whatsapp','cookies_analytics')`,
    ),
    profileTypeIdx: index('lgpd_consent_profile_type_idx').on(t.profileId, t.consentType),
  }),
);

export type LgpdConsent = typeof lgpdConsentLog.$inferSelect;
export type NewLgpdConsent = typeof lgpdConsentLog.$inferInsert;

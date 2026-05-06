import {
  pgTable,
  uuid,
  text,
  date,
  time,
  boolean,
  numeric,
  timestamp,
  index,
  check,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const profiles = pgTable(
  'profiles',
  {
    id: uuid('id').primaryKey().notNull(),
    username: text('username').notNull().unique(),
    displayName: text('display_name'),
    avatarUrl: text('avatar_url'),
    whatsapp: text('whatsapp'),
    instagram: text('instagram'),
    birthDate: date('birth_date').notNull(),
    birthTime: time('birth_time'),
    birthTimeKnown: boolean('birth_time_known').default(true).notNull(),
    birthCity: text('birth_city').notNull(),
    birthState: text('birth_state'),
    birthCountry: text('birth_country').notNull(),
    birthLat: numeric('birth_lat', { precision: 8, scale: 5 }).notNull(),
    birthLng: numeric('birth_lng', { precision: 8, scale: 5 }).notNull(),
    birthTz: text('birth_tz').notNull(),
    locale: text('locale').default('pt-BR').notNull(),
    currencyPref: text('currency_pref').default('BRL').notNull(),
    tier: text('tier').default('free').notNull(),
    tierExpiresAt: timestamp('tier_expires_at', { withTimezone: true }),
    substackMigrated: boolean('substack_migrated').default(false).notNull(),
    substackSubscriberId: text('substack_subscriber_id'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (t) => ({
    localeCheck: check('profiles_locale_check', sql`${t.locale} IN ('pt-BR','en-US','es-419')`),
    currencyCheck: check('profiles_currency_check', sql`${t.currencyPref} IN ('BRL','USD','EUR')`),
    tierCheck: check('profiles_tier_check', sql`${t.tier} IN ('free','premium')`),
    usernameIdx: index('profiles_username_idx').on(t.username),
    tierPremiumIdx: index('profiles_tier_premium_idx')
      .on(t.tier)
      .where(sql`${t.tier} = 'premium'`),
    substackIdx: index('profiles_substack_idx')
      .on(t.substackMigrated)
      .where(sql`${t.substackMigrated} = true`),
  }),
);

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;

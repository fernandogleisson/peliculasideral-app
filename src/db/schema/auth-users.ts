import { pgSchema, uuid, text, timestamp } from 'drizzle-orm/pg-core';

// Mirror parcial de auth.users (somente os campos que lemos via service-role).
// Drizzle não pode criar tabelas no schema `auth` (gerenciado pelo Supabase Auth),
// só lê. Mantemos este file fora dos generators — não é regenerado por drizzle-kit.
export const authSchema = pgSchema('auth');

export const authUsers = authSchema.table('users', {
  id: uuid('id').primaryKey(),
  email: text('email'),
  emailConfirmedAt: timestamp('email_confirmed_at', { withTimezone: true }),
});

export type AuthUser = typeof authUsers.$inferSelect;

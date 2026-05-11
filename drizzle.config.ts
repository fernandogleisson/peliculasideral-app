import { defineConfig } from 'drizzle-kit';

const url = process.env.DATABASE_URL_DIRECT;
if (!url) {
  throw new Error('DATABASE_URL_DIRECT environment variable is required for migrations');
}

export default defineConfig({
  schema: './src/db/schema/*.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: { url },
  // Exclude the `auth` schema — it is managed by Supabase Auth, not by us.
  // auth-users.ts uses pgSchema('auth') only for read-only type mirroring.
  schemaFilter: ['public'],
  verbose: true,
  strict: true,
});

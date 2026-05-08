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
  verbose: true,
  strict: true,
});

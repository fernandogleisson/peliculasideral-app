/**
 * Centralized env validation with Zod.
 *
 * - Single source of truth for required/optional env vars.
 * - Parsed at first import. Throws if required vars are missing or malformed.
 * - All `*_KEY` and other secrets are optional in Phase 0 so the app can boot
 *   for code-only/dev iterations without every external service configured.
 */
import { z } from 'zod';

// Treat empty strings (common in .env files) as missing values so optional
// fields don't trip min-length / format validators when left blank.
const NORMALIZED_ENV: Record<string, string | undefined> = Object.fromEntries(
  Object.entries(process.env).map(([k, v]) => [k, v === '' ? undefined : v]),
);

const envSchema = z.object({
  // ─── Supabase ────────────────────────────────────────────────────────────
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20).optional(), // server-only

  // ─── Postgres (drizzle) ──────────────────────────────────────────────────
  DATABASE_URL: z.string().url().optional(),
  DATABASE_URL_DIRECT: z.string().url().optional(),

  // ─── Astrologer (RapidAPI) ───────────────────────────────────────────────
  RAPIDAPI_KEY: z.string().min(20).optional(),
  ASTROLOGER_HOST: z.string().default('astrologer.p.rapidapi.com'),

  // ─── Geoapify (city autocomplete) ────────────────────────────────────────
  GEOAPIFY_API_KEY: z.string().min(20).optional(),

  // ─── Outline (KB) ────────────────────────────────────────────────────────
  OUTLINE_API_KEY: z.string().startsWith('ol_api_').optional(),
  OUTLINE_WEBHOOK_SECRET: z.string().optional(),
  OUTLINE_APP_CONTENT_COLLECTION_ID: z.string().uuid().optional(),

  // ─── Paperclip (interpretation generator) ────────────────────────────────
  PAPERCLIP_API_BASE: z.string().url().default('https://paperclip.agenciajubileu.com.br'),
  PAPERCLIP_API_KEY: z.string().startsWith('pck_').optional(),
  PAPERCLIP_COMPANY_ID: z.string().uuid().optional(),
  PAPERCLIP_CALLBACK_SECRET: z.string().optional(),
  INTERPRETATION_GENERATOR: z.enum(['paperclip', 'anthropic']).default('paperclip'),

  // ─── Anthropic (fallback) ────────────────────────────────────────────────
  ANTHROPIC_API_KEY: z.string().startsWith('sk-ant-').optional(),

  // ─── Resend (transactional email) ────────────────────────────────────────
  RESEND_API_KEY: z.string().startsWith('re_').optional(),
  RESEND_FROM_EMAIL: z.string().email().default('suporte@peliculasideral.com.br'),

  // ─── Cloudflare (DNS / DKIM via MCP) ─────────────────────────────────────
  CLOUDFLARE_API_TOKEN: z.string().optional(),
  CLOUDFLARE_ZONE_ID: z.string().optional(),

  // ─── Meta WhatsApp Business ──────────────────────────────────────────────
  META_WHATSAPP_PHONE_NUMBER_ID: z.string().optional(),
  META_WHATSAPP_ACCESS_TOKEN: z.string().optional(),
  META_WHATSAPP_VERIFY_TOKEN: z.string().optional(),

  // ─── Chatwoot (suporte) ──────────────────────────────────────────────────
  CHATWOOT_API_BASE: z.string().url().optional(),
  CHATWOOT_API_TOKEN: z.string().optional(),
  CHATWOOT_INBOX_ID: z.string().optional(),

  // ─── Cookies / Sentry ────────────────────────────────────────────────────
  COOKIE_ENCRYPTION_KEY: z.string().length(64).optional(), // 32 bytes hex
  SENTRY_DSN: z.string().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),

  // ─── Public site config ──────────────────────────────────────────────────
  NEXT_PUBLIC_SITE_URL: z.string().url().default('https://peliculasideral.com.br'),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.string().default('pt-BR'),
  NEXT_PUBLIC_SUPPORTED_LOCALES: z.string().default('pt-BR,en-US,es-419'),
});

export const env = envSchema.parse(NORMALIZED_ENV);
export type Env = z.infer<typeof envSchema>;

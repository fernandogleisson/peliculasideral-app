# CLAUDE.md — Pelicula Sideral

Guidance for AI assistants (Claude Code, Cursor, etc.) working in this repo.
Read this file in full before touching code. For design work, also read
[`DESIGN.md`](./DESIGN.md).

---

## 0. Critical: Next.js 16 has breaking changes

> This project pins **`next@16.2.4`** and **`react@19.2.4`**. APIs, file
> conventions, and defaults differ from anything before Next 15. Your training
> data is probably wrong about Next/React on this codebase.

Concrete differences already in use here — verify against
`node_modules/next/dist/docs/` before assuming behavior:

- **Middleware is named `proxy.ts`**, not `middleware.ts`. The entrypoint lives
  at `src/proxy.ts` and exports a default `proxy` function plus a `config`.
- **Route handler / page `params` are `Promise<...>`** and must be awaited
  (see `src/app/[locale]/layout.tsx`).
- React 19 + RSC are the default. Use Server Components unless you need
  `'use client'`. Server Actions are used for mutations (e.g.
  `src/features/onboarding/actions.ts`).

When unsure about a Next or React API, **stop and read the local docs** in
`node_modules/next/dist/docs/` rather than guessing from memory.

---

## 1. Tech stack snapshot

| Concern        | Choice                                                          |
| -------------- | --------------------------------------------------------------- |
| Framework      | Next.js 16 (App Router, RSC, Server Actions)                    |
| UI             | React 19, Tailwind v4 (`@tailwindcss/postcss`), shadcn (`base-nova` style), Radix/Base UI primitives, Lucide icons, `tw-animate-css`, `vaul` |
| i18n           | `next-intl` — locales `pt-BR` (default), `en-US`, `es-419`      |
| Auth           | Supabase Auth via `@supabase/ssr` (cookie session refreshed in `proxy.ts`) |
| DB             | Postgres (Supabase) + Drizzle ORM (`postgres-js` driver)        |
| Validation     | Zod v4                                                          |
| Email          | Resend                                                          |
| Tests          | Vitest + Testing Library (jsdom); Playwright for e2e            |
| Tooling        | pnpm, ESLint 9 (flat config), Prettier, Husky + lint-staged, commitlint (conventional commits) |
| Deploy         | Vercel (`vercel.ts` config)                                     |

Package manager is **pnpm**. Do not commit `package-lock.json` or `yarn.lock`.

---

## 2. Repository layout

```
src/
  app/
    layout.tsx                  # root layout (fonts, metadata, <html>)
    globals.css                 # Tailwind v4 entry + design tokens import
    design-tokens.css           # generated — do NOT hand-edit (see §6)
    robots.ts, sitemap.ts
    [locale]/                   # localized routes (pt-BR | en-US | es-419)
      layout.tsx                # NextIntlClientProvider + ConsentBanner
      page.tsx                  # landing
      entrar/                   # /entrar (sign-in)
      onboarding/               # first-time setup
      eu/                       # authenticated home
      configuracoes/            # account settings
      pelicula-do-dia/, pelicula-da-semana/, cursos/, showcase/
      (public)/                 # cookies, privacidade, termos
    admin/                      # ops-only routes (e.g. migracao-substack)
    api/                        # route handlers (auth callback, webhooks, lgpd, health)
  proxy.ts                      # Next 16 "middleware" — Supabase session + i18n routing
  components/                   # presentational, organized by domain
    ui/                         # generic primitives (Button, Card, Modal, Toast, ...)
    astro/, mapa/               # astrology glyphs + birth-chart visualization
    identity/, layout/, content/, feedback/, onboarding/, paywall/, pwa/, lgpd/, auth/
  features/                     # feature modules (server actions, queries, business logic)
    auth/                       # sign-in, email-collision check, account actions
    onboarding/                 # OnboardingClient + actions + cities-br
    mapa-natal/                 # Astrologer API integration, queries, transforms, generate
    interpretacoes/             # generation + review workflow
    i18n/messages/{pt-BR,en-US,es-419}.json
    seo/, pwa/, lgpd/, substack-migration/
  db/
    client.ts                   # Drizzle client bound to DATABASE_URL (pooled)
    schema/*.ts                 # table definitions (re-exported via index.ts)
    schema/auth-users.ts        # READ-ONLY mirror of Supabase auth schema
    migrations/                 # drizzle-kit output (do not edit by hand)
    policies/                   # raw SQL for RLS policies
  lib/
    env.ts                      # Zod-validated process.env (single source of truth)
    supabase/{client,server,middleware,admin}.ts
    {asaas,astrologer,chatwoot,cloudflare,geoapify,mux,outline,paperclip,resend,whatsapp-meta}.ts
    utils.ts, webhook-hmac.ts, outline-webhook.ts
  i18n/request.ts               # next-intl request config
  tests/{unit,integration,e2e,rls,i18n}/
docs/                           # supabase auth setup, agent prompts, ui task template
infra/                          # ops artifacts (chatwoot, etc.)
kb-brand-voice/                 # brand voice knowledge base for AI generation
scripts/                        # design-export-css.mjs, substack-import.ts, supabase-auth-setup.sh
```

---

## 3. Common commands

```bash
pnpm dev                # next dev (port 3000)
pnpm build              # next build
pnpm start              # next start (prod)

pnpm lint               # eslint .
pnpm format             # prettier --write .
pnpm typecheck          # tsc --noEmit

pnpm test               # vitest run (unit + integration)
pnpm test:watch         # vitest
pnpm test:ui            # vitest --ui
pnpm test:e2e           # playwright test (boots `pnpm dev` automatically)

pnpm db:generate        # drizzle-kit generate (requires DATABASE_URL_DIRECT)
pnpm db:push            # drizzle-kit push   (dev only — prefer generate+migrate)
pnpm db:studio          # drizzle-kit studio

pnpm design:lint        # validate DESIGN.md (broken refs, contrast, primary)
pnpm design:export      # regenerate src/app/design-tokens.css
pnpm design:diff        # compare DESIGN.md vs DESIGN.prev.md
```

Always use **pnpm** (not npm/yarn). Husky's `pre-commit` runs `lint-staged`;
`commit-msg` enforces Conventional Commits via commitlint.

---

## 4. Environment variables

`src/lib/env.ts` is the single source of truth. It uses Zod, treats empty
strings as missing, and most secrets are optional so the app can boot for
local UI work without every external service configured.

- Copy `.env.example` → `.env.local` and fill what you need.
- Add new env vars in **both** `.env.example` and `src/lib/env.ts`. Read them
  via `env.X`, not `process.env.X`.
- `DATABASE_URL` is the **pooled** (transaction-mode) connection used by the
  runtime Drizzle client. `DATABASE_URL_DIRECT` is for `drizzle-kit` migrations
  only.

---

## 5. Database & auth

- Drizzle config (`drizzle.config.ts`) only manages the `public` schema.
  `src/db/schema/auth-users.ts` uses `pgSchema('auth')` for read-only type
  mirroring — **never** generate migrations against the Supabase `auth` schema.
- RLS policies live as raw SQL in `src/db/policies/`. Apply them alongside the
  Drizzle migrations they correspond to.
- Auth flow:
  - `src/proxy.ts` refreshes the Supabase session on every non-API request and
    merges its cookies onto the next-intl response. Do not bypass it.
  - In RSC / Server Actions / Route Handlers use
    `createSupabaseServerClient()` from `src/lib/supabase/server.ts`.
  - In Client Components use `src/lib/supabase/client.ts`.
  - Service-role access is in `src/lib/supabase/admin.ts` — **server-only**,
    never import from a Client Component.

See `docs/supabase-auth-setup.md` for the phased setup (closed beta vs.
production SMTP).

---

## 6. Design system

`DESIGN.md` at the repo root is the **source of truth**. Subagents touching
UI/CSS must follow the protocol in [`README.md`](./README.md#para-agentes-ia):

1. Read `DESIGN.md` before implementing.
2. Use **only declared tokens** — no `text-red-500`, no `white/40`, no
   `rounded-xl` on buttons, etc.
3. Components defined in §8 of `DESIGN.md` are canonical — don't invent new
   ones without updating the spec.
4. Astrological glyphs: use `<PlanetGlyph>`, `<AspectGlyph>`,
   `<ElementBadge>`. Never inline SVG.
5. Icons: `lucide-react` only. Never inline SVG.
6. Prose: 65ch reading width.
7. Mobile-first always.

If you need something not documented, **pause and propose in the PR** rather
than inventing tokens.

`src/app/design-tokens.css` is **generated** by `pnpm design:export` from
`DESIGN.md` — do not hand-edit. Tailwind v4 picks tokens up via the
`@theme inline { ... }` block in `globals.css`.

shadcn is configured (`components.json`) with `style: base-nova`, `rsc: true`,
icon library `lucide`, base color `neutral`. Aliases: `@/components`,
`@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`.

---

## 7. Internationalization

- Locales: `pt-BR` (default), `en-US`, `es-419`. Routing prefix is
  `as-needed`, so pt-BR URLs are unprefixed.
- Messages live in `src/features/i18n/messages/{locale}.json`. Add new keys to
  **all three** locale files in the same change.
- Request config: `src/i18n/request.ts`. Locale layout:
  `src/app/[locale]/layout.tsx` calls `setRequestLocale(locale)` — keep this
  pattern for any new locale-scoped layout/page.
- All user-facing strings must go through `next-intl`. Pure-server logs and
  error messages may stay in code.

---

## 8. Testing conventions

- **Unit / component tests** are colocated with their target file:
  `Foo.tsx` ↔ `Foo.test.tsx`. Run with `pnpm test`.
- `src/tests/` holds cross-cutting suites: `unit/`, `integration/`, `rls/`,
  `i18n/`, and `e2e/`. Vitest setup: `src/tests/setup.ts`.
- Vitest config (`vitest.config.ts`) uses `jsdom`, globals, alias `@/ → src/`,
  and excludes `src/tests/e2e/**` (those run via Playwright).
- E2E specs live in `src/tests/e2e/*.spec.ts`. Playwright boots `pnpm dev`
  itself (`reuseExistingServer: !CI`). Override the base URL with `BASE_URL`.
- Webhook routes have route-level tests next to the handler (e.g.
  `src/app/api/webhooks/asaas/route.test.ts`) — keep that pattern when adding
  new webhooks. Use `src/lib/webhook-hmac.ts` for signature verification.

---

## 9. Code style

- TypeScript strict mode is on (`tsconfig.json`). Path alias `@/* → src/*`.
- Prettier: `semi: true`, `singleQuote: true`, `trailingComma: all`,
  `printWidth: 100`, `tabWidth: 2`, `arrowParens: always`.
- ESLint extends `next/core-web-vitals` + `next/typescript` + prettier.
  - Unused vars allowed only when prefixed `_`.
  - `no-console`: `warn`/`error` only (scripts/ exempt).
- Conventional Commits enforced (`feat:`, `fix:`, `chore:`, `docs:`, ...).
  Subject case and body line length are unconstrained.
- Don't add comments that just restate the code. Keep WHY-comments only when
  the constraint isn't obvious from names.

---

## 10. Workflow expectations for AI agents

- This session must develop on branch
  **`claude/add-claude-documentation-EdvE9`**. Create it if absent; never push
  elsewhere without explicit permission.
- Use `pnpm` for every command. Don't switch package managers.
- Before adding a dependency, check `package.json` — the project already has
  Radix, Base UI, shadcn primitives, Lucide, Zod, Drizzle, etc. Prefer reuse.
- When changing schemas, also generate the migration (`pnpm db:generate`) and
  commit it; do not edit files under `src/db/migrations/` by hand.
- When changing UI tokens, edit `DESIGN.md` and run `pnpm design:export` —
  commit both `DESIGN.md` and the regenerated `src/app/design-tokens.css`.
- When adding env vars, update `.env.example` **and** `src/lib/env.ts`.
- Never commit `.env*` files (only `.env.example`).
- Do **not** create a PR unless the user explicitly asks for one.

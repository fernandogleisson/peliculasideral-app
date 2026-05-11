# Supabase Auth Setup — Pelicula Sideral

## Setup via script (recomendado)

Script idempotente em duas fases. Pré-requisito: `SUPABASE_ACCESS_TOKEN` no
`.env.local` (gere em https://supabase.com/dashboard/account/tokens).

```bash
./scripts/supabase-auth-setup.sh phase1   # closed beta: gate OFF + redirect URLs
./scripts/supabase-auth-setup.sh phase2   # Fase 2: SMTP Resend + gate ON
```

Campos atualizados (validados contra a OpenAPI spec oficial em
`https://api.supabase.com/api/v1-json`):

| Fase | Campo                                                            | Valor                                                                       |
| ---- | ---------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 1    | `mailer_autoconfirm`                                             | `true` (gate OFF)                                                           |
| 1    | `external_email_enabled`                                         | `true`                                                                      |
| 1    | `uri_allow_list`                                                 | CSV com 3 URLs (localhost:3001, localhost:3000, app.peliculasideral.com.br) |
| 2    | `mailer_autoconfirm`                                             | `false` (gate ON)                                                           |
| 2    | `smtp_host`                                                      | `smtp.resend.com`                                                           |
| 2    | `smtp_port`                                                      | `587`                                                                       |
| 2    | `smtp_user`, `smtp_pass`, `smtp_admin_email`, `smtp_sender_name` | via env vars                                                                |

## Setup manual no dashboard (fallback)

Se preferir não usar o token de API, faça pelo dashboard:

Acesse https://supabase.com/dashboard/project/rurktxlnbssjjqxxklgu/auth

### 1. Desativar email confirmation (gate)

- Authentication → Providers → Email
- Desmarcar **"Confirm email"**
- Salvar

Motivo: closed beta sem SMTP configurado. User loga imediato após signup.
Banner soft prompt (`<EmailConfirmBanner />`) lembra de confirmar depois.

### 2. Redirect URLs

- Authentication → URL Configuration → Redirect URLs
- Adicionar:
  - `http://localhost:3001/api/auth/callback`
  - `http://localhost:3000/api/auth/callback`
  - `https://app.peliculasideral.com.br/api/auth/callback` (prod, futuro)

### 3. Custom Access Token Hook (deferred)

- Authentication → Hooks → Custom Access Token Hook
- Habilitar, selecionar `public.set_tier_claim`

Motivo: necessário pro paywall RPC `get_interpretation_long` funcionar.
Pode ficar pra Fase 2.

**Via API** (campos validados): `hook_custom_access_token_enabled=true` +
`hook_custom_access_token_uri="pg-functions://postgres/public/set_tier_claim"`.

## SMTP (Resend) — Fase 2

- Quando Resend estiver provisionado: Authentication → Email Templates
- Configurar SMTP custom apontando pra Resend
- Reativar email_confirm (passa de soft prompt → gate suave)

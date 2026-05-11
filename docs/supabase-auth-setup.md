# Supabase Auth Setup — Pelicula Sideral

## Configurações obrigatórias no dashboard

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

## SMTP (Resend) — Fase 2

- Quando Resend estiver provisionado: Authentication → Email Templates
- Configurar SMTP custom apontando pra Resend
- Reativar email_confirm (passa de soft prompt → gate suave)

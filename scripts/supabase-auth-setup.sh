#!/usr/bin/env bash
#
# supabase-auth-setup.sh — configura Auth do projeto Pelicula Sideral
# via Supabase Management API.
#
# Idempotente: rodar 2x produz o mesmo estado (PATCH é replace por campo).
#
# Uso:
#   ./scripts/supabase-auth-setup.sh phase1
#   ./scripts/supabase-auth-setup.sh phase2
#
# Pré-requisitos no .env.local:
#   SUPABASE_ACCESS_TOKEN  — token de https://supabase.com/dashboard/account/tokens
#   PROJECT_REF            — opcional, default: rurktxlnbssjjqxxklgu
#
# Pré-requisitos Fase 2 (SMTP):
#   RESEND_SMTP_USER       — geralmente "resend"
#   RESEND_SMTP_PASS       — API key do Resend
#   SMTP_ADMIN_EMAIL       — ex.: no-reply@peliculasideral.com.br
#   SMTP_SENDER_NAME       — ex.: "Pelicula Sideral"

set -euo pipefail

# ── Load env ───────────────────────────────────────────────────────────────
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$ROOT_DIR/.env.local"

if [[ -f "$ENV_FILE" ]]; then
  set -a; source "$ENV_FILE"; set +a
fi

: "${SUPABASE_ACCESS_TOKEN:?precisa SUPABASE_ACCESS_TOKEN em .env.local}"
PROJECT_REF="${PROJECT_REF:-rurktxlnbssjjqxxklgu}"

API="https://api.supabase.com/v1/projects/${PROJECT_REF}/config/auth"

PHASE="${1:-}"
if [[ "$PHASE" != "phase1" && "$PHASE" != "phase2" ]]; then
  echo "Uso: $0 phase1|phase2"
  echo "  phase1: desativa Confirm email + adiciona redirect URLs"
  echo "  phase2: ativa SMTP (Resend) + reativa Confirm email"
  exit 1
fi

# ── Helpers ────────────────────────────────────────────────────────────────
patch_auth() {
  local body="$1"
  local label="$2"
  echo "→ PATCH /config/auth ($label)"
  local response
  response=$(curl -sS -w "\n%{http_code}" -X PATCH "$API" \
    -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$body")
  local code
  code=$(tail -n1 <<<"$response")
  local body_out
  body_out=$(sed '$d' <<<"$response")

  if [[ "$code" =~ ^2[0-9][0-9]$ ]]; then
    echo "  ✓ $code"
  else
    echo "  ✗ $code"
    echo "$body_out" | head -3
    exit 1
  fi
}

verify_field() {
  local field="$1"
  local expected="$2"
  local actual
  actual=$(curl -sS "$API" \
    -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
    | jq -r ".${field}")
  if [[ "$actual" == "$expected" ]]; then
    echo "  ✓ ${field} = ${actual}"
  else
    echo "  ✗ ${field} = ${actual} (esperado ${expected})"
  fi
}

# ── Phase 1: gate OFF + redirect URLs ──────────────────────────────────────
if [[ "$PHASE" == "phase1" ]]; then
  REDIRECTS="http://localhost:3001/api/auth/callback,http://localhost:3000/api/auth/callback,https://app.peliculasideral.com.br/api/auth/callback"

  patch_auth "$(cat <<JSON
{
  "external_email_enabled": true,
  "mailer_autoconfirm": true,
  "uri_allow_list": "$REDIRECTS"
}
JSON
)" "phase1: gate OFF + 3 redirect URLs"

  echo
  echo "Verificando estado pós-patch:"
  verify_field "mailer_autoconfirm" "true"
  verify_field "external_email_enabled" "true"
  verify_field "uri_allow_list" "$REDIRECTS"
  echo
  echo "✓ Fase 1 aplicada. Pode testar /onboarding agora."
fi

# ── Phase 2: SMTP via Resend + gate ON ─────────────────────────────────────
if [[ "$PHASE" == "phase2" ]]; then
  : "${RESEND_SMTP_USER:?precisa RESEND_SMTP_USER no .env.local}"
  : "${RESEND_SMTP_PASS:?precisa RESEND_SMTP_PASS no .env.local}"
  SMTP_ADMIN_EMAIL="${SMTP_ADMIN_EMAIL:-no-reply@peliculasideral.com.br}"
  SMTP_SENDER_NAME="${SMTP_SENDER_NAME:-Pelicula Sideral}"

  patch_auth "$(jq -cn \
    --arg admin "$SMTP_ADMIN_EMAIL" \
    --arg sender "$SMTP_SENDER_NAME" \
    --arg user "$RESEND_SMTP_USER" \
    --arg pass "$RESEND_SMTP_PASS" \
    '{
      external_email_enabled: true,
      mailer_autoconfirm: false,
      smtp_admin_email: $admin,
      smtp_host: "smtp.resend.com",
      smtp_port: "587",
      smtp_user: $user,
      smtp_pass: $pass,
      smtp_sender_name: $sender,
      smtp_max_frequency: 60
    }')" "phase2: SMTP Resend + gate ON"

  echo
  echo "Verificando estado pós-patch:"
  verify_field "mailer_autoconfirm" "false"
  verify_field "smtp_host" "smtp.resend.com"
  echo
  echo "✓ Fase 2 aplicada. Confirm email agora é gate suave."
  echo "  Banner soft prompt some assim que o user clica no link do email."
fi

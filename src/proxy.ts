import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { updateSupabaseSession } from '@/lib/supabase/middleware';

const handleI18n = createMiddleware({
  locales: ['pt-BR', 'en-US', 'es-419'],
  defaultLocale: 'pt-BR',
  localePrefix: 'as-needed',
});

export default async function proxy(request: NextRequest) {
  // 1. Refresh Supabase session cookies (no-op if Supabase not configured).
  const { response: sessionResponse } = await updateSupabaseSession(request);

  // 2. Run i18n routing on the session-refreshed request.
  const i18nResponse = handleI18n(request);

  // Merge cookies set by the session refresh into the i18n response so the
  // browser persists fresh access/refresh tokens AND the i18n redirect/rewrite
  // takes effect.
  sessionResponse.cookies.getAll().forEach((cookie) => {
    i18nResponse.cookies.set(cookie.name, cookie.value, cookie);
  });

  return i18nResponse;
}

export const config = {
  // Apply only to non-api, non-_next, non-static paths
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

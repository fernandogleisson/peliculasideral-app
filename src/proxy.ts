import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['pt-BR', 'en-US', 'es-419'],
  defaultLocale: 'pt-BR',
  localePrefix: 'as-needed',
});

export const config = {
  // Apply only to non-api, non-_next, non-static paths
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

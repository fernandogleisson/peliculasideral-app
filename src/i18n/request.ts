import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['pt-BR', 'en-US', 'es-419'] as const;
type Locale = (typeof locales)[number];

function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = isLocale(requested) ? requested : 'pt-BR';
  if (requested && !isLocale(requested)) notFound();
  return {
    locale,
    messages: (await import(`../features/i18n/messages/${locale}.json`)).default,
  };
});

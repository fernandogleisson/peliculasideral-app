export type Currency = 'BRL' | 'USD' | 'EUR';
export type Locale = 'pt-BR' | 'en-US' | 'es-419';

const LOCALE_TO_CURRENCY: Record<Locale, Currency> = {
  'pt-BR': 'BRL',
  'en-US': 'USD',
  'es-419': 'EUR',
};

export function defaultCurrencyForLocale(locale: Locale): Currency {
  return LOCALE_TO_CURRENCY[locale] ?? 'BRL';
}

export function formatPrice(amount: number, currency: Currency, locale: Locale): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}

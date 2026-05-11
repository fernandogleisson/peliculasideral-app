import { describe, it, expect } from 'vitest';
import { defaultCurrencyForLocale, formatPrice } from './currency';

describe('currency', () => {
  it('maps locale to currency', () => {
    expect(defaultCurrencyForLocale('pt-BR')).toBe('BRL');
    expect(defaultCurrencyForLocale('en-US')).toBe('USD');
    expect(defaultCurrencyForLocale('es-419')).toBe('EUR');
  });
  it('formats prices', () => {
    expect(formatPrice(32, 'BRL', 'pt-BR')).toMatch(/R\$.*32/);
    expect(formatPrice(15, 'USD', 'en-US')).toMatch(/\$15/);
  });
});

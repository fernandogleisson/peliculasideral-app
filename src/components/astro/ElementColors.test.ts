import { describe, it, expect } from 'vitest';
import { ELEMENT_COLORS, SIGN_TO_ELEMENT } from './ElementColors';

describe('ElementColors', () => {
  it('maps all 12 signs to an element', () => {
    expect(Object.keys(SIGN_TO_ELEMENT).length).toBe(12);
    for (const element of Object.values(SIGN_TO_ELEMENT)) {
      expect(ELEMENT_COLORS[element]).toBeDefined();
      expect(ELEMENT_COLORS[element].primary).toMatch(/^var\(--color-/);
    }
  });

  it('exposes 4 elements with primary/light/dark', () => {
    for (const element of ['fogo', 'terra', 'ar', 'agua'] as const) {
      expect(ELEMENT_COLORS[element]).toHaveProperty('primary');
      expect(ELEMENT_COLORS[element]).toHaveProperty('light');
      expect(ELEMENT_COLORS[element]).toHaveProperty('dark');
    }
  });
});

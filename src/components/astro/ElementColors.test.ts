import { describe, it, expect } from 'vitest';
import { ELEMENT_COLORS, SIGN_TO_ELEMENT } from './ElementColors';

describe('ElementColors', () => {
  it('maps all 12 signs to an element', () => {
    expect(Object.keys(SIGN_TO_ELEMENT).length).toBe(12);
    for (const [, element] of Object.entries(SIGN_TO_ELEMENT)) {
      expect(ELEMENT_COLORS[element as keyof typeof ELEMENT_COLORS]).toBeDefined();
    }
  });

  it('exposes primary/light/dark for each element', () => {
    for (const element of Object.keys(ELEMENT_COLORS) as Array<keyof typeof ELEMENT_COLORS>) {
      const colors = ELEMENT_COLORS[element];
      expect(colors.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(colors.light).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(colors.dark).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });
});

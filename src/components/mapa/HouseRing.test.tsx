import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HouseRing } from './HouseRing';

const houses = [
  { number: 1, sign: 'aries' as const, cuspDegree: 0 },
  { number: 2, sign: 'taurus' as const, cuspDegree: 30 },
  { number: 3, sign: 'gemini' as const, cuspDegree: 60 },
];

describe('HouseRing', () => {
  it('renders 12 segments when given 12 houses', () => {
    const allHouses = Array.from({ length: 12 }, (_, i) => ({
      number: i + 1,
      sign: 'aries' as const,
      cuspDegree: i * 30,
    }));
    const { container } = render(
      <svg viewBox="0 0 400 400">
        <HouseRing houses={allHouses} />
      </svg>,
    );
    expect(container.querySelectorAll('line').length).toBe(12);
  });

  it('default variant shows house number text', () => {
    const { container } = render(
      <svg viewBox="0 0 400 400">
        <HouseRing houses={houses} />
      </svg>,
    );
    expect(container.querySelectorAll('text').length).toBe(3);
  });

  it('cusps-only variant hides house number text', () => {
    const { container } = render(
      <svg viewBox="0 0 400 400">
        <HouseRing variant="cusps-only" houses={houses} />
      </svg>,
    );
    expect(container.querySelectorAll('text').length).toBe(0);
  });
});

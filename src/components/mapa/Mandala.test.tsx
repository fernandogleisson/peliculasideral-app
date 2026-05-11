import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Mandala } from './Mandala';

const mockChart = {
  planets: [],
  houses: [
    { number: 1, sign: 'aries' as const, cuspDegree: 0 },
    { number: 2, sign: 'taurus' as const, cuspDegree: 30 },
  ],
  aspects: [],
};

describe('Mandala', () => {
  it('renders SVG with role=img and aria-label', () => {
    const { container } = render(<Mandala chart={mockChart} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('aria-label')).toBe('Mandala astral');
    expect(svg?.getAttribute('role')).toBe('img');
  });

  it('applies size prop to width and height', () => {
    const { container } = render(<Mandala chart={mockChart} size={480} />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('480');
    expect(svg?.getAttribute('height')).toBe('480');
  });

  it('full variant includes house slot', () => {
    const { container } = render(<Mandala variant="full" chart={mockChart} />);
    expect(container.querySelector('g[aria-label="Casas"]')).toBeTruthy();
  });

  it('simplified-solar variant hides house slot', () => {
    const { container } = render(<Mandala variant="simplified-solar" chart={mockChart} />);
    expect(container.querySelector('g[aria-label="Casas"]')).toBeFalsy();
  });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AspectGlyph } from './AspectGlyph';

describe('AspectGlyph', () => {
  it('renders SVG with localized accessible name', () => {
    render(<AspectGlyph aspect="trine" />);
    expect(screen.getByLabelText('Trígono')).toBeInTheDocument();
  });

  it('uses thicker stroke (1.5) for major aspects', () => {
    render(<AspectGlyph aspect="conjunction" />);
    const svg = screen.getByLabelText('Conjunção');
    expect(svg.getAttribute('stroke-width')).toBe('1.5');
  });

  it('uses lighter stroke (1) for minor aspects', () => {
    render(<AspectGlyph aspect="quincunx" />);
    const svg = screen.getByLabelText('Quincunce');
    expect(svg.getAttribute('stroke-width')).toBe('1');
  });
});

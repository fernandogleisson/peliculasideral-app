import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PlanetGlyph } from './PlanetGlyph';

describe('PlanetGlyph', () => {
  it('renders SVG with localized aria-label', () => {
    render(<PlanetGlyph planet="sun" />);
    expect(screen.getByLabelText('Sol')).toBeInTheDocument();
  });

  it('renders retrograde marker when retrograde prop is true', () => {
    render(<PlanetGlyph planet="mercury" retrograde />);
    expect(screen.getByText('R')).toBeInTheDocument();
  });

  it('applies element color via inline style when sign is provided', () => {
    render(<PlanetGlyph planet="sun" sign="leo" />);
    const svg = screen.getByLabelText('Sol');
    expect(svg.getAttribute('style')).toContain('var(--color-fogo)');
  });

  it('renders uncertain marker when uncertain prop is true', () => {
    render(<PlanetGlyph planet="moon" uncertain />);
    expect(screen.getByText('~')).toBeInTheDocument();
  });
});

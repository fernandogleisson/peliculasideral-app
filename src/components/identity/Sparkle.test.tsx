import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Sparkle } from './Sparkle';

describe('Sparkle', () => {
  it('renders ✦ glyph', () => {
    render(<Sparkle aria-label="loading" />);
    expect(screen.getByLabelText('loading')).toBeInTheDocument();
    expect(screen.getByLabelText('loading').textContent).toBe('✦');
  });

  it('applies size class for size variant', () => {
    const { container } = render(<Sparkle size="lg" />);
    expect(container.firstChild).toHaveClass('text-2xl');
  });

  it('animates when animated prop is true', () => {
    const { container } = render(<Sparkle animated />);
    expect(container.firstChild).toHaveClass('animate-pulse');
  });
});

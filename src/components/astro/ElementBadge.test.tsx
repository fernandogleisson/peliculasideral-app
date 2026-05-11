import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ElementBadge } from './ElementBadge';

describe('ElementBadge', () => {
  it('renders label uppercase for fogo', () => {
    render(<ElementBadge element="fogo" />);
    expect(screen.getByText('FOGO')).toBeInTheDocument();
  });

  it('applies element color class for terra', () => {
    const { container } = render(<ElementBadge element="terra" />);
    expect(container.firstChild).toHaveClass('bg-terra');
  });

  it('uses label-xs typography', () => {
    const { container } = render(<ElementBadge element="ar" />);
    expect(container.firstChild).toHaveClass('text-[10px]');
    expect(container.firstChild).toHaveClass('tracking-[0.4em]');
  });
});

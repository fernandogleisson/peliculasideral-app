import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders 40px square circle by default', () => {
    render(<IconButton aria-label="close">×</IconButton>);
    expect(screen.getByRole('button')).toHaveClass('h-10', 'w-10', 'rounded-full');
  });

  it('default variant has surface-1 bg', () => {
    render(<IconButton aria-label="x">×</IconButton>);
    expect(screen.getByRole('button')).toHaveClass('bg-surface-1');
  });

  it('ghost variant is transparent', () => {
    render(
      <IconButton variant="ghost" aria-label="x">
        ×
      </IconButton>,
    );
    expect(screen.getByRole('button')).toHaveClass('bg-transparent');
  });
});

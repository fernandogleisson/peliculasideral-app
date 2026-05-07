import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('uses role=status with aria-label', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute('role', 'status');
    expect(container.firstChild).toHaveAttribute('aria-label', 'Carregando');
  });

  it('animates with pulse', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('animate-pulse');
  });

  it('uses surface-2 bg', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('bg-surface-2');
  });
});

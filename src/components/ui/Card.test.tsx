import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it.each([
    ['default', 'bg-surface-1'],
    ['elevated', 'bg-surface-2'],
    ['interactive', 'cursor-pointer'],
  ] as const)('renders %s variant with %s class', (variant, expected) => {
    const { container } = render(<Card variant={variant}>x</Card>);
    expect(container.firstChild).toHaveClass(expected);
  });

  it('applies rounded-md by default', () => {
    const { container } = render(<Card>x</Card>);
    expect(container.firstChild).toHaveClass('rounded-md');
  });

  it('elevated variant uses rounded-lg', () => {
    const { container } = render(<Card variant="elevated">x</Card>);
    expect(container.firstChild).toHaveClass('rounded-lg');
  });
});

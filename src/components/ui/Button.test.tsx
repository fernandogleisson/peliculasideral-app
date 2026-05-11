import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it.each([
    ['primary', 'bg-primary'],
    ['secondary', 'border-primary'],
    ['ghost', 'bg-transparent'],
    ['danger', 'bg-danger'],
    ['link', 'underline-offset-4'],
  ] as const)('renders %s variant with %s class', (variant, expectedClass) => {
    render(<Button variant={variant}>Click</Button>);
    expect(screen.getByRole('button')).toHaveClass(expectedClass);
  });

  it('renders label-lg typography (mono 14px wide tracking)', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button')).toHaveClass('font-mono', 'text-sm', 'tracking-[0.15em]');
  });

  it('uses rounded DEFAULT (6px), not bubble', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button')).toHaveClass('rounded');
    expect(screen.getByRole('button')).not.toHaveClass('rounded-xl', 'rounded-full');
  });
});

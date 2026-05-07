import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Input } from './Input';
import { Textarea } from './Textarea';

describe('Input', () => {
  it('renders with default border', () => {
    render(<Input placeholder="email" />);
    expect(screen.getByPlaceholderText('email')).toHaveClass('border-border');
  });

  it('error variant uses border-danger', () => {
    render(<Input error placeholder="x" />);
    expect(screen.getByPlaceholderText('x')).toHaveClass('border-danger');
  });
});

describe('Textarea', () => {
  it('renders with min-height 96px (min-h-24)', () => {
    render(<Textarea placeholder="x" />);
    expect(screen.getByPlaceholderText('x')).toHaveClass('min-h-24');
  });
});

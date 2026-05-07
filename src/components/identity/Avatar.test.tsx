import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders image when src provided', () => {
    render(<Avatar src="/foo.png" alt="Maria" />);
    expect(screen.getByAltText('Maria')).toBeInTheDocument();
  });

  it('renders initials fallback when no src', () => {
    render(<Avatar alt="Maria Silva" />);
    expect(screen.getByText('MS')).toBeInTheDocument();
  });

  it('shows element ring when sign provided', () => {
    const { container } = render(<Avatar alt="X" sign="leo" />);
    expect(container.firstChild).toHaveClass('ring-2');
  });
});

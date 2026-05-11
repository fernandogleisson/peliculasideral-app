import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  it('renders sticky variant by default', () => {
    const { container } = render(
      <Header>
        <span>title</span>
      </Header>,
    );
    expect(container.firstChild).toHaveClass('sticky', 'top-0');
  });

  it('uses surface @ 90% blur 12px (cosmic-depth signature)', () => {
    const { container } = render(
      <Header>
        <span>x</span>
      </Header>,
    );
    expect(container.firstChild).toHaveClass('backdrop-blur-md');
    expect(container.firstChild).toHaveClass('bg-surface/90');
  });

  it('respects safe-area-top via padding utility', () => {
    const { container } = render(
      <Header>
        <span>x</span>
      </Header>,
    );
    expect(container.firstChild).toHaveClass('pt-safe');
  });

  it('transparent variant has no background', () => {
    const { container } = render(
      <Header variant="transparent">
        <span>x</span>
      </Header>,
    );
    expect(container.firstChild).toHaveClass('bg-transparent');
    expect(container.firstChild).not.toHaveClass('sticky');
  });
});

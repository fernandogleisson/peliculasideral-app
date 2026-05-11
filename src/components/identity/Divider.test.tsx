import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders hr by default with role=separator', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('hr')).toBeTruthy();
    expect(container.querySelector('[role="separator"]')).toBeTruthy();
  });

  it('dotted variant adds border-dotted class', () => {
    const { container } = render(<Divider variant="dotted" />);
    expect(container.querySelector('hr')).toHaveClass('border-dotted');
  });

  it('with-glyph variant renders Sparkle between hr', () => {
    const { container } = render(<Divider variant="with-glyph" />);
    expect(container.querySelectorAll('hr').length).toBe(2);
    expect(container.textContent).toContain('✦');
  });
});

import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MandalaSegment } from './MandalaSegment';

const PATH = 'M 100 200 A 90 90 0 0 1 200 100 L 200 200 Z';

describe('MandalaSegment', () => {
  it('default variant uses fill-opacity 0.10', () => {
    const { container } = render(
      <svg viewBox="0 0 400 400">
        <MandalaSegment element="fogo" pathD={PATH} />
      </svg>,
    );
    const path = container.querySelector('path');
    expect(path?.getAttribute('fill-opacity')).toBe('0.1');
  });

  it('highlighted variant uses fill-opacity 0.40 + stroke 1.5', () => {
    const { container } = render(
      <svg viewBox="0 0 400 400">
        <MandalaSegment element="agua" variant="highlighted" pathD={PATH} />
      </svg>,
    );
    const path = container.querySelector('path');
    expect(path?.getAttribute('fill-opacity')).toBe('0.4');
    expect(path?.getAttribute('stroke-width')).toBe('1.5');
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    const { container } = render(
      <svg viewBox="0 0 400 400">
        <MandalaSegment element="terra" pathD={PATH} onClick={onClick} />
      </svg>,
    );
    const path = container.querySelector('path')!;
    path.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onClick).toHaveBeenCalled();
  });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BottomNav } from './BottomNav';

vi.mock('next/navigation', () => ({
  usePathname: () => '/eu',
}));
vi.mock('next-intl', () => ({
  useTranslations: () => (k: string) => k,
}));

describe('BottomNav', () => {
  it('renders 4 tabs', () => {
    render(<BottomNav />);
    expect(screen.getAllByRole('link')).toHaveLength(4);
  });

  it('marks current tab as active via primary color + aria-current', () => {
    const { container } = render(<BottomNav />);
    const active = container.querySelector('[aria-current="page"]');
    expect(active).toBeTruthy();
    expect(active).toHaveClass('text-primary');
  });

  it('uses label-md typography (mono 12px wide tracking)', () => {
    const { container } = render(<BottomNav />);
    const labels = container.querySelectorAll('span');
    expect(labels[0]).toHaveClass('font-mono', 'text-xs', 'tracking-[0.2em]');
  });

  it('respects safe-area-bottom + height 64px', () => {
    const { container } = render(<BottomNav />);
    expect(container.firstChild).toHaveClass('pb-safe');
    expect(container.firstChild).toHaveClass('h-16');
  });
});

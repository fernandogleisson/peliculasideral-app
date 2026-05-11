import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConsentBanner } from './ConsentBanner';

vi.mock('next-intl', () => ({
  useTranslations: () => (k: string) => k,
}));

describe('ConsentBanner', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders banner text + 3 default actions when no consent stored', () => {
    render(<ConsentBanner />);
    expect(screen.getByText('banner.text')).toBeInTheDocument();
    expect(screen.getByText('banner.acceptAll')).toBeInTheDocument();
    expect(screen.getByText('banner.rejectNonEssential')).toBeInTheDocument();
    expect(screen.getByText('banner.customize')).toBeInTheDocument();
  });

  it('persists "accept all" with necessary+analytics+marketing true', () => {
    render(<ConsentBanner />);
    fireEvent.click(screen.getByText('banner.acceptAll'));
    const stored = JSON.parse(window.localStorage.getItem('lgpd_consent_v1')!);
    expect(stored.necessary).toBe(true);
    expect(stored.analytics).toBe(true);
    expect(stored.marketing).toBe(true);
  });

  it('persists "reject non-essential" with analytics+marketing false', () => {
    render(<ConsentBanner />);
    fireEvent.click(screen.getByText('banner.rejectNonEssential'));
    const stored = JSON.parse(window.localStorage.getItem('lgpd_consent_v1')!);
    expect(stored.necessary).toBe(true);
    expect(stored.analytics).toBe(false);
    expect(stored.marketing).toBe(false);
  });

  it('reveals 3 category checkboxes + savePreferences when customize clicked', () => {
    render(<ConsentBanner />);
    fireEvent.click(screen.getByText('banner.customize'));
    expect(screen.getByText('banner.necessary')).toBeInTheDocument();
    expect(screen.getByText('banner.analytics')).toBeInTheDocument();
    expect(screen.getByText('banner.marketing')).toBeInTheDocument();
    expect(screen.getByText('banner.savePreferences')).toBeInTheDocument();
  });

  it('renders dialog role with aria-live polite', () => {
    render(<ConsentBanner />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-live', 'polite');
  });

  it('hides banner after action is taken', () => {
    render(<ConsentBanner />);
    fireEvent.click(screen.getByText('banner.acceptAll'));
    expect(screen.queryByText('banner.text')).not.toBeInTheDocument();
  });
});

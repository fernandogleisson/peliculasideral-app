import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RateLimitMessage } from './RateLimitMessage';

describe('RateLimitMessage', () => {
  it('renders with role=alert', () => {
    render(<RateLimitMessage retryAfterSeconds={3600} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('formats retry as hours when < 1 day', () => {
    render(<RateLimitMessage retryAfterSeconds={7200} />);
    expect(screen.getByText('2 horas')).toBeInTheDocument();
  });

  it('formats retry as days when >= 1 day', () => {
    render(<RateLimitMessage retryAfterSeconds={86400 * 7} />);
    expect(screen.getByText('7 dias')).toBeInTheDocument();
  });

  it('uses custom message when provided', () => {
    render(<RateLimitMessage retryAfterSeconds={3600} message="Custom" />);
    expect(screen.getByText(/Custom/)).toBeInTheDocument();
  });

  it('singular hora when retry = 1 hour', () => {
    render(<RateLimitMessage retryAfterSeconds={3600} />);
    expect(screen.getByText('1 hora')).toBeInTheDocument();
  });
});

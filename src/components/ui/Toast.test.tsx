import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('sonner', () => ({
  Toaster: () => <div data-testid="sonner-toaster" />,
  toast: {
    success: vi.fn(),
    warning: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

import { ToastProvider, toast } from './Toast';

describe('Toast', () => {
  it('ToastProvider renders Sonner Toaster', () => {
    const { getByTestId } = render(<ToastProvider />);
    expect(getByTestId('sonner-toaster')).toBeInTheDocument();
  });

  it('exposes 4 semantic variants', () => {
    expect(toast.success).toBeDefined();
    expect(toast.warning).toBeDefined();
    expect(toast.error).toBeDefined();
    expect(toast.info).toBeDefined();
  });
});

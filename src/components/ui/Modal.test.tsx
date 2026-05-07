import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Modal } from './Modal';

describe('Modal', () => {
  it('renders title when provided', () => {
    render(
      <Modal open={true} onClose={() => {}} title="Hello">
        body
      </Modal>,
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('does not render content when open=false', () => {
    render(
      <Modal open={false} onClose={() => {}}>
        body
      </Modal>,
    );
    expect(screen.queryByText('body')).not.toBeInTheDocument();
  });

  it('renders close button', () => {
    render(
      <Modal open={true} onClose={() => {}}>
        body
      </Modal>,
    );
    expect(screen.getByRole('button', { name: 'Fechar' })).toBeInTheDocument();
  });

  it.each(['default', 'popup-interpretation', 'popup-paywall'] as const)(
    'renders %s variant via data attr',
    (variant) => {
      render(
        <Modal open={true} variant={variant} onClose={() => {}}>
          body
        </Modal>,
      );
      const dialog = document.querySelector('[data-variant]');
      expect(dialog).toHaveAttribute('data-variant', variant);
    },
  );
});

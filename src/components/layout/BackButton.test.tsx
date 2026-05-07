import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BackButton } from './BackButton';

vi.mock('next/navigation', () => ({ useRouter: () => ({ back: vi.fn() }) }));
vi.mock('next-intl', () => ({
  useTranslations: () => (k: string) => (k === 'back' ? 'VOLTAR' : k),
}));

describe('BackButton', () => {
  it('default variant shows label "VOLTAR"', () => {
    render(<BackButton />);
    expect(screen.getByText('VOLTAR')).toBeInTheDocument();
  });

  it('default variant without label hides label text', () => {
    render(<BackButton showLabel={false} />);
    expect(screen.queryByText('VOLTAR')).not.toBeInTheDocument();
  });

  it('ghost variant is square circle', () => {
    const { container } = render(<BackButton variant="ghost" />);
    expect(container.firstChild).toHaveClass('rounded-full', 'h-10', 'w-10');
  });
});

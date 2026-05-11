import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PageHeader } from './PageHeader';

describe('PageHeader', () => {
  it('renders title', () => {
    render(<PageHeader title="Eu" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Eu');
  });

  it('renders optional subtitle', () => {
    render(<PageHeader title="Eu" subtitle="Seu mapa natal" />);
    expect(screen.getByText('Seu mapa natal')).toBeInTheDocument();
  });

  it('renders action slot when variant=with-action', () => {
    render(<PageHeader title="Eu" variant="with-action" action={<button>Edit</button>} />);
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });
});

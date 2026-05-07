import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  it('renders items in order', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Cursos', href: '/cursos' },
          { label: 'Decifrando', href: '/cursos/decifrando' },
          { label: 'Aula 1' },
        ]}
      />,
    );
    expect(screen.getByText('Cursos')).toBeInTheDocument();
    expect(screen.getByText('Aula 1')).toBeInTheDocument();
  });

  it('makes last item non-link when no href', () => {
    render(<Breadcrumb items={[{ label: 'A', href: '/a' }, { label: 'B' }]} />);
    expect(screen.getByRole('link', { name: 'A' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'B' })).not.toBeInTheDocument();
  });

  it('renders separator between items', () => {
    const { container } = render(
      <Breadcrumb items={[{ label: 'A', href: '/' }, { label: 'B' }]} />,
    );
    expect(container.textContent).toContain('›');
  });
});

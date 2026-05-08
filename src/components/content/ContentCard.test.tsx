import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ContentCard } from './ContentCard';

describe('ContentCard', () => {
  it('renders link with title heading', () => {
    render(<ContentCard variant="course" href="/x" title="Title" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/x');
    expect(screen.getByRole('heading')).toHaveTextContent('Title');
  });

  it('renders meta as uppercase mono label', () => {
    render(<ContentCard variant="article" href="/x" title="Y" meta="Curso" />);
    expect(screen.getByText('Curso')).toHaveClass('font-mono', 'tracking-[0.3em]', 'uppercase');
  });

  it('renders description when provided', () => {
    render(<ContentCard variant="pelicula-do-dia" href="/x" title="Y" description="Desc" />);
    expect(screen.getByText('Desc')).toBeInTheDocument();
  });

  it.each(['course', 'article', 'pelicula-do-dia', 'pelicula-da-semana'] as const)(
    'renders %s variant via data attr',
    (variant) => {
      const { container } = render(<ContentCard variant={variant} href="/x" title="Y" />);
      expect(container.firstChild).toHaveAttribute('data-variant', variant);
    },
  );
});

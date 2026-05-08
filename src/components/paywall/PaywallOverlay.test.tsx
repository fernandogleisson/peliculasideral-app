import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { PaywallOverlay } from './PaywallOverlay';

const benefits = ['Mapa completo', 'Pelicula da semana', 'Comunidade'];

describe('PaywallOverlay', () => {
  it('renders all benefits', () => {
    render(<PaywallOverlay benefits={benefits} ctaHref="/assinar" />);
    benefits.forEach((b) => expect(screen.getByText(b)).toBeInTheDocument());
  });

  it('renders CTA link with default label', () => {
    render(<PaywallOverlay benefits={benefits} ctaHref="/assinar" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/assinar');
    expect(screen.getByRole('button', { name: 'Assinar agora' })).toBeInTheDocument();
  });

  it('renders socialProof when provided', () => {
    render(<PaywallOverlay benefits={benefits} ctaHref="/x" socialProof="3.000+ assinantes" />);
    expect(screen.getByText('3.000+ assinantes')).toBeInTheDocument();
  });

  it.each(['default', 'inline-card', 'full-screen'] as const)('renders %s variant', (variant) => {
    const { container } = render(
      <PaywallOverlay variant={variant} benefits={benefits} ctaHref="/x" />,
    );
    expect(container.firstChild).toHaveAttribute('data-variant', variant);
  });
});

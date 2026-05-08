import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InterpretationCard } from './InterpretationCard';

describe('InterpretationCard', () => {
  it('short variant shows only shortText', () => {
    render(
      <InterpretationCard
        variant="short"
        title="Sol em Aquário"
        shortText="Curta"
        longText="Longa"
      />,
    );
    expect(screen.getByText('Curta')).toBeInTheDocument();
    expect(screen.queryByText('Longa')).not.toBeInTheDocument();
  });

  it('long variant shows both', () => {
    render(<InterpretationCard variant="long" title="X" shortText="Curta" longText="Longa" />);
    expect(screen.getByText('Curta')).toBeInTheDocument();
    expect(screen.getByText('Longa')).toBeInTheDocument();
  });

  it('paywall-locked variant renders Lock icon and CTA', () => {
    render(
      <InterpretationCard
        variant="paywall-locked"
        title="X"
        shortText="Curta"
        paywallCta={<button>Assinar</button>}
      />,
    );
    expect(screen.getByRole('button', { name: 'Assinar' })).toBeInTheDocument();
  });

  it('respects reading width 65ch on body', () => {
    const { container } = render(<InterpretationCard variant="short" title="X" shortText="Y" />);
    const p = container.querySelector('p');
    expect(p).toHaveClass('max-w-[65ch]');
  });
});

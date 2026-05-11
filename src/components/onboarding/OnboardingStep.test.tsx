import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

// Mock next/navigation pro BackButton
vi.mock('next/navigation', () => ({ useRouter: () => ({ back: vi.fn() }) }));
vi.mock('next-intl', () => ({ useTranslations: () => () => 'voltar' }));

import { OnboardingStep } from './OnboardingStep';

describe('OnboardingStep', () => {
  it('input variant renders title and Continuar button', () => {
    render(<OnboardingStep variant="input" title="Qual seu nome?" />);
    expect(screen.getByRole('heading')).toHaveTextContent('Qual seu nome?');
    expect(screen.getByRole('button', { name: 'Continuar' })).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<OnboardingStep variant="input" title="X" subtitle="Subtitle here" />);
    expect(screen.getByText('Subtitle here')).toBeInTheDocument();
  });

  it('animation variant hides next button', () => {
    render(<OnboardingStep variant="animation" title="Loading..." />);
    expect(screen.queryByRole('button', { name: 'Continuar' })).not.toBeInTheDocument();
  });

  it('shows Pular when showSkip + onSkip provided', () => {
    render(<OnboardingStep variant="input" title="X" showSkip onSkip={() => {}} />);
    expect(screen.getByRole('button', { name: 'Pular' })).toBeInTheDocument();
  });

  it('calls onNext when Continuar clicked', async () => {
    const user = userEvent.setup();
    const onNext = vi.fn();
    render(<OnboardingStep variant="input" title="X" onNext={onNext} />);
    await user.click(screen.getByRole('button', { name: 'Continuar' }));
    expect(onNext).toHaveBeenCalled();
  });
});

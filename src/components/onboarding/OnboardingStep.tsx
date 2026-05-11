import { Sparkle } from '@/components/identity/Sparkle';
import { Button } from '@/components/ui/Button';
import { BackButton } from '@/components/layout/BackButton';
import { cn } from '@/lib/utils';

type Variant = 'input' | 'choice' | 'animation';

export interface OnboardingStepProps {
  variant: Variant;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  onNext?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  showBack?: boolean;
  showSkip?: boolean;
  onSkip?: () => void;
  className?: string;
}

export function OnboardingStep({
  variant,
  title,
  subtitle,
  children,
  onNext,
  nextDisabled,
  nextLabel = 'Continuar',
  showBack = true,
  showSkip,
  onSkip,
  className,
}: OnboardingStepProps) {
  return (
    <main className={cn('min-h-dvh flex flex-col px-6 py-6 max-w-md mx-auto', className)}>
      {showBack && <BackButton variant="ghost" showLabel={false} />}

      <div className="flex-1 flex flex-col justify-center gap-6">
        {variant === 'animation' ? (
          <div className="flex flex-col items-center text-center gap-4">
            <Sparkle size="lg" animated className="text-primary" />
            <h1 className="font-serif text-3xl text-ink">{title}</h1>
            {subtitle && <p className="font-serif text-base text-ink-2">{subtitle}</p>}
          </div>
        ) : (
          <>
            <header>
              <h1 className="font-serif text-3xl text-ink leading-tight">{title}</h1>
              {subtitle && (
                <p className="mt-2 font-serif text-base text-ink-2 leading-relaxed">{subtitle}</p>
              )}
            </header>
            {children && <div>{children}</div>}
          </>
        )}
      </div>

      {variant !== 'animation' && (
        <footer className="flex flex-col gap-3 pb-safe">
          <Button variant="primary" onClick={onNext} disabled={nextDisabled}>
            {nextLabel}
          </Button>
          {showSkip && onSkip && (
            <Button variant="link" onClick={onSkip}>
              Pular
            </Button>
          )}
        </footer>
      )}
    </main>
  );
}

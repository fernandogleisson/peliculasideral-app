import { Sparkle } from './Sparkle';
import { cn } from '@/lib/utils';

type Variant = 'default' | 'dotted' | 'with-glyph';

export interface DividerProps {
  variant?: Variant;
  className?: string;
}

export function Divider({ variant = 'default', className }: DividerProps) {
  if (variant === 'with-glyph') {
    return (
      <div className={cn('flex items-center gap-4', className)} role="separator">
        <hr className="flex-1 border-border" />
        <Sparkle size="md" className="text-ink-3" />
        <hr className="flex-1 border-border" />
      </div>
    );
  }

  return (
    <hr
      role="separator"
      className={cn('border-border', variant === 'dotted' && 'border-dotted', className)}
    />
  );
}

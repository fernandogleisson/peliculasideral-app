import { cn } from '@/lib/utils';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'sticky' | 'transparent';
}

export function Header({ variant = 'sticky', className, children, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        'z-10 border-b border-border',
        'h-14',
        'pt-safe',
        'flex items-center px-6',
        variant === 'sticky' && 'sticky top-0 backdrop-blur-md bg-surface/90',
        variant === 'transparent' && 'bg-transparent',
        className,
      )}
      {...props}
    >
      {children}
    </header>
  );
}

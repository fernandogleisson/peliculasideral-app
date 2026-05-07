import Image from 'next/image';
import { cn } from '@/lib/utils';
import { SIGN_TO_ELEMENT, ELEMENT_COLORS, type Sign } from '@/components/astro/ElementColors';

export interface AvatarProps {
  src?: string;
  alt: string;
  sign?: Sign;
  size?: number;
  className?: string;
}

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join('')
    .toUpperCase();
}

export function Avatar({ src, alt, sign, size = 40, className }: AvatarProps) {
  const ringStyle = sign
    ? ({
        ['--tw-ring-color' as never]: ELEMENT_COLORS[SIGN_TO_ELEMENT[sign]].primary,
      } as React.CSSProperties)
    : undefined;

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full overflow-hidden',
        'bg-surface-2 text-ink',
        sign && 'ring-2 ring-offset-2 ring-offset-surface',
        className,
      )}
      style={{ width: size, height: size, ...ringStyle }}
    >
      {src ? (
        <Image src={src} alt={alt} width={size} height={size} className="object-cover" />
      ) : (
        <span className="text-xs font-mono font-bold tracking-wider">{initials(alt)}</span>
      )}
    </div>
  );
}

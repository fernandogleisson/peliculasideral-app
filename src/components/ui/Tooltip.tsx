// src/components/ui/Tooltip.tsx — Pelicula wrapper around Radix Tooltip
'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/lib/utils';

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export function TooltipContent({
  className,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Content
      sideOffset={sideOffset}
      className={cn(
        'z-50 max-w-60 bg-surface-2 border border-border text-ink',
        'px-3 py-2 rounded-sm',
        'font-mono text-[10px] font-bold tracking-[0.4em] uppercase',
        'shadow-md',
        className,
      )}
      {...props}
    />
  );
}

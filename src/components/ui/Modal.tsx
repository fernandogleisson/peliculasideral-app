'use client';

import * as React from 'react';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

type Variant = 'default' | 'popup-interpretation' | 'popup-paywall';

export interface ModalProps {
  variant?: Variant;
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ variant = 'default', open, onClose, title, children }: ModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-40 bg-overlay/70 backdrop-blur-sm" />
        <DialogPrimitive.Popup
          data-variant={variant}
          className={cn(
            'fixed z-50 rounded-lg border border-border-strong bg-surface-3 shadow-xl',
            'inset-x-4 top-1/2 -translate-y-1/2',
            'sm:left-1/2 sm:right-auto sm:-translate-x-1/2',
            'sm:w-full sm:max-w-lg',
            'p-6',
            variant === 'popup-paywall' && 'sm:max-w-md',
          )}
        >
          {title && (
            <DialogPrimitive.Title className="mb-4 font-serif text-2xl text-ink">
              {title}
            </DialogPrimitive.Title>
          )}
          <DialogPrimitive.Close
            type="button"
            aria-label="Fechar"
            className="absolute top-4 right-4 p-2 text-ink-2 hover:text-ink"
          >
            <X size={20} />
          </DialogPrimitive.Close>
          {children}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

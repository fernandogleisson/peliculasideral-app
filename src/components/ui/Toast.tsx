'use client';

import { Toaster, toast as sonnerToast } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      toastOptions={{
        classNames: {
          toast: 'border border-border bg-surface-2 text-ink rounded-md',
          success: 'border-success',
          warning: 'border-warning',
          error: 'border-danger',
        },
      }}
      duration={4000}
    />
  );
}

export const toast = {
  success: (msg: string) => sonnerToast.success(msg),
  warning: (msg: string) => sonnerToast.warning(msg),
  error: (msg: string) => sonnerToast.error(msg),
  info: (msg: string) => sonnerToast.info(msg),
};

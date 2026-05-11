'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/Button';
import type { ResendResult } from './email-confirm-actions';

interface Props {
  resendAction: () => Promise<ResendResult>;
}

export function EmailConfirmBannerActions({ resendAction }: Props) {
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);

  function dismiss() {
    document.cookie = `pelicula_email_banner_dismissed_at=${Date.now()}; path=/; max-age=${24 * 60 * 60}`;
    window.location.reload();
  }

  function resend() {
    setFeedback(null);
    startTransition(async () => {
      const result = await resendAction();
      setFeedback(result.ok ? result.message : result.error);
    });
  }

  if (feedback) {
    return <span className="text-xs text-ink-2">{feedback}</span>;
  }

  return (
    <div className="flex gap-2">
      <Button variant="link" onClick={resend} disabled={pending} className="text-xs">
        {pending ? 'Enviando…' : 'Reenviar link'}
      </Button>
      <Button variant="link" onClick={dismiss} className="text-xs text-ink-3">
        Depois
      </Button>
    </div>
  );
}

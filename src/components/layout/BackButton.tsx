'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function BackButton() {
  const router = useRouter();
  const t = useTranslations('common');
  return (
    <button type="button" onClick={() => router.back()} aria-label={t('back')} className="p-2">
      ←
    </button>
  );
}

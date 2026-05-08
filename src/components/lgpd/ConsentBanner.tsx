'use client';

import { useState, useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';

const STORAGE_KEY = 'lgpd_consent_v1';
const VERSION = '1.0';

interface StoredConsent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  ts: number;
  version: string;
}

// External store: subscribes to `storage` events so multiple tabs stay in sync.
function subscribeStorage(cb: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', cb);
  return () => window.removeEventListener('storage', cb);
}

function getStoredConsent(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot(): string | null {
  // SSR pretends consent exists so the banner does not flash on first paint.
  return 'ssr';
}

export function ConsentBanner() {
  const stored = useSyncExternalStore(subscribeStorage, getStoredConsent, getServerSnapshot);
  // Local override so clicking a button hides the banner instantly without a
  // round-trip through the storage event.
  const [dismissed, setDismissed] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const t = useTranslations('lgpd');

  const show = stored !== 'ssr' && !stored && !dismissed;

  function persist(categories: { analytics: boolean; marketing: boolean }) {
    const value: StoredConsent = {
      necessary: true,
      ...categories,
      ts: Date.now(),
      version: VERSION,
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      // storage may be blocked (private mode)
    }
    setDismissed(true);
    // When authenticated, the host page can call the server action
    // `recordConsent` to mirror this into `lgpd_consent_log`.
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentimento LGPD"
      className="fixed inset-x-4 bottom-4 z-50 rounded-lg border border-border-strong bg-surface-2 p-6 shadow-xl sm:inset-x-auto sm:right-4 sm:max-w-md"
    >
      <p className="mb-4 font-serif text-base text-ink">{t('banner.text')}</p>

      {customizing && (
        <div className="mb-4 flex flex-col gap-3">
          <label className="flex items-center gap-2 text-sm text-ink">
            <Checkbox checked disabled />
            {t('banner.necessary')}
          </label>
          <label className="flex items-center gap-2 text-sm text-ink">
            <Checkbox checked={analytics} onCheckedChange={(v) => setAnalytics(v === true)} />
            {t('banner.analytics')}
          </label>
          <label className="flex items-center gap-2 text-sm text-ink">
            <Checkbox checked={marketing} onCheckedChange={(v) => setMarketing(v === true)} />
            {t('banner.marketing')}
          </label>
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button variant="primary" onClick={() => persist({ analytics: true, marketing: true })}>
          {t('banner.acceptAll')}
        </Button>
        <Button variant="secondary" onClick={() => persist({ analytics: false, marketing: false })}>
          {t('banner.rejectNonEssential')}
        </Button>
        {!customizing && (
          <Button variant="ghost" onClick={() => setCustomizing(true)}>
            {t('banner.customize')}
          </Button>
        )}
        {customizing && (
          <Button variant="ghost" onClick={() => persist({ analytics, marketing })}>
            {t('banner.savePreferences')}
          </Button>
        )}
      </div>
    </div>
  );
}

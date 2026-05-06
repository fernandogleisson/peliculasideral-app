'use client';

import { useState, useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';

const STORAGE_KEY = 'lgpd_consent_v1';
const VERSION = '1.0';

interface StoredConsent {
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

  const t = useTranslations('lgpd');

  const show = stored !== 'ssr' && !stored && !dismissed;

  function persist(categories: { analytics: boolean; marketing: boolean }) {
    const value: StoredConsent = { ...categories, ts: Date.now(), version: VERSION };
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
      className="bg-card fixed right-0 bottom-0 left-0 z-50 border-t p-4 shadow-lg"
    >
      <p className="text-sm">{t('banner.text')}</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => persist({ analytics: true, marketing: true })}
          className="bg-primary text-primary-foreground rounded px-4 py-2"
        >
          {t('banner.acceptAll')}
        </button>
        <button
          type="button"
          onClick={() => persist({ analytics: false, marketing: false })}
          className="rounded border px-4 py-2"
        >
          {t('banner.rejectNonEssential')}
        </button>
      </div>
    </div>
  );
}

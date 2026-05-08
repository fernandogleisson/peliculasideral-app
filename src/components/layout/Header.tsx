import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function Header() {
  const t = useTranslations('common');
  return (
    <header className="bg-background sticky top-0 z-10 border-b p-3">
      <Link href="/eu" className="font-bold">
        {t('appName')}
      </Link>
    </header>
  );
}

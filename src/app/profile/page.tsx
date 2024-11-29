'use client';

import useCurrentSession from '@/hooks/useCurrentSession';
import { useTranslations } from 'next-intl';

export default function Page() {
  const { session } = useCurrentSession();

  const t = useTranslations('HomePage');

  return (
    <div>
      <h1>{t('title')}</h1>
      <pre>
        <code>{session ? JSON.stringify(session, null, 2) : 'No session'}</code>
      </pre>
    </div>
  );
}

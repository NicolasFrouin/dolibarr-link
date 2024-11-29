import { auth } from '@/auth';
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const session = await auth();

  const t = await getTranslations();

  return (
    <div className='h-[500vh]'>
      <h1>
        {t('HomePage.title')}
      </h1>
      <pre>
        <code className='font-mono'>
          {JSON.stringify(session, null, 2)}
        </code>
      </pre>
    </div>
  )

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-full p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <h1>{t('HomePage.title')}</h1>
        <sub>{t('HomePage.desc')}</sub>
        <div>
          <code>
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </code>
        </div>
      </main>
    </div>
  );
}

'use client';

import { logout } from '@/actions/auth';
import { UnstyledButton } from '@mantine/core';
import { Session } from 'next-auth';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { TbLogin, TbLogout } from 'react-icons/tb';

interface Props {
  session: Session | null;
  handleMobileLinkClick: () => void;
}

export default function AppLogButton({ session, handleMobileLinkClick }: Props) {
  const t = useTranslations('auth');

  if (!session) {
    return (
      <Link
        href='/login'
        onClick={handleMobileLinkClick}
        className='flex w-full items-center no-underline text-sm text-gray-700 dark:text-dark-100 py-xs px-md rounded-sm font-medium hover:bg-gray-50 dark:hover:bg-dark-400 hover:text-black dark:hover:text-white'
      >
        <TbLogin
          size={20}
          className='mr-xs'
        />
        {t('login')}
      </Link>
    );
  }

  return (
    <form action={() => logout()}>
      <UnstyledButton
        type='submit'
        className='flex w-full items-center no-underline text-sm text-gray-700 dark:text-dark-100 py-xs px-md rounded-sm font-medium hover:bg-gray-50 dark:hover:bg-dark-400 hover:text-black dark:hover:text-white'
      >
        <TbLogout
          size={20}
          className='mr-xs'
        />
        {t('logout')}
      </UnstyledButton>
    </form>
  );
}

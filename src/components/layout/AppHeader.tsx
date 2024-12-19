'use client';

import { Burger, Group } from '@mantine/core';
import Link from 'next/link';
import LocaleSelect from '../locale/LocaleSelect';
import ThemeSwitcher from '../theme/ThemeSwitcher';
import Image from 'next/image';

interface Props {
  mobileOpened: boolean;
  toggleMobile: () => void;
  desktopOpened: boolean;
  toggleDesktop: () => void;
}

export default function AppHeader({ mobileOpened, toggleMobile, desktopOpened, toggleDesktop }: Props) {
  return (
    <Group
      h='100%'
      px='md'
      justify='space-between'
    >
      <Group align='center'>
        <Burger
          opened={mobileOpened}
          onClick={toggleMobile}
          hiddenFrom='sm'
          size='sm'
        />
        <Burger
          opened={desktopOpened}
          onClick={toggleDesktop}
          visibleFrom='sm'
          size='sm'
        />
        <Link href='/'>
          <Image
            src={'https://upload.wikimedia.org/wikipedia/de/0/0f/BKW_Energie_logo.svg'}
            alt='BKW Energie logo'
            width={150}
            height={35}
          />
        </Link>
      </Group>
      <Group>
        <ThemeSwitcher />
        <LocaleSelect />
      </Group>
    </Group>
  );
}

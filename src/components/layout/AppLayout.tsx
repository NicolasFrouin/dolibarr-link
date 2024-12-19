'use client';

import { AppShell } from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import { Session } from 'next-auth';
import AppNavbar from './AppNavbar';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

export default function AppLayout({
  session,
  children,
}: Readonly<{ session: Session | null; children: React.ReactNode }>) {
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const pinned = useHeadroom({ fixedAt: 30 });

  const handleMobileLinkClick = () => {
    if (mobileOpened) closeMobile();
  };

  return (
    <AppShell
      padding='md'
      header={{ height: 60, collapsed: !pinned }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      layout='alt'
    >
      <AppShell.Header className='bg-gray-900'>
        <AppHeader
          mobileOpened={mobileOpened}
          toggleMobile={toggleMobile}
          desktopOpened={desktopOpened}
          toggleDesktop={toggleDesktop}
        />
      </AppShell.Header>
      <AppShell.Navbar
        p='md'
        className='bg-dark-600'
      >
        <AppNavbar
          session={session}
          handleMobileLinkClick={handleMobileLinkClick}
        />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer className='bg-gray-900'>
        <AppFooter />
      </AppShell.Footer>
    </AppShell>
  );
}

'use client';

import { AppShellSection, Box, Divider, ScrollArea, Stack } from '@mantine/core';
import { Session } from 'next-auth';
import NavLinkGroup from './NavLinkGroup';
import { routes, UnpackedRoutes } from './routes';
import AppLogButton from './AppLogButton';
import { Route } from '@/types/helpers';

interface Props {
  session: Session | null;
  handleMobileLinkClick: () => void;
}

export default function AppNavbar({ session, handleMobileLinkClick }: Props) {
  const visibleRoutes = (routes as (UnpackedRoutes & Route)[]).filter((item) => {
    if (item.constraint) {
      return item.constraint({ session });
    }
    return true;
  });

  return (
    <>
      <AppShellSection
        component={ScrollArea}
        className='flex-grow'
      >
        <Stack gap={0}>
          {visibleRoutes.map((item, i) => (
            <NavLinkGroup
              key={`${item.label}-${i}`}
              handleMobileLinkClick={handleMobileLinkClick}
              navLink={item}
            />
          ))}
        </Stack>
      </AppShellSection>
      <AppShellSection>
        <Divider />
        <Box p='md'>
          <AppLogButton
            session={session}
            handleMobileLinkClick={handleMobileLinkClick}
          />
        </Box>
      </AppShellSection>
    </>
  );
}

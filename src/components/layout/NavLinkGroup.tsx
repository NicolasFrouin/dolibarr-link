'use client';

import { Box, Collapse, Group, Stack, ThemeIcon, UnstyledButton } from '@mantine/core';
import { FaAngleRight } from 'react-icons/fa6';
import Link from 'next/link';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import { UnpackedRoutes } from './routes';
import { Route } from '@/types/helpers';
import { usePathname } from 'next/navigation';

interface Props {
  navLink: UnpackedRoutes & Route;
  handleMobileLinkClick: () => void;
}

export default function NavLinkGroup({
  navLink: { icon: Icon, label, initiallyOpened, link, links },
  handleMobileLinkClick,
}: Props) {
  const pathname = usePathname();
  const hasLinks = Array.isArray(links);
  const t = useTranslations('routes');
  const [opened, { toggle }] = useDisclosure(hasActiveItem() || initiallyOpened || false);

  function hasActiveItem() {
    if (!links) return false;
    return links.some((item) => pathname === item.link);
  }

  const items = (hasLinks ? links : []).map((item) => (
    <UnstyledButton
      component={Link}
      onClick={handleMobileLinkClick}
      data-active={pathname === item.link}
      className='font-medium block no-underline py-xs px-md pl-md ml-xl text-sm text-gray-700 dark:text-dark-50 border-l border-l-gray-300 dark:border-l-dark-400 border-solid hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-black dark:hover:text-dark-50 data-[active=true]:bg-gray-800 data-[active=true]:font-bold'
      href={item.link}
      key={item.label}
    >
      {t(item.label)}
    </UnstyledButton>
  ));

  return (
    <>
      <UnstyledButton
        component={link ? Link : undefined}
        href={(link ? link : null) as string}
        onClick={link ? handleMobileLinkClick : toggle}
        data-active={Boolean(link) && pathname === link}
        className={
          'font-medium block w-full py-xs px-md text-white text-sm hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-black dark:hover:text-dark-50 rounded-md data-[active=true]:bg-gray-800 data-[active=true]:font-bold'
        }
      >
        <Group
          justify='space-between'
          gap={0}
        >
          <Box
            display='flex'
            className='items-center'
          >
            <ThemeIcon
              variant='light'
              size={30}
            >
              <Icon size={18} />
            </ThemeIcon>
            <Box ml='md'>{t(label)}</Box>
          </Box>
          {hasLinks && (
            <FaAngleRight
              className={'transition-transform ease-in-out duration-200' + (opened ? ' rotate-90' : '')}
              size={16}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? (
        <Collapse
          in={opened}
          mb={4}
        >
          <Stack gap={0}>{items}</Stack>
        </Collapse>
      ) : null}
    </>
  );
}

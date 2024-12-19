'use client';

import { app } from '@/lib/app';
import {
  ActionIcon,
  Anchor,
  Button,
  ButtonProps,
  Group,
  Menu,
  rem,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import { CgMore } from 'react-icons/cg';

export default function AppFooter() {
  const mobile_match = useMediaQuery('(max-width: 425px)');
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const BUTTON_PROPS: ButtonProps = {
    variant: 'subtle',
    style: {
      padding: `${rem(8)} ${rem(12)}`,
      color: colorScheme === 'dark' ? theme.white : theme.black,

      '&:hover': {
        transition: 'all ease 150ms',
        backgroundColor: colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
        textDecoration: 'none',
      },
    },
  };

  return (
    <Group
      justify='space-between'
      px={8}
    >
      {mobile_match ? (
        <Menu
          shadow='md'
          width={200}
          position='right-end'
        >
          <Menu.Target>
            <ActionIcon>
              <CgMore size={18} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>Support</Menu.Item>
            <Menu.Item>Help Center</Menu.Item>
            <Menu.Item>Privacy</Menu.Item>
            <Menu.Item>Terms of Use</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Group
          gap={4}
          h={48}
        >
          <Button {...BUTTON_PROPS}>Support</Button>
          <Button {...BUTTON_PROPS}>Help Center</Button>
          <Button {...BUTTON_PROPS}>Privacy</Button>
          <Button {...BUTTON_PROPS}>Terms of Use</Button>
        </Group>
      )}
      <Anchor
        c='dimmed'
        fz='sm'
        component={Link}
        href={app.link}
        target='_blank'
      >
        &copy;&nbsp;{new Date().getFullYear()}&nbsp;{app.name}
      </Anchor>
    </Group>
  );
}

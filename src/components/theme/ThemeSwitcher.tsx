'use client';

import { CheckIcon, Menu, ThemeIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { BiMoon, BiSun } from 'react-icons/bi';

const colorSchems = ['light', 'dark', 'auto'] as const;

export default function ThemeSwitcher() {
  const { colorScheme: currentColorScheme, setColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme();
  const t = useTranslations('theme');

  return (
    <Menu>
      <Menu.Target>
        <ThemeIcon
          variant='filled'
          color='gray'
          className='cursor-pointer'
        >
          {colorScheme === 'light' ? <BiSun /> : <BiMoon />}
        </ThemeIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {colorSchems.map((scheme) => (
          <Menu.Item
            key={scheme}
            onClick={() => setColorScheme(scheme)}
            leftSection={currentColorScheme === scheme ? <CheckIcon size={14} /> : null}
          >
            {t(scheme)}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

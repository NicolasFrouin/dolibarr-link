'use client';

import { setUserLocale } from '@/actions/locale';
import { Locale, locales } from '@/i18n/config';
import { CheckIcon, Menu, ThemeIcon } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { useLocale, useTranslations } from 'next-intl';
import { BsTranslate } from 'react-icons/bs';

export default function LocaleSelect() {
  const t = useTranslations('locale');
  const currentLocale = useLocale();
  const [locale, setLocale] = useInputState<string>(currentLocale as Locale);

  const handleLocaleChange = (value: string | null) => {
    if (!value) return;

    value = value?.trim().toLowerCase();

    if (!value || locales.indexOf(value as Locale) === -1) return;

    setLocale(value as Locale);
    setUserLocale(value as Locale);
  };

  return (
    <Menu>
      <Menu.Target>
        <ThemeIcon
          variant='filled'
          color='gray'
          radius='sm'
          className='cursor-pointer'
        >
          <BsTranslate />
        </ThemeIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {locales.map((item) => (
          <Menu.Item
            key={item}
            onClick={() => handleLocaleChange(item)}
            leftSection={item === locale ? <CheckIcon size={14} /> : null}
          >
            {t(item)}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

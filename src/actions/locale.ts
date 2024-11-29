'use server';

import { defaultLocale, Locale } from '@/i18n/config';
import { parse } from 'accept-language-parser';
import { cookies, headers } from 'next/headers';

export async function getUserLocale() {
  const userDefaultLocale = (await headers()).get('accept-language');
  const localeToParse = (await cookies()).get('NEXT_LOCALE')?.value || userDefaultLocale || defaultLocale;

  return parse(localeToParse)[0].code ?? defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  return (await cookies()).set('NEXT_LOCALE', locale);
}

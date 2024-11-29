import { pick } from 'accept-language-parser';
import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import deepmerge from 'deepmerge';
import { defaultLocale, formats, locales } from './config';

export default getRequestConfig(async () => {
  const userDefaultLocale = (await headers()).get('accept-language');
  const localeToParse = (await cookies()).get('NEXT_LOCALE')?.value || userDefaultLocale || defaultLocale;

  const locale = pick([...locales], localeToParse) ?? defaultLocale;

  const userMessages = (await import(`../messages/${locale}.json`)).default;
  const defualtMessages = (await import(`../messages/en.json`)).default;

  const messages = deepmerge(defualtMessages, userMessages);

  return { locale, messages, formats };
});

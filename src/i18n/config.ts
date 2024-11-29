import { Formats } from 'next-intl';

export const locales = ['en', 'fr'] as const;
export const defaultLocale: Locale = 'en';

export type Locale = (typeof locales)[number];

export const formats: Formats = {};
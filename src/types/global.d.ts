/* eslint-disable @typescript-eslint/no-empty-object-type */

import { formats } from '@/i18n/request';
import en from '@/messages/en.json';

type Messages = typeof en;
type Formats = typeof formats;

declare global {
  interface IntlMessages extends Messages {}
  interface IntlFormats extends Formats {}
}

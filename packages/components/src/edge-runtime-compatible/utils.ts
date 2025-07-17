import type { NextRequest } from 'next/server';

import { DEFAULT_LANGUAGE, LOCALES } from './constants';

/** Get the preferred locale, similar to above or using a library */
function getLocaleFromPathname(pathname: string) {
  const pattern = `^/?(?<locale>${LOCALES.join('|')})/?`;
  const match = pathname.match(new RegExp(pattern, 'i'));
  return match?.groups?.locale;
}

export function getLocale(req: NextRequest) {
  const { pathname } = new URL(req.url);
  return getLocaleFromPathname(pathname) ?? DEFAULT_LANGUAGE;
}

import { APP_LANGUAGES, DEFAULT_LANGUAGE } from '../constants';

/** Get the preferred locale, similar to above or using a library */
export default function getLocaleFromPathname(pathname: string) {
  const pattern = `^/?(?<locale>${APP_LANGUAGES.join('|')})/?`;
  const match = pathname.match(new RegExp(pattern, 'i'));
  return match?.groups?.locale ?? DEFAULT_LANGUAGE;
}

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { DEFAULT_LANGUAGE, LOCALES } from '../constants';
import { getLocale } from '../utils';

export type DefaultMatchesType = {
  firstLocale?: string;
  secondLocale?: string;
};

function isPathnameMissingLocale(pathname: string) {
  return LOCALES.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) &&
      pathname !== `/${locale}` &&
      // The root in default locale does not have a locale set
      pathname !== '/'
  );
}

function getLocaleMatchesFromPathname(pathname: string): DefaultMatchesType {
  const doubleLocalePrefix =
    /^\/(?<firstLocale>fi|en|sv)\/(?<secondLocale>fi|en|sv)\//;
  return (
    pathname.match(doubleLocalePrefix)?.groups || {
      firstLocale: undefined,
      secondLocale: undefined,
    }
  );
}

/**
 * Enforce prefix for default locale 'fi'
 * https://github.com/vercel/next.js/discussions/18419
 * @param req
 */
const prefixDefaultLocale = async (req: NextRequest) => {
  const url = new URL(req.url);
  const { pathname, search } = req.nextUrl;
  const locale = getLocale(req);
  // Check if there is any supported locale in the pathname
  const nextUrlPathnameIsMissingLocale = isPathnameMissingLocale(pathname);
  const requestUrlPathnameIsMissingLocale = isPathnameMissingLocale(
    url.pathname
  );

  // The default locale needs to be redirected so that it uses the default language in URL.
  if (req.nextUrl.locale === 'default') {
    return NextResponse.redirect(
      new URL(`/${DEFAULT_LANGUAGE}${pathname}${search}`, req.url)
    );
  }

  // Redirect if there is no locale.
  // Redirect is not needed for the default language
  // If the current full request URL pathname is also missing the locale,
  // set the default language as a locale.
  if (
    nextUrlPathnameIsMissingLocale &&
    requestUrlPathnameIsMissingLocale &&
    locale !== DEFAULT_LANGUAGE
  ) {
    // e.g. incoming request is /haku
    // The new URL is now /fi/haku
    return NextResponse.redirect(
      new URL(`/${DEFAULT_LANGUAGE}${pathname}${search}`, req.url)
    );
  }

  const { firstLocale, secondLocale } = getLocaleMatchesFromPathname(pathname);

  // Remove the double locale prefix which might occur
  // when CMS content has an internal link to another locale context.
  // NOTE: The locale will be automatically added as a prefix to
  // the next URL by the NextJS (under the hood).
  // The request's locale attribute should be used for that.
  if (firstLocale && secondLocale && firstLocale !== secondLocale) {
    const nextPathname = pathname
      .replace(new RegExp(`^/${firstLocale}`), '')
      .replace(new RegExp(`^/${secondLocale}`), '');
    const nextUrl = new URL(`${nextPathname}${search}`, req.url);
    return NextResponse.redirect(nextUrl.href);
  }
};

export default prefixDefaultLocale;

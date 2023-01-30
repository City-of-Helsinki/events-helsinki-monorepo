// import { DEFAULT_LANGUAGE } from 'events-helsinki-components';
import stringifyUrlObject from 'events-helsinki-components/utils/stringifyUrlObject';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// TODO: For some reason middleware cannot read `'events-helsinki-components` package without breaking the build
const DEFAULT_LANGUAGE = 'fi';

const requestType = {
  isStaticFile: (req: NextRequest) => req.nextUrl.pathname.startsWith('/_next'),
  isPagesFolderApi: (req: NextRequest) =>
    req.nextUrl.pathname.includes('/api/'),
  // eslint-disable-next-line regexp/no-unused-capturing-group
  isPublicFile: (req: NextRequest) => /\.(.*)$/.test(req.nextUrl.pathname),
};

/**
 * Enforce prefix for default locale 'fi'
 * https://github.com/vercel/next.js/discussions/18419
 * @param req
 */
const prefixDefaultLocale = async (req: NextRequest) => {
  // stringify and map dynamic paths to segmented, ie: /venues/:id => /venues/[id]
  const path = stringifyUrlObject(req.nextUrl);

  if (req.nextUrl.locale === 'default') {
    return NextResponse.redirect(
      new URL(`/${DEFAULT_LANGUAGE}${path}`, req.url)
    );
  }
  if (!path.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(
      new URL(`/${req.nextUrl.locale}${path}`, req.url)
    );
  }
};

export async function middleware(req: NextRequest) {
  if (
    requestType.isStaticFile(req) ||
    requestType.isPagesFolderApi(req) ||
    requestType.isPublicFile(req)
  ) {
    return;
  }
  return prefixDefaultLocale(req);
}

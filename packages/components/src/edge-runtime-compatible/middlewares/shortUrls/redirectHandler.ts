import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getLocale } from '../../utils';
import { getRedirectFromCache } from './dynamicUrls';

export interface RedirectHandlerConfig {
  redirectCampaignRoutes?: Record<string, string>;
}

export class RedirectHandler {
  private redirectCampaignRoutes: Record<string, string>;

  constructor(config: RedirectHandlerConfig) {
    this.redirectCampaignRoutes = config.redirectCampaignRoutes ?? {};
  }

  /**
   * Handles dynamic and static redirects for an incoming request.
   * @param req Incoming request
   * @returns Redirect response or null if no redirect is needed
   */
  public handleRedirects(req: NextRequest): NextResponse | null {
    const { pathname, search } = req.nextUrl;

    // Handle dynamic CMS configured redirects
    const dynamicRedirectTo = getRedirectFromCache(pathname, getLocale(req));
    if (dynamicRedirectTo) {
      // eslint-disable-next-line no-console
      console.log(`Redirecting from ${pathname} to ${dynamicRedirectTo}`);
      return NextResponse.redirect(
        new URL(`${dynamicRedirectTo}${search}`, req.url)
      );
    }

    // @deprecated redirectCampaignRoutes
    // Let redirect routes through without prefixing them with locale
    if (Object.keys(this.redirectCampaignRoutes).includes(pathname)) {
      return NextResponse.redirect(new URL(pathname, req.url));
    }

    return null; // No redirect needed
  }
}

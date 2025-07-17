import {
  prefixDefaultLocale,
  RedirectHandler,
  shouldBypassMiddlewareAsStaticRequest,
  updateRedirectsCache,
} from '@events-helsinki/components/edge-runtime-compatible/middlewares';
import type { NextRequest } from 'next/server';

import redirectCampaignRoutes from '../redirectCampaignRoutes.config.mjs';

const redirectHandler = new RedirectHandler({
  redirectCampaignRoutes,
});

export async function middleware(req: NextRequest) {
  if (shouldBypassMiddlewareAsStaticRequest(req)) {
    return;
  }

  const redirectResponse = redirectHandler.handleRedirects(req);
  if (redirectResponse) {
    return redirectResponse;
  }

  return prefixDefaultLocale(req);
}

/**
 * Initialize redirects cache immediately and schedule its updating.
 */
setTimeout(updateRedirectsCache, 0);

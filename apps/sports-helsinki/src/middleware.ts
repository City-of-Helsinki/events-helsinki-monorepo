import type { NextRequest } from 'next/server';

import redirectCampaignRoutes from '../redirectCampaignRoutes.config.mjs';
import prefixDefaultLocale from './edge-runtime-compatible/middlewares/prefixDefaultLocale';
import {
  RedirectHandler,
  updateRedirectsCache,
} from './edge-runtime-compatible/middlewares/shortUrls';
import { shouldBypassMiddlewareAsStaticRequest } from './edge-runtime-compatible/middlewares/staticRequests';

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

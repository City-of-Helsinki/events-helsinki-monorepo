import {
  prefixDefaultLocale,
  shouldBypassMiddlewareAsStaticRequest,
} from '@events-helsinki/components/edge-runtime-compatible/middlewares';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  if (shouldBypassMiddlewareAsStaticRequest(req)) {
    return;
  }

  return prefixDefaultLocale(req);
}

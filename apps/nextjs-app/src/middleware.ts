import type { NextRequest } from 'next/server';

// TODO: For some reason middleware cannot read `'events-helsinki-components` package without breaking the build
// import { DEFAULT_LANGUAGE } from 'events-helsinki-components';

export async function middleware(req: NextRequest) {
  console.info('Now in middleware');
}

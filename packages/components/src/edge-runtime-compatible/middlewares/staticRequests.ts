import type { NextRequest } from 'next/server';

const imageExtensions = [
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.ico',
] as const;
const stylesAndJSExtensions = ['.css', '.js', '.map'] as const;
const textExtensions = ['.txt', '.xml', '.json', '.webmanifest'] as const;
const fontExtensions = ['.woff', '.woff2', '.ttf', '.otf', '.eot'] as const;
const audioExtensions = ['.mp3', '.wav', '.ogg'] as const;
const videoExtensions = ['.mp4', '.webm'] as const;

const PUBLIC_FILE_EXTENSIONS = [
  ...imageExtensions,
  ...stylesAndJSExtensions,
  ...textExtensions,
  ...fontExtensions,
  ...audioExtensions,
  ...videoExtensions,
] as const;

export const requestType = {
  isStaticFile: (req: NextRequest) => req.nextUrl.pathname.startsWith('/_next'),
  isPagesFolderApi: (req: NextRequest) =>
    req.nextUrl.pathname.includes('/api/'),
  isPublicFile: (req: NextRequest) => {
    const pathname = req.nextUrl.pathname;
    return (
      pathname.startsWith('/public/') ||
      PUBLIC_FILE_EXTENSIONS.some((ext) => pathname.endsWith(ext))
    );
  },
};

export function shouldBypassMiddlewareAsStaticRequest(req: NextRequest) {
  return (
    requestType.isStaticFile(req) ||
    requestType.isPagesFolderApi(req) ||
    requestType.isPublicFile(req)
  );
}

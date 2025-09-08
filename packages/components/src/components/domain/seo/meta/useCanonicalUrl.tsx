import { useRouter } from 'next/router';

export default function useCanonicalUrl(originProp?: string) {
  const { locale, asPath } = useRouter();
  // On the server, window is not available. This hook is used in components
  // that are rendered on the client side, where window.location.origin can be accessed.
  const origin =
    originProp ?? (typeof window !== 'undefined' ? window.location.origin : '');

  // First, remove query string, then remove a trailing slash if it's not the only character.
  let path = asPath.split('?')[0];
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  // remove locale from start
  if (path.startsWith(`/${locale}`)) {
    path = path.replace(`/${locale}`, '');
  }

  // The root path should not have a trailing slash, it should be an empty string
  // to avoid a double slash in the final URL.
  if (path === '/') {
    path = '';
  }
  return `${origin}/${locale}${path}`;
}

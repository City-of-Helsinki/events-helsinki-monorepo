import { parseRedirects } from './parseRedirects';
import { queryRedirects } from './queryRedirects';
import { stripLocale } from './stripLocale';
import { isObject, isStringOrNull } from './typeguards';
import type { Redirects } from './types';

/** Convert minutes to milliseconds. */
const minToMs = (minutes: number) => Math.round(minutes * 60 * 1000);

/**
 * The minimum and maximum interval for updating the redirects cache in milliseconds.
 * The interval is randomized to avoid all instances querying the CMS at the same time.
 * The default interval is 6–9min (i.e. a bit tighter 5–10min interval and <10min at max).
 */
const [MIN_REDIRECTS_UPDATE_INTERVAL_MS, MAX_REDIRECTS_UPDATE_INTERVAL_MS] = [
  Number(process.env.MIN_REDIRECTS_UPDATE_INTERVAL_MS) || minToMs(6),
  Number(process.env.MAX_REDIRECTS_UPDATE_INTERVAL_MS) || minToMs(9),
].sort(
  // Custom sort function to overcome Javascript's default sorting by string value
  (a, b) => a - b
);

// The cache for redirects fetched from the CMS
let _redirectsCache: Redirects = {};

/**
 * Get a random value using the Web Crypto API.
 * Compatible with Edge Runtime, see
 * https://vercel.com/docs/functions/runtimes/edge-runtime
 * @returns A random value between 0 and 2^32-1
 */
const getRandomValue = () => {
  const randomValues = new Uint32Array(1);
  crypto.getRandomValues(randomValues);
  return randomValues[0];
};

/**
 * Calculate the interval for updating the redirects cache.
 * The interval is randomized to avoid all instances querying the CMS at the same time.
 * @returns The interval in milliseconds, random value between
 * [MIN_REDIRECTS_UPDATE_INTERVAL_MS, MAX_REDIRECTS_UPDATE_INTERVAL_MS]
 */
const calculateRedirectsUpdateIntervalMs = () => {
  const minMs = MIN_REDIRECTS_UPDATE_INTERVAL_MS;
  const deltaMs =
    MAX_REDIRECTS_UPDATE_INTERVAL_MS - MIN_REDIRECTS_UPDATE_INTERVAL_MS;
  return minMs + (getRandomValue() % deltaMs);
};

/**
 * Set the redirects cache based on the given data.
 * @param data The data to set the redirects cache with
 *
 * Supports both successful and error responses from the CMS.
 *
 * Empty redirects for a language result in an error response,
 * but the non-empty redirects for some other language are still returned
 * nested under data['response']['data'].
 */
function setRedirectsCache(data: unknown): void {
  // Use TypeScript's type narrowing to check for type
  // (Complex type guards could easily break as TypeScript just believes them):
  //
  // type ErrorResponse = {
  //   response: {
  //     data: unknown;
  //   }
  // };
  if (
    isObject(data) &&
    isObject(data['response']) &&
    'data' in data['response']
  ) {
    // Unpack nested response data in case of error response
    setRedirectsCache(data.response.data);
    return;
  }

  // Use TypeScript's type narrowing to check for type
  // (Complex type guards could easily break as TypeScript just believes them):
  //
  // type RedirectsQueryResponse = {
  //   fi: { redirects: string | null };
  //   en: { redirects: string | null };
  //   sv: { redirects: string | null };
  // };
  if (
    isObject(data) &&
    isObject(data['fi']) &&
    isObject(data['en']) &&
    isObject(data['sv']) &&
    isStringOrNull(data['fi']['redirects']) &&
    isStringOrNull(data['en']['redirects']) &&
    isStringOrNull(data['sv']['redirects'])
  ) {
    const fiRedirects = parseRedirects(data.fi.redirects, 'fi');
    const enRedirects = parseRedirects(data.en.redirects, 'en');
    const svRedirects = parseRedirects(data.sv.redirects, 'sv');

    // Combine all redirects in order of priority:
    // 1. Finnish (i.e. overrides all others)
    // 2. English (i.e. overrides Swedish but not Finnish)
    // 3. Swedish (i.e. only fallback if neither Finnish nor English has a redirect)
    // i.e. first svRedirects are assigned to target, then enRedirects, last fiRedirects.
    _redirectsCache = Object.assign({}, svRedirects, enRedirects, fiRedirects);
  } else {
    // eslint-disable-next-line no-console
    console.error('Failed to parse CMS redirects, using old redirects', {
      data,
    });
  }
}

/**
 * Get a redirect from the cache.
 * @param pathname The pathname to get a redirect for
 * @param currentLocale The current locale
 * @returns The redirect if found, otherwise undefined, in the following order:
 * 1. Pathname with current locale
 * 2. Pathname (may or may not have a locale, which may or may not be the current locale)
 * 3. Pathname without locale
 */
export function getRedirectFromCache(
  pathname: string,
  currentLocale: string
): string | undefined {
  const pathnameWithoutLocale = stripLocale(pathname);
  const pathnameWithCurrentLocale = `/${currentLocale}${pathnameWithoutLocale}`;
  return (
    _redirectsCache[pathnameWithCurrentLocale] ||
    _redirectsCache[pathname] ||
    _redirectsCache[pathnameWithoutLocale]
  );
}

/**
 * Update the redirects cache by fetching the redirects from the CMS
 * and schedule the next cache update after a random interval.
 */
export function updateRedirectsCache() {
  // eslint-disable-next-line no-console
  console.log('Fetching redirects from CMS');

  queryRedirects().then(
    /** Handle successful response */
    setRedirectsCache,
    /**
     * Handle error response
     *
     * Empty redirects for a language raise an error,
     * but the non-empty redirects for some other language are still returned.
     *
     * The response data is nested under data['response']['data']
     */
    setRedirectsCache
  );

  // Schedule the next update after a random interval
  setTimeout(updateRedirectsCache, calculateRedirectsUpdateIntervalMs());
}

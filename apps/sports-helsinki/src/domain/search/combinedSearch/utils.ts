/**
 * In the combined search form, an user is searching both,
 * the venues and the events (and the events with 2 different types).
 * 1. The venues search is using Unified-Search and it's parameters.
 * 2. The events search is using Events-graphqql-proxy and it's parameters.
 * 3. There is a single form to control both the queries.
 *
 * Since a form queries with 1 set of fields from 2 different source
 * and 2 different sets of params, a transformation map is needed.
 * E.g a Q-parameter used by Unified-Search has the same use case
 * as the text-parameter in Events-proxy.
 */
export const TRANSFORM_MAP = new Map<string, string>([['q', 'text']]);

/**
 * Uses {@link TRANSFORM_MAP} to transfer the URL Search parameter keys.
 * @param searchParams the current URL search parameters
 * @returns a URLSearchParams object with transformed keys.
 */
export function transformedSearchVariables(
  searchParams: URLSearchParams
): URLSearchParams {
  const transformed = new URLSearchParams();
  for (const param of searchParams.keys()) {
    const value = searchParams.get(param);
    const transformedKey = TRANSFORM_MAP.get(param);
    if (value && transformedKey) {
      transformed.append(transformedKey, value);
    }
  }
  return transformed;
}

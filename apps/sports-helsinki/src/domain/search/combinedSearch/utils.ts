export const TRANSFORM_MAP = new Map<string, string>([['q', 'text']]);

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

/**
 * Type guard for validating an object.
 * @param value The value to validate
 * @return True if the value is an object, otherwise false
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof Set) &&
    !(value instanceof Map)
  );
}

/**
 * Type guard for validating a string or null.
 * @param value The value to validate
 * @return True if the value is a string or null, otherwise false
 */
export function isStringOrNull(value: unknown): value is string | null {
  return typeof value === 'string' || value === null;
}

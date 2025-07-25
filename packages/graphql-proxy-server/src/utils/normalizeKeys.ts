import memoize from 'lodash/memoize.js';

import normalizeKey from './normalizeKey.js';

const memoizedNormalizeKey = memoize(normalizeKey);

/**
 * Normalize complete object using snake case keys to a format that GraphQL supports
 * e.g
 * Before:
 *  {
 *    @id: "123",
 *    event_type: "foo",
 *    event_price: {
 *      is_free: false
 *    }
 *  }
 * After:
 *  {
 *    internalId: "123",
 *    eventType: "foo",
 *    eventPrice: {
 *      isFree: false
 *    }
 *  }
 */
const normalizeKeys = <T extends Record<string, unknown>>(
  value: T | T[]
): T | T[] => {
  if (Array.isArray(value)) {
    return value.map(normalizeKeys) as T[];
  }

  if (value && typeof value === 'object' && value.constructor === Object) {
    const obj: Record<string, unknown> = {};
    const keys = Object.keys(value);
    const len = keys.length;

    for (let i = 0; i < len; i += 1) {
      obj[memoizedNormalizeKey(keys[i])] = normalizeKeys(
        value[keys[i]] as Record<string, unknown>
      );
    }

    return obj as T;
  }

  return value;
};

export default normalizeKeys;

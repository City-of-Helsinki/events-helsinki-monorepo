import { isValidRedirectAddress } from './isValidRedirectAddress';
import { isObject } from './typeguards';
import type { AppLanguage, Redirects } from './types';

/**
 * Parses the redirect entries from the given object.
 * @param redirectsObject The redirects object to parse
 * @param language The language of the pages being redirected
 */
function redirectEntries(
  redirectsObject: NonNullable<object>,
  language: AppLanguage
): Redirects {
  const redirects: Redirects = {};
  for (const [key, value] of Object.entries(redirectsObject)) {
    if (isValidRedirectAddress(key) && isValidRedirectAddress(value)) {
      redirects[key] = value;
      if (!(key.startsWith(`/${language}/`) || key == `/${language}`)) {
        redirects[`/${language}${key}`] = value;
      }
    } else if (
      // Completely ignore {"": ""} mappings that can easily be created in CMS,
      // but give a warning about other invalid entries
      !(key == '' && value == '')
    ) {
      // eslint-disable-next-line no-console
      console.warn(`Ignoring invalid ${language} redirect: ${key} -> ${value}`);
    }
  }
  return redirects;
}

/**
 * Combines the redirect entries from the given array of objects into a single object.
 * @param redirectsArray The array of redirect entries to combine
 * @param language The language of the pages being redirected
 */
function combineArrayOfRedirectEntries(
  redirectsArray: Array<unknown>,
  language: AppLanguage
): Redirects {
  const redirects: Redirects = {};
  for (const elem of redirectsArray) {
    if (isObject(elem)) {
      Object.assign(redirects, redirectEntries(elem, language));
    }
  }
  return redirects;
}

/**
 * Parses the redirects JSON string into a redirects object.
 * @param encodedRedirects The encoded redirects JSON string
 * @param language The language of the redirects
 * @returns The parsed redirects object, or an empty object if the JSON is invalid
 */
export function parseRedirects(
  encodedRedirects: string | null | undefined,
  language: AppLanguage
): Redirects {
  if (!encodedRedirects) {
    return {};
  }

  let redirectsJson = null;

  try {
    redirectsJson = JSON.parse(encodedRedirects);
  } catch (error) {
    if (error instanceof SyntaxError) {
      // eslint-disable-next-line no-console
      console.error(`Failed to parse ${language} redirects JSON`, error);
      return {};
    } else {
      throw error;
    }
  }

  if (
    redirectsJson === null ||
    redirectsJson === undefined ||
    typeof redirectsJson !== 'object'
  ) {
    return {};
  } else if (Array.isArray(redirectsJson)) {
    return combineArrayOfRedirectEntries(redirectsJson, language);
  } else {
    return redirectEntries(redirectsJson, language);
  }
}

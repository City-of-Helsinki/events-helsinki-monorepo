import type { ResilientTranslationKey } from '../utils';
import { getResilientTranslation } from '../utils';
import useLocale from './useLocale';

/**
 * Use resilient translation which works also when an error occurs during an error.
 *
 * @returns {object} Object containing translation function for the current language in
 * property resilientT.
 * @example Used for making sure application name is translated on UnknownError page
 * even when next-i18next's translation fails.
 * @see https://github.com/i18next/next-i18next/issues/1020
 */
export default function useResilientTranslation(): {
  resilientT: (translationKey: ResilientTranslationKey) => string;
} {
  const currentLocale = useLocale();

  const resilientTranslation = (translationKey: ResilientTranslationKey) =>
    getResilientTranslation(translationKey, currentLocale);

  return { resilientT: resilientTranslation };
}

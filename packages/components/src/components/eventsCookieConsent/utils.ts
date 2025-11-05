import type { TFunction } from 'next-i18next';

type TFunctionOptions = Parameters<TFunction>[1];

/**
 * Creates a "dictionary builder" function.
 *
 * This is a higher-order function. You provide the list of locales and
 * the i18n `t` function once, and it returns a new function. This new
 * builder function can then be called repeatedly with different translation
 * keys to generate a dictionary mapping each locale to its translation.
 *
 * @example
 * const locales = ['en', 'es'];
 * const buildDict = createLocaleDictBuilder(locales, t);
 *
 * // 1. Simple usage
 * const titleDict = buildDict('page.title');
 * // -> { en: 'Page Title', es: 'Título de la Página' }
 *
 * // 2. Using a default value (if the key is missing)
 * const fallbackDict = buildDict('page.nonExistent', 'Default Text');
 * // -> { en: 'Default Text', es: 'Default Text' }
 *
 * // 3. Using interpolation
 * const welcomeDict = buildDict('common:welcome', { name: 'User' });
 * // -> { en: 'Welcome, User', es: 'Bienvenido, User' }
 *
 * @param {string[]} languageCodes - An array of locale strings (e.g., ['en', 'fr']).
 * @param {TFunction} t - The `next-i18next` translation function.
 * @returns {function(string, TFunctionOptions=): Record<string, string>} A new function
 * that builds a locale dictionary for a given key, optionally
 * accepting translation options.
 */
export const createLocaleDictBuilder = (
  languageCodes: string[],
  t: TFunction
) => {
  /**
   * Generates a dictionary mapping language codes to translations for a specific key.
   *
   * @param {string} translationKey - The i18n key to translate (e.g., 'common:hello').
   * @param {TFunctionOptions} [translationOptions] - Optional. A default value (string)
   * or an options object (e.g., for interpolation) to pass to the `t` function.
   * @returns {Record<string, string>} An object where keys are language codes
   * and values are the corresponding translations.
   */
  const buildLocaleDict = (
    translationKey: string,
    translationOptions?: TFunctionOptions
  ): Record<string, string> => {
    // Use reduce for a clean transformation.
    return languageCodes.reduce<Record<string, string>>((acc, lng) => {
      // Correctly merge options, handling both string (default value)
      // and object (interpolation, etc.) cases.
      // The `lng` property is essential to tell `t` which language to use for this iteration.
      const options =
        typeof translationOptions === 'string'
          ? { defaultValue: translationOptions, lng }
          : { ...translationOptions, lng };

      acc[lng] = t(translationKey, options);
      return acc;
    }, {});
  };

  return buildLocaleDict;
};

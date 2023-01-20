import accepts from 'accepts';
import type express from 'express';
import type ContextValue from '../context/ContextValue';
import isLocale from '../type-guards/is-locale';
import type { Locale } from '../types';
/**
 * Get an accepted language from the request header.
 * @param req express.Request
 * @param languages a list of languages that the datasource supports
 * @returns a requested language or undefined
 */
function acceptsLanguage<DataSources>(
  req: express.Request,
  languages: ContextValue<DataSources>['language'][]
): Locale | undefined {
  const accept = accepts(req);
  const language = accept.languages(languages as unknown as string[]);
  if (language && isLocale(language)) {
    return language;
  }
  return undefined;
}

export default acceptsLanguage;

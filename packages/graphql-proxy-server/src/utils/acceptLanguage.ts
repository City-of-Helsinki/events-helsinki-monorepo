import accepts from 'accepts';
import isAppLanguage from 'events-helsinki-components/src/type-guards/is-app-language';
import type { AppLanguage } from 'events-helsinki-components/src/types/types';
import type express from 'express';
import type ContextValue from '../context/ContextValue';
/**
 * Get an accepted language from the request header.
 * @param req express.Request
 * @param languages a list of languages that the datasource supports
 * @returns a requested language or undefined
 */
function acceptsLanguage<DataSources>(
  req: express.Request,
  languages: ContextValue<DataSources>['language'][]
): AppLanguage | undefined {
  const accept = accepts(req);
  const language = accept.languages(languages as string[]);
  if (isAppLanguage(language)) {
    return language;
  }
  return undefined;
}

export default acceptsLanguage;

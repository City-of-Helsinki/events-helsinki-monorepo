import type { ParsedUrlQuery, ParsedUrlQueryInput } from 'querystring';

import type { NextRouter } from 'next/router';
import qs from 'query-string';

// TODO: For some reason middleware cannot read `'events-helsinki-components` package without breaking the build
// import { DEFAULT_LANGUAGE, Language, SUPPORT_LANGUAGES } from 'events-helsinki-components';
import i18nRoutes from '../../i18nRoutes.config';
import { i18n } from '../../next-i18next.config';
import { DEFAULT_LANGUAGE, ROUTES } from '../constants';
import AppConfig from '../domain/app/AppConfig';
import { SUPPORT_LANGUAGES } from '../types';
import type { Language } from '../types';
import stringifyUrlObject from './stringifyUrlObject';

// dynamic path: /venues/:id
// segmented: /venues/[id]
// dynamic wildcard: /collection/:id*
// segmented wildcard: /collection[...slug]
function transformDynamicPathIntoSegmentedDynamicPath(path: string): string {
  return path
    .split('/')
    .map((part) => {
      if (!part.startsWith(':')) return part;
      // if [...]
      const partValue = part.slice(1);

      return partValue.endsWith('*')
        ? `[...${partValue.replace('*', '')}]`
        : `[${partValue}]`;
    })
    .join('/');
}

export function getI18nPath(route: string, locale: string): string {
  // English is the default language within code so it doesn't need transforming
  if (locale === SUPPORT_LANGUAGES.EN) {
    return route;
  }

  const i18nRewriteRules =
    Object.entries(i18nRoutes).find(
      ([routeKey]) =>
        transformDynamicPathIntoSegmentedDynamicPath(routeKey) === route
    )?.[1] ?? [];

  if (!i18nRewriteRules || i18nRewriteRules.length === 0) {
    return route;
  }

  const i18nRewriteRuleForCurrentLocale = i18nRewriteRules.find(
    (rewriteRule) => rewriteRule.locale === locale
  );

  if (!i18nRewriteRuleForCurrentLocale) {
    return route;
  }

  return transformDynamicPathIntoSegmentedDynamicPath(
    i18nRewriteRuleForCurrentLocale.source
  );
}

export function getLocaleOrError(locale: string | undefined): Language {
  if (typeof locale !== 'string' || !i18n.locales.includes(locale)) {
    throw Error(`Locale ${locale} is not supported`);
  }

  return locale as Language;
}

/**
 * If removeList is empty, the function removes all params from url.
 * @param {*} router
 * @param {*} removeList
 */
export const removeQueryParamsFromRouter = (
  router: NextRouter,
  removeList: string[] = [],
  forwardPath: SearchForwardPath = searchForwardPaths.search as SearchForwardPath
) => {
  const queryObject = { ...router.query };

  if (removeList.length > 0) {
    removeList.forEach((param) => delete router.query[param]);
  } else {
    // Remove all
    Object.keys(queryObject).forEach((param) => delete queryObject[param]);
  }
  router.replace(
    getLocalizedCmsItemUrl(
      forwardPath,
      {},
      (router.locale || router.defaultLocale) as Language
    ),
    undefined,
    /**
     * Do not refresh the page
     */
    { shallow: true }
  );
};

export function getParsedUrlQueryInput(search: string) {
  return qs.parse(search) as ParsedUrlQueryInput;
}

export function getLocalizedCmsItemUrl(
  pathname: string,
  query: ParsedUrlQuery,
  locale: Language
): string {
  return `${
    locale !== DEFAULT_LANGUAGE ? `/${locale}` : ''
  }${stringifyUrlObject({
    query: query,
    pathname: getI18nPath(pathname, locale),
  })}`;
}

/**
 * Rewrite the URLs with internal URLS.
 * @param apolloResponseData The fetch result in JSON format
 * @returns A JSON with manipulated content transformed with URLRewriteMapping
 */
export function rewriteInternalURLs(
  apolloResponseData: Record<string, unknown>
): typeof JSON.parse {
  let jsonText = JSON.stringify(apolloResponseData);
  for (const [search, replace] of Object.entries(AppConfig.URLRewriteMapping)) {
    jsonText = jsonText.replace(new RegExp(search, 'g'), replace);
  }
  return JSON.parse(jsonText);
}

export const searchForwardPaths = {
  search: ROUTES.SEARCH,
  courseSearch: ROUTES.COURSESEARCH,
};

export type SearchForwardPath = keyof typeof searchForwardPaths;

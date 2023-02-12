import type { ParsedUrlQuery, ParsedUrlQueryInput } from 'querystring';

import type { NextRouter } from 'next/router';
import qs from 'query-string';
import { DEFAULT_LANGUAGE } from '../../constants';
import isAppLanguage from '../../type-guards/is-app-language';
import type { AppLanguage } from '../../types';
import stringifyUrlObject from '../../utils/stringifyUrlObject';

type I18nRoute = {
  source: string;
  locale: AppLanguage | string;
};

export interface CmsRoutedApp {
  i18nRoutes: Record<string, I18nRoute[]>;
  locales: readonly AppLanguage[];
  URLRewriteMapping: { [x: string]: string };
}

export class CmsRoutedAppHelper {
  i18nRoutes;
  locales;
  URLRewriteMapping;

  constructor({ i18nRoutes, locales, URLRewriteMapping }: CmsRoutedApp) {
    this.i18nRoutes = i18nRoutes;
    this.locales = locales;
    this.URLRewriteMapping = URLRewriteMapping;
  }

  // dynamic path: /venues/:id
  // segmented: /venues/[id]
  // dynamic wildcard: /collection/:id*
  // segmented wildcard: /collection[...slug]
  transformDynamicPathIntoSegmentedDynamicPath(path: string): string {
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

  getI18nPath(route: string, locale: unknown): string {
    // English is the default language within code so it doesn't need transforming
    if (!isAppLanguage(locale) || locale === 'en') {
      return route;
    }

    const i18nRewriteRules =
      Object.entries(this.i18nRoutes).find(
        ([routeKey]) =>
          this.transformDynamicPathIntoSegmentedDynamicPath(routeKey) === route
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

    return this.transformDynamicPathIntoSegmentedDynamicPath(
      i18nRewriteRuleForCurrentLocale.source
    );
  }

  /**
   * If removeList is empty, the function removes all params from url.
   * @param {*} router
   * @param {*} removeList
   * @param forwardPath
   */
  removeQueryParamsFromRouter(
    router: NextRouter,
    removeList: string[] = [],
    forwardPath: string
  ) {
    const queryObject = { ...router.query };

    if (removeList.length > 0) {
      removeList.forEach((param) => delete queryObject[param]);
    } else {
      // Remove all
      Object.keys(queryObject).forEach((param) => delete queryObject[param]);
    }
    const cleanedUrl = this.getLocalizedCmsItemUrl(
      forwardPath, // FIXME: Could this be taken from the router.asPath?
      queryObject,
      (router.locale || router.defaultLocale) as AppLanguage
    );
    router.replace(
      cleanedUrl,
      undefined,
      /**
       * Do not refresh the page
       */
      { shallow: true }
    );
  }

  getParsedUrlQueryInput(search: string) {
    return qs.parse(search) as ParsedUrlQueryInput;
  }

  getLocalizedCmsItemUrl(
    pathname: string,
    query: ParsedUrlQuery,
    locale: AppLanguage
  ): string {
    return `${
      locale !== DEFAULT_LANGUAGE ? `/${locale}` : ''
    }${stringifyUrlObject({
      query: query,
      pathname: this.getI18nPath(pathname, locale),
    })}`;
  }

  /**
   * Rewrite the URLs with internal URLS.
   * @param apolloResponseData The fetch result in JSON format
   * @returns A JSON with manipulated content transformed with URLRewriteMapping
   */
  rewriteInternalURLs(
    apolloResponseData: Record<string, unknown>
  ): typeof JSON.parse {
    let jsonText = JSON.stringify(apolloResponseData);
    for (const [search, replace] of Object.entries(this.URLRewriteMapping)) {
      jsonText = jsonText.replace(new RegExp(search, 'g'), replace);
    }
    return JSON.parse(jsonText);
  }
}

import type {
  ArticleType,
  NavigationProps,
  PageType,
} from '@city-of-helsinki/react-helsinki-headless-cms';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useCmsHelper, useCmsRoutedAppHelper } from '../../cmsHelperProvider';
import { DEFAULT_LANGUAGE } from '../../constants';
import isAppLanguage from '../../type-guards/is-app-language';
import type { AppLanguage } from '../../types';

export default function useGetPathnameForLanguage(
  page?: PageType | ArticleType
): NavigationProps['getPathnameForLanguage'] {
  const { pathname: currentPage, query } = useRouter();

  const cmsHelper = useCmsHelper();
  const routerHelper = useCmsRoutedAppHelper();

  // router.query has no query parameters, even if the current URL does when serving
  // server-side generated pages. Simply using window.location.search always when
  // available broke e.g. /courses/[eventId] URL part so that the [eventId] part didn't
  // get replaced with the actual event ID. Merging both query sources worked better.
  const getCurrentParsedUrlQuery = useCallback(
    () => ({
      ...query,
      ...(window
        ? Object.fromEntries(new URLSearchParams(window.location.search))
        : {}),
    }),
    [query]
  );

  return ({ slug }) => {
    const appLanguage: AppLanguage = isAppLanguage(slug)
      ? slug
      : DEFAULT_LANGUAGE;
    const translatedPage = (page?.translations as PageType[])?.find(
      (translation) => translation?.language?.slug === slug
    );
    return routerHelper.getLocalizedCmsItemUrl(
      currentPage,
      translatedPage
        ? {
            slug:
              cmsHelper.getSlugFromUri(
                cmsHelper.removeContextPathFromUri(translatedPage.uri)
              ) ?? '',
          }
        : getCurrentParsedUrlQuery(),
      appLanguage
    );
  };
}

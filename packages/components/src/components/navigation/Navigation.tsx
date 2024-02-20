import { resolveHref } from 'next/dist/shared/lib/router/utils/resolve-href'; // NOTE: in Next 14 this is located in: 'next/dist/client/resolve-href' -- https://github.com/vercel/next.js/discussions/22025
import { useRouter } from 'next/router';

import { useCallback, useContext } from 'react';
import type { ArticleType, PageType } from 'react-helsinki-headless-cms';
import {
  Navigation as RHHCNavigation,
  isLanguage,
} from 'react-helsinki-headless-cms';
import {
  Notification,
  useLanguagesQuery,
} from 'react-helsinki-headless-cms/apollo';
import { useCmsHelper, useCmsRoutedAppHelper } from '../../cmsHelperProvider';
import { useLocale } from '../../hooks';
import { NavigationContext } from '../../navigationProvider';
import type { AppLanguage, Language, Menu } from '../../types';
import styles from './navigation.module.scss';

type NavigationProps = {
  page?: PageType | ArticleType;
  menu?: Menu;
  universalBarMenu?: Menu;
  languages?: Language[];
};

export default function Navigation({
  page,
  menu,
  universalBarMenu,
  languages: forcedLanguages, // FIXME: This is here only to skip the Apollo query and so the issues in the Error page
}: NavigationProps) {
  const { headerMenu, headerUniversalBarMenu, languages } =
    useContext(NavigationContext);
  const router = useRouter();
  const { pathname: currentPage, asPath: currentPageAsPath } = router;
  const locale = useLocale();
  const cmsHelper = useCmsHelper();
  const routerHelper = useCmsRoutedAppHelper();
  const languagesQuery = useLanguagesQuery({
    skip: !!languages || !!forcedLanguages,
  });
  const languageOptions =
    forcedLanguages ??
    languages ??
    languagesQuery.data?.languages?.filter(isLanguage);

  // router.query has no query parameters, even if the current URL does when serving
  // server-side generated pages. Simply using window.location.search always when
  // available broke e.g. /courses/[eventId] URL part so that the [eventId] part didn't
  // get replaced with the actual event ID. Merging both query sources worked better.
  const getCurrentParsedUrlQuery = useCallback(
    () => ({
      ...router.query,
      ...(window
        ? Object.fromEntries(new URLSearchParams(window.location.search))
        : {}),
    }),
    [router.query]
  );
  return (
    <>
      <RHHCNavigation
        languages={languageOptions}
        menu={menu ?? headerMenu}
        universalBarMenu={universalBarMenu ?? headerUniversalBarMenu}
        className={styles.topNavigation}
        onTitleClick={() => {
          router.push('/');
        }}
        getIsItemActive={({ path }) => {
          const pathWithoutTrailingSlash = (path ?? '').replace(/\/$/, '');
          const i18nRouterPathname = routerHelper.getI18nPath(
            currentPage,
            locale
          );
          const i18nRouterAsPath = routerHelper.getI18nPath(
            currentPageAsPath,
            locale
          );
          const [, resolvedUrl] = resolveHref(
            router,
            { pathname: router.pathname, query: router.query },
            true
          );
          const resolvedPathname = resolvedUrl?.split('?')[0];
          return Boolean(
            // The router.pathname needs to be checked when dealing with "statically routed page".
            pathWithoutTrailingSlash === i18nRouterPathname ||
              pathWithoutTrailingSlash === `/${locale}${i18nRouterPathname}` ||
              // The pathname may or may not contain the i18n version of the menu item path
              pathWithoutTrailingSlash === resolvedPathname ||
              pathWithoutTrailingSlash === `/${locale}${resolvedPathname}` ||
              // Since the menu can contain subitems in a dropdown, the parent items needs to be checked too.
              // NOTE: We are now assuming that all the parent items are also real parent pages.
              (path &&
                (i18nRouterAsPath.startsWith(path) ||
                  resolvedPathname?.startsWith(path)))
          );
        }}
        getPathnameForLanguage={({ slug }) => {
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
            slug as AppLanguage
          );
        }}
      />
      {/* CMS notification banner */}
      <Notification />
    </>
  );
}

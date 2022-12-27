import { useLocale, useRouterFromConfig } from 'events-helsinki-components';
import type { AppLanguage } from 'events-helsinki-components';
import type { ArticleType, PageType } from 'react-helsinki-headless-cms';
import { Navigation as RHHCApolloNavigation } from 'react-helsinki-headless-cms/apollo';

import { DEFAULT_HEADER_MENU_NAME } from '../../../constants';
import {
  getI18nPath,
  getLocalizedCmsItemUrl,
} from '../../../utils/routerUtils';
import {
  getSlugFromUri,
  removeContextPathFromUri,
} from '../../utils/headless-cms/headlessCmsUtils';
import styles from './navigation.module.scss';

type NavigationProps = {
  page?: PageType | ArticleType;
};

export default function Navigation({ page }: NavigationProps) {
  const router = useRouterFromConfig();
  const locale = useLocale();
  const navigationMenuName = DEFAULT_HEADER_MENU_NAME[locale];
  const currentPage = router.pathname;

  return (
    <RHHCApolloNavigation
      className={styles.topNavigation}
      menuName={navigationMenuName ?? ''}
      onTitleClick={() => {
        router.push('/');
      }}
      getIsItemActive={({ path }) => {
        return (
          path === getI18nPath(currentPage, locale) ||
          path === `/${locale}${getI18nPath(currentPage, locale)}`
        );
      }}
      getPathnameForLanguage={({ slug }) => {
        const translatedPage = (page?.translations as PageType[])?.find(
          (translation) => translation?.language?.slug === slug
        );
        return getLocalizedCmsItemUrl(
          currentPage,
          translatedPage
            ? {
                slug:
                  getSlugFromUri(
                    removeContextPathFromUri(translatedPage.uri)
                  ) ?? '',
              }
            : router.query,
          slug as AppLanguage
        );
      }}
    />
  );
}

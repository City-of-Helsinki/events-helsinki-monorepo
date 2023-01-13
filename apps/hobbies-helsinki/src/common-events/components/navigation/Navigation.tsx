import { useLocale } from 'events-helsinki-components';
import type { AppLanguage, Menu, Language } from 'events-helsinki-components';
import { useRouter } from 'next/router';
import type { ArticleType, PageType } from 'react-helsinki-headless-cms';
import {
  Navigation as RHHCNavigation,
  isLanguage,
} from 'react-helsinki-headless-cms';
import {
  useMenuQuery,
  useLanguagesQuery,
} from 'react-helsinki-headless-cms/apollo';
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
  menu?: Menu;
  languages?: Language[];
};

export default function Navigation({ page, menu, languages }: NavigationProps) {
  const router = useRouter();
  const locale = useLocale();
  const navigationMenuName = DEFAULT_HEADER_MENU_NAME[locale];
  const currentPage = router.pathname;
  const languagesQuery = useLanguagesQuery({ skip: !!languages });
  const languageOptions =
    languages ?? languagesQuery.data?.languages?.filter(isLanguage);
  const { data: headerMenuData } = useMenuQuery({
    skip: !!menu,
    variables: {
      id: navigationMenuName,
    },
  });
  const headerMenu = menu ?? headerMenuData?.menu;

  return (
    <RHHCNavigation
      languages={languageOptions}
      menu={headerMenu}
      className={styles.topNavigation}
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

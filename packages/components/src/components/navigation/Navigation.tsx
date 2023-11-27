import { useRouter } from 'next/router';
import { useContext } from 'react';
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
  const locale = useLocale();
  const cmsHelper = useCmsHelper();
  const routerHelper = useCmsRoutedAppHelper();
  const currentPage = router.pathname;
  const languagesQuery = useLanguagesQuery({
    skip: !!languages || !!forcedLanguages,
  });
  const languageOptions =
    forcedLanguages ??
    languages ??
    languagesQuery.data?.languages?.filter(isLanguage);

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
          return (
            path === routerHelper.getI18nPath(currentPage, locale) ||
            path ===
              `/${locale}${routerHelper.getI18nPath(currentPage, locale)}`
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
              : router.query,
            slug as AppLanguage
          );
        }}
      />
      {/* CMS notification banner */}
      <Notification />
    </>
  );
}

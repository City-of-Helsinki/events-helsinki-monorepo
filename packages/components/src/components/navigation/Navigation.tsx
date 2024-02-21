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
import { NavigationContext } from '../../navigationProvider';
import type { Language, Menu } from '../../types';
import styles from './navigation.module.scss';
import useGetItemIsActive from './useGetIsItemActive';
import useGetPathnameForLanguage from './useGetPathnameForLanguage';

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
  const getIsItemActive = useGetItemIsActive();
  const getPathnameForLanguage = useGetPathnameForLanguage(page);
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
        getIsItemActive={getIsItemActive}
        getPathnameForLanguage={getPathnameForLanguage}
      />
      {/* CMS notification banner */}
      <Notification />
    </>
  );
}

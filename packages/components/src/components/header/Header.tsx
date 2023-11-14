import classNames from 'classnames';
import type { LanguageOption, LogoProps } from 'hds-react';
import { Header as HDSHeader, Logo, logoFi, logoSv } from 'hds-react';
import { groupBy } from 'lodash';
import { useRouter } from 'next/router';
import type { FunctionComponent } from 'react';
import React, { useContext } from 'react';
import type {
  PageType,
  ArticleType,
  Config,
} from 'react-helsinki-headless-cms';
import { isLanguage, useConfig } from 'react-helsinki-headless-cms';
import { useLanguagesQuery } from 'react-helsinki-headless-cms/apollo';
import { useCmsHelper, useCmsRoutedAppHelper } from '../../cmsHelperProvider';
import { DEFAULT_HEADER_MENU_NAME, MAIN_CONTENT_ID } from '../../constants';
import { useCommonTranslation } from '../../hooks';
import useLocale from '../../hooks/useLocale';
import { NavigationContext } from '../../navigationProvider';
import type { Language, LanguageCodeEnum, AppLanguage } from '../../types';
import { useMenuHierarchyQuery } from '../../types';
import styles from './header.module.scss';
import type { Menu, MenuItem } from './menuQuery';

const LOGO_ARIA_LABELS = {
  EN: 'City of Helsinki',
  FI: 'Helsingin kaupunki',
  SV: 'Helsingfors stad',
} as const satisfies Record<LanguageCodeEnum, string>;

const LOGO_LABELS = {
  EN: 'Helsinki',
  FI: 'Helsinki',
  SV: 'Helsingfors',
} as const satisfies Record<LanguageCodeEnum, string>;

const LOGO_SOURCES = {
  EN: logoFi,
  FI: logoFi,
  SV: logoSv,
} as const satisfies Record<LanguageCodeEnum, string>;

/**
 * Find language from language list by language code.
 * @param {Language[]} languages - List of languages
 * @param {string} languageCode - Language code
 * @returns {Language | undefined} Language from given language list with the given
 *                                 language code or undefined if not found
 */
function findLanguage(
  languages: NonNullLanguage[],
  languageCode: string
): NonNullLanguage | undefined {
  return languages.find(
    (language) => language.code.toLowerCase() === languageCode.toLowerCase()
  );
}

export type HCRCHeaderProps = {
  menu?: Menu;
  universalBarMenu?: Menu;
  languages?: Language[];
  className?: string;
  userNavigation?: React.ReactNode;
  onTitleClick: () => void;
  getPathnameForLanguage: (
    language: Language,
    currentLanguage: Language,
    allLanguages: Language[]
  ) => string;
  getIsItemActive?: (menuItem: MenuItem) => boolean;
};

type NonNullLanguage = Exclude<Language, 'code' | 'name'> & {
  code: NonNullable<Language['code']>;
} & { name: NonNullable<Language['name']> };

const nonNullLanguage = (
  language?: Language | null
): language is NonNullLanguage => {
  return Boolean(language?.name && language?.code);
};

interface MenuIdToChildItemsLookupDictionary {
  [parentId: string]: MenuItem[];
}

export type HeaderMenuHierarchyLinkProps = {
  menuItemChildren?: MenuIdToChildItemsLookupDictionary;
  navigationItem: MenuItem;
  getRoutedInternalHref: Config['utils']['getRoutedInternalHref'];
  getIsItemActive: HCRCHeaderProps['getIsItemActive'];
  A: Config['components']['A'];
};

function createHeaderMenuHierarchyLinkElement({
  menuItemChildren,
  navigationItem,
  getRoutedInternalHref,
  getIsItemActive,
  A,
}: HeaderMenuHierarchyLinkProps) {
  return (
    <HDSHeader.Link
      as={A}
      id={navigationItem.id}
      key={navigationItem.id}
      title={navigationItem.title ?? undefined}
      label={navigationItem.label ?? ''}
      href={getRoutedInternalHref(navigationItem.path)}
      active={getIsItemActive?.(navigationItem) ?? false}
      dropdownLinks={
        (menuItemChildren?.[navigationItem.id]?.length &&
          menuItemChildren[navigationItem.id]?.map((childNavigationItem) =>
            createHeaderMenuHierarchyLinkElement({
              menuItemChildren,
              navigationItem: childNavigationItem,
              getRoutedInternalHref,
              getIsItemActive,
              A,
            })
          )) ||
        undefined
      }
    />
  );
}

const HCRCHeader: FunctionComponent<HCRCHeaderProps> = ({
  menu,
  universalBarMenu,
  languages: unfilteredLanguages,
  className,
  userNavigation,
  onTitleClick,
  getPathnameForLanguage,
  getIsItemActive,
}: HCRCHeaderProps) => {
  const { t: commonT } = useCommonTranslation();
  const locale = useLocale();

  const { data: menuHierarchyData } = useMenuHierarchyQuery({
    skip: false,
    variables: {
      name: DEFAULT_HEADER_MENU_NAME[locale],
    },
  });
  const menuHierarchy = menuHierarchyData?.menu;

  const {
    siteName,
    currentLanguageCode,
    copy: { menuToggleAriaLabel, skipToContentLabel },
    components: { A },
    utils: { getRoutedInternalHref },
  } = useConfig();

  const languages = unfilteredLanguages?.filter(nonNullLanguage) ?? [];

  // Language selection is required
  if (!languages || !languages.length) {
    return null;
  }

  const currentLanguage = findLanguage(languages, currentLanguageCode);

  // Error out if language props are inconsistent
  if (!currentLanguage) {
    throw Error(
      'Could not find a language from languages with currentLanguageCode'
    );
  }

  const languageOptions: LanguageOption[] = languages.map((language) => ({
    label: language.name,
    value: language.code.toLowerCase(),
    isPrimary: true,
  }));

  const onDidChangeLanguage = (newLanguageCode: string) => {
    const newLanguage = findLanguage(languages, newLanguageCode);
    if (newLanguage) {
      const url = getPathnameForLanguage(
        newLanguage,
        currentLanguage,
        languages
      );
      if (url && window) {
        window.location.href = url;
      }
    }
  };

  const logoProps: LogoProps = {
    size: 'large',
    src: LOGO_SOURCES[currentLanguageCode],
    alt: LOGO_LABELS[currentLanguageCode],
  };

  const menuItemChildren: MenuIdToChildItemsLookupDictionary = groupBy(
    menuHierarchy?.menuItems?.nodes ?? [],
    (menuItem) => menuItem.parentId ?? 'top'
  );

  return (
    <HDSHeader
      onDidChangeLanguage={onDidChangeLanguage}
      defaultLanguage={currentLanguage.code.toLowerCase()}
      languages={languageOptions}
      className={classNames(className, styles.maxWidthXl)}
    >
      <HDSHeader.SkipLink
        skipTo={`#${MAIN_CONTENT_ID}`}
        label={skipToContentLabel}
      />
      <HDSHeader.UniversalBar
        primaryLinkText={commonT('common:cityOfHelsinki')}
        primaryLinkHref="https://hel.fi/"
      >
        {universalBarMenu?.menuItems?.nodes?.map((navigationItem) => (
          <HDSHeader.Link
            as={A}
            id={navigationItem.id}
            key={navigationItem.id}
            title={navigationItem.title ?? undefined}
            label={navigationItem.label ?? ''}
            href={getRoutedInternalHref(navigationItem.path)}
            active={getIsItemActive?.(navigationItem) ?? false}
          />
        ))}
      </HDSHeader.UniversalBar>
      <HDSHeader.ActionBar
        titleHref="#"
        logoHref="#"
        menuButtonAriaLabel={menuToggleAriaLabel}
        title={siteName}
        onTitleClick={onTitleClick}
        onLogoClick={onTitleClick}
        frontPageLabel={siteName}
        logo={<Logo {...logoProps} />}
        logoAriaLabel={LOGO_ARIA_LABELS[currentLanguageCode]}
      >
        <HDSHeader.LanguageSelector />
        {!!userNavigation && userNavigation}
      </HDSHeader.ActionBar>
      <HDSHeader.NavigationMenu>
        {menuItemChildren['top']?.map((navigationItem) =>
          createHeaderMenuHierarchyLinkElement({
            menuItemChildren,
            navigationItem,
            getRoutedInternalHref,
            getIsItemActive,
            A,
          })
        )}
      </HDSHeader.NavigationMenu>
    </HDSHeader>
  );
};

export type HeaderProps = {
  page?: PageType | ArticleType;
  menu?: Menu;
  languages?: Language[];
};

export default function Header({
  page,
  menu,
  languages: forcedLanguages,
}: HeaderProps) {
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
    <HCRCHeader
      languages={languageOptions}
      menu={menu ?? headerMenu}
      universalBarMenu={headerUniversalBarMenu}
      className={styles.topNavigation}
      onTitleClick={() => {
        router.push('/');
      }}
      getIsItemActive={({ path }) => {
        return (
          path === routerHelper.getI18nPath(currentPage, locale) ||
          path === `/${locale}${routerHelper.getI18nPath(currentPage, locale)}`
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
  );
}

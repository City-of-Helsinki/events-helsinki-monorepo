import commonTranslationsEn from '@events-helsinki/common-i18n/locales/en/common.json';
import commonTranslationsFi from '@events-helsinki/common-i18n/locales/fi/common.json';
import commonTranslationsSv from '@events-helsinki/common-i18n/locales/sv/common.json';
import type {
  AppLanguage,
  PageByTemplateBreadcrumbTitleQuery,
  PageByTemplateBreadcrumbTitleQueryVariables,
} from '@events-helsinki/components';
import {
  NavigationContext,
  Navigation,
  FooterSection,
  getLanguageOrDefault,
  usePageScrollRestoration,
  RouteMeta,
  useResilientTranslation,
  getQlLanguage,
  PageByTemplateBreadcrumbTitleDocument,
  getFilteredBreadcrumbs,
  BreadcrumbContainer,
} from '@events-helsinki/components';
import type { BreadcrumbListItem } from 'hds-react';
import type { GetStaticPropsContext } from 'next';
import dynamic from 'next/dynamic';
import React, { useContext } from 'react';
import type { PageType } from 'react-helsinki-headless-cms';
import {
  Page as RHHCPage,
  TemplateEnum,
  getBreadcrumbsFromPage,
} from 'react-helsinki-headless-cms';
import AppConfig from '../../domain/app/AppConfig';
import getSportsStaticProps from '../../domain/app/getSportsStaticProps';
import ConsentPageContent from '../../domain/cookieConsent/ConsentPageContent';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';

const CookieSettingsPage = dynamic(
  () => import('hds-react').then((mod) => mod.CookieSettingsPage),
  { ssr: false }
);
const cookieConsentBreadcrumbTitle: Record<AppLanguage, string> = {
  fi: commonTranslationsFi['cookies'] ?? 'Evästeet',
  en: commonTranslationsEn['cookies'] ?? 'Cookies',
  sv: commonTranslationsSv['cookies'] ?? 'Cookies',
};

export default function CookieConsent({
  breadcrumbs,
}: Readonly<{
  breadcrumbs?: BreadcrumbListItem[];
}>) {
  const { footerMenu } = useContext(NavigationContext);
  const { resilientT } = useResilientTranslation();

  usePageScrollRestoration();

  return (
    <RHHCPage
      className="pageLayout"
      navigation={<Navigation />}
      content={
        <>
          <RouteMeta origin={AppConfig.origin} />
          {breadcrumbs && <BreadcrumbContainer breadcrumbs={breadcrumbs} />}
          <ConsentPageContent>
            <CookieSettingsPage />
          </ConsentPageContent>
        </>
      }
      footer={
        <FooterSection
          menu={footerMenu}
          appName={resilientT('appSports:appName')}
          hasFeedBack={false}
        />
      }
    />
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSportsStaticProps(context, async ({ apolloClient }) => {
    const language = getLanguageOrDefault(context.locale);
    const { data: pageBreadcrumbTitleData } = await apolloClient.query<
      PageByTemplateBreadcrumbTitleQuery,
      PageByTemplateBreadcrumbTitleQueryVariables
    >({
      query: PageByTemplateBreadcrumbTitleDocument,
      variables: {
        template: TemplateEnum.FrontPage,
        language: getQlLanguage(language).toLocaleLowerCase(),
      },
    });
    const breadcrumbs: BreadcrumbListItem[] = [
      ...getFilteredBreadcrumbs(
        getBreadcrumbsFromPage(
          pageBreadcrumbTitleData.pageByTemplate as PageType
        )
      ),
      { title: cookieConsentBreadcrumbTitle[language], path: null },
    ];
    return {
      props: {
        breadcrumbs,
        ...(await serverSideTranslationsWithCommon(language)),
      },
    };
  });
}

import {
  DEFAULT_LANGUAGE,
  getQlLanguage,
  NavigationContext,
  Navigation,
  MatomoWrapper,
  useCommonTranslation,
  FooterSection,
  getLanguageOrDefault,
} from '@events-helsinki/components';
import type { GetStaticPropsContext, NextPage } from 'next';
import React, { useContext } from 'react';
import type { PageType, ArticleType } from 'react-helsinki-headless-cms';
import {
  useConfig,
  PageContent as HCRCPageContent,
  Page as HCRCPage,
  TemplateEnum,
} from 'react-helsinki-headless-cms';
import type {
  PageByTemplateQuery,
  PageByTemplateQueryVariables,
  LandingPageQuery,
  LandingPageQueryVariables,
} from 'react-helsinki-headless-cms/apollo';
import {
  PageByTemplateDocument,
  LandingPageDocument,
} from 'react-helsinki-headless-cms/apollo';
import getHobbiesStaticProps from '../domain/app/getHobbiesStaticProps';
import cmsHelper from '../domain/app/headlessCmsHelper';
import serverSideTranslationsWithCommon from '../domain/i18n/serverSideTranslationsWithCommon';
import { LandingPageContentLayout } from '../domain/search/landingPage/LandingPage';

const HomePage: NextPage<{
  landingPage: LandingPageQuery['landingPage'];
  page: PageType;
  locale: string;
}> = ({ landingPage, page, locale }) => {
  const {
    utils: { getRoutedInternalHref },
  } = useConfig();
  const { footerMenu } = useContext(NavigationContext);
  const { t } = useCommonTranslation();
  return (
    <MatomoWrapper>
      <HCRCPage
        className="pageLayout"
        navigation={<Navigation />}
        content={
          <HCRCPageContent
            page={page}
            landingPage={landingPage}
            PageContentLayoutComponent={LandingPageContentLayout}
            collections={(page: PageType | ArticleType) =>
              cmsHelper.getDefaultCollections(page, getRoutedInternalHref)
            }
            language={getQlLanguage(locale)}
          />
        }
        footer={
          <FooterSection menu={footerMenu} appName={t('appHobbies:appName')} />
        }
      />
    </MatomoWrapper>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(context, async ({ apolloClient }) => {
    try {
      const language = getLanguageOrDefault(context.locale);
      const { data: landingPageData } = await apolloClient.query<
        LandingPageQuery,
        LandingPageQueryVariables
      >({
        query: LandingPageDocument,
        variables: {
          id: 'root',
          languageCode: getQlLanguage(language),
        },
        fetchPolicy: 'no-cache', // FIXME: network-only should work better, but for some reason it only updates once.
      });

      const { data: pageData } = await apolloClient.query<
        PageByTemplateQuery,
        PageByTemplateQueryVariables
      >({
        query: PageByTemplateDocument,
        variables: {
          template: TemplateEnum.FrontPage,
          language: getQlLanguage(language).toLocaleLowerCase(),
        },
        fetchPolicy: 'no-cache', // FIXME: network-only should work better, but for some reason it only updates once.
      });
      if (!pageData || !landingPageData) {
        return {
          notFound: true,
        };
      }
      const page = pageData.pageByTemplate;

      const landingPage = landingPageData.landingPage;

      // eslint-disable-next-line no-console
      console.debug(
        'pages/index.tsx',
        'getStaticProps',
        'getHobbiesStaticProps',
        'Revalidating the front page'
      );
      return {
        props: {
          ...(await serverSideTranslationsWithCommon(language, [
            'home',
            'search',
            'event',
          ])),
          landingPage: landingPage,
          page: page,
        },
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(
        'An error occured in the getStaticProps of the Next-js Index-page!',
        'Tried to fetch the front page and the landing page from the Headless CMS, but an error occured!!',
        e
      );
      return {
        props: {
          ...(await serverSideTranslationsWithCommon(DEFAULT_LANGUAGE, [
            'home',
            'search',
          ])),
          landingPage: null,
          page: null,
        },
      };
    }
  });
}

export default HomePage;

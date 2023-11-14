import {
  DEFAULT_LANGUAGE,
  getQlLanguage,
  NavigationContext,
  Navigation,
  MatomoWrapper,
  useAppSportsTranslation,
  FooterSection,
  getLanguageOrDefault,
  RouteMeta,
} from '@events-helsinki/components';
import { logger } from '@events-helsinki/components/loggers/logger';
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
} from 'react-helsinki-headless-cms/apollo';
import { PageByTemplateDocument } from 'react-helsinki-headless-cms/apollo';
import AppConfig from '../domain/app/AppConfig';
import getSportsStaticProps from '../domain/app/getSportsStaticProps';
import cmsHelper from '../domain/app/headlessCmsHelper';
import serverSideTranslationsWithCommon from '../domain/i18n/serverSideTranslationsWithCommon';
import { LandingPageContentLayout } from '../domain/search/landingPage/LandingPage';

const HomePage: NextPage<{
  page: PageType;
  locale: string;
}> = ({ page, locale }) => {
  const {
    utils: { getRoutedInternalHref },
  } = useConfig();
  const { footerMenu } = useContext(NavigationContext);

  const { t } = useAppSportsTranslation();

  return (
    <MatomoWrapper>
      <HCRCPage
        className="pageLayout"
        navigation={<Navigation />}
        content={
          <>
            <RouteMeta origin={AppConfig.origin} />
            <HCRCPageContent
              page={page}
              PageContentLayoutComponent={LandingPageContentLayout}
              collections={(page: PageType | ArticleType) =>
                cmsHelper.getDefaultCollections(page, getRoutedInternalHref)
              }
              language={getQlLanguage(locale)}
            />
          </>
        }
        footer={
          <FooterSection
            menu={footerMenu}
            appName={t('appSports:appName')}
            hasFeedBack={false}
          />
        }
      />
    </MatomoWrapper>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSportsStaticProps(context, async ({ apolloClient }) => {
    try {
      const language = getLanguageOrDefault(context.locale);

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
      if (!pageData) {
        return {
          notFound: true,
        };
      }
      const page = pageData.pageByTemplate;

      logger.info(
        'pages/index.tsx',
        'getStaticProps',
        'getSportsStaticProps',
        'Revalidating the front page'
      );
      return {
        props: {
          ...(await serverSideTranslationsWithCommon(language, [
            'search',
            'event',
          ])),
          page,
        },
      };
    } catch (e) {
      logger.error(
        'An error occured in the getStaticProps of the Next-js Index-page!',
        'Tried to fetch the front page and the landing page from the Headless CMS, but an error occured!!',
        e
      );
      return {
        props: {
          ...(await serverSideTranslationsWithCommon(DEFAULT_LANGUAGE, [
            'search',
          ])),
          page: null,
        },
      };
    }
  });
}

export default HomePage;

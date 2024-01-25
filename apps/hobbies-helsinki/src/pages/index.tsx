import {
  DEFAULT_LANGUAGE,
  getQlLanguage,
  NavigationContext,
  Navigation,
  FooterSection,
  getLanguageOrDefault,
  RouteMeta,
  useResilientTranslation,
} from '@events-helsinki/components';
import { logger } from '@events-helsinki/components/loggers/logger';
import type { GetStaticPropsContext, NextPage } from 'next';
import React, { useContext } from 'react';
import type { PageType, ArticleType } from 'react-helsinki-headless-cms';
import {
  useConfig,
  PageContent as RHHCPageContent,
  Page as RHHCPage,
  TemplateEnum,
} from 'react-helsinki-headless-cms';
import type {
  PageByTemplateQuery,
  PageByTemplateQueryVariables,
} from 'react-helsinki-headless-cms/apollo';
import { PageByTemplateDocument } from 'react-helsinki-headless-cms/apollo';
import AppConfig from '../domain/app/AppConfig';
import getHobbiesStaticProps from '../domain/app/getHobbiesStaticProps';
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
  const { resilientT } = useResilientTranslation();
  return (
    <RHHCPage
      className="pageLayout"
      navigation={<Navigation />}
      content={
        <>
          <RouteMeta origin={AppConfig.origin} />
          <RHHCPageContent
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
          appName={resilientT('appHobbies:appName')}
          hasFeedBack={false}
        />
      }
    />
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(context, async ({ apolloClient }) => {
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
          page: page,
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
            'home',
            'search',
          ])),
          page: null,
        },
      };
    }
  });
}

export default HomePage;

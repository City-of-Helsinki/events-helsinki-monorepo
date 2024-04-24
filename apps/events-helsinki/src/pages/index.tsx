import type { PreviewDataObject } from '@events-helsinki/components';
import {
  DEFAULT_LANGUAGE,
  getQlLanguage,
  NavigationContext,
  Navigation,
  getLanguageOrDefault,
  FooterSection,
  RouteMeta,
  useResilientTranslation,
  usePreview,
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
import getEventsStaticProps from '../domain/app/getEventsStaticProps';
import cmsHelper from '../domain/app/headlessCmsHelper';
import serverSideTranslationsWithCommon from '../domain/i18n/serverSideTranslationsWithCommon';
import { LandingPageContentLayout } from '../domain/search/landingPage/LandingPage';

const HomePage: NextPage<{
  preview: boolean;
  page: PageType;
  locale: string;
}> = ({ page, locale, preview }) => {
  const {
    utils: { getRoutedInternalHref },
  } = useConfig();
  const { footerMenu } = useContext(NavigationContext);
  const { resilientT } = useResilientTranslation();
  usePreview(resilientT('page:preview'), preview);

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
          appName={resilientT('appEvents:appName')}
          hasFeedBack={false}
        />
      }
    />
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return getEventsStaticProps(context, async ({ apolloClient }) => {
    try {
      const language = getLanguageOrDefault(context.locale);

      const previewData = context.previewData as PreviewDataObject;
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
        ...(previewData?.token && {
          context: {
            headers: {
              authorization: previewData.token,
            },
          },
        }),
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
        'getEventsStaticProps',
        'Revalidating the front page'
      );
      return {
        props: {
          preview: Boolean(previewData?.token),
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
          preview: false,
          ...(await serverSideTranslationsWithCommon(DEFAULT_LANGUAGE, [
            'home',
            'search',
            'event',
          ])),
          page: null,
        },
      };
    }
  });
}

export default HomePage;

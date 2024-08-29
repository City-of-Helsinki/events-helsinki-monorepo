import type { NormalizedCacheObject } from '@apollo/client';
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
  PreviewNotification,
} from '@events-helsinki/components';
import { logger } from '@events-helsinki/components/loggers/logger';
import type {
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from 'next';
import dynamic from 'next/dynamic';
import React, { useContext } from 'react';
import type { PageType, ArticleType } from 'react-helsinki-headless-cms';
import {
  useConfig,
  Page as RHHCPage,
  TemplateEnum,
} from 'react-helsinki-headless-cms';
import type {
  PageByTemplateQuery,
  PageByTemplateQueryVariables,
  PageQuery,
} from 'react-helsinki-headless-cms/apollo';
import { PageByTemplateDocument } from 'react-helsinki-headless-cms/apollo';
import AppConfig from '../domain/app/AppConfig';
import getEventsStaticProps from '../domain/app/getEventsStaticProps';
import cmsHelper from '../domain/app/headlessCmsHelper';
import serverSideTranslationsWithCommon from '../domain/i18n/serverSideTranslationsWithCommon';
import { LandingPageContentLayout } from '../domain/search/landingPage/LandingPage';

const HomePage: NextPage<{
  page: PageType;
  locale: string;
  previewToken: string;
}> = ({ page, locale, previewToken }) => {
  const {
    utils: { getRoutedInternalHref },
  } = useConfig();
  const { footerMenu } = useContext(NavigationContext);
  const { resilientT } = useResilientTranslation();

  const RHHCPageContentNoSSR = dynamic(
    () => import('react-helsinki-headless-cms').then((mod) => mod.PageContent),
    {
      ssr: false,
    }
  );

  return (
    <RHHCPage
      className="pageLayout"
      navigation={<Navigation />}
      content={
        <>
          <PreviewNotification token={previewToken} />
          <RouteMeta origin={AppConfig.origin} />
          <RHHCPageContentNoSSR
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

type ResultProps =
  | {
      page: PageQuery['page'];
      previewToken: string;
      initialApolloState?: NormalizedCacheObject;
    }
  | {
      error?: {
        statusCode: number;
      };
    };

export async function getStaticProps(context: GetStaticPropsContext) {
  return getEventsStaticProps(
    context,
    async ({ apolloClient }): Promise<GetStaticPropsResult<ResultProps>> => {
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
            ...(await serverSideTranslationsWithCommon(language, [
              'home',
              'search',
              'event',
            ])),
            previewToken: previewData?.token ?? '',
            initialApolloState: apolloClient.cache.extract(),
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
              'event',
            ])),
            page: null,
            previewToken: '',
          },
        };
      }
    }
  );
}

export default HomePage;

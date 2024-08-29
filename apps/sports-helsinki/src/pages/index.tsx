import type { PreviewDataObject } from '@events-helsinki/components';
import {
  DEFAULT_LANGUAGE,
  getQlLanguage,
  NavigationContext,
  Navigation,
  useResilientTranslation,
  FooterSection,
  getLanguageOrDefault,
  RouteMeta,
  PreviewNotification,
} from '@events-helsinki/components';
import { logger } from '@events-helsinki/components/loggers/logger';
import type { GetStaticPropsContext, NextPage } from 'next';
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
} from 'react-helsinki-headless-cms/apollo';
import { PageByTemplateDocument } from 'react-helsinki-headless-cms/apollo';
import AppConfig from '../domain/app/AppConfig';
import getSportsStaticProps from '../domain/app/getSportsStaticProps';
import cmsHelper from '../domain/app/headlessCmsHelper';
import serverSideTranslationsWithCommon from '../domain/i18n/serverSideTranslationsWithCommon';
import { LandingPageContentLayout } from '../domain/search/landingPage/LandingPage';

const HomePage: NextPage<{
  page: PageType;
  previewToken: string;
  locale: string;
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
          appName={resilientT('appSports:appName')}
          hasFeedBack={false}
        />
      }
    />
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSportsStaticProps(context, async ({ apolloClient }) => {
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
        'getSportsStaticProps',
        'Revalidating the front page'
      );
      return {
        props: {
          previewToken: previewData?.token ?? '',
          ...(await serverSideTranslationsWithCommon(language, [
            'home',
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
          previewToken: '',
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

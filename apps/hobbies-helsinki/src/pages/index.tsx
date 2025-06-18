import type { PreviewDataObject } from '@events-helsinki/components';
import {
  DEFAULT_LANGUAGE,
  getQlLanguage,
  NavigationContext,
  Navigation,
  FooterSection,
  getLanguageOrDefault,
  RouteMeta,
  useResilientTranslation,
  PreviewNotification,
  PageMeta,
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
import getHobbiesStaticProps from '../domain/app/getHobbiesStaticProps';
import cmsHelper from '../domain/app/headlessCmsHelper';
import serverSideTranslationsWithCommon from '../domain/i18n/serverSideTranslationsWithCommon';
import { LandingPageContentLayout } from '../domain/search/landingPage/LandingPage';

const HomePage: NextPage<{
  previewToken: string;
  page: PageType;
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
          <PageMeta
            {...page?.seo}
            image={page?.featuredImage?.node?.mediaItemUrl || ''}
          />
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
        fetchPolicy: 'no-cache',
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
        'getHobbiesStaticProps',
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
          previewToken: '',
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

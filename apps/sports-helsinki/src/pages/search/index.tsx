import type { PageType } from '@city-of-helsinki/react-helsinki-headless-cms';
import {
  Page as RHHCPage,
  getBreadcrumbsFromPage,
  getTextFromHtml,
} from '@city-of-helsinki/react-helsinki-headless-cms';
import type {
  PageQuery,
  PageQueryVariables,
} from '@city-of-helsinki/react-helsinki-headless-cms/apollo';
import { PageDocument } from '@city-of-helsinki/react-helsinki-headless-cms/apollo';
import type { PreviewDataObject } from '@events-helsinki/components';
import {
  NavigationContext,
  Navigation,
  FooterSection,
  getLanguageOrDefault,
  usePageScrollRestoration,
  RouteMeta,
  PageMeta,
  useResilientTranslation,
  getFilteredBreadcrumbs,
  BreadcrumbContainer,
  PreviewNotification,
} from '@events-helsinki/components';
import type { BreadcrumbListItem } from 'hds-react';
import type { GetStaticPropsContext, NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { useContext } from 'react';
import { ROUTES } from '../../constants';
import AppConfig from '../../domain/app/AppConfig';
import getSportsStaticProps from '../../domain/app/getSportsStaticProps';
import cmsHelper from '../../domain/app/headlessCmsHelper';
import { sportsApolloClient } from '../../domain/clients/sportsApolloClient';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';

const CombinedSearchPageNoSSR = dynamic(
  () => import('../../domain/search/combinedSearch/CombinedSearchPage'),
  {
    ssr: false,
  }
);

const Search: NextPage<{
  page: PageType;
  previewToken: string;
  breadcrumbs?: BreadcrumbListItem[];
}> = ({ page, breadcrumbs, previewToken }) => {
  const { footerMenu } = useContext(NavigationContext);

  const { resilientT } = useResilientTranslation();

  usePageScrollRestoration();

  const pageTitle = page?.title?.trim() || undefined;
  const pageDescription =
    getTextFromHtml(page?.content ?? '')?.trim() || undefined;

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
          {breadcrumbs && <BreadcrumbContainer breadcrumbs={breadcrumbs} />}
          <CombinedSearchPageNoSSR
            defaultTab="Venue"
            pageTitle={pageTitle}
            pageDescription={pageDescription}
          />
        </>
      }
      footer={
        <FooterSection
          menu={footerMenu}
          appName={resilientT('appSports:appName')}
          feedbackWithPadding
        />
      }
    />
  );
};

export default Search;

export async function getStaticProps(context: GetStaticPropsContext) {
  const previewData = context.previewData as PreviewDataObject;
  return getSportsStaticProps(context, async () => {
    const language = getLanguageOrDefault(context.locale);
    const { data: pageData } = await sportsApolloClient.query<
      PageQuery,
      PageQueryVariables
    >({
      query: PageDocument,
      variables: {
        id: `/${language}${ROUTES.SEARCH}/`,
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
    const page = pageData.page;

    const pageBreadcrumbs = getBreadcrumbsFromPage(page);
    const extendedBreadcrumbs = cmsHelper.withCurrentPageBreadcrumb(
      pageBreadcrumbs,
      page,
      language,
      context.preview
    );
    const breadcrumbs = getFilteredBreadcrumbs(extendedBreadcrumbs);

    return {
      props: {
        page,
        breadcrumbs,
        ...(await serverSideTranslationsWithCommon(language, [
          'event',
          'search',
          'venue',
          'home',
        ])),
        previewToken: previewData?.token ?? '',
      },
    };
  });
}

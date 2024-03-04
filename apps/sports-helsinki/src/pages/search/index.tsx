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
} from '@events-helsinki/components';
import type { BreadcrumbListItem } from 'hds-react';
import type { GetStaticPropsContext, NextPage } from 'next';
import React, { useContext } from 'react';
import type { PageType } from 'react-helsinki-headless-cms';
import {
  Page as RHHCPage,
  getBreadcrumbsFromPage,
} from 'react-helsinki-headless-cms';
import type {
  PageQuery,
  PageQueryVariables,
} from 'react-helsinki-headless-cms/apollo';
import { PageDocument } from 'react-helsinki-headless-cms/apollo';
import { ROUTES } from '../../constants';
import AppConfig from '../../domain/app/AppConfig';
import getSportsStaticProps from '../../domain/app/getSportsStaticProps';
import { sportsApolloClient } from '../../domain/clients/sportsApolloClient';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import CombinedSearchPage from '../../domain/search/combinedSearch/CombinedSearchPage';

const Search: NextPage<{
  page: PageType;
  breadcrumbs?: BreadcrumbListItem[];
}> = ({ page, breadcrumbs }) => {
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
          <PageMeta {...page?.seo} />
          {breadcrumbs && <BreadcrumbContainer breadcrumbs={breadcrumbs} />}
          <CombinedSearchPage defaultTab="Venue" />
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
      fetchPolicy: 'no-cache', // FIXME: network-only should work better, but for some reason it only updates once.
    });
    const page = pageData.page;
    const breadcrumbs = getFilteredBreadcrumbs(getBreadcrumbsFromPage(page));
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
      },
    };
  });
}

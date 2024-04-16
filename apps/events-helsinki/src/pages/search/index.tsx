import type { PreviewDataObject } from '@events-helsinki/components';
import {
  NavigationContext,
  useAppEventsTranslation,
  Navigation,
  getLanguageOrDefault,
  FooterSection,
  RouteMeta,
  PageMeta,
  useResilientTranslation,
  getFilteredBreadcrumbs,
  BreadcrumbContainer,
} from '@events-helsinki/components';
import { usePageScrollRestoration } from '@events-helsinki/components/src/hooks';
import type { BreadcrumbListItem } from 'hds-react';
import type { GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useRef, useEffect, useContext } from 'react';
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
import getEventsStaticProps from '../../domain/app/getEventsStaticProps';
import { eventsApolloClient } from '../../domain/clients/eventsApolloClient';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import AdvancedSearch from '../../domain/search/eventSearch/AdvancedSearch';
import SearchPage from '../../domain/search/eventSearch/SearchPage';

const Search: NextPage<{
  page: PageType;
  breadcrumbs?: BreadcrumbListItem[];
}> = ({ page, breadcrumbs }) => {
  const router = useRouter();
  const scrollTo = router.query?.scrollTo;
  const listRef = useRef<HTMLUListElement | null>(null);
  const { t: tAppEvents } = useAppEventsTranslation();
  const { resilientT } = useResilientTranslation();
  usePageScrollRestoration();

  useEffect(() => {
    const listElement = listRef.current;

    if (scrollTo) {
      const listItemElement = listElement?.querySelector(
        decodeURIComponent(scrollTo.toString())
      );

      if (listItemElement) {
        listItemElement.scrollIntoView({
          block: 'center',
        });
      }
    }
  }, [scrollTo]);

  const { footerMenu } = useContext(NavigationContext);

  return (
    <RHHCPage
      className="pageLayout"
      navigation={<Navigation />}
      content={
        <>
          <RouteMeta origin={AppConfig.origin} />
          <PageMeta {...page?.seo} />
          {breadcrumbs && <BreadcrumbContainer breadcrumbs={breadcrumbs} />}
          <SearchPage
            SearchComponent={AdvancedSearch}
            pageTitle={tAppEvents('appEvents:search.pageTitle')}
          />
        </>
      }
      footer={
        <FooterSection
          menu={footerMenu}
          appName={resilientT('appEvents:appName')}
          feedbackWithPadding
        />
      }
    />
  );
};

export default Search;

export async function getStaticProps(context: GetStaticPropsContext) {
  return getEventsStaticProps(context, async () => {
    const language = getLanguageOrDefault(context.locale);

    const previewData = context.previewData as PreviewDataObject;
    const { data: pageData } = await eventsApolloClient.query<
      PageQuery,
      PageQueryVariables
    >({
      query: PageDocument,
      variables: {
        id: `/${language}${ROUTES.SEARCH}/`,
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
    const page = pageData.page;
    const breadcrumbs = getFilteredBreadcrumbs(getBreadcrumbsFromPage(page));
    return {
      props: {
        page,
        breadcrumbs,
        ...(await serverSideTranslationsWithCommon(language, [
          'event',
          'search',
          'home',
        ])),
      },
    };
  });
}

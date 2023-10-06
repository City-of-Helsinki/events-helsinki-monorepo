import {
  NavigationContext,
  useAppEventsTranslation,
  Navigation,
  MatomoWrapper,
  getLanguageOrDefault,
  FooterSection,
  RouteMeta,
  PageMeta,
} from '@events-helsinki/components';
import { usePageScrollRestoration } from '@events-helsinki/components/src/hooks';
import type { GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useRef, useEffect, useContext } from 'react';
import type { PageType } from 'react-helsinki-headless-cms';
import type {
  PageQuery,
  PageQueryVariables,
} from 'react-helsinki-headless-cms/apollo';
import {
  Page as HCRCApolloPage,
  PageDocument,
} from 'react-helsinki-headless-cms/apollo';
import { ROUTES } from '../../constants';
import AppConfig from '../../domain/app/AppConfig';
import getEventsStaticProps from '../../domain/app/getEventsStaticProps';
import { eventsApolloClient } from '../../domain/clients/eventsApolloClient';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import AdvancedSearch from '../../domain/search/eventSearch/AdvancedSearch';
import SearchPage from '../../domain/search/eventSearch/SearchPage';

const Search: NextPage<{
  page: PageType;
}> = ({ page }) => {
  const router = useRouter();
  const scrollTo = router.query?.scrollTo;
  const listRef = useRef<HTMLUListElement | null>(null);
  const { t: tAppEvents } = useAppEventsTranslation();
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
    <MatomoWrapper>
      <HCRCApolloPage
        uri={ROUTES.SEARCH}
        className="pageLayout"
        navigation={<Navigation />}
        content={
          <>
            <RouteMeta origin={AppConfig.origin} />
            <PageMeta {...page?.seo} />
            <SearchPage
              SearchComponent={AdvancedSearch}
              pageTitle={tAppEvents('appEvents:search.pageTitle')}
            />
          </>
        }
        footer={
          <FooterSection
            menu={footerMenu}
            appName={tAppEvents('appEvents:appName')}
            feedbackWithPadding
          />
        }
      />
    </MatomoWrapper>
  );
};

export default Search;

export async function getStaticProps(context: GetStaticPropsContext) {
  return getEventsStaticProps(context, async () => {
    const language = getLanguageOrDefault(context.locale);

    const { data: pageData } = await eventsApolloClient.query<
      PageQuery,
      PageQueryVariables
    >({
      query: PageDocument,
      variables: {
        id: `/${language}/search`,
      },
      fetchPolicy: 'no-cache', // FIXME: network-only should work better, but for some reason it only updates once.
    });

    return {
      props: {
        page: pageData.page,
        ...(await serverSideTranslationsWithCommon(language, [
          'event',
          'search',
        ])),
      },
    };
  });
}

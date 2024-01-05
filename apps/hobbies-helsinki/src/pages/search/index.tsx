import {
  NavigationContext,
  useAppHobbiesTranslation,
  Navigation,
  FooterSection,
  getLanguageOrDefault,
  usePageScrollRestoration,
  RouteMeta,
  PageMeta,
} from '@events-helsinki/components';
import type { GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useRef, useEffect, useContext } from 'react';
import type { PageType } from 'react-helsinki-headless-cms';
import { Page as RHHCPage } from 'react-helsinki-headless-cms';
import type {
  PageQuery,
  PageQueryVariables,
} from 'react-helsinki-headless-cms/apollo';
import { PageDocument } from 'react-helsinki-headless-cms/apollo';
import { ROUTES } from '../../constants';
import AppConfig from '../../domain/app/AppConfig';
import getHobbiesStaticProps from '../../domain/app/getHobbiesStaticProps';
import { hobbiesApolloClient } from '../../domain/clients/hobbiesApolloClient';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import AdvancedSearch from '../../domain/search/eventSearch/AdvancedSearch';
import SearchPage from '../../domain/search/eventSearch/SearchPage';

const Search: NextPage<{
  page: PageType;
}> = ({ page }) => {
  const { t: tAppHobbies } = useAppHobbiesTranslation();
  const router = useRouter();
  const scrollTo = router.query?.scrollTo;
  const listRef = useRef<HTMLUListElement | null>(null);
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
          <SearchPage
            SearchComponent={AdvancedSearch}
            pageTitle={tAppHobbies('appHobbies:search.pageTitle')}
          />
        </>
      }
      footer={
        <FooterSection
          menu={footerMenu}
          appName={tAppHobbies('appHobbies:appName')}
          feedbackWithPadding
        />
      }
    />
  );
};

export default Search;

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(context, async () => {
    const language = getLanguageOrDefault(context.locale);

    const { data: pageData } = await hobbiesApolloClient.query<
      PageQuery,
      PageQueryVariables
    >({
      query: PageDocument,
      variables: {
        id: `/${language}${ROUTES.SEARCH}/`,
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

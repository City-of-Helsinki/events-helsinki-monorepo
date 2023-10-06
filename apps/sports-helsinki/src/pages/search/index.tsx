import {
  NavigationContext,
  Navigation,
  MatomoWrapper,
  useCommonTranslation,
  FooterSection,
  getLanguageOrDefault,
  usePageScrollRestoration,
  RouteMeta,
  PageMeta,
} from '@events-helsinki/components';
import type { GetStaticPropsContext, NextPage } from 'next';
import React, { useContext } from 'react';
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
import getSportsStaticProps from '../../domain/app/getSportsStaticProps';
import { sportsApolloClient } from '../../domain/clients/sportsApolloClient';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import CombinedSearchPage from '../../domain/search/combinedSearch/CombinedSearchPage';

const Search: NextPage<{
  page: PageType;
}> = ({ page }) => {
  const { footerMenu } = useContext(NavigationContext);
  const { t } = useCommonTranslation();
  usePageScrollRestoration();
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
            <CombinedSearchPage defaultTab="Venue" />
          </>
        }
        footer={
          <FooterSection
            menu={footerMenu}
            appName={t('appSports:appName')}
            feedbackWithPadding
          />
        }
      />
    </MatomoWrapper>
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
        // does not work
        id: `/${language}/search/`,
      },
      fetchPolicy: 'no-cache', // FIXME: network-only should work better, but for some reason it only updates once.
    });

    return {
      props: {
        page: pageData.page,
        ...(await serverSideTranslationsWithCommon(language, [
          'event',
          'search',
          'venue',
        ])),
      },
    };
  });
}

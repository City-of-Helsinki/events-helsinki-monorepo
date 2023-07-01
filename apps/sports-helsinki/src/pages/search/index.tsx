import {
  NavigationContext,
  Navigation,
  MatomoWrapper,
  useCommonTranslation,
  FooterSection,
  getLanguageOrDefault,
  usePageScrollRestoration,
} from '@events-helsinki/components';
import type { GetStaticPropsContext, NextPage } from 'next';
import React, { useContext } from 'react';
import type { PageType } from 'react-helsinki-headless-cms';
import type {
  PageQuery,
  PageQueryVariables,
} from 'react-helsinki-headless-cms/apollo';
import {
  PageDocument,
  Page as HCRCApolloPage,
} from 'react-helsinki-headless-cms/apollo';
import { ROUTES } from '../../constants';
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
        content={<CombinedSearchPage defaultTab="Venue" />}
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
    const { currentPage: page } = await getProps();
    if (!page) {
      return {
        notFound: true,
      };
    }
    const language = getLanguageOrDefault(context.locale);
    return {
      props: {
        ...(await serverSideTranslationsWithCommon(language, [
          'event',
          'search',
          'venue',
        ])),
        page,
      },
    };
  });
}

const getProps = async () => {
  const { data: pageData } = await sportsApolloClient.query<
    PageQuery,
    PageQueryVariables
  >({
    query: PageDocument,
    variables: {
      id: 'search',
    },
    fetchPolicy: 'no-cache', // FIXME: network-only should work better, but for some reason it only updates once.
  });

  const currentPage = pageData.page;
  // TODO: Breadcrumbs are unstyled, so left disabled
  // const breadcrumbs = _getBreadcrumbs(
  //   apolloClient,
  //   (context.params?.slug ?? []) as string[]
  // );

  return { currentPage, breadcrumbs: [], apolloClient: sportsApolloClient };
};

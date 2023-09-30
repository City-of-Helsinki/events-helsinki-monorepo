import {
  NavigationContext,
  Navigation,
  MatomoWrapper,
  useCommonTranslation,
  FooterSection,
  getLanguageOrDefault,
  usePageScrollRestoration,
} from '@events-helsinki/components';
import type { GetStaticPropsContext } from 'next';
import React, { useContext } from 'react';
import {
  Page as HCRCApolloPage,
  // PageDocument,
  // PageQuery,
  // PageQueryVariables,
} from 'react-helsinki-headless-cms/apollo';
import { ROUTES } from '../../constants';
import getSportsStaticProps from '../../domain/app/getSportsStaticProps';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import CombinedSearchPage from '../../domain/search/combinedSearch/CombinedSearchPage';
// import { sportsApolloClient } from '../../domain/clients/sportsApolloClient';

export default function Search() {
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
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSportsStaticProps(context, async () => {
    const language = getLanguageOrDefault(context.locale);
    /*  const { data: pageData } = await sportsApolloClient.query<
      PageQuery,
      PageQueryVariables
    >({
      query: PageDocument,
      variables: {
        // does not work
        id: 'en/search',

        // `idType: PageIdType.Uri // idType is`fixed in query, so added automatically
      },
      fetchPolicy: 'no-cache', // FIXME: network-only should work better, but for some reason it only updates once.
    }); */

    return {
      props: {
        ...(await serverSideTranslationsWithCommon(language, [
          'event',
          'search',
          'venue',
        ])),
      },
    };
  });
}

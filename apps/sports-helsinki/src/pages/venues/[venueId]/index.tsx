import {
  NavigationContext,
  VenueDocument,
  Navigation,
  MatomoWrapper,
  useCommonTranslation,
  FooterSection,
  getLanguageOrDefault,
  usePageScrollRestoration,
} from '@events-helsinki/components';
import type {
  Venue,
  VenueQuery,
  VenueQueryVariables,
} from '@events-helsinki/components';
import type { GetStaticPropsContext, NextPage } from 'next';
import React, { useContext } from 'react';
import { Page as RHHCPage } from 'react-helsinki-headless-cms';
import AppConfig from '../../../domain/app/AppConfig';
import getSportsStaticProps from '../../../domain/app/getSportsStaticProps';
import serverSideTranslationsWithCommon from '../../../domain/i18n/serverSideTranslationsWithCommon';
import VenuePageContainer from '../../../domain/venue/VenuePageContainer';

const Event: NextPage<{
  venue: Venue;
  loading: boolean;
}> = ({ venue, loading }) => {
  const { footerMenu } = useContext(NavigationContext);
  const { t } = useCommonTranslation();
  usePageScrollRestoration();
  return (
    <MatomoWrapper>
      <RHHCPage
        className="pageLayout"
        navigation={<Navigation />}
        content={
          <VenuePageContainer
            venue={venue}
            loading={loading}
            showSimilarVenues={AppConfig.showSimilarVenues}
            showUpcomingEvents={AppConfig.showVenuesUpcomingEvents}
          />
        }
        footer={
          <FooterSection menu={footerMenu} appName={t('appSports:appName')} />
        }
      />
    </MatomoWrapper>
  );
};
export default Event;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSportsStaticProps(context, async ({ apolloClient }) => {
    const language = getLanguageOrDefault(context.locale);
    const { data: venueData, loading } = await apolloClient.query<
      VenueQuery,
      VenueQueryVariables
    >({
      query: VenueDocument,
      variables: {
        id: (context.params?.venueId as string) || '',
        includeHaukiFields: AppConfig.isHaukiEnabled,
      },
      context: {
        headers: {
          'Accept-Language': language,
        },
      },
    });

    const venue = venueData?.venue;
    if (!venue) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        venue,
        loading,
        ...(await serverSideTranslationsWithCommon(language, [
          'search',
          'venue',
          'event',
        ])),
      },
    };
  });
}

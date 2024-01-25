import {
  NavigationContext,
  VenueDocument,
  Navigation,
  FooterSection,
  getLanguageOrDefault,
  usePageScrollRestoration,
  useResilientTranslation,
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

const VenuePage: NextPage<{
  venue: Venue;
  loading: boolean;
}> = ({ venue, loading }) => {
  const { footerMenu } = useContext(NavigationContext);
  const { resilientT } = useResilientTranslation();
  usePageScrollRestoration();
  return (
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
        <FooterSection
          menu={footerMenu}
          appName={resilientT('appSports:appName')}
        />
      }
    />
  );
};
export default VenuePage;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

function getIdProp(params: GetStaticPropsContext['params']) {
  const id = (params?.venueId as string) ?? '';
  // If the fallback is set to 'blocking' and
  // the source maps are enabled in the prod package,
  // the source map filename is used as an id.
  if (id.endsWith('.map')) {
    return undefined;
  }
  return id;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSportsStaticProps(context, async ({ apolloClient }) => {
    const language = getLanguageOrDefault(context.locale);
    const id = getIdProp(context.params);
    if (!id) {
      return {
        notFound: true,
      };
    }
    const { data: venueData, loading } = await apolloClient.query<
      VenueQuery,
      VenueQueryVariables
    >({
      query: VenueDocument,
      variables: {
        id,
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

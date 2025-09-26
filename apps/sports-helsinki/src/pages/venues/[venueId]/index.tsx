import {
  NavigationContext,
  VenueDocument,
  Navigation,
  FooterSection,
  getLanguageOrDefault,
  useResilientTranslation,
  PageBreadcrumbTitleDocument,
  getFilteredBreadcrumbs,
} from '@events-helsinki/components';
import type {
  PageBreadcrumbTitleQuery,
  PageBreadcrumbTitleQueryVariables,
  Venue,
  VenueQuery,
  VenueQueryVariables,
} from '@events-helsinki/components';
import type { BreadcrumbListItem } from 'hds-react';
import type { GetStaticPropsContext, NextPage } from 'next';
import React, { useContext } from 'react';
import type { PageType } from 'react-helsinki-headless-cms';
import {
  Page as RHHCPage,
  getBreadcrumbsFromPage,
} from 'react-helsinki-headless-cms';
import { ROUTES } from '../../../constants';
import AppConfig from '../../../domain/app/AppConfig';
import getSportsStaticProps from '../../../domain/app/getSportsStaticProps';
import serverSideTranslationsWithCommon from '../../../domain/i18n/serverSideTranslationsWithCommon';
import VenuePageContainer from '../../../domain/venue/VenuePageContainer';

const VenuePage: NextPage<{
  venue: Venue;
  loading: boolean;
  breadcrumbs?: BreadcrumbListItem[];
}> = ({ venue, loading, breadcrumbs }) => {
  const { footerMenu } = useContext(NavigationContext);
  const { resilientT } = useResilientTranslation();

  return (
    <RHHCPage
      className="pageLayout"
      navigation={<Navigation />}
      content={
        <VenuePageContainer
          breadcrumbs={breadcrumbs}
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

    const { data: pageBreadcrumbTitleData } = await apolloClient.query<
      PageBreadcrumbTitleQuery,
      PageBreadcrumbTitleQueryVariables
    >({
      query: PageBreadcrumbTitleDocument,
      variables: {
        id: `/${language}${ROUTES.SEARCH}/`,
      },
    });
    const searchPage = pageBreadcrumbTitleData.page;
    const breadcrumbs: BreadcrumbListItem[] = [
      ...getFilteredBreadcrumbs(getBreadcrumbsFromPage(searchPage as PageType)),
      { title: venueData.venue.name ?? id, path: null },
    ];

    return {
      props: {
        venue,
        loading,
        breadcrumbs,
        ...(await serverSideTranslationsWithCommon(language, [
          'search',
          'venue',
          'event',
        ])),
      },
    };
  });
}

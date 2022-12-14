import { NavigationContext, VenueDocument } from 'events-helsinki-components';
import type {
  Venue,
  VenueQuery,
  VenueQueryVariables,
} from 'events-helsinki-components';
import type { GetStaticPropsContext, NextPage } from 'next';
import React, { useContext } from 'react';
import { Page as RHHCPage } from 'react-helsinki-headless-cms';
import Navigation from '../../../common-events/components/navigation/Navigation';
import AppConfig from '../../../domain/app/AppConfig';
import getSportsStaticProps from '../../../domain/app/getSportsStaticProps';
import FooterSection from '../../../domain/footer/Footer';
import serverSideTranslationsWithCommon from '../../../domain/i18n/serverSideTranslationsWithCommon';
import MatomoWrapper from '../../../domain/matomoWrapper/MatomoWrapper';
import VenuePageContainer from '../../../domain/venue/VenuePageContainer';
import { getLocaleOrError } from '../../../utils/routerUtils';

const Event: NextPage<{
  venue: Venue;
  loading: boolean;
}> = ({ venue, loading }) => {
  const { headerMenu, footerMenu, languages } = useContext(NavigationContext);

  return (
    <MatomoWrapper>
      <RHHCPage
        className="pageLayout"
        navigation={<Navigation menu={headerMenu} languages={languages} />}
        content={<VenuePageContainer venue={venue} loading={loading} />}
        footer={<FooterSection menu={footerMenu} />}
      />
    </MatomoWrapper>
  );
};
export default Event;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSportsStaticProps(context, async ({ apolloClient }) => {
    const locale = getLocaleOrError(context.locale);
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
          'Accept-Language': locale,
        },
      },
    });

    const venue = venueData?.venue;

    return {
      props: {
        venue,
        loading,
        ...(await serverSideTranslationsWithCommon(locale, [
          'common',
          'home',
          'search',
          'venue',
        ])),
      },
    };
  });
}

import type { MapItem } from 'events-helsinki-components';
import { getURLSearchParamsFromAsPath } from 'events-helsinki-components';
import { LoadingSpinner } from 'hds-react';
import type { GetStaticPropsContext } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { Page as HCRCApolloPage } from 'react-helsinki-headless-cms/apollo';
import Navigation from '../../common-events/components/navigation/Navigation';
import { ROUTES, SEARCH_ROUTES } from '../../constants';
import getSportsStaticProps from '../../domain/app/getSportsStaticProps';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import MatomoWrapper from '../../domain/matomoWrapper/MatomoWrapper';
import type { Connection, SearchResult } from '../../domain/nextApi/types';
import SearchHeader, {
  ShowMode,
} from '../../domain/search/searchHeader/SearchHeader';
import SimpleVenueSearch from '../../domain/search/venueSearch/VenueSearch';
import useUnifiedSearchMapQuery from '../../domain/unifiedSearch/useUnifiedSearchMapQuery';
import { getLocaleOrError } from '../../utils/routerUtils';

// https://stackoverflow.com/a/64634759
const MapView = dynamic(
  // eslint-disable-next-line import/no-unresolved
  () => import('events-helsinki-components/components/mapView/MapView'),
  // import('../../../../../packages/components/src/components/mapView/MapView'),
  {
    loading: () => <LoadingSpinner multicolor />,
    ssr: false,
  }
);

const emptyConnection = {
  edges: [],
};

function getSearchResultsAsItems(
  searchResultConnection: Connection<SearchResult> | null | undefined
): MapItem[] {
  const searchResults =
    searchResultConnection?.edges?.map((edge) => edge.node) ?? [];
  return (
    searchResults?.reduce((results: MapItem[] = [], searchResult) => {
      if (
        searchResult?.venue &&
        searchResult?.venue?.meta?.id &&
        searchResult?.venue?.name &&
        searchResult?.venue?.location?.geoLocation?.geometry
      ) {
        return [
          ...results,
          {
            id: `tprek:${searchResult.venue.meta.id}`,
            title: searchResult.venue.name.fi,
            href: `/venues/tprek:${searchResult.venue.meta.id}`,
            location:
              searchResult.venue.location.geoLocation.geometry.coordinates,
          } as MapItem,
        ];
      }
      return results;
    }, []) ?? []
  );
}

export default function MapSearch() {
  const router = useRouter();
  const venueId = router.query.venue as string;

  const { data } = useUnifiedSearchMapQuery({
    first: 10000,
  });

  const searchResultItems: MapItem[] = getSearchResultsAsItems(
    data?.unifiedSearch
      ? (data?.unifiedSearch as Connection<SearchResult>)
      : emptyConnection
  );

  const showVenueFocusedMap =
    typeof venueId === 'string' && !!searchResultItems.length;

  const switchShowMode = () => {
    const searchParams = getURLSearchParamsFromAsPath(router.asPath);

    // if venue was focused on map, we want to drop the query param
    // when going back to search page
    const venueParam = searchParams.get('venue');
    if (venueParam) {
      searchParams.delete('venue');
      searchParams.append('scrollTo', `#${venueParam.replace(':', '_')}`);
    }

    router.replace({
      pathname: '/search',
      query: searchParams.toString(),
    });
  };

  const count = data?.unifiedSearch?.count ?? 0;

  return (
    <MatomoWrapper>
      <HCRCApolloPage
        uri={ROUTES.MAPSEARCH}
        className="pageLayout"
        navigation={<Navigation />}
        content={
          <>
            <SearchHeader
              showMode={ShowMode.MAP}
              count={count}
              switchShowMode={switchShowMode}
              searchForm={
                <SimpleVenueSearch searchRoute={SEARCH_ROUTES.MAPSEARCH} />
              }
            />

            <MapView
              // Use key to force rerender when mode is changes. Otherwise map position / zoom wouldn't reset
              key={showVenueFocusedMap ? 'focused-venue-map' : 'search-map'}
              items={searchResultItems}
              focusedItemId={showVenueFocusedMap ? venueId : undefined}
            />
          </>
        }
        footer={null}
      />
    </MatomoWrapper>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSportsStaticProps(context, async () => {
    const locale = getLocaleOrError(context.locale);
    return {
      props: {
        ...(await serverSideTranslationsWithCommon(locale, [
          'common',
          'search',
        ])),
      },
    };
  });
}

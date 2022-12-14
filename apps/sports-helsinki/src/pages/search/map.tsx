import type { MapItem, AppLanguage } from 'events-helsinki-components';
import {
  useLocale,
  getURLSearchParamsFromAsPath,
  NavigationContext,
} from 'events-helsinki-components';
import { LoadingSpinner } from 'hds-react';
import type { GetStaticPropsContext } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import qs from 'query-string';
import React, { useContext } from 'react';
import { Page as HCRCApolloPage } from 'react-helsinki-headless-cms/apollo';
import Navigation from '../../common-events/components/navigation/Navigation';
import { ROUTES } from '../../constants';
import getSportsStaticProps from '../../domain/app/getSportsStaticProps';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import MatomoWrapper from '../../domain/matomoWrapper/MatomoWrapper';
import type { Connection, SearchResult } from '../../domain/nextApi/types';
import SearchHeader, {
  ShowMode,
} from '../../domain/search/searchHeader/SearchHeader';
import SimpleVenueMapSearch from '../../domain/search/venueSearch/VenueMapSearch';
import useUnifiedSearchMapQuery from '../../domain/unifiedSearch/useUnifiedSearchMapQuery';
import getVenueSourceId from '../../domain/venue/utils/getVenueSourceId';
import {
  getLocaleOrError,
  getLocalizedCmsItemUrl,
} from '../../utils/routerUtils';

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
  searchResultConnection: Connection<SearchResult> | null | undefined,
  locale: AppLanguage,
  currentPath: string
): MapItem[] {
  const searchResults =
    searchResultConnection?.edges?.map((edge) => edge.node) ?? [];
  return (
    searchResults?.reduce((results: MapItem[] = [], searchResult) => {
      const { venue } = searchResult;
      if (
        venue?.meta?.id &&
        venue?.name &&
        venue?.location?.geoLocation?.geometry
      ) {
        const href = `${getLocalizedCmsItemUrl(
          ROUTES.VENUES,
          {
            venueId: getVenueSourceId(venue?.meta.id),
          },
          locale
        )}?${qs.stringify({ returnPath: currentPath })}`;
        return [
          ...results,
          {
            id: getVenueSourceId(venue?.meta.id),
            title: venue?.name.fi,
            href,
            location: venue?.location.geoLocation.geometry.coordinates,
          } as MapItem,
        ];
      }
      return results;
    }, []) ?? []
  );
}

export default function MapSearch() {
  const router = useRouter();
  const venueId = router.query.venueId as string;
  const locale = useLocale();
  const { data } = useUnifiedSearchMapQuery({
    first: 10000,
  });

  const searchResultItems: MapItem[] = getSearchResultsAsItems(
    data?.unifiedSearch
      ? (data?.unifiedSearch as Connection<SearchResult>)
      : emptyConnection,
    locale,
    router.asPath
  );

  const showVenueFocusedMap =
    typeof venueId === 'string' && !!searchResultItems.length;

  const switchShowMode = () => {
    const searchParams = getURLSearchParamsFromAsPath(router.asPath);

    router.replace({
      pathname: ROUTES.SEARCH,
      query: searchParams.toString(),
    });
  };

  const count = data?.unifiedSearch?.count ?? 0;

  const { headerMenu, languages } = useContext(NavigationContext);

  return (
    <MatomoWrapper>
      <HCRCApolloPage
        uri={ROUTES.MAPSEARCH}
        className="pageLayout"
        navigation={<Navigation menu={headerMenu} languages={languages} />}
        content={
          <>
            <SearchHeader
              showMode={ShowMode.MAP}
              count={count}
              switchShowMode={switchShowMode}
              searchForm={<SimpleVenueMapSearch />}
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

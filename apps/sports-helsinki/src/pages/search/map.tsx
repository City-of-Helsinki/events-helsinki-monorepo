import type { MapItem, AppLanguage } from '@events-helsinki/components';
import {
  useLocale,
  getURLSearchParamsFromAsPath,
  Navigation,
  MatomoWrapper,
  getLanguageOrDefault,
  RouteMeta,
  PageMeta,
} from '@events-helsinki/components';
import { LoadingSpinner } from 'hds-react';
import type { GetStaticPropsContext } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import React from 'react';
import type { PageType } from 'react-helsinki-headless-cms';
import { PageSection, Page as HCRCPage } from 'react-helsinki-headless-cms';
import type {
  PageQuery,
  PageQueryVariables,
} from 'react-helsinki-headless-cms/apollo';
import { PageDocument } from 'react-helsinki-headless-cms/apollo';
import { ROUTES } from '../../constants';
import AppConfig from '../../domain/app/AppConfig';
import getSportsStaticProps from '../../domain/app/getSportsStaticProps';
import routerHelper from '../../domain/app/routerHelper';
import { sportsApolloClient } from '../../domain/clients/sportsApolloClient';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import { CombinedSearchProvider } from '../../domain/search/combinedSearch/adapters/CombinedSearchProvider';
import SearchHeader from '../../domain/search/searchHeader/SearchHeader';
import SimpleVenueMapSearch from '../../domain/search/venueSearch/VenueMapSearch';
import useUnifiedSearchMapQuery from '../../domain/unifiedSearch/useUnifiedSearchMapQuery';
import getVenueSourceId from '../../domain/venue/utils/getVenueSourceId';
import type { Connection, SearchResult } from '../../types';

// https://stackoverflow.com/a/64634759
const MapView = dynamic(
  () => import('@events-helsinki/components/components/mapView/MapView'),
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
        const href = `${routerHelper.getLocalizedCmsItemUrl(
          ROUTES.VENUES,
          {
            venueId: getVenueSourceId(venue?.meta.id),
          },
          locale
        )}?${queryString.stringify({ returnPath: currentPath })}`;
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

export function MapSearchPageContent() {
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

    router.push({
      pathname: ROUTES.SEARCH,
      query: searchParams.toString(),
    });
  };

  const count = data?.unifiedSearch?.count ?? 0;
  return (
    <>
      <SearchHeader
        count={count}
        switchShowMode={switchShowMode}
        searchForm={<SimpleVenueMapSearch />}
      />
      <PageSection>
        <MapView
          // Use key to force rerender when mode is changes. Otherwise map position / zoom wouldn't reset
          key={showVenueFocusedMap ? 'focused-venue-map' : 'search-map'}
          items={searchResultItems}
          focusedItemId={showVenueFocusedMap ? venueId : undefined}
        />
      </PageSection>
    </>
  );
}

export default function MapSearch({ page }: { page: PageType }) {
  return (
    <MatomoWrapper>
      <HCRCPage
        className="pageLayout"
        navigation={<Navigation />}
        content={
          <>
            <RouteMeta origin={AppConfig.origin} />
            <PageMeta {...page?.seo} />
            <CombinedSearchProvider>
              <MapSearchPageContent />
            </CombinedSearchProvider>
          </>
        }
        footer={null}
      />
    </MatomoWrapper>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSportsStaticProps(context, async () => {
    const language = getLanguageOrDefault(context.locale);
    const { data: pageData } = await sportsApolloClient.query<
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
        ...(await serverSideTranslationsWithCommon(language, ['search'])),
      },
    };
  });
}

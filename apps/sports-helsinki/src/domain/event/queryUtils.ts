import {
  useVenuesByIdsLazyQuery,
  useLocale,
} from '@events-helsinki/components';
import type { Venue } from '@events-helsinki/components';
import React from 'react';
import AppConfig from '../../domain/app/AppConfig';
import useUnifiedSearchListQuery from '../../domain/unifiedSearch/useUnifiedSearchListQuery';
import getVenueSourceId from '../../domain/venue/utils/getVenueSourceId';

export const useSimilarVenuesQuery = ({
  venue,
  limit = 6,
}: {
  venue: Venue;
  limit?: number;
}) => {
  const locale = useLocale();
  const ontologyWordIds = venue.ontologyWords.reduce(
    (ontologies: string[], ontology) => {
      if (ontology?.id) {
        ontologies.push(ontology.id.toString());
      }
      return ontologies;
    },
    []
  );
  // Search for venue ids from UnifiedSearch with the ontologies.
  const { data: venuesUnifiedSearchData, loading: unifiedSearchLoading } =
    useUnifiedSearchListQuery({
      ontologyWordIds,
      first: limit,
      orderByName: undefined,
      includeHaukiFields: AppConfig.isHaukiEnabled,
    });
  // Search for venues from venues-proxy (e.g. TPREK as a datasource) with the venue ids.
  const [getVenuesByIds, queryProps] = useVenuesByIdsLazyQuery({
    variables: { includeHaukiFields: AppConfig.isHaukiEnabled },
    ssr: false,
    context: {
      headers: {
        'Accept-Language': locale,
      },
    },
  });

  // Trigger the venues by ids search when the ids are fetched.
  React.useEffect(() => {
    if (!unifiedSearchLoading) {
      const venueIds = venuesUnifiedSearchData?.unifiedSearch?.edges.reduce(
        (result: string[], edge) => {
          if (edge.node?.venue?.meta?.id) {
            result.push(edge.node.venue.meta.id);
          }
          return result;
        },
        []
      );
      if (venueIds?.length) {
        const venueSourceIds = venueIds.map((venueId) =>
          getVenueSourceId(venueId)
        );
        if (venueSourceIds.length) {
          getVenuesByIds({ variables: { ids: venueSourceIds } });
        }
      }
    }
  }, [
    getVenuesByIds,
    unifiedSearchLoading,
    venuesUnifiedSearchData?.unifiedSearch?.edges,
  ]);

  return { ...queryProps, loading: unifiedSearchLoading || queryProps.loading };
};

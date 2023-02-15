import type { SearchListQuery } from 'events-helsinki-components/types';

export default function getVenueNodes(searchListQuery: SearchListQuery) {
  return searchListQuery.unifiedSearch?.edges.map((edge) => edge.node.venue);
}

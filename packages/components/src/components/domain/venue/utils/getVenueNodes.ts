import type { SearchListQuery } from '../../../../types/generated/graphql';

export default function getVenueNodes(searchListQuery: SearchListQuery) {
  return searchListQuery.unifiedSearch?.edges.map((edge) => edge.node.venue);
}

import type EventAPI from './datasources/event';
import type KeywordAPI from './datasources/keyword';
import type NeighborhoodAPI from './datasources/neighborhood';
import type OrganizationAPI from './datasources/organization';
import type PlaceAPI from './datasources/place';
// import type { QueryResolvers as GeneratedQueryResolvers } from './types/types';

export type DataSources = {
  eventAPI: EventAPI;
  keywordAPI: KeywordAPI;
  neighborhoodAPI: NeighborhoodAPI;
  organizationAPI: OrganizationAPI;
  placeAPI: PlaceAPI;
};

// export type QueryResolvers = GeneratedQueryResolvers<{
//   dataSources: DataSources;
// }>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryResolvers = any;

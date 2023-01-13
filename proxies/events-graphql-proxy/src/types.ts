import type EventDataSource from './datasources/eventDataSource';
import type KeywordDataSource from './datasources/keywordDataSource';
import type NeighborhoodDataSource from './datasources/neighborhoodDataSource';
import type OrganizationDataSource from './datasources/organizationDataSource';
import type PlaceDataSource from './datasources/placeDataSource';

export type EventDataSources = {
  event: EventDataSource;
  keyword: KeywordDataSource;
  neighborhood: NeighborhoodDataSource;
  organization: OrganizationDataSource;
  place: PlaceDataSource;
};

// export type QueryResolvers = GeneratedQueryResolvers<{
//   dataSources: DataSources;
// }>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryResolvers = any;

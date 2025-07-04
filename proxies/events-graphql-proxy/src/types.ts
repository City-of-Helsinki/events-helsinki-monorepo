import type { AppLanguage } from '@events-helsinki/graphql-proxy-server';
import type EventDataSource from './datasources/eventDataSource.js';
import type KeywordDataSource from './datasources/keywordDataSource.js';
import type NeighborhoodDataSource from './datasources/neighborhoodDataSource.js';
import type OrganizationDataSource from './datasources/organizationDataSource.js';
import type PlaceDataSource from './datasources/placeDataSource.js';

export type Locale = AppLanguage;

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

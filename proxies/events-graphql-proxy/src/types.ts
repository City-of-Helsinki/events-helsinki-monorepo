import type AboutPageAPI from './datasources/aboutPage';
import type AccessibilityPageAPI from './datasources/accessibilityPage';
import type CollectionAPI from './datasources/collection';
import type EventAPI from './datasources/event';
import type KeywordAPI from './datasources/keyword';
import type LandingPageAPI from './datasources/landingPage';
import type NeighborhoodAPI from './datasources/neighborhood';
import type OrganizationAPI from './datasources/organization';
import type PlaceAPI from './datasources/place';
import type { QueryResolvers as GeneratedQueryResolvers } from './types/types';

export type DataSources = {
  aboutPageAPI: AboutPageAPI;
  accessibilityPageAPI: AccessibilityPageAPI;
  collectionAPI: CollectionAPI;
  eventAPI: EventAPI;
  keywordAPI: KeywordAPI;
  landingPageAPI: LandingPageAPI;
  neighborhoodAPI: NeighborhoodAPI;
  organizationAPI: OrganizationAPI;
  placeAPI: PlaceAPI;
};

export type QueryResolvers = GeneratedQueryResolvers<{
  dataSources: DataSources;
}>;

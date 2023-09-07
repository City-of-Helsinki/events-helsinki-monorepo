/**
 * This file is imported from the old (now deprecated) Liikunta-Helsinki repo.
 * The file has been generated there with a codegen from some graphql-files,
 * but since only a part of the queries and types are now used,
 * the graphql-files are now removed.
 */
import { gql } from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AccessibilitySentences = {
  __typename?: 'AccessibilitySentences';
  groupName?: Maybe<Scalars['String']>;
  sentences?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type VenueConnection = {
  __typename?: 'VenueConnection';
  name?: Maybe<Scalars['String']>;
  sectionType?: Maybe<Scalars['String']>;
};

export type Event = {
  __typename?: 'Event';
  endTime?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  images: Array<Image>;
  infoUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  offers: Array<Offer>;
  shortDescription?: Maybe<Scalars['String']>;
  startTime: Scalars['String'];
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor: Scalars['String'];
  node: Event;
};

export type EventQuery = {
  ids?: InputMaybe<Array<Scalars['ID']>>;
  keywords?: InputMaybe<Array<Scalars['String']>>;
  language?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['ID']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  superEventType?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  translation?: InputMaybe<Scalars['String']>;
};

export type EventsConnection = {
  __typename?: 'EventsConnection';
  edges: Array<EventEdge>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type Image = {
  __typename?: 'Image';
  alt?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  url: Scalars['String'];
};

export type Offer = {
  __typename?: 'Offer';
  description?: Maybe<Scalars['String']>;
  infoUrl?: Maybe<Scalars['String']>;
  isFree: Scalars['Boolean'];
  price?: Maybe<Scalars['String']>;
};

export type Ontology = {
  __typename?: 'Ontology';
  id?: Maybe<Scalars['Int']>;
  label?: Maybe<Scalars['String']>;
};

export type OpeningHour = {
  __typename?: 'OpeningHour';
  date: Scalars['String'];
  times: Array<Time>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  count: Scalars['Int'];
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Point = {
  __typename?: 'Point';
  coordinates: Array<Scalars['Float']>;
  type?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  events: EventsConnection;
  venue: Venue;
  venuesByIds: Array<Venue>;
};

export type QueryEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EventQuery>;
};

export type QueryVenueArgs = {
  id: Scalars['ID'];
};

export type QueryVenuesByIdsArgs = {
  ids?: InputMaybe<Array<Scalars['ID']>>;
};

export enum ResourceState {
  Closed = 'closed',
  EnterOnly = 'enter_only',
  ExitOnly = 'exit_only',
  Open = 'open',
  OpenAndReservable = 'open_and_reservable',
  SelfService = 'self_service',
  Undefined = 'undefined',
  WeatherPermitting = 'weather_permitting',
  WithKey = 'with_key',
  WithKeyAndReservation = 'with_key_and_reservation',
  WithReservation = 'with_reservation',
}

export type Time = {
  __typename?: 'Time';
  description: Scalars['String'];
  endTime: Scalars['String'];
  endTimeOnNextDay: Scalars['Boolean'];
  fullDay: Scalars['Boolean'];
  name: Scalars['String'];
  periods: Array<Scalars['Int']>;
  resourceState: ResourceState;
  startTime: Scalars['String'];
};

export type VenueDepartment = {
  __typename?: 'VenueDepartment';
  abbreviation?: Maybe<Scalars['String']>;
  addressCity?: Maybe<Scalars['String']>;
  addressPostalFull?: Maybe<Scalars['String']>;
  addressZip?: Maybe<Scalars['String']>;
  businessId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  hierarchyLevel?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  municipalityCode?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  oid?: Maybe<Scalars['ID']>;
  organizationId?: Maybe<Scalars['ID']>;
  organizationType?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['ID']>;
  phone?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
  www?: Maybe<Scalars['String']>;
};

export type Venue = {
  __typename?: 'Venue';
  accessibilitySentences: Array<Maybe<AccessibilitySentences>>;
  addressLocality?: Maybe<Scalars['String']>;
  addressPostalFull?: Maybe<Scalars['String']>;
  connections: Array<Maybe<VenueConnection>>;
  dataSource?: Maybe<Scalars['String']>;
  departmentId?: Maybe<Scalars['ID']>;
  department?: Maybe<VenueDepartment>;
  description?: Maybe<Scalars['String']>;
  displayedServiceOwner?: Maybe<Scalars['String']>;
  displayedServiceOwnerType?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  infoUrl?: Maybe<Scalars['String']>;
  /**
   *  This field is currently disabled because the Hauki integration is not enabled
   * @deprecated Hauki integration is currently disabled so this field can not be accessed
   */
  isOpen?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  ontologyTree: Array<Maybe<Ontology>>;
  ontologyWords: Array<Maybe<Ontology>>;
  organizationId?: Maybe<Scalars['ID']>;
  organization?: Maybe<VenueDepartment>;
  /**
   *  This field is currently disabled because the Hauki integration is not enabled
   * @deprecated Hauki integration is currently disabled so this field can not be accessed
   */
  openingHours?: Maybe<Array<OpeningHour>>;
  position?: Maybe<Point>;
  postalCode?: Maybe<Scalars['String']>;
  providerType?: Maybe<Scalars['String']>;
  shortDescription?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
};

export type EventFragment = {
  __typename?: 'Event';
  id: string;
  name: string;
  shortDescription?: string | null | undefined;
  startTime: string;
  endTime?: string | null | undefined;
  infoUrl?: string | null | undefined;
  offers: Array<{
    __typename?: 'Offer';
    isFree: boolean;
    description?: string | null | undefined;
    price?: string | null | undefined;
    infoUrl?: string | null | undefined;
  }>;
  images: Array<{
    __typename?: 'Image';
    id: string;
    alt?: string | null | undefined;
    url: string;
  }>;
};

export type ListVenueFragment = {
  __typename?: 'Venue';
  description?: string | null | undefined;
  id: string;
  image?: string | null | undefined;
  name?: string | null | undefined;
  ontologyWords: Array<
    | {
        __typename?: 'Ontology';
        id?: number | null | undefined;
        label?: string | null | undefined;
      }
    | null
    | undefined
  >;
};

export type PageInfoFragment = {
  __typename?: 'PageInfo';
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  endCursor?: string | null | undefined;
  count: number;
};

export type SearchEventsQueryVariables = Exact<{
  where: EventQuery;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;

export type SearchEventsQuery = {
  __typename?: 'Query';
  events: {
    __typename?: 'EventsConnection';
    totalCount?: number | null | undefined;
    edges: Array<{
      __typename?: 'EventEdge';
      node: {
        __typename?: 'Event';
        id: string;
        name: string;
        shortDescription?: string | null | undefined;
        startTime: string;
        endTime?: string | null | undefined;
        infoUrl?: string | null | undefined;
        offers: Array<{
          __typename?: 'Offer';
          isFree: boolean;
          description?: string | null | undefined;
          price?: string | null | undefined;
          infoUrl?: string | null | undefined;
        }>;
        images: Array<{
          __typename?: 'Image';
          id: string;
          alt?: string | null | undefined;
          url: string;
        }>;
      };
    }>;
    pageInfo?:
      | {
          __typename?: 'PageInfo';
          hasPreviousPage: boolean;
          hasNextPage: boolean;
          endCursor?: string | null | undefined;
          count: number;
        }
      | null
      | undefined;
  };
};

export type SelectedEventsQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;

export type SelectedEventsQuery = {
  __typename?: 'Query';
  events: {
    __typename?: 'EventsConnection';
    totalCount?: number | null | undefined;
    edges: Array<{
      __typename?: 'EventEdge';
      node: {
        __typename?: 'Event';
        id: string;
        name: string;
        shortDescription?: string | null | undefined;
        startTime: string;
        endTime?: string | null | undefined;
        infoUrl?: string | null | undefined;
        offers: Array<{
          __typename?: 'Offer';
          isFree: boolean;
          description?: string | null | undefined;
          price?: string | null | undefined;
          infoUrl?: string | null | undefined;
        }>;
        images: Array<{
          __typename?: 'Image';
          id: string;
          alt?: string | null | undefined;
          url: string;
        }>;
      };
    }>;
    pageInfo?:
      | {
          __typename?: 'PageInfo';
          hasPreviousPage: boolean;
          hasNextPage: boolean;
          endCursor?: string | null | undefined;
          count: number;
        }
      | null
      | undefined;
  };
};

export type SelectedVenuesQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;

export type SelectedVenuesQuery = {
  __typename?: 'Query';
  venuesByIds: Array<{
    __typename?: 'Venue';
    description?: string | null | undefined;
    id: string;
    image?: string | null | undefined;
    name?: string | null | undefined;
    ontologyWords: Array<
      | {
          __typename?: 'Ontology';
          id?: number | null | undefined;
          label?: string | null | undefined;
        }
      | null
      | undefined
    >;
  }>;
};

export type UpcomingEventsQueryVariables = Exact<{
  where: EventQuery;
  first?: InputMaybe<Scalars['Int']>;
}>;

export type UpcomingEventsQuery = {
  __typename?: 'Query';
  events: {
    __typename?: 'EventsConnection';
    edges: Array<{
      __typename?: 'EventEdge';
      node: {
        __typename?: 'Event';
        id: string;
        name: string;
        shortDescription?: string | null | undefined;
        startTime: string;
        endTime?: string | null | undefined;
        infoUrl?: string | null | undefined;
        offers: Array<{
          __typename?: 'Offer';
          isFree: boolean;
          description?: string | null | undefined;
          price?: string | null | undefined;
          infoUrl?: string | null | undefined;
        }>;
        images: Array<{
          __typename?: 'Image';
          id: string;
          alt?: string | null | undefined;
          url: string;
        }>;
      };
    }>;
  };
};

export const EventFragmentDoc = gql`
  fragment event on Event {
    id
    name
    shortDescription
    startTime
    endTime
    infoUrl
    offers {
      isFree
      description
      price
      infoUrl
    }
    images {
      id
      alt
      url
    }
  }
`;
export const ListVenueFragmentDoc = gql`
  fragment listVenue on Venue {
    description
    id
    image
    name
    ontologyWords {
      id
      label
    }
  }
`;
export const PageInfoFragmentDoc = gql`
  fragment pageInfo on PageInfo {
    hasPreviousPage
    hasNextPage
    endCursor
    count
  }
`;
export const SearchEventsDocument = gql`
  query SearchEvents($where: EventQuery!, $first: Int, $after: String) {
    events(where: $where, first: $first, after: $after) {
      edges {
        node {
          ...event
        }
      }
      pageInfo {
        ...pageInfo
      }
      totalCount
    }
  }
  ${EventFragmentDoc}
  ${PageInfoFragmentDoc}
`;

export const SelectedEventsDocument = gql`
  query SelectedEvents($ids: [ID!]!, $first: Int, $after: String) {
    events(where: { ids: $ids }, first: $first, after: $after) {
      edges {
        node {
          ...event
        }
      }
      pageInfo {
        ...pageInfo
      }
      totalCount
    }
  }
  ${EventFragmentDoc}
  ${PageInfoFragmentDoc}
`;

export const SelectedVenuesDocument = gql`
  query SelectedVenues($ids: [ID!]!) {
    venuesByIds(ids: $ids) {
      ...listVenue
    }
  }
  ${ListVenueFragmentDoc}
`;

export const UpcomingEventsDocument = gql`
  query UpcomingEvents($where: EventQuery!, $first: Int) {
    events(where: $where, first: $first) {
      edges {
        node {
          ...event
        }
      }
    }
  }
  ${EventFragmentDoc}
`;

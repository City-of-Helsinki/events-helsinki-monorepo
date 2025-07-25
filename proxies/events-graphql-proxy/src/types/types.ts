/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import type { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AboutPagesResponse = {
  __typename?: 'AboutPagesResponse';
  data: Array<StaticPage>;
};

export type AccessibilityPagesResponse = {
  __typename?: 'AccessibilityPagesResponse';
  data: Array<StaticPage>;
};

export type Audience = {
  __typename?: 'Audience';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<LocalizedObject>;
  internalId?: Maybe<Scalars['String']>;
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
};

export type BannerPage = {
  __typename?: 'BannerPage';
  title?: Maybe<LocalizedObject>;
  description?: Maybe<LocalizedObject>;
  keywords?: Maybe<LocalizedCmsKeywords>;
  titleAndDescriptionColor?: Maybe<LocalizedObject>;
  buttonText?: Maybe<LocalizedObject>;
  buttonUrl?: Maybe<LocalizedObject>;
  heroBackgroundImage?: Maybe<LocalizedCmsImage>;
  heroBackgroundImageMobile?: Maybe<LocalizedCmsImage>;
  heroBackgroundImageColor?: Maybe<LocalizedObject>;
  heroTopLayerImage?: Maybe<LocalizedCmsImage>;
  socialMediaImage?: Maybe<LocalizedCmsImage>;
};

export type CmsImage = {
  __typename?: 'CmsImage';
  photographerCredit?: Maybe<LocalizedObject>;
  url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type CollectionDetails = {
  __typename?: 'CollectionDetails';
  id: Scalars['ID'];
  boxColor?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['Int']>;
  curatedEvents: Array<Scalars['String']>;
  curatedEventsTitle?: Maybe<LocalizedObject>;
  depth?: Maybe<Scalars['Int']>;
  description?: Maybe<LocalizedObject>;
  draftTitle?: Maybe<Scalars['String']>;
  eventListQuery?: Maybe<LocalizedObject>;
  eventListTitle?: Maybe<LocalizedObject>;
  expireAt?: Maybe<Scalars['String']>;
  expired?: Maybe<Scalars['Boolean']>;
  firstPublishedAt?: Maybe<Scalars['String']>;
  goLiveAt?: Maybe<Scalars['String']>;
  hasUnpublishedChanges?: Maybe<Scalars['Boolean']>;
  heroImage?: Maybe<CmsImage>;
  keywords?: Maybe<LocalizedCmsKeywords>;
  lastPublishedAt?: Maybe<Scalars['String']>;
  latestRevisionCreatedAt?: Maybe<Scalars['String']>;
  linkText?: Maybe<LocalizedObject>;
  linkUrl?: Maybe<LocalizedObject>;
  live?: Maybe<Scalars['Boolean']>;
  liveRevision?: Maybe<Scalars['Int']>;
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['String']>;
  lockedBy?: Maybe<Scalars['Int']>;
  numchild?: Maybe<Scalars['Int']>;
  owner?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  searchDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  showInMenus?: Maybe<Scalars['Boolean']>;
  slug: Scalars['ID'];
  socialMediaDescription?: Maybe<LocalizedObject>;
  title: LocalizedObject;
  urlPath?: Maybe<Scalars['String']>;
};

export type CollectionListResponse = {
  __typename?: 'CollectionListResponse';
  data: Array<CollectionDetails>;
};

export type Division = {
  __typename?: 'Division';
  type: Scalars['String'];
  ocdId?: Maybe<Scalars['String']>;
  municipality?: Maybe<Scalars['String']>;
  name?: Maybe<LocalizedObject>;
};

export type EventDetails = {
  __typename?: 'EventDetails';
  id: Scalars['ID'];
  typeId?: Maybe<EventTypeId>;
  location?: Maybe<Place>;
  keywords: Array<Keyword>;
  superEvent?: Maybe<InternalIdObject>;
  eventStatus?: Maybe<Scalars['String']>;
  externalLinks: Array<ExternalLink>;
  offers: Array<Offer>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['ID']>;
  subEvents: Array<InternalIdObject>;
  images: Array<EventImage>;
  inLanguage: Array<InLanguage>;
  audience: Array<Audience>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  datePublished?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  customData?: Maybe<Scalars['String']>;
  audienceMinAge?: Maybe<Scalars['String']>;
  audienceMaxAge?: Maybe<Scalars['String']>;
  superEventType?: Maybe<Scalars['String']>;
  name: LocalizedObject;
  locationExtraInfo?: Maybe<LocalizedObject>;
  shortDescription?: Maybe<LocalizedObject>;
  provider?: Maybe<LocalizedObject>;
  infoUrl?: Maybe<LocalizedObject>;
  providerContactInfo?: Maybe<LocalizedObject>;
  description?: Maybe<LocalizedObject>;
  internalId?: Maybe<Scalars['String']>;
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
  enrolmentStartTime?: Maybe<Scalars['String']>;
  enrolmentEndTime?: Maybe<Scalars['String']>;
  maximumAttendeeCapacity?: Maybe<Scalars['Int']>;
  minimumAttendeeCapacity?: Maybe<Scalars['Int']>;
  remainingAttendeeCapacity?: Maybe<Scalars['Int']>;
};

export type EventListResponse = {
  __typename?: 'EventListResponse';
  meta: Meta;
  data: Array<EventDetails>;
};

export enum EventTypeId {
  General = 'General',
  Course = 'Course',
}

export type ExternalLink = {
  __typename?: 'ExternalLink';
  name?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
};

export type EventImage = {
  __typename?: 'EventImage';
  id?: Maybe<Scalars['ID']>;
  license?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  url: Scalars['String'];
  cropping?: Maybe<Scalars['String']>;
  photographerName?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  internalId: Scalars['String'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
};

export type InLanguage = {
  __typename?: 'InLanguage';
  id?: Maybe<Scalars['ID']>;
  translationAvailable?: Maybe<Scalars['Boolean']>;
  name?: Maybe<LocalizedObject>;
  internalId?: Maybe<Scalars['String']>;
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
};

export type InternalIdObject = {
  __typename?: 'InternalIdObject';
  internalId?: Maybe<Scalars['String']>;
};

export type Keyword = {
  __typename?: 'Keyword';
  id?: Maybe<Scalars['ID']>;
  altLabels?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdTime?: Maybe<Scalars['String']>;
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  aggregate?: Maybe<Scalars['Boolean']>;
  deprecated?: Maybe<Scalars['Boolean']>;
  nEvents?: Maybe<Scalars['Int']>;
  image?: Maybe<EventImage>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['ID']>;
  name?: Maybe<LocalizedObject>;
  internalId: Scalars['String'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
};

export type KeywordListResponse = {
  __typename?: 'KeywordListResponse';
  meta: Meta;
  data: Array<Keyword>;
};

export type LandingPage = {
  __typename?: 'LandingPage';
  id: Scalars['ID'];
  topBanner?: Maybe<BannerPage>;
  bottomBanner?: Maybe<BannerPage>;
  path?: Maybe<Scalars['String']>;
  depth?: Maybe<Scalars['Int']>;
  numchild?: Maybe<Scalars['Int']>;
  draftTitle?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  live?: Maybe<Scalars['Boolean']>;
  hasUnpublishedChanges?: Maybe<Scalars['Boolean']>;
  urlPath?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  showInMenus?: Maybe<Scalars['Boolean']>;
  searchDescription?: Maybe<Scalars['String']>;
  goLiveAt?: Maybe<Scalars['String']>;
  expireAt?: Maybe<Scalars['String']>;
  expired?: Maybe<Scalars['Boolean']>;
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['String']>;
  firstPublishedAt?: Maybe<Scalars['String']>;
  lastPublishedAt?: Maybe<Scalars['String']>;
  latestRevisionCreatedAt?: Maybe<Scalars['String']>;
  title?: Maybe<LocalizedObject>;
  keywords?: Maybe<LocalizedCmsKeywords>;
  metaInformation?: Maybe<LocalizedObject>;
  pageTitle?: Maybe<LocalizedObject>;
  contentType?: Maybe<Scalars['Int']>;
  owner?: Maybe<Scalars['Int']>;
  lockedBy?: Maybe<Scalars['Int']>;
  liveRevision?: Maybe<Scalars['Int']>;
};

export type LandingPagesResponse = {
  __typename?: 'LandingPagesResponse';
  data: Array<LandingPage>;
};

export type LocalizedCmsImage = {
  __typename?: 'LocalizedCmsImage';
  en?: Maybe<CmsImage>;
  fi?: Maybe<CmsImage>;
  sv?: Maybe<CmsImage>;
};

export type LocalizedCmsKeywords = {
  __typename?: 'LocalizedCmsKeywords';
  en?: Maybe<Array<Maybe<Scalars['String']>>>;
  fi?: Maybe<Array<Maybe<Scalars['String']>>>;
  sv?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type LocalizedObject = {
  __typename?: 'LocalizedObject';
  fi?: Maybe<Scalars['String']>;
  sv?: Maybe<Scalars['String']>;
  en?: Maybe<Scalars['String']>;
};

export type Meta = {
  __typename?: 'Meta';
  count: Scalars['Int'];
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
};

export type Neighborhood = {
  __typename?: 'Neighborhood';
  id: Scalars['ID'];
  name: LocalizedObject;
};

export type NeighborhoodListResponse = {
  __typename?: 'NeighborhoodListResponse';
  meta: Meta;
  data: Array<Neighborhood>;
};

export type Offer = {
  __typename?: 'Offer';
  isFree?: Maybe<Scalars['Boolean']>;
  description?: Maybe<LocalizedObject>;
  price?: Maybe<LocalizedObject>;
  infoUrl?: Maybe<LocalizedObject>;
};

export type OrganizationDetails = {
  __typename?: 'OrganizationDetails';
  id?: Maybe<Scalars['ID']>;
  dataSource?: Maybe<Scalars['String']>;
  classification?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  foundingDate?: Maybe<Scalars['String']>;
  dissolutionDate?: Maybe<Scalars['String']>;
  parentOrganization?: Maybe<Scalars['String']>;
  subOrganizations?: Maybe<Array<Maybe<Scalars['String']>>>;
  affiliatedOrganizations?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  isAffiliated: Scalars['Boolean'];
  replacedBy?: Maybe<Scalars['String']>;
  internalId: Scalars['String'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
};

export type Place = {
  __typename?: 'Place';
  id?: Maybe<Scalars['ID']>;
  divisions?: Maybe<Array<Division>>;
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  customData?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  contactType?: Maybe<Scalars['String']>;
  addressRegion?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  postOfficeBoxNum?: Maybe<Scalars['String']>;
  addressCountry?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  nEvents?: Maybe<Scalars['Int']>;
  image?: Maybe<EventImage>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['ID']>;
  parent?: Maybe<Scalars['ID']>;
  replacedBy?: Maybe<Scalars['String']>;
  position?: Maybe<PlacePosition>;
  name?: Maybe<LocalizedObject>;
  description?: Maybe<Scalars['String']>;
  telephone?: Maybe<LocalizedObject>;
  addressLocality?: Maybe<LocalizedObject>;
  streetAddress?: Maybe<LocalizedObject>;
  infoUrl?: Maybe<LocalizedObject>;
  internalId: Scalars['String'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
};

export type PlaceListResponse = {
  __typename?: 'PlaceListResponse';
  meta: Meta;
  data: Array<Place>;
};

export type PlacePosition = {
  __typename?: 'PlacePosition';
  type: Scalars['String'];
  coordinates: Array<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  eventDetails: EventDetails;
  eventsByIds: EventListResponse;
  eventList: EventListResponse;
  keywordDetails: Keyword;
  keywordList: KeywordListResponse;
  neighborhoodList: NeighborhoodListResponse;
  organizationDetails: OrganizationDetails;
  placeDetails: Place;
  placeList: PlaceListResponse;
};

export type QueryCollectionDetailsArgs = {
  slug?: Maybe<Scalars['ID']>;
  draft?: Maybe<Scalars['Boolean']>;
};

export type QueryCollectionListArgs = {
  visibleOnFrontpage?: Maybe<Scalars['Boolean']>;
};

export type QueryEventDetailsArgs = {
  id?: Maybe<Scalars['ID']>;
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryEventsByIdsArgs = {
  eventType?: Maybe<Array<Maybe<EventTypeId>>>;
  ids: Array<Scalars['ID']>;
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
  sort?: Maybe<Scalars['String']>;
  pageSize?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

export type QueryEventListArgs = {
  eventType?: Maybe<Array<Maybe<EventTypeId>>>;
  internetBased?: Maybe<Scalars['Boolean']>;
  localOngoingAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
  localOngoingOr?: Maybe<Array<Maybe<Scalars['String']>>>;
  localOngoingOrSet1?: Maybe<Array<Maybe<Scalars['String']>>>;
  localOngoingOrSet2?: Maybe<Array<Maybe<Scalars['String']>>>;
  localOngoingOrSet3?: Maybe<Array<Maybe<Scalars['String']>>>;
  internetOngoingAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
  internetOngoingOr?: Maybe<Array<Maybe<Scalars['String']>>>;
  allOngoing?: Maybe<Scalars['Boolean']>;
  allOngoingAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
  allOngoingOr?: Maybe<Array<Maybe<Scalars['String']>>>;
  combinedText?: Maybe<Array<Maybe<Scalars['String']>>>;
  division?: Maybe<Array<Maybe<Scalars['String']>>>;
  end?: Maybe<Scalars['String']>;
  endsAfter?: Maybe<Scalars['String']>;
  endsBefore?: Maybe<Scalars['String']>;
  ids?: Maybe<Array<Maybe<Scalars['String']>>>;
  inLanguage?: Maybe<Scalars['String']>;
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
  isFree?: Maybe<Scalars['Boolean']>;
  keywordAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordOrSet1?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordOrSet2?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordOrSet3?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordNot?: Maybe<Array<Maybe<Scalars['String']>>>;
  keyword?: Maybe<Array<Maybe<Scalars['String']>>>;
  language?: Maybe<Scalars['String']>;
  location?: Maybe<Array<Maybe<Scalars['String']>>>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  publisher?: Maybe<Scalars['ID']>;
  publisherAncestor?: Maybe<Scalars['ID']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
  startsAfter?: Maybe<Scalars['String']>;
  startsBefore?: Maybe<Scalars['String']>;
  superEvent?: Maybe<Scalars['ID']>;
  superEventType?: Maybe<Array<Maybe<Scalars['String']>>>;
  text?: Maybe<Scalars['String']>;
  translation?: Maybe<Scalars['String']>;
  audienceMinAgeLt?: Maybe<Scalars['String']>;
  audienceMinAgeGt?: Maybe<Scalars['String']>;
  audienceMaxAgeLt?: Maybe<Scalars['String']>;
  audienceMaxAgeGt?: Maybe<Scalars['String']>;
  suitableFor?: Maybe<Array<Maybe<Scalars['Int']>>>;
  // Experimental fields...
  xFullText?: Maybe<Scalars['String']>;
  xOngoing?: Maybe<Scalars['Boolean']>;
};

export type QueryKeywordDetailsArgs = {
  id: Scalars['ID'];
};

export type QueryKeywordListArgs = {
  dataSource?: Maybe<Scalars['String']>;
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllKeywords?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type QueryLandingPageArgs = {
  draft?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};

export type QueryLandingPagesArgs = {
  visibleOnFrontpage?: Maybe<Scalars['Boolean']>;
};

export type QueryOrganizationDetailsArgs = {
  id: Scalars['ID'];
};

export type QueryPlaceDetailsArgs = {
  id: Scalars['ID'];
};

export type QueryPlaceListArgs = {
  dataSource?: Maybe<Scalars['String']>;
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>;
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllPlaces?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type StaticPage = {
  __typename?: 'StaticPage';
  id: Scalars['ID'];
  path?: Maybe<Scalars['String']>;
  depth?: Maybe<Scalars['Int']>;
  numchild?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  draftTitle?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  live?: Maybe<Scalars['Boolean']>;
  hasUnpublishedChanges?: Maybe<Scalars['Boolean']>;
  urlPath?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  showInMenus?: Maybe<Scalars['Boolean']>;
  searchDescription?: Maybe<Scalars['String']>;
  goLiveAt?: Maybe<Scalars['String']>;
  expireAt?: Maybe<Scalars['String']>;
  expired?: Maybe<Scalars['Boolean']>;
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['String']>;
  firstPublishedAt?: Maybe<Scalars['String']>;
  keywords?: Maybe<LocalizedCmsKeywords>;
  lastPublishedAt?: Maybe<Scalars['String']>;
  latestRevisionCreatedAt?: Maybe<Scalars['String']>;
  headingSection?: Maybe<LocalizedObject>;
  contentSection?: Maybe<LocalizedObject>;
  contentYype?: Maybe<Scalars['Int']>;
  owner?: Maybe<Scalars['Int']>;
  lockedBy?: Maybe<Scalars['String']>;
  liveRevision?: Maybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Audience: ResolverTypeWrapper<Audience>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  BannerPage: ResolverTypeWrapper<BannerPage>;
  CmsImage: ResolverTypeWrapper<CmsImage>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Division: ResolverTypeWrapper<Division>;
  EventDetails: ResolverTypeWrapper<EventDetails>;
  EventListResponse: ResolverTypeWrapper<EventListResponse>;
  EventTypeId: EventTypeId;
  ExternalLink: ResolverTypeWrapper<ExternalLink>;
  EventImage: ResolverTypeWrapper<EventImage>;
  InLanguage: ResolverTypeWrapper<InLanguage>;
  InternalIdObject: ResolverTypeWrapper<InternalIdObject>;
  Keyword: ResolverTypeWrapper<Keyword>;
  KeywordListResponse: ResolverTypeWrapper<KeywordListResponse>;
  LocalizedCmsImage: ResolverTypeWrapper<LocalizedCmsImage>;
  LocalizedCmsKeywords: ResolverTypeWrapper<LocalizedCmsKeywords>;
  LocalizedObject: ResolverTypeWrapper<LocalizedObject>;
  Meta: ResolverTypeWrapper<Meta>;
  Mutation: ResolverTypeWrapper<{}>;
  Neighborhood: ResolverTypeWrapper<Neighborhood>;
  NeighborhoodListResponse: ResolverTypeWrapper<NeighborhoodListResponse>;
  Offer: ResolverTypeWrapper<Offer>;
  OrganizationDetails: ResolverTypeWrapper<OrganizationDetails>;
  Place: ResolverTypeWrapper<Place>;
  PlaceListResponse: ResolverTypeWrapper<PlaceListResponse>;
  PlacePosition: ResolverTypeWrapper<PlacePosition>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Query: ResolverTypeWrapper<{}>;
  StaticPage: ResolverTypeWrapper<StaticPage>;
  Subscription: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Audience: Audience;
  ID: Scalars['ID'];
  String: Scalars['String'];
  BannerPage: BannerPage;
  CmsImage: CmsImage;
  Int: Scalars['Int'];
  Boolean: Scalars['Boolean'];
  Division: Division;
  EventDetails: EventDetails;
  EventListResponse: EventListResponse;
  ExternalLink: ExternalLink;
  EventImage: EventImage;
  InLanguage: InLanguage;
  InternalIdObject: InternalIdObject;
  Keyword: Keyword;
  KeywordListResponse: KeywordListResponse;
  LocalizedCmsImage: LocalizedCmsImage;
  LocalizedCmsKeywords: LocalizedCmsKeywords;
  LocalizedObject: LocalizedObject;
  Meta: Meta;
  Mutation: {};
  Neighborhood: Neighborhood;
  NeighborhoodListResponse: NeighborhoodListResponse;
  Offer: Offer;
  OrganizationDetails: OrganizationDetails;
  Place: Place;
  PlaceListResponse: PlaceListResponse;
  PlacePosition: PlacePosition;
  Float: Scalars['Float'];
  Query: {};
  StaticPage: StaticPage;
  Subscription: {};
};

export type AudienceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Audience'] = ResolversParentTypes['Audience'],
> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  internalId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  internalContext?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  internalType?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BannerPageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['BannerPage'] = ResolversParentTypes['BannerPage'],
> = {
  title?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  keywords?: Resolver<
    Maybe<ResolversTypes['LocalizedCmsKeywords']>,
    ParentType,
    ContextType
  >;
  titleAndDescriptionColor?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  buttonText?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  buttonUrl?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  heroBackgroundImage?: Resolver<
    Maybe<ResolversTypes['LocalizedCmsImage']>,
    ParentType,
    ContextType
  >;
  heroBackgroundImageMobile?: Resolver<
    Maybe<ResolversTypes['LocalizedCmsImage']>,
    ParentType,
    ContextType
  >;
  heroBackgroundImageColor?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  heroTopLayerImage?: Resolver<
    Maybe<ResolversTypes['LocalizedCmsImage']>,
    ParentType,
    ContextType
  >;
  socialMediaImage?: Resolver<
    Maybe<ResolversTypes['LocalizedCmsImage']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CmsImageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CmsImage'] = ResolversParentTypes['CmsImage'],
> = {
  photographerCredit?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DivisionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Division'] = ResolversParentTypes['Division'],
> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ocdId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  municipality?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventDetailsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['EventDetails'] = ResolversParentTypes['EventDetails'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  typeId?: Resolver<
    Maybe<ResolversTypes['EventTypeId']>,
    ParentType,
    ContextType
  >;
  location?: Resolver<Maybe<ResolversTypes['Place']>, ParentType, ContextType>;
  keywords?: Resolver<
    Array<ResolversTypes['Keyword']>,
    ParentType,
    ContextType
  >;
  superEvent?: Resolver<
    Maybe<ResolversTypes['InternalIdObject']>,
    ParentType,
    ContextType
  >;
  eventStatus?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  externalLinks?: Resolver<
    Array<ResolversTypes['ExternalLink']>,
    ParentType,
    ContextType
  >;
  offers?: Resolver<Array<ResolversTypes['Offer']>, ParentType, ContextType>;
  dataSource?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  publisher?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  subEvents?: Resolver<
    Array<ResolversTypes['InternalIdObject']>,
    ParentType,
    ContextType
  >;
  images?: Resolver<
    Array<ResolversTypes['EventImage']>,
    ParentType,
    ContextType
  >;
  inLanguage?: Resolver<
    Array<ResolversTypes['InLanguage']>,
    ParentType,
    ContextType
  >;
  audience?: Resolver<
    Array<ResolversTypes['Audience']>,
    ParentType,
    ContextType
  >;
  createdTime?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  lastModifiedTime?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  datePublished?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  startTime?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  endTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customData?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  audienceMinAge?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  audienceMaxAge?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  superEventType?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['LocalizedObject'], ParentType, ContextType>;
  locationExtraInfo?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  shortDescription?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  provider?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  infoUrl?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  providerContactInfo?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  internalId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  internalContext?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  internalType?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  enrolmentStartTime?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  enrolmentEndTime?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  maximumAttendeeCapacity?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  minimumAttendeeCapacity?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  remainingAttendeeCapacity?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventListResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['EventListResponse'] = ResolversParentTypes['EventListResponse'],
> = {
  meta?: Resolver<ResolversTypes['Meta'], ParentType, ContextType>;
  data?: Resolver<
    Array<ResolversTypes['EventDetails']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExternalLinkResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ExternalLink'] = ResolversParentTypes['ExternalLink'],
> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventImageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['EventImage'] = ResolversParentTypes['EventImage'],
> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  license?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdTime?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  lastModifiedTime?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cropping?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  photographerName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  dataSource?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  publisher?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  internalId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  internalContext?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  internalType?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InLanguageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['InLanguage'] = ResolversParentTypes['InLanguage'],
> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  translationAvailable?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  internalId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  internalContext?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  internalType?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InternalIdObjectResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['InternalIdObject'] = ResolversParentTypes['InternalIdObject'],
> = {
  internalId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeywordResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Keyword'] = ResolversParentTypes['Keyword'],
> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  altLabels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >;
  createdTime?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  hasUpcomingEvents?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  lastModifiedTime?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  aggregate?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  deprecated?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  nEvents?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  image?: Resolver<
    Maybe<ResolversTypes['EventImage']>,
    ParentType,
    ContextType
  >;
  dataSource?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  publisher?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  internalId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  internalContext?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  internalType?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeywordListResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['KeywordListResponse'] = ResolversParentTypes['KeywordListResponse'],
> = {
  meta?: Resolver<ResolversTypes['Meta'], ParentType, ContextType>;
  data?: Resolver<Array<ResolversTypes['Keyword']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocalizedCmsImageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['LocalizedCmsImage'] = ResolversParentTypes['LocalizedCmsImage'],
> = {
  en?: Resolver<Maybe<ResolversTypes['CmsImage']>, ParentType, ContextType>;
  fi?: Resolver<Maybe<ResolversTypes['CmsImage']>, ParentType, ContextType>;
  sv?: Resolver<Maybe<ResolversTypes['CmsImage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocalizedCmsKeywordsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['LocalizedCmsKeywords'] = ResolversParentTypes['LocalizedCmsKeywords'],
> = {
  en?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >;
  fi?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >;
  sv?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocalizedObjectResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['LocalizedObject'] = ResolversParentTypes['LocalizedObject'],
> = {
  fi?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sv?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  en?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetaResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Meta'] = ResolversParentTypes['Meta'],
> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  next?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  previous?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type NeighborhoodResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Neighborhood'] = ResolversParentTypes['Neighborhood'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['LocalizedObject'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NeighborhoodListResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['NeighborhoodListResponse'] = ResolversParentTypes['NeighborhoodListResponse'],
> = {
  meta?: Resolver<ResolversTypes['Meta'], ParentType, ContextType>;
  data?: Resolver<
    Array<ResolversTypes['Neighborhood']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OfferResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Offer'] = ResolversParentTypes['Offer'],
> = {
  isFree?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  price?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  infoUrl?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationDetailsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OrganizationDetails'] = ResolversParentTypes['OrganizationDetails'],
> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  dataSource?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  classification?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  foundingDate?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  dissolutionDate?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  parentOrganization?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  subOrganizations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >;
  affiliatedOrganizations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >;
  createdTime?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  lastModifiedTime?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  isAffiliated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  replacedBy?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  internalId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  internalContext?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  internalType?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlaceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Place'] = ResolversParentTypes['Place'],
> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  divisions?: Resolver<
    Maybe<Array<ResolversTypes['Division']>>,
    ParentType,
    ContextType
  >;
  hasUpcomingEvents?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  createdTime?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  lastModifiedTime?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  customData?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contactType?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  addressRegion?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  postalCode?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  postOfficeBoxNum?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  addressCountry?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  nEvents?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  image?: Resolver<
    Maybe<ResolversTypes['EventImage']>,
    ParentType,
    ContextType
  >;
  dataSource?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  publisher?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  replacedBy?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  position?: Resolver<
    Maybe<ResolversTypes['PlacePosition']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  telephone?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  addressLocality?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  streetAddress?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  infoUrl?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  internalId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  internalContext?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  internalType?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlaceListResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PlaceListResponse'] = ResolversParentTypes['PlaceListResponse'],
> = {
  meta?: Resolver<ResolversTypes['Meta'], ParentType, ContextType>;
  data?: Resolver<Array<ResolversTypes['Place']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlacePositionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PlacePosition'] = ResolversParentTypes['PlacePosition'],
> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  coordinates?: Resolver<
    Array<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;

  eventDetails?: Resolver<
    ResolversTypes['EventDetails'],
    ParentType,
    ContextType,
    RequireFields<QueryEventDetailsArgs, never>
  >;
  eventsByIds?: Resolver<
    ResolversTypes['EventListResponse'],
    ParentType,
    ContextType,
    RequireFields<QueryEventsByIdsArgs, 'eventType' | 'ids'>
  >;
  eventList?: Resolver<
    ResolversTypes['EventListResponse'],
    ParentType,
    ContextType,
    RequireFields<QueryEventListArgs, 'eventType'>
  >;
  keywordDetails?: Resolver<
    ResolversTypes['Keyword'],
    ParentType,
    ContextType,
    RequireFields<QueryKeywordDetailsArgs, 'id'>
  >;
  keywordList?: Resolver<
    ResolversTypes['KeywordListResponse'],
    ParentType,
    ContextType,
    RequireFields<QueryKeywordListArgs, never>
  >;

  neighborhoodList?: Resolver<
    ResolversTypes['NeighborhoodListResponse'],
    ParentType,
    ContextType
  >;
  organizationDetails?: Resolver<
    ResolversTypes['OrganizationDetails'],
    ParentType,
    ContextType,
    RequireFields<QueryOrganizationDetailsArgs, 'id'>
  >;
  placeDetails?: Resolver<
    ResolversTypes['Place'],
    ParentType,
    ContextType,
    RequireFields<QueryPlaceDetailsArgs, 'id'>
  >;
  placeList?: Resolver<
    ResolversTypes['PlaceListResponse'],
    ParentType,
    ContextType,
    RequireFields<QueryPlaceListArgs, never>
  >;
};

export type StaticPageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['StaticPage'] = ResolversParentTypes['StaticPage'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  depth?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  numchild?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  draftTitle?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  live?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hasUnpublishedChanges?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  urlPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  seoTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  showInMenus?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  searchDescription?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  goLiveAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expireAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expired?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  locked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lockedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstPublishedAt?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  keywords?: Resolver<
    Maybe<ResolversTypes['LocalizedCmsKeywords']>,
    ParentType,
    ContextType
  >;
  lastPublishedAt?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  latestRevisionCreatedAt?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  headingSection?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  contentSection?: Resolver<
    Maybe<ResolversTypes['LocalizedObject']>,
    ParentType,
    ContextType
  >;
  contentYype?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lockedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  liveRevision?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription'],
> = {
  _empty?: SubscriptionResolver<
    Maybe<ResolversTypes['String']>,
    '_empty',
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = any> = {
  Audience?: AudienceResolvers<ContextType>;
  BannerPage?: BannerPageResolvers<ContextType>;
  CmsImage?: CmsImageResolvers<ContextType>;
  Division?: DivisionResolvers<ContextType>;
  EventDetails?: EventDetailsResolvers<ContextType>;
  EventListResponse?: EventListResponseResolvers<ContextType>;
  ExternalLink?: ExternalLinkResolvers<ContextType>;
  EventImage?: EventImageResolvers<ContextType>;
  InLanguage?: InLanguageResolvers<ContextType>;
  InternalIdObject?: InternalIdObjectResolvers<ContextType>;
  Keyword?: KeywordResolvers<ContextType>;
  KeywordListResponse?: KeywordListResponseResolvers<ContextType>;
  LocalizedCmsImage?: LocalizedCmsImageResolvers<ContextType>;
  LocalizedCmsKeywords?: LocalizedCmsKeywordsResolvers<ContextType>;
  LocalizedObject?: LocalizedObjectResolvers<ContextType>;
  Meta?: MetaResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Neighborhood?: NeighborhoodResolvers<ContextType>;
  NeighborhoodListResponse?: NeighborhoodListResponseResolvers<ContextType>;
  Offer?: OfferResolvers<ContextType>;
  OrganizationDetails?: OrganizationDetailsResolvers<ContextType>;
  Place?: PlaceResolvers<ContextType>;
  PlaceListResponse?: PlaceListResponseResolvers<ContextType>;
  PlacePosition?: PlacePositionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  StaticPage?: StaticPageResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

export type MapOpenDataDataSource_Feature = {
  type: 'Feature';
  geometry: unknown;
  properties: unknown;
};

export type MapOpenDataDataSource_NeighborhoodListResponse = {
  type: 'FeatureCollection';
  features: Array<MapOpenDataDataSource_Feature>;
  totalFeatures?: number;
  numberMatched?: number;
  numberReturned: number;
  timeStamp?: string;
  crs?: {
    type: string;
    properties: {
      name: string;
    };
  };
};

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
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  _Any: { input: any; output: any };
  federation__FieldSet: { input: any; output: any };
  link__Import: { input: any; output: any };
};

export type Audience = {
  __typename?: 'Audience';
  id?: Maybe<Scalars['ID']['output']>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId?: Maybe<Scalars['String']['output']>;
  internalType?: Maybe<Scalars['String']['output']>;
  name?: Maybe<LocalizedObject>;
};

export type BannerPage = {
  __typename?: 'BannerPage';
  buttonText?: Maybe<LocalizedObject>;
  buttonUrl?: Maybe<LocalizedObject>;
  description?: Maybe<LocalizedObject>;
  heroBackgroundImage?: Maybe<LocalizedCmsImage>;
  heroBackgroundImageColor?: Maybe<LocalizedObject>;
  heroBackgroundImageMobile?: Maybe<LocalizedCmsImage>;
  heroTopLayerImage?: Maybe<LocalizedCmsImage>;
  keywords?: Maybe<LocalizedCmsKeywords>;
  socialMediaImage?: Maybe<LocalizedCmsImage>;
  title?: Maybe<LocalizedObject>;
  titleAndDescriptionColor?: Maybe<LocalizedObject>;
};

export type CmsImage = {
  __typename?: 'CmsImage';
  photographerCredit?: Maybe<LocalizedObject>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type Division = {
  __typename?: 'Division';
  municipality?: Maybe<Scalars['String']['output']>;
  name?: Maybe<LocalizedObject>;
  ocdId?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type EventDetails = {
  __typename?: 'EventDetails';
  audience: Array<Audience>;
  audienceMaxAge?: Maybe<Scalars['String']['output']>;
  audienceMinAge?: Maybe<Scalars['String']['output']>;
  createdTime?: Maybe<Scalars['String']['output']>;
  customData?: Maybe<Scalars['String']['output']>;
  dataSource?: Maybe<Scalars['String']['output']>;
  datePublished?: Maybe<Scalars['String']['output']>;
  description?: Maybe<LocalizedObject>;
  endTime?: Maybe<Scalars['String']['output']>;
  enrolmentEndTime?: Maybe<Scalars['String']['output']>;
  enrolmentStartTime?: Maybe<Scalars['String']['output']>;
  eventStatus?: Maybe<Scalars['String']['output']>;
  externalLinks: Array<ExternalLink>;
  id: Scalars['ID']['output'];
  images: Array<EventImage>;
  inLanguage: Array<InLanguage>;
  infoUrl?: Maybe<LocalizedObject>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId?: Maybe<Scalars['String']['output']>;
  internalType?: Maybe<Scalars['String']['output']>;
  keywords: Array<Keyword>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Place>;
  locationExtraInfo?: Maybe<LocalizedObject>;
  maximumAttendeeCapacity?: Maybe<Scalars['Int']['output']>;
  minimumAttendeeCapacity?: Maybe<Scalars['Int']['output']>;
  name: LocalizedObject;
  offers: Array<Offer>;
  provider?: Maybe<LocalizedObject>;
  providerContactInfo?: Maybe<LocalizedObject>;
  publisher?: Maybe<Scalars['ID']['output']>;
  registration?: Maybe<Registration>;
  shortDescription?: Maybe<LocalizedObject>;
  startTime?: Maybe<Scalars['String']['output']>;
  subEvents: Array<InternalIdObject>;
  superEvent?: Maybe<InternalIdObject>;
  superEventType?: Maybe<Scalars['String']['output']>;
  typeId?: Maybe<EventTypeId>;
};

export type EventImage = {
  __typename?: 'EventImage';
  createdTime?: Maybe<Scalars['String']['output']>;
  cropping?: Maybe<Scalars['String']['output']>;
  dataSource?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId: Scalars['String']['output'];
  internalType?: Maybe<Scalars['String']['output']>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  license?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  photographerName?: Maybe<Scalars['String']['output']>;
  publisher?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type EventListResponse = {
  __typename?: 'EventListResponse';
  data: Array<EventDetails>;
  meta: Meta;
};

export enum EventTypeId {
  Course = 'Course',
  General = 'General',
}

export type ExternalLink = {
  __typename?: 'ExternalLink';
  language?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type InLanguage = {
  __typename?: 'InLanguage';
  id?: Maybe<Scalars['ID']['output']>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId?: Maybe<Scalars['String']['output']>;
  internalType?: Maybe<Scalars['String']['output']>;
  name?: Maybe<LocalizedObject>;
  translationAvailable?: Maybe<Scalars['Boolean']['output']>;
};

export type InternalIdObject = {
  __typename?: 'InternalIdObject';
  internalId?: Maybe<Scalars['String']['output']>;
};

export type Keyword = {
  __typename?: 'Keyword';
  aggregate?: Maybe<Scalars['Boolean']['output']>;
  altLabels?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createdTime?: Maybe<Scalars['String']['output']>;
  dataSource?: Maybe<Scalars['String']['output']>;
  deprecated?: Maybe<Scalars['Boolean']['output']>;
  hasUpcomingEvents?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<EventImage>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId: Scalars['String']['output'];
  internalType?: Maybe<Scalars['String']['output']>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  nEvents?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<LocalizedObject>;
  publisher?: Maybe<Scalars['ID']['output']>;
};

export type KeywordListResponse = {
  __typename?: 'KeywordListResponse';
  data: Array<Keyword>;
  meta: Meta;
};

export type LocalizedCmsImage = {
  __typename?: 'LocalizedCmsImage';
  en?: Maybe<CmsImage>;
  fi?: Maybe<CmsImage>;
  sv?: Maybe<CmsImage>;
};

export type LocalizedCmsKeywords = {
  __typename?: 'LocalizedCmsKeywords';
  en?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  fi?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  sv?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type LocalizedObject = {
  __typename?: 'LocalizedObject';
  en?: Maybe<Scalars['String']['output']>;
  fi?: Maybe<Scalars['String']['output']>;
  sv?: Maybe<Scalars['String']['output']>;
};

export type Meta = {
  __typename?: 'Meta';
  count: Scalars['Int']['output'];
  next?: Maybe<Scalars['String']['output']>;
  previous?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
};

export type Neighborhood = {
  __typename?: 'Neighborhood';
  id: Scalars['ID']['output'];
  name: LocalizedObject;
};

export type NeighborhoodListResponse = {
  __typename?: 'NeighborhoodListResponse';
  data: Array<Neighborhood>;
  meta: Meta;
};

export type Offer = {
  __typename?: 'Offer';
  description?: Maybe<LocalizedObject>;
  infoUrl?: Maybe<LocalizedObject>;
  isFree?: Maybe<Scalars['Boolean']['output']>;
  price?: Maybe<LocalizedObject>;
};

export type OrganizationDetails = {
  __typename?: 'OrganizationDetails';
  affiliatedOrganizations?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  classification?: Maybe<Scalars['String']['output']>;
  createdTime?: Maybe<Scalars['String']['output']>;
  dataSource?: Maybe<Scalars['String']['output']>;
  dissolutionDate?: Maybe<Scalars['String']['output']>;
  foundingDate?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId: Scalars['String']['output'];
  internalType?: Maybe<Scalars['String']['output']>;
  isAffiliated: Scalars['Boolean']['output'];
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentOrganization?: Maybe<Scalars['String']['output']>;
  replacedBy?: Maybe<Scalars['String']['output']>;
  subOrganizations?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type Place = {
  __typename?: 'Place';
  addressCountry?: Maybe<Scalars['String']['output']>;
  addressLocality?: Maybe<LocalizedObject>;
  addressRegion?: Maybe<Scalars['String']['output']>;
  contactType?: Maybe<Scalars['String']['output']>;
  createdTime?: Maybe<Scalars['String']['output']>;
  customData?: Maybe<Scalars['String']['output']>;
  dataSource?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  divisions?: Maybe<Array<Division>>;
  email?: Maybe<Scalars['String']['output']>;
  hasUpcomingEvents?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<EventImage>;
  infoUrl?: Maybe<LocalizedObject>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId: Scalars['String']['output'];
  internalType?: Maybe<Scalars['String']['output']>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  nEvents?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<LocalizedObject>;
  parent?: Maybe<Scalars['ID']['output']>;
  position?: Maybe<PlacePosition>;
  postOfficeBoxNum?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  publisher?: Maybe<Scalars['ID']['output']>;
  replacedBy?: Maybe<Scalars['String']['output']>;
  streetAddress?: Maybe<LocalizedObject>;
  telephone?: Maybe<LocalizedObject>;
};

export type PlaceListResponse = {
  __typename?: 'PlaceListResponse';
  data: Array<Place>;
  meta: Meta;
};

export type PlacePosition = {
  __typename?: 'PlacePosition';
  coordinates: Array<Scalars['Float']['output']>;
  type: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  _service: _Service;
  eventDetails: EventDetails;
  eventList: EventListResponse;
  eventsByIds: EventListResponse;
  keywordDetails: Keyword;
  keywordList: KeywordListResponse;
  neighborhoodList: NeighborhoodListResponse;
  organizationDetails: OrganizationDetails;
  placeDetails: Place;
  placeList: PlaceListResponse;
};

export type QueryEventDetailsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  include?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryEventListArgs = {
  allOngoing?: InputMaybe<Scalars['Boolean']['input']>;
  allOngoingAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  allOngoingOr?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  audienceMaxAgeGt?: InputMaybe<Scalars['String']['input']>;
  audienceMaxAgeLt?: InputMaybe<Scalars['String']['input']>;
  audienceMinAgeGt?: InputMaybe<Scalars['String']['input']>;
  audienceMinAgeLt?: InputMaybe<Scalars['String']['input']>;
  combinedText?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  division?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  end?: InputMaybe<Scalars['String']['input']>;
  endsAfter?: InputMaybe<Scalars['String']['input']>;
  endsBefore?: InputMaybe<Scalars['String']['input']>;
  eventType?: InputMaybe<Array<InputMaybe<EventTypeId>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  inLanguage?: InputMaybe<Scalars['String']['input']>;
  include?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internetBased?: InputMaybe<Scalars['Boolean']['input']>;
  internetOngoingAnd?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  internetOngoingOr?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isFree?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywordAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywordNot?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywordOrSet1?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywordOrSet2?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywordOrSet3?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  language?: InputMaybe<Scalars['String']['input']>;
  localOngoingAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  localOngoingOr?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  localOngoingOrSet1?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  localOngoingOrSet2?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  localOngoingOrSet3?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  location?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  publisher?: InputMaybe<Scalars['ID']['input']>;
  publisherAncestor?: InputMaybe<Scalars['ID']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  startsAfter?: InputMaybe<Scalars['String']['input']>;
  startsBefore?: InputMaybe<Scalars['String']['input']>;
  suitableFor?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  superEvent?: InputMaybe<Scalars['ID']['input']>;
  superEventType?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text?: InputMaybe<Scalars['String']['input']>;
  translation?: InputMaybe<Scalars['String']['input']>;
  fullText?: InputMaybe<Scalars['String']['input']>;
  ongoing?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryEventsByIdsArgs = {
  end?: InputMaybe<Scalars['String']['input']>;
  eventType?: InputMaybe<Array<InputMaybe<EventTypeId>>>;
  ids: Array<Scalars['ID']['input']>;
  include?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};

export type QueryKeywordDetailsArgs = {
  id: Scalars['ID']['input'];
};

export type QueryKeywordListArgs = {
  dataSource?: InputMaybe<Scalars['String']['input']>;
  hasUpcomingEvents?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  showAllKeywords?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type QueryOrganizationDetailsArgs = {
  id: Scalars['ID']['input'];
};

export type QueryPlaceDetailsArgs = {
  id: Scalars['ID']['input'];
};

export type QueryPlaceListArgs = {
  dataSource?: InputMaybe<Scalars['String']['input']>;
  divisions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  hasUpcomingEvents?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  showAllPlaces?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type Registration = {
  __typename?: 'Registration';
  audienceMaxAge?: Maybe<Scalars['String']['output']>;
  audienceMinAge?: Maybe<Scalars['String']['output']>;
  currentAttendeeCount?: Maybe<Scalars['Int']['output']>;
  currentWaitingListCount?: Maybe<Scalars['Int']['output']>;
  enrolmentEndTime?: Maybe<Scalars['String']['output']>;
  enrolmentStartTime?: Maybe<Scalars['String']['output']>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId?: Maybe<Scalars['String']['output']>;
  internalType?: Maybe<Scalars['String']['output']>;
  maximumAttendeeCapacity?: Maybe<Scalars['Int']['output']>;
  maximumGroupSize?: Maybe<Scalars['Int']['output']>;
  minimumAttendeeCapacity?: Maybe<Scalars['Int']['output']>;
  remainingAttendeeCapacity?: Maybe<Scalars['Int']['output']>;
  remainingWaitingListCapacity?: Maybe<Scalars['Int']['output']>;
  signupUrl?: Maybe<LocalizedObject>;
  waitingListCapacity?: Maybe<Scalars['Int']['output']>;
};

export type StaticPage = {
  __typename?: 'StaticPage';
  contentSection?: Maybe<LocalizedObject>;
  contentYype?: Maybe<Scalars['Int']['output']>;
  depth?: Maybe<Scalars['Int']['output']>;
  draftTitle?: Maybe<Scalars['String']['output']>;
  expireAt?: Maybe<Scalars['String']['output']>;
  expired?: Maybe<Scalars['Boolean']['output']>;
  firstPublishedAt?: Maybe<Scalars['String']['output']>;
  goLiveAt?: Maybe<Scalars['String']['output']>;
  hasUnpublishedChanges?: Maybe<Scalars['Boolean']['output']>;
  headingSection?: Maybe<LocalizedObject>;
  id: Scalars['ID']['output'];
  keywords?: Maybe<LocalizedCmsKeywords>;
  lastPublishedAt?: Maybe<Scalars['String']['output']>;
  latestRevisionCreatedAt?: Maybe<Scalars['String']['output']>;
  live?: Maybe<Scalars['Boolean']['output']>;
  liveRevision?: Maybe<Scalars['Int']['output']>;
  locked?: Maybe<Scalars['Boolean']['output']>;
  lockedAt?: Maybe<Scalars['String']['output']>;
  lockedBy?: Maybe<Scalars['String']['output']>;
  numchild?: Maybe<Scalars['Int']['output']>;
  owner?: Maybe<Scalars['Int']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  searchDescription?: Maybe<Scalars['String']['output']>;
  seoTitle?: Maybe<Scalars['String']['output']>;
  showInMenus?: Maybe<Scalars['Boolean']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  urlPath?: Maybe<Scalars['String']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']['output']>;
};

export type _Service = {
  __typename?: '_Service';
  sdl?: Maybe<Scalars['String']['output']>;
};

export enum Link__Purpose {
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  Execution = 'EXECUTION',
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  Security = 'SECURITY',
}

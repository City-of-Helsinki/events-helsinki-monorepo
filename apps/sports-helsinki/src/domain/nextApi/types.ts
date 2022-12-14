import type { UrlObject } from 'url';

import type { OperationVariables, QueryResult } from '@apollo/client';

import type {
  TimeResourceState,
  UnifiedSearchVenue,
} from 'events-helsinki-components';
import type { Sources } from '../../domain/app/appConstants';
import type { PageInfoFragment } from '../../domain/nextApi/pageInfoFragment';

export type Locale = 'fi' | 'sv' | 'en';

export type MenuItem = {
  id: string;
  order: number;
  path: string;
  target: string;
  title: string;
  url: string;
  label: string;
};

export type NavigationItem = MenuItem;

export type Language = {
  id: string;
  name: string;
  slug: string;
  code: string;
  locale: string;
};

export type Keyword = {
  label: string | JSX.Element;
  isHighlighted?: boolean;
  href: string | UrlObject;
};

export type ItemInfoLineObject = {
  text: string;
  icon: React.ReactNode;
};

export type Item = {
  id: string;
  title: string;
  pre?: string;
  infoLines: (ItemInfoLineObject | string)[];
  keywords: Keyword[];
  href: string | UrlObject;
  location?: number[];
  image: string;
};

export type LandingPage = {
  title: string;
  desktopImage: {
    uri: string;
  };
  link: string;
};

export type Recommendation = {
  id: string;
  keywords: string[];
  pre: string;
  title: string;
  infoLines: string[];
  href: string;
  image: string;
};

export type Node<T> = {
  cursor: string;
  node: T;
};

export type Connection<T> = {
  edges: Node<T>[];
};

export type EventSelected = {
  module: 'event_selected';
  events: string[];
  title: string;
};

export type EventSearch = {
  module: 'event_search';
  url: string;
  title: string;
};

export type LocationsSelected = {
  module: 'locations_selected';
  url: string;
  title: string;
};

export type Collection = {
  id: string;
  translation?: {
    title?: string;
    description?: string;
    image?: string;
    slug: string;
    modules: Array<EventSelected | EventSearch | LocationsSelected>;
  };
};

export type LocalizedString = {
  fi?: string;
  sv?: string;
  en?: string;
};

type Image = {
  url: string;
  caption: string | null;
};

export type Venue = {
  name: LocalizedString;
  description: LocalizedString;
  meta: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  images: Image[] | null;
  location: {
    geoLocation: {
      geometry: {
        coordinates: number[];
      };
    };
    address: {
      streetAddress?: LocalizedString;
      postalCode?: string;
      city?: LocalizedString;
    };
  };
  ontologyWords: [
    {
      id: string;
      label: LocalizedString;
    }
  ];
  openingHours: {
    today: Time[];
  };
};

export type SearchResult = {
  venue: UnifiedSearchVenue;
};

export type TranslationsObject = {
  fi?: string;
  en?: string;
  sv?: string;
};

export type AccessibilitySentences = {
  groupName: string;
  sentences: string[];
};

export type AccessibilityTranslationsObject = {
  fi?: AccessibilitySentences[];
  en?: AccessibilitySentences[];
  sv?: AccessibilitySentences[];
};

export type Point = {
  type: 'Point';
  coordinates: number[];
};

type Ontology = {
  id: number;
  label: string;
};

export type VenueDetails<T = TranslationsObject> = {
  id: string;
  dataSource: string | null;
  email: string | null;
  postalCode: string;
  image: string | null;
  addressLocality: T | null;
  position: Point | null;
  description: T | null;
  name: T | null;
  infoUrl: T | null;
  streetAddress: T | null;
  telephone: T | null;
  ontologyTree: Ontology[];
  ontologyWords: Ontology[];
  accessibilitySentences:
    | AccessibilityTranslationsObject
    | AccessibilitySentences;
  connections: Array<{
    sectionType: string;
    name: T;
    phone: string;
    url: T | null;
  }>;
};

export type Source = typeof Sources[keyof typeof Sources];

export type Time = {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  endTimeOnNextDay: boolean;
  resourceState: TimeResourceState;
  fullDay: boolean;
  periods: number[];
};

export type OpeningHour = {
  date: string;
  times: Time[];
};

export type AnyObject = Record<string, unknown>;

export type Context = {
  language?: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSources?: any;
};

export type Address = {
  streetName: string;
  zip: string;
  city: string;
};

export type Option = {
  label: string;
  value: string;
};

export type ItemQueryResult<
  TData = null,
  TVariables = OperationVariables
> = Omit<QueryResult<TData, TVariables>, 'data'> & {
  items: Item[];
  pageInfo?: PageInfoFragment;
  totalCount: number;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

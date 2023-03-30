import type { UnifiedSearchVenue } from '@events-helsinki/components';
import type { SEARCH_ROUTES } from './constants';

// eslint-disable-next-line prettier/prettier
export type SearchRoute = (typeof SEARCH_ROUTES)[keyof typeof SEARCH_ROUTES];

export type Node<T> = {
  cursor: string;
  node: T;
};

export type Connection<T> = {
  edges: Node<T>[];
};

export type SearchResult = {
  venue: UnifiedSearchVenue;
};

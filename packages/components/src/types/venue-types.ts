import get from 'lodash/get';
import type { Point, UnifiedSearchVenue, Venue } from './generated/graphql';

export type DirectionAddress = {
  streetName: string;
  zip: string;
  city: string;
};
export type DirectionPoint = {
  name: string;
  address: DirectionAddress;
  point: Point;
};

export const isUnifiedSearchVenue = (
  value: unknown
): value is UnifiedSearchVenue =>
  get(value, '__typename') == 'UnifiedSearchVenue';

export const isVenue = (value: unknown): value is Venue =>
  get(value, '__typename') == 'Venue';

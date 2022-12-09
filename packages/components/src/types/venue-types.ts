import type { Point } from './generated/graphql';

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

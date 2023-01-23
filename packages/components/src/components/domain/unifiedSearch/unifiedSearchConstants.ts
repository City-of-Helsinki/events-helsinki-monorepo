/* eslint-disable */
import { SortOrder } from '../../../types';

export const OrderDir = {
  asc: 'asc',
  desc: 'desc',
} as const;

export type OrderDirType = typeof OrderDir[keyof typeof OrderDir];

export const UnifiedSearchOrderBy = {
  relevance: 'relevance',
  distance: 'distance',
  name: 'name',
} as const;

export type UnifiedSearchOrderByType =
  typeof UnifiedSearchOrderBy[keyof typeof UnifiedSearchOrderBy];

export const orderDirToUnifiedSearchDistanceOrder = {
  asc: SortOrder.Ascending,
  desc: SortOrder.Descending,
} as const;

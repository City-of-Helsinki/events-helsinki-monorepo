import type {
  OpeningHours,
  OpeningHoursTimes,
  SearchListQueryVariables,
} from '../../../types';
import type {
  UnifiedSearchOrderByType,
  OrderDirType,
} from './unifiedSearchConstants';

export type UnifiedSearchParameters = {
  q?: string[];
  administrativeDivisionIds?: string[];
  ontologyTreeIds?: number[];
  ontologyWordIds?: number[];
  targetGroups?: string[];
  after?: string;
  first?: number;
  ontology?: string;
  isOpenNow?: boolean;
  openAt?: Date;
  orderBy?: UnifiedSearchOrderByType;
  orderDir?: OrderDirType;
};
export type UnifiedSearchVariables = SearchListQueryVariables;
export type UnifiedSearchOpeningHours = OpeningHours;
export type UnifiedSearchOpeningHoursTimes = OpeningHoursTimes;

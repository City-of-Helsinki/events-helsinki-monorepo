import type {
  OpeningHours,
  OpeningHoursTimes,
  SearchListQueryVariables,
} from '../../../types';
import type { OrderByType, OrderDirType } from './unifiedSearchConstants';

export type UnifiedSearchParameters = {
  q?: string[];
  administrativeDivisionIds?: string[];
  ontologyTreeIds?: number[];
  ontologyWordIds?: number[];
  after?: string;
  first?: number;
  ontology?: string;
  isOpenNow?: boolean;
  openAt?: Date;
  orderBy?: OrderByType;
  orderDir?: OrderDirType;
};
export type UnifiedSearchVariables = SearchListQueryVariables;
export type UnifiedSearchOpeningHours = OpeningHours;
export type UnifiedSearchOpeningHoursTimes = OpeningHoursTimes;

export type TransitionOptions = {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
};

export type ModifyFilters = (
  search: Partial<UnifiedSearchParameters>,
  transitionOptions?: TransitionOptions
) => void;

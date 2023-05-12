import { EventTypeId } from '@events-helsinki/components/types';
import React, { createContext } from 'react';
import {
  initialEventSearchAdapterValues,
  initialVenueSearchAdapterValues,
} from '../constants';
import type { CombinedSearchAdapterInput } from '../types';
import type CombinedSearchFormAdapter from './CombinedSearchFormAdapter';

export type CombinedSearch = {
  formValues: CombinedSearchAdapterInput;
  searchVariables: ReturnType<CombinedSearchFormAdapter['getSearchVariables']>;
};

export const CombinedSearchContext = createContext<CombinedSearch>({
  formValues: {},
  //   searchVariables: {}, // TODO: Would an empty be better than initialized?
  searchVariables: {
    venue: initialVenueSearchAdapterValues,
    event: {
      ...initialEventSearchAdapterValues,
      eventType: EventTypeId.General,
    },
    course: {
      ...initialEventSearchAdapterValues,
      eventType: EventTypeId.Course,
    },
  },
} as CombinedSearch);

export function useCombinedSearchContext() {
  const context = React.useContext(CombinedSearchContext);
  if (!context) {
    throw new Error(
      `Combined search components cannot be rendered outside the CombinedSearchProvider`
    );
  }
  return context;
}

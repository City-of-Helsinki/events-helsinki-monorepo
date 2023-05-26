import { EventTypeId } from '@events-helsinki/components/types';
import type { Router } from 'next/router';
import React, { createContext } from 'react';
import {
  initialCombinedSearchFormValues,
  initialEventSearchAdapterValues,
  initialVenueSearchAdapterValues,
} from '../constants';
import type { CombinedSearchAdapterInput } from '../types';
import type CombinedSearchFormAdapter from './CombinedSearchFormAdapter';

export type CombinedSearchContextType = {
  formValues: CombinedSearchAdapterInput;
  searchVariables: ReturnType<CombinedSearchFormAdapter['getSearchVariables']>;
  setFormValues: (values: Partial<CombinedSearchAdapterInput>) => void;
  setFormValue: (
    field: keyof CombinedSearchAdapterInput,
    value: CombinedSearchAdapterInput[keyof CombinedSearchAdapterInput]
  ) => void;
  updateRouteToSearchPage: (options?: Parameters<Router['push']>[2]) => void;
  resetFormValues: () => void;
};

export const CombinedSearchContext = createContext<CombinedSearchContextType>({
  formValues: { ...initialCombinedSearchFormValues },
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
  setFormValues() {
    throw new Error(
      'setFormValues to set multiple values at once, is still unimplemented, when it should be implemented!'
    );
  },
  setFormValue() {
    throw new Error(
      'setFormValue for a single field is still unimplemented, when it should be implemented!'
    );
  },
  updateRouteToSearchPage() {
    throw new Error(
      'updateRouteToSearchPage is still unimplemented, when it should be implemented!'
    );
  },
  resetFormValues() {
    throw new Error(
      'resetFormValues is still unimplemented, when it should be implemented!'
    );
  },
});

export function useCombinedSearchContext() {
  const context = React.useContext(CombinedSearchContext);
  if (!context) {
    throw new Error(
      `Combined search components cannot be rendered outside the CombinedSearchProvider`
    );
  }
  return context;
}

import React from 'react';

import { initialCombinedSearchFormValues } from '../constants';
import { useCombinedSearchController } from '../hooks/useCombinedSearchController';
import type { CombinedSearchAdapterInput } from '../types';
import type { CombinedSearchContextType } from './CombinedSearchContext';
import { CombinedSearchContext } from './CombinedSearchContext';
import type CombinedSearchFormAdapter from './CombinedSearchFormAdapter';

type UseGetCombinedSearchContextReturnType = {
  combinedSearchFormAdapter: CombinedSearchFormAdapter;
  contextValue: CombinedSearchContextType;
};

function useGetCombinedSearchContext(): UseGetCombinedSearchContextReturnType {
  const { combinedSearchFormAdapter, updateRouteToSearchPage } =
    useCombinedSearchController();
  const getFormValues = () => combinedSearchFormAdapter.getFormValues();
  const getSearchVariables = () =>
    combinedSearchFormAdapter.getSearchVariables();
  const setFormValues = (values: Partial<CombinedSearchAdapterInput>) =>
    combinedSearchFormAdapter.setFormValues(values);
  const setFormValue = (
    field: keyof CombinedSearchAdapterInput,
    value: CombinedSearchAdapterInput[keyof CombinedSearchAdapterInput]
  ) =>
    setFormValues({
      [field]: value,
    });

  const resetFormValues = () => {
    setFormValues(initialCombinedSearchFormValues);
    updateRouteToSearchPage({ shallow: true });
  };

  return {
    combinedSearchFormAdapter,
    contextValue: {
      formValues: getFormValues(),
      searchVariables: getSearchVariables(),
      setFormValues,
      setFormValue,
      resetFormValues,
      updateRouteToSearchPage,
    },
  };
}

export function CombinedSearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { contextValue } = useGetCombinedSearchContext();
  return (
    <CombinedSearchContext.Provider value={contextValue}>
      {children}
    </CombinedSearchContext.Provider>
  );
}

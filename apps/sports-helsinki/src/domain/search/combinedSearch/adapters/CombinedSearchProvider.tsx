import useLocale from '@events-helsinki/components/hooks/useLocale';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';

import { initialCombinedSearchFormValues } from '../constants';
import type { CombinedSearchAdapterInput } from '../types';
import type { CombinedSearchContextType } from './CombinedSearchContext';
import { CombinedSearchContext } from './CombinedSearchContext';
import CombinedSearchFormAdapter from './CombinedSearchFormAdapter';

type UseGetCombinedSearchContextReturnType = {
  combinedSearchFormAdapter: CombinedSearchFormAdapter;
  contextValue: CombinedSearchContextType;
};

function useGetCombinedSearchContext(): UseGetCombinedSearchContextReturnType {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();

  const combinedSearchFormAdapter = new CombinedSearchFormAdapter(
    router,
    locale,
    searchParams
  );

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
  const updateRouteToSearchPage = () => {
    combinedSearchFormAdapter.routerPush();
  };
  const resetFormValues = () => setFormValues(initialCombinedSearchFormValues);

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

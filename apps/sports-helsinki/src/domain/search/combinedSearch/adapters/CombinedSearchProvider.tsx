import useLocale from '@events-helsinki/components/hooks/useLocale';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';

import { initialCombinedSearchFormValues } from '../constants';
import type { CombinedSearchAdapterInput } from '../types';
import type { CombinedSearchContextType } from './CombinedSearchContext';
import { CombinedSearchContext } from './CombinedSearchContext';
import CombinedSearchFormAdapter from './CombinedSearchFormAdapter';

type UseGetContextValueReturnType = {
  combinedSearchFormAdapter: CombinedSearchFormAdapter;
  contextValue: CombinedSearchContextType;
};

function useGetContextValue(): UseGetContextValueReturnType {
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
  const pushRouterToSyncURL = () => {
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
      pushRouterToSyncURL,
    },
  };
}

export function CombinedSearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { contextValue } = useGetContextValue();
  return (
    <CombinedSearchContext.Provider value={contextValue}>
      {children}
    </CombinedSearchContext.Provider>
  );
}

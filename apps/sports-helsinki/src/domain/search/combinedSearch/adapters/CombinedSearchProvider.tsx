import type { URLSearchParams } from 'url';
import { useRouter } from 'next/router';
import React from 'react';

import { CombinedSearchContext } from './CombinedSearchContext';
import CombinedSearchFormAdapter from './CombinedSearchFormAdapter';

export type CombinedSearchProviderProps = {
  searchParams: URLSearchParams;
  children: React.ReactNode;
};

const shouldTheURLBeUpdated = (
  searchParams: URLSearchParams,
  combinedSearchFormAdapter: CombinedSearchFormAdapter
) =>
  searchParams.toString() !==
  combinedSearchFormAdapter.getURLQuery().toString();

function useGetContextValue(searchParams: URLSearchParams) {
  const router = useRouter();
  return React.useMemo(() => {
    const combinedSearchFormAdapter = new CombinedSearchFormAdapter(
      router,
      searchParams
    );
    const formValues = { ...combinedSearchFormAdapter.getFormValues() };
    const searchVariables = {
      ...combinedSearchFormAdapter.getSearchVariables(),
    };
    return {
      combinedSearchFormAdapter,
      contextValue: {
        formValues,
        searchVariables,
      },
    };
  }, [router, searchParams]);
}

export function CombinedSearchProvider({
  searchParams,
  children,
}: CombinedSearchProviderProps) {
  const { combinedSearchFormAdapter, contextValue } =
    useGetContextValue(searchParams);

  React.useEffect(() => {
    if (
      combinedSearchFormAdapter.router &&
      shouldTheURLBeUpdated(searchParams, combinedSearchFormAdapter)
    ) {
      combinedSearchFormAdapter.routerPush();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CombinedSearchContext.Provider value={contextValue}>
      {children}
    </CombinedSearchContext.Provider>
  );
}

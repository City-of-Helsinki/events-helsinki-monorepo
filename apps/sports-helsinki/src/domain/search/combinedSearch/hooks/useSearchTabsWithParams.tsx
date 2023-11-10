import { useRouter } from 'next/router';
import React from 'react';
import { PARAM_SEARCH_TYPE } from '../constants';
import type { SearchTabId } from '../searchTabs/tabsContext';
import { isSearchTabId } from '../searchTabs/tabsContext';

const useSearchTabsWithParams = (defaultTab: SearchTabId) => {
  const router = useRouter();
  const searchParams = new URLSearchParams(router.asPath.split('?')[1]);
  const searchTypeParam = searchParams.get(PARAM_SEARCH_TYPE);
  const initTab = searchTypeParam
    ? (searchTypeParam as SearchTabId)
    : defaultTab;

  // If the search type param is not given in the URL, set it there.
  React.useEffect(() => {
    if (!isSearchTabId(searchTypeParam)) {
      router.replace(
        { query: { ...router.query, [PARAM_SEARCH_TYPE]: defaultTab } },
        undefined,
        { shallow: true }
      );
    }
  }, [searchTypeParam, router, defaultTab]);

  return { initTab, searchTypeParam };
};

export default useSearchTabsWithParams;

import type { Option } from 'events-helsinki-components';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const useSetSortQueryParamToOptionValue = () => {
  const router = useRouter();
  return useCallback(
    async (option: Option) => {
      return router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, sort: option.value },
        },
        undefined,
        { shallow: true }
      );
    },
    [router.asPath, router.basePath, router.locale]
  );
};

export default useSetSortQueryParamToOptionValue;

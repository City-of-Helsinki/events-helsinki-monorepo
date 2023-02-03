import { useRouter } from 'next/router';
import { useCallback } from 'react';
import type { Option } from '../types/types';

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

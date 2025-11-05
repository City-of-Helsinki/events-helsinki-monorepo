import type { Option as HDSOption } from 'hds-react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const useSetSortQueryParamToOptionValue = () => {
  const router = useRouter();
  return useCallback(
    async (_selectedOptions: HDSOption[], option: HDSOption) => {
      return router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, sort: option.value },
        },
        undefined,
        { shallow: true }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath, router.basePath, router.locale]
  );
};

export default useSetSortQueryParamToOptionValue;

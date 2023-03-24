import { useRouter } from 'next/router';
import { useCallback } from 'react';
import type { OrderDirType, UnifiedSearchOrderByType } from '../components';

const useSetOrderByAndDirQueryParams = () => {
  const router = useRouter();
  return useCallback(
    async (orderBy: UnifiedSearchOrderByType, orderDir: OrderDirType) => {
      return router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, orderBy: orderBy, orderDir: orderDir },
        },
        undefined,
        { shallow: true }
      );
    },
    [router.asPath, router.basePath, router.locale]
  );
};

export default useSetOrderByAndDirQueryParams;

import useGeolocation from '@events-helsinki/components/geolocation/useGeolocation';
import useLocale from '@events-helsinki/components/hooks/useLocale';
import { useRouter } from 'next/router';
import type { CombinedSearchContextType } from '../adapters/CombinedSearchContext';
import CombinedSearchFormAdapter from '../adapters/CombinedSearchFormAdapter';

export function useCombinedSearchController() {
  const locale = useLocale();
  const router = useRouter();
  const geolocation = useGeolocation({ skip: true });
  // FIXME: use import { useSearchParams } from 'next/navigation' if it is fixed so that it is initialized as soon as the asPath is.
  const searchParams = new URLSearchParams(router.asPath.split('?')[1]);
  const combinedSearchFormAdapter = new CombinedSearchFormAdapter(
    locale,
    searchParams,
    geolocation.coordinates
  );
  const updateRouteToSearchPage = (
    options?: Parameters<
      CombinedSearchContextType['updateRouteToSearchPage']
    >[0]
  ) => {
    const query = combinedSearchFormAdapter.getURLQuery();
    (async () => await router.push({ query }, undefined, options))();
  };
  return {
    combinedSearchFormAdapter,
    updateRouteToSearchPage,
  };
}

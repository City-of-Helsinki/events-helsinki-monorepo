import useLocale from '@events-helsinki/components/hooks/useLocale';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import CombinedSearchFormAdapter from '../adapters/CombinedSearchFormAdapter';

export function useCombinedSearchController() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const router = useRouter();

  const combinedSearchFormAdapter = new CombinedSearchFormAdapter(
    locale,
    searchParams
  );
  const updateRouteToSearchPage = () => {
    const query = combinedSearchFormAdapter.getURLQuery();
    router.push({ query });
  };
  return {
    combinedSearchFormAdapter,
    updateRouteToSearchPage,
  };
}

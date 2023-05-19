import type { SearchMapQueryVariables } from '@events-helsinki/components';
import { useSearchMapQuery } from '@events-helsinki/components';
import { useCombinedSearchContext } from '../search/combinedSearch/adapters/CombinedSearchContext';

export type OverridableVariables = {
  first: number;
};

export default function useUnifiedSearchMapQuery(
  variables: OverridableVariables
) {
  const { searchVariables } = useCombinedSearchContext();
  const { fetchMore, ...delegated } = useSearchMapQuery({
    ssr: false,
    variables: { ...searchVariables.venue, ...variables },
  });

  const handleFetchMore = (variables: Partial<SearchMapQueryVariables>) =>
    fetchMore({
      variables,
    });

  return {
    fetchMore: handleFetchMore,
    ...delegated,
  };
}

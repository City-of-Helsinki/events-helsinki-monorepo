import type { SearchListQueryVariables } from '@events-helsinki/components';
import { useSearchListQuery } from '@events-helsinki/components';
import { useCombinedSearchContext } from '../search/combinedSearch/adapters/CombinedSearchContext';

export default function useUnifiedSearchListQuery(
  variables?: Partial<SearchListQueryVariables>
) {
  const {
    searchVariables,
    formValues: { accessibilityProfile },
  } = useCombinedSearchContext();
  const { fetchMore, ...delegated } = useSearchListQuery({
    ssr: false,
    variables: {
      ...searchVariables.venue,
      ...variables,
      accessibilityProfile,
    },
  });

  const handleFetchMore = async (
    fetchMoreVariables: Partial<SearchListQueryVariables>
  ) => {
    await fetchMore({
      variables: fetchMoreVariables,
    });
  };

  return {
    fetchMore: handleFetchMore,
    ...delegated,
  };
}

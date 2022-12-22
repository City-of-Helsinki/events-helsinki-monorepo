import type { SearchMapQueryVariables } from 'events-helsinki-components';
import { useSearchMapQuery } from 'events-helsinki-components';
import type { OverridableVariables } from './useUnifiedSearchVariables';
import useUnifiedSearchVariables from './useUnifiedSearchVariables';

export default function useUnifiedSearchMapQuery(
  variables: OverridableVariables
) {
  const { fetchMore, ...delegated } = useSearchMapQuery({
    ssr: false,
    variables: useUnifiedSearchVariables(variables),
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

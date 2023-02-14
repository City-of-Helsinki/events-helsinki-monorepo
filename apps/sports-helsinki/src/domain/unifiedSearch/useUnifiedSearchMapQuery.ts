import type { SearchMapQueryVariables } from 'events-helsinki-components';
import {
  useSearchMapQuery,
  useErrorBoundary,
} from 'events-helsinki-components';
import type { OverridableVariables } from './useUnifiedSearchVariables';
import useUnifiedSearchVariables from './useUnifiedSearchVariables';
export default function useUnifiedSearchMapQuery(
  variables: OverridableVariables
) {
  const { fetchMore, error, ...delegated } = useSearchMapQuery({
    ssr: false,
    variables: useUnifiedSearchVariables(variables),
  });
  useErrorBoundary(error);
  const handleFetchMore = (variables: Partial<SearchMapQueryVariables>) =>
    fetchMore({
      variables,
    });

  return {
    fetchMore: handleFetchMore,
    ...delegated,
  };
}

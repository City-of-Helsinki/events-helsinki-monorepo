import type { SearchListQueryVariables } from '@events-helsinki/components';
import { useSearchListQuery } from '@events-helsinki/components';
import useUnifiedSearchVariables from './useUnifiedSearchVariables';

type HookConfig = {
  variables?: Partial<SearchListQueryVariables>;
};

export default function useUnifiedSearchListQuery({
  variables,
}: HookConfig = {}) {
  const { fetchMore, ...delegated } = useSearchListQuery({
    ssr: false,
    variables: {
      ...useUnifiedSearchVariables(),
      ...variables,
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

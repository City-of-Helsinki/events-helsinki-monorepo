import type { SearchListQueryVariables } from 'events-helsinki-components';
import { useSearchListQuery } from 'events-helsinki-components';
import useUnifiedSearchVariables from './useUnifiedSearchVariables';

type HookConfig = {
  variables?: Partial<Omit<SearchListQueryVariables, 'enableHauki'>>;
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

  const handleFetchMore = (variables: Partial<SearchListQueryVariables>) =>
    fetchMore({
      variables,
      // TODO: This should not be needed since it comes from the client's cache-strategies.
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          ...prevResult,
          unifiedSearch: {
            ...fetchMoreResult.unifiedSearch,
            edges: [
              ...(prevResult.unifiedSearch?.edges ?? []),
              ...(fetchMoreResult.unifiedSearch?.edges ?? []),
            ],
          },
        };
      },
    });

  return {
    fetchMore: handleFetchMore,
    ...delegated,
  };
}

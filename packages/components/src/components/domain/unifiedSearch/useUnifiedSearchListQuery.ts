import { useSearchListQuery } from '../../../types';
import type { SearchListQueryVariables } from '../../../types';
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
    });

  return {
    fetchMore: handleFetchMore,
    ...delegated,
  };
}

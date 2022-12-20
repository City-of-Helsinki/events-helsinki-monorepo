/* eslint-disable @typescript-eslint/no-explicit-any */
import { createCursor, readCursor } from '../../utils/cursorUtils';

function getCurrentPage(previous?: string, next?: string): number {
  if (!previous && next) {
    return 1;
  }

  if (previous && !next) {
    return Number(new URL(previous).searchParams.get('page')) + 1;
  }

  if (next) {
    return Number(new URL(next).searchParams.get('page')) - 1;
  }

  return 1;
}

type LinkedCursor = {
  where: Record<string, unknown>;
};

const LinkedPaginatedConnectionResolver = {
  edges({ data: items }: any) {
    return items.map((item: any) => ({
      node: item,
      cursor: null,
    }));
  },
  totalCount({ meta: { count } }: any) {
    return count;
  },
  pageInfo({
    meta: { next, previous },
    data,
    args: { where, after, first },
  }: any) {
    const hasPreviousPage = Boolean(previous);
    const hasNextPage = Boolean(next);
    const query = after ? readCursor<LinkedCursor>(after)?.where : where;

    const currentPage = getCurrentPage(previous, next);

    return {
      hasPreviousPage,
      hasNextPage,
      startCursor: createCursor({
        where: query,
        first,
        page: currentPage,
      }),
      endCursor: createCursor({
        where: query,
        first,
        page: currentPage,
      }),
      count: data.length,
    };
  },
};

export default LinkedPaginatedConnectionResolver;

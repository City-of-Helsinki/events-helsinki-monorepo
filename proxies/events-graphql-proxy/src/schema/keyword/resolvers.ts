/* eslint-disable @typescript-eslint/no-explicit-any */
import type { QueryResolvers } from '../../types';
import type {
  KeywordListResponse,
  Keyword,
  QueryKeywordListArgs,
} from '../../types/types';
import composeQuery from '../../utils/composeQuery';
import normalizeKeys from '../../utils/normalizeKeys';

const keywordListQueryBuilder = ({
  dataSource,
  hasUpcomingEvents,
  page,
  pageSize,
  showAllKeywords,
  sort,
  text,
}: QueryKeywordListArgs) => {
  // Get details of all needed fields
  let query = '';

  if (dataSource) {
    query = composeQuery(query, 'data_source', dataSource);
  }

  if (hasUpcomingEvents != null) {
    query = composeQuery(
      query,
      'has_upcoming_events',
      hasUpcomingEvents ? 'true' : 'false'
    );
  }

  if (page) {
    query = composeQuery(query, 'page', page.toString());
  }

  if (pageSize) {
    query = composeQuery(query, 'page_size', pageSize.toString());
  }

  if (showAllKeywords != null) {
    query = composeQuery(
      query,
      'show_all_keywords',
      showAllKeywords ? 'true' : 'false'
    );
  }

  if (sort) {
    query = composeQuery(query, 'sort', sort);
  }

  if (text) {
    query = composeQuery(query, 'text', text);
  }

  return query;
};

const Query: QueryResolvers = {
  keywordDetails: async (_: any, { id }: any, { dataSources }: any) => {
    const data = await dataSources.keywordAPI.getKeywordDetails(id);
    return normalizeKeys(data) as Keyword;
  },
  keywordList: async (_: any, params: any, { dataSources }: any) => {
    const query = keywordListQueryBuilder(params);
    const data = await dataSources.keywordAPI.getKeywordList(query);

    return {
      data: data.data.map((keyword: any) => {
        return normalizeKeys(keyword);
      }),
      meta: data.meta,
    } as KeywordListResponse;
  },
};

export default { Query };

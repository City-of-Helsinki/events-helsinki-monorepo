/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  composeQuery,
  normalizeKeys,
} from '@events-helsinki/graphql-proxy-server';
import type EventContext from '../../context/EventContext.js';
import type {
  KeywordListResponse,
  Keyword,
  QueryKeywordListArgs,
} from '../../types/types.js';
import type { QueryResolvers } from '../../types.js';

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
  keywordDetails: async (_: any, { id }: any, context: EventContext) => {
    const data = await context.dataSources.keyword.getKeywordDetails(id);
    return normalizeKeys(data) as Keyword;
  },
  keywordList: async (_: any, params: any, context: EventContext) => {
    const query = keywordListQueryBuilder(params);
    const data = await context.dataSources.keyword.getKeywordList(query);

    return {
      data: data.data.map((keyword: any) => {
        return normalizeKeys(keyword);
      }),
      meta: data.meta,
    } as KeywordListResponse;
  },
};

export default { Query };

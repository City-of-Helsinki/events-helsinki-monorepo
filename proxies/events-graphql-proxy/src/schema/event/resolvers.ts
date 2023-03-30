/* eslint-disable @typescript-eslint/no-explicit-any */
import { normalizeKeys } from '@events-helsinki/graphql-proxy-server/src';
import * as Sentry from '@sentry/node';

import type EventContext from '../../context/EventContext';
import type { EventDataSources, QueryResolvers } from '../../types';
import type { EventDetails, EventListResponse } from '../../types/types';
import { buildEventDetailsQuery, buildEventListQuery } from './utils';

const getEventList = async (dataSources: EventDataSources, query: string) => {
  try {
    const data = await dataSources.event.getEventList(query);
    return {
      data: data.data.map((event) => {
        return normalizeKeys(event);
      }),
      meta: data.meta,
    } as EventListResponse;
  } catch (e) {
    Sentry.captureException(e);
    throw e;
  }
};

const Query: QueryResolvers = {
  eventDetails: async (_: any, { id, include }: any, context: EventContext) => {
    const query = buildEventDetailsQuery(include);
    const data = await context.dataSources.event.getEventDetails(
      id ?? '',
      query
    );
    return normalizeKeys(data) as EventDetails;
  },
  eventList: async (_: any, params: any, context: EventContext) => {
    const query = buildEventListQuery(params);
    return getEventList(context.dataSources, query);
  },
  eventsByIds: async (_: any, params: any, context: EventContext) => {
    const query = buildEventListQuery(params);
    return getEventList(context.dataSources, query);
  },
};

export default { Query };

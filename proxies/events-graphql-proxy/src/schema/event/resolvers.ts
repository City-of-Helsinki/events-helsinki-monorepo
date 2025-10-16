/* eslint-disable @typescript-eslint/no-explicit-any */
import { normalizeKeys } from '@events-helsinki/graphql-proxy-server';
import * as Sentry from '@sentry/node';

import type EventContext from '../../context/EventContext.js';
import type {
  EventDetails,
  EventListResponse,
} from '../../types/__generated__.ts';
import type { EventDataSources, QueryResolvers } from '../../types.js';
import {
  buildEventDetailsQuery,
  buildEventListQuery,
  reducePopulatedEvents,
} from './utils.js';

const getEventList = async (
  dataSources: EventDataSources,
  query: string,
  context: EventContext
) => {
  try {
    const data = await dataSources.event.getEventList(query);
    const events = data.data.map((event) => {
      return normalizeKeys(event) as EventDetails;
    });
    const reducedEvents = reducePopulatedEvents(events, context);
    return {
      data: reducedEvents,
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
    return getEventList(context.dataSources, query, context);
  },
  eventsByIds: async (_: any, params: any, context: EventContext) => {
    const query = buildEventListQuery(params);
    return getEventList(context.dataSources, query, context);
  },
};

export default { Query };

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Sentry from '@sentry/node';

import type { DataSources, QueryResolvers } from '../../types';
import type { EventDetails, EventListResponse } from '../../types/types';
import normalizeKeys from '../../utils/normalizeKeys';
import { buildEventDetailsQuery, buildEventListQuery } from './utils';

const getEventList = async (dataSources: DataSources, query: string) => {
  try {
    const data = await dataSources.eventAPI.getEventList(query);
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
  eventDetails: async (_: any, { id, include }: any, { dataSources }: any) => {
    const query = buildEventDetailsQuery(include);
    const data = await dataSources.eventAPI.getEventDetails(id ?? '', query);
    return normalizeKeys(data) as EventDetails;
  },
  eventList: async (_: any, params: any, { dataSources }: any) => {
    const query = buildEventListQuery(params);
    return getEventList(dataSources, query);
  },
  eventsByIds: async (_: any, params: any, { dataSources }: any) => {
    const query = buildEventListQuery(params);
    return getEventList(dataSources, query);
  },
};

export default { Query };

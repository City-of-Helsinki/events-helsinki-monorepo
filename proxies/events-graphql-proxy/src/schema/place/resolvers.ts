/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  composeQuery,
  normalizeKeys,
} from 'events-helsinki-graphql-proxy-server/src';
import type EventContext from '../../context/EventContext';
import type { QueryResolvers } from '../../types';
import type { Place, PlaceListResponse } from '../../types/types';

const Query: QueryResolvers = {
  placeDetails: async (_: any, { id }: any, context: EventContext) => {
    const data = await context.dataSources.place.getPlaceDetails(id);
    return normalizeKeys(data) as Place;
  },
  placeList: async (
    _: any,
    {
      dataSource,
      divisions,
      hasUpcomingEvents,
      page,
      pageSize,
      showAllPlaces,
      sort,
      text,
    }: any,
    context: EventContext
  ) => {
    const query = placeListQueryBuilder({
      dataSource,
      divisions,
      hasUpcomingEvents,
      page,
      pageSize,
      showAllPlaces,
      sort,
      text,
    });
    const data = await context.dataSources.place.getPlaceList(query);

    return {
      data: data.data.map((place: any) => {
        return normalizeKeys(place);
      }),
      meta: data.meta,
    } as PlaceListResponse;
  },
};

const placeListQueryBuilder = ({
  dataSource,
  divisions,
  hasUpcomingEvents,
  page,
  pageSize,
  showAllPlaces,
  sort,
  text,
}: {
  dataSource?: string | null;
  divisions?: (string | null)[] | null;
  hasUpcomingEvents?: boolean | null;
  page?: number | null;
  pageSize?: number | null;
  showAllPlaces?: boolean | null;
  sort?: string | null;
  text?: string | null;
}) => {
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

  if (divisions && divisions.length) {
    query = composeQuery(query, 'division', divisions.join(','));
  }

  if (page) {
    query = composeQuery(query, 'page', page.toString());
  }

  if (pageSize) {
    query = composeQuery(query, 'page_size', pageSize.toString());
  }

  if (showAllPlaces != null) {
    query = composeQuery(
      query,
      'show_all_places',
      showAllPlaces ? 'true' : 'false'
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

export default { Query };

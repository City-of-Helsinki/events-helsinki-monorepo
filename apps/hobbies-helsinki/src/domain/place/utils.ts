import type { Maybe, PlaceDetailsQuery } from 'events-helsinki-components';
import { PlaceDetailsDocument } from 'events-helsinki-components';
import { createEventsApolloClient } from '../clients/eventsApolloClient';

export const getPlaceDetailsFromCache = (
  id: string
): Maybe<PlaceDetailsQuery> => {
  const eventsApolloClient = createEventsApolloClient();
  return eventsApolloClient.readQuery<PlaceDetailsQuery>({
    query: PlaceDetailsDocument,
    variables: { id },
  });
};

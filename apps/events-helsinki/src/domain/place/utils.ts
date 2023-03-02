import { PlaceDetailsDocument } from 'events-helsinki-components';
import type { Maybe, PlaceDetailsQuery } from 'events-helsinki-components';
import { eventsApolloClient } from '../clients/eventsApolloClient';

export const getPlaceDetailsFromCache = (
  id: string
): Maybe<PlaceDetailsQuery> => {
  return eventsApolloClient.readQuery<PlaceDetailsQuery>({
    query: PlaceDetailsDocument,
    variables: { id },
  });
};

import { PlaceDetailsDocument } from 'events-helsinki-components';
import type { Maybe, PlaceDetailsQuery } from 'events-helsinki-components';
import { createApolloClient } from '../clients/eventsFederationApolloClient';

export const getPlaceDetailsFromCache = (
  id: string
): Maybe<PlaceDetailsQuery> => {
  const eventsApolloClient = createApolloClient();
  return eventsApolloClient.readQuery<PlaceDetailsQuery>({
    query: PlaceDetailsDocument,
    variables: { id },
  });
};

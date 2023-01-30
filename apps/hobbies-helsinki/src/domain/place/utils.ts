import type { Maybe, PlaceDetailsQuery } from 'events-helsinki-components';
import { PlaceDetailsDocument } from 'events-helsinki-components';
import { apolloClient } from '../clients/eventsFederationApolloClient';

export const getPlaceDetailsFromCache = (
  id: string
): Maybe<PlaceDetailsQuery> => {
  return apolloClient.readQuery<PlaceDetailsQuery>({
    query: PlaceDetailsDocument,
    variables: { id },
  });
};

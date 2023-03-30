import type { Maybe, PlaceDetailsQuery } from '@events-helsinki/components';
import { PlaceDetailsDocument } from '@events-helsinki/components';
import { hobbiesApolloClient } from '../clients/hobbiesApolloClient';

export const getPlaceDetailsFromCache = (
  id: string
): Maybe<PlaceDetailsQuery> => {
  return hobbiesApolloClient.readQuery<PlaceDetailsQuery>({
    query: PlaceDetailsDocument,
    variables: { id },
  });
};

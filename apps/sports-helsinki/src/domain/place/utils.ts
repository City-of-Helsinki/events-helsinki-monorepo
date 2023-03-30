import type { Maybe, PlaceDetailsQuery } from '@events-helsinki/components';
import { PlaceDetailsDocument } from '@events-helsinki/components';
import { sportsApolloClient } from '../clients/sportsApolloClient';

export const getPlaceDetailsFromCache = (
  id: string
): Maybe<PlaceDetailsQuery> => {
  return sportsApolloClient.readQuery<PlaceDetailsQuery>({
    query: PlaceDetailsDocument,
    variables: { id },
  });
};

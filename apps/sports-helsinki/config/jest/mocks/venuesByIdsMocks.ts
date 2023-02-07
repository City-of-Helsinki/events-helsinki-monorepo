import type { FetchResult, GraphQLRequest } from '@apollo/client';
import type { MockedResponse } from '@apollo/client/testing';

import type {
  VenuesByIdsQuery,
  VenuesByIdsQueryVariables,
} from 'events-helsinki-components/types';
import { VenuesByIdsDocument } from 'events-helsinki-components/types';

export const venuesByIdsBaseVariables: VenuesByIdsQueryVariables = {
  includeHaukiFields: false,
};

const createRequest = (
  variablesOverride: Partial<VenuesByIdsQueryVariables> = {}
): GraphQLRequest => ({
  query: VenuesByIdsDocument,
  variables: {
    ...venuesByIdsBaseVariables,
    ...variablesOverride,
  },
});

const createResult = (
  expectedResponse: VenuesByIdsQuery | undefined
): FetchResult => ({
  data: {
    ...expectedResponse,
  },
});

export type VenuesByIdsMockArguments = {
  variables?: Partial<VenuesByIdsQueryVariables>;
  response?: VenuesByIdsQuery;
};

export const createVenuesByIdsRequestAndResultMocks = ({
  variables = {},
  response,
}: VenuesByIdsMockArguments): MockedResponse => ({
  request: createRequest(variables),
  result: createResult(response),
});

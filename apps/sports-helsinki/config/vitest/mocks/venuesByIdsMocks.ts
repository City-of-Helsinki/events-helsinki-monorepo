import type {
  DefaultContext,
  FetchResult,
  GraphQLRequest,
} from '@apollo/client';
import type { MockedResponse } from '@apollo/client/testing';

import type {
  VenuesByIdsQuery,
  VenuesByIdsQueryVariables,
} from '@events-helsinki/components/types';
import { VenuesByIdsDocument } from '@events-helsinki/components/types';

export const venuesByIdsBaseVariables: VenuesByIdsQueryVariables = {
  includeHaukiFields: false,
};

const createRequest = (
  variablesOverride: Partial<VenuesByIdsQueryVariables> = {},
  context: GraphQLRequest['context'] = undefined
): GraphQLRequest => ({
  query: VenuesByIdsDocument,
  variables: {
    ...venuesByIdsBaseVariables,
    ...variablesOverride,
  },
  context,
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
  context?: DefaultContext;
};

export const createVenuesByIdsRequestAndResultMocks = ({
  variables = {},
  response,
}: VenuesByIdsMockArguments): MockedResponse => ({
  request: createRequest(variables, {
    headers: {
      'Accept-Language': 'fi',
    },
  }),
  result: createResult(response),
});

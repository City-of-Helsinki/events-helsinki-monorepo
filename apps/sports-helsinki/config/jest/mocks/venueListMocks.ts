import type { FetchResult, GraphQLRequest } from '@apollo/client';
import type { MockedResponse } from '@apollo/client/testing';

import type {
  SearchListQuery,
  SearchListQueryVariables,
} from '@events-helsinki/components/types';
import {
  UnifiedSearchLanguage,
  SearchListDocument,
} from '@events-helsinki/components/types';

export const venueListBaseVariables: SearchListQueryVariables = {
  language: UnifiedSearchLanguage.Finnish,
  includeHaukiFields: false,
  q: '*',
  administrativeDivisionIds: ['ocd-division/country:fi/kunta:helsinki'],
  openAt: null,
  after: '',
  first: 4,
  orderByName: undefined,
};

const createRequest = (
  variablesOverride: Partial<SearchListQueryVariables> = {}
): GraphQLRequest => ({
  query: SearchListDocument,
  variables: {
    ...venueListBaseVariables,
    ...variablesOverride,
  },
});

const createResult = (
  expectedResponse: SearchListQuery | undefined
): FetchResult => ({
  data: {
    ...expectedResponse,
  },
});

export type VenueListMockArguments = {
  variables?: Partial<SearchListQueryVariables>;
  response?: SearchListQuery;
};

export const createVenueListRequestAndResultMocks = ({
  variables = {},
  response,
}: VenueListMockArguments): MockedResponse => ({
  request: createRequest(variables),
  result: createResult(response),
});

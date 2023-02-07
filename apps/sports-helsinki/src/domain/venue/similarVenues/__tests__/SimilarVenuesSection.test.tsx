import type { Venue } from 'events-helsinki-components/types';
import * as React from 'react';
import { render, screen, waitFor } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import {
  fakeVenue,
  fakeVenues,
  fakeVenuesSearchList,
} from '@/test-utils/mockDataUtils';
import { createVenueListRequestAndResultMocks } from '@/test-utils/mocks/venueListMocks';
import { createVenuesByIdsRequestAndResultMocks } from '@/test-utils/mocks/venuesByIdsMocks';
import getVenueSourceId from '../../../../domain/venue/utils/getVenueSourceId';
import SimilarVenuesSection from '../SimilarVenuesSection';

const ontologyWords = [
  { label: 'Ontology 1', id: 1 },
  { label: 'Ontology 2', id: 2 },
  { label: 'Ontology 3', id: 3 },
];
const venue = fakeVenue({ ontologyWords });

const expectedSimilarVenues = fakeVenues(3);
const expectedSimilarVenuesSearchList = fakeVenuesSearchList(
  3,
  expectedSimilarVenues
);
const expectedSimilarVenuesWithIds = {
  venuesByIds: [...expectedSimilarVenues],
};

const similarVenuesQueryVariables = {
  ontologyWordIds: venue.ontologyWords.map((o) => o?.id?.toString() ?? ''),
  ontologyTreeIds: venue.ontologyTree.map((t) => t?.id?.toString() ?? ''),
  first: 4,
  orderByName: undefined,
};

const mocks = [
  createVenueListRequestAndResultMocks({
    variables: similarVenuesQueryVariables,
    response: expectedSimilarVenuesSearchList,
  }),
  createVenuesByIdsRequestAndResultMocks({
    variables: {
      ids: expectedSimilarVenues.map((v) => getVenueSourceId(v.id)),
    },
    response: expectedSimilarVenuesWithIds,
  }),
];

const waitForComponentToBeLoaded = async () => {
  await waitFor(() => {
    expect(screen.queryByText('Page is loading')).not.toBeInTheDocument();
  });
};

describe('similar venues', () => {
  it('should render similar venues cards', async () => {
    render(<SimilarVenuesSection venue={venue as Venue} />, {
      mocks,
    });
    await waitForComponentToBeLoaded();
    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: translations.venue.similarVenues.title,
        })
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.queryByText('Page has finished loading')
      ).not.toBeInTheDocument();
    });
    expectedSimilarVenues.forEach((venue) => {
      expect(screen.getByText(venue.name!)).toBeInTheDocument();
    });
  });

  it('should hide the whole page section when there are no cards', async () => {
    render(<SimilarVenuesSection venue={venue as Venue} />, {
      mocks: [
        createVenueListRequestAndResultMocks({
          variables: similarVenuesQueryVariables,
          response: {
            unifiedSearch: {
              count: 0,
              pageInfo: { endCursor: '', hasNextPage: false },
              edges: [],
            },
          },
        }),
      ],
    });
    await waitForComponentToBeLoaded();

    expect(
      screen.queryByRole('heading', {
        name: translations.venue.similarVenues.title,
      })
    ).not.toBeInTheDocument();
  });
});

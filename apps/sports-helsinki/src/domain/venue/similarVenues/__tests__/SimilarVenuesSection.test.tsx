import {
  ProviderType,
  ServiceOwnerType,
  type Venue,
} from '@events-helsinki/components';
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
import { SPORTS_DEPARTMENT_ONTOLOGY_TREE_ID } from '../../../../domain/app/appConstants';
import getVenueSourceId from '../../../../domain/venue/utils/getVenueSourceId';
import SimilarVenuesSection from '../SimilarVenuesSection';

const ontologyWords = [
  { label: 'Ontology 1', id: 1 },
  { label: 'Ontology 2', id: 2 },
  { label: 'Ontology 3', id: 3 },
];
const ontologyTree = [
  { label: 'liikunta', id: SPORTS_DEPARTMENT_ONTOLOGY_TREE_ID },
];

const sharedVenueProps = {
  ontologyWords,
  ontologyTree,
  departmentId: null,
  organizationId: null,
  shortDescription: 'Test short description',
  providerType: ProviderType.SelfProduced,
  displayedServiceOwnerType: ServiceOwnerType.MunicipalService,
  displayedServiceOwner: 'Test service owner',
  addressPostalFull: 'Test address, 00100 Helsinki',
} as const satisfies Partial<Venue>;

const venue = fakeVenue({ ...sharedVenueProps });

const similarVenueCount = 3;

const expectedSimilarVenues = fakeVenues(
  similarVenueCount,
  Array.from(
    { length: similarVenueCount },
    (): Partial<Venue> => sharedVenueProps
  )
);
const expectedSimilarVenuesSearchList = fakeVenuesSearchList(
  3,
  expectedSimilarVenues
);
const expectedSimilarVenuesWithIds = {
  venuesByIds: [...expectedSimilarVenues],
};

const similarVenuesQueryVariables = {
  ontologyWordIdOrSets: [
    venue.ontologyWords.map((o) => o?.id?.toString() ?? ''),
  ],
  ontologyTreeIdOrSets: [
    venue.ontologyTree.map((t) => t?.id?.toString() ?? ''),
  ],
  first: 6,
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
  await waitFor(
    () => {
      expect(screen.queryByText('Page is loading')).not.toBeInTheDocument();
    },
    { timeout: 20000 }
  );
  await waitFor(() => {
    expect(
      screen.queryByText('Page has finished loading')
    ).not.toBeInTheDocument();
  });
};

describe('similar venues', () => {
  it('should render similar venues cards', async () => {
    render(<SimilarVenuesSection venue={venue} />, {
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
    expectedSimilarVenues.forEach(async (venue) => {
      await screen.findByText(venue.name!);
    });
  });

  it('should hide the whole page section when there are no cards', async () => {
    render(<SimilarVenuesSection venue={venue} />, {
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

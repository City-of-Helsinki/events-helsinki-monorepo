import {
  NeighborhoodListDocument,
  OrganizationDetailsDocument,
  PlaceDetailsDocument,
} from '@events-helsinki/components';
import React from 'react';

import { axe } from 'vitest-axe';
import { configure, render, screen, userEvent, waitFor } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import {
  fakeNeighborhoods,
  fakeOrganization,
  fakePlace,
} from '@/test-utils/mockDataUtils';
import { CombinedSearchProvider } from '../../../combinedSearch/adapters/CombinedSearchProvider';
import FilterSummary from '../FilterSummary';

configure({ defaultHidden: true });

const neighborhoodId = 'arabia';
const neighborhoodName = 'Arabia';
const neighborhoods = fakeNeighborhoods(10, [
  {
    id: neighborhoodId,
    name: { fi: neighborhoodName },
  },
]);
const neighborhoodsResponse = {
  data: {
    neighborhoodList: neighborhoods,
  },
};

const organizationId = '1';
const organizationName = 'Organization name';
const organization = fakeOrganization({
  id: organizationId,
  name: organizationName,
});
const organizationResponse = { data: { organizationDetails: organization } };

const placeId = 'helsinki:123';
const placeName = 'Gräsan taitojen talo';

const place = fakePlace({ id: placeId, name: { fi: placeName } });
const placeResponse = {
  data: {
    placeDetails: place,
  },
};

const mocks = [
  {
    request: {
      query: NeighborhoodListDocument,
    },
    result: neighborhoodsResponse,
  },
  {
    request: {
      query: OrganizationDetailsDocument,
      variables: {
        id: organizationId,
      },
    },
    result: organizationResponse,
  },
  {
    request: {
      query: PlaceDetailsDocument,
      variables: {
        id: placeId,
      },
    },
    result: placeResponse,
  },
];

interface UrlParams {
  categories: string;
  dateTypes: string;
  end: string;
  place: string;
  organization: string;
  start: string;
  text: string;
}

const urlParams: UrlParams = {
  categories: 'music',
  dateTypes: 'today',
  end: '2020-08-23',
  place: placeId,
  organization: organizationId,
  start: '2020-08-20',
  text: 'jazz',
};

const routes = [
  // eslint-disable-next-line @stylistic/max-len
  `/haku?categories=${urlParams.categories}&dateTypes=today&end=${urlParams.end}&place=${urlParams.place}&organization=${urlParams.organization}&start=${urlParams.start}&text=${urlParams.text}`,
];

// FIXME: Fix and enable accessibility test
it.skip('test for accessibility violations', async () => {
  const { container } = render(<FilterSummary onClear={vitest.fn()} />, {
    mocks,
    routes,
  });
  await waitFor(() => {
    expect(screen.getByText(placeName)).toBeInTheDocument();
  });
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

it('calls onClear callback when clear button is clicked', async () => {
  const onClear = vitest.fn();
  render(
    <CombinedSearchProvider>
      <FilterSummary onClear={onClear} />
    </CombinedSearchProvider>,
    {
      mocks,
      routes,
    }
  );
  await waitFor(() => {
    expect(screen.getByText(placeName)).toBeInTheDocument();
  });
  await userEvent.click(
    screen.getByRole('button', {
      name: translations.search.buttonClearFilters,
    })
  );
  expect(onClear).toHaveBeenCalledTimes(1);
});

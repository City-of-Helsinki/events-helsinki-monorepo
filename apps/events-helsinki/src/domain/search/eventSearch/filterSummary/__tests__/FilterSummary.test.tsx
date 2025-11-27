import {
  EVENT_SEARCH_FILTERS,
  NeighborhoodListDocument,
  OrganizationDetailsDocument,
  PlaceDetailsDocument,
} from '@events-helsinki/components';
import React from 'react';
import { axe } from 'vitest-axe';
import { translations } from '../../../../../../config/vitest/initI18n';
import {
  fakeNeighborhoods,
  fakeOrganization,
  fakePlace,
} from '../../../../../../config/vitest/mockDataUtils';
import {
  configure,
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../../../../config/vitest/test-utils';
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
  places: string;
  publisher: string;
  start: string;
  text: string;
}

const urlParams: UrlParams = {
  categories: 'music',
  dateTypes: 'today',
  end: '2020-08-23',
  places: placeId,
  publisher: organizationId,
  start: '2020-08-20',
  text: 'jazz',
};

const routes = [
  // eslint-disable-next-line @stylistic/max-len
  `/haku?${EVENT_SEARCH_FILTERS.CATEGORIES}=${urlParams.categories}&${EVENT_SEARCH_FILTERS.DATE_TYPES}=today&${EVENT_SEARCH_FILTERS.END}=${urlParams.end}&${EVENT_SEARCH_FILTERS.PLACES}=${urlParams.places}&${EVENT_SEARCH_FILTERS.PUBLISHER}=${urlParams.publisher}&${EVENT_SEARCH_FILTERS.START}=${urlParams.start}&${EVENT_SEARCH_FILTERS.TEXT}=${urlParams.text}`,
];

it('test for accessibility violations', async () => {
  const { container } = render(<FilterSummary onClear={vi.fn()} />, {
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
  const onClear = vi.fn();
  render(<FilterSummary onClear={onClear} />, {
    mocks,
    routes,
  });
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

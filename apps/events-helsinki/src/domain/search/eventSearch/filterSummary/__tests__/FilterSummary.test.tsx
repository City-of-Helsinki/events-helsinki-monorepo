import {
  EVENT_SEARCH_FILTERS,
  NeighborhoodListDocument,
  OrganizationDetailsDocument,
  PlaceDetailsDocument,
} from '@events-helsinki/components';
import React from 'react';
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

// type UrlParamKeys = keyof UrlParams;

const routes = [
  // eslint-disable-next-line @stylistic/max-len
  `/haku?${EVENT_SEARCH_FILTERS.CATEGORIES}=${urlParams.categories}&${EVENT_SEARCH_FILTERS.DATE_TYPES}=today&${EVENT_SEARCH_FILTERS.END}=${urlParams.end}&${EVENT_SEARCH_FILTERS.PLACES}=${urlParams.places}&${EVENT_SEARCH_FILTERS.PUBLISHER}=${urlParams.publisher}&${EVENT_SEARCH_FILTERS.START}=${urlParams.start}&${EVENT_SEARCH_FILTERS.TEXT}=${urlParams.text}`,
];

// TODO: when HDS fixes the tag id -> uncomment
/* it('test for accessibility violations', async () => {
  const { container } = render(<FilterSummary onClear={vi.fn()} />, {
    mocks,
    routes,
  });
  await waitFor(() => {
    expect(screen.getByText(placeName)).toBeInTheDocument();
  });
  const results = await axe(container);

  expect(results).toHaveNoViolations();
}); */

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

it.todo('routes to correct url after deleting filters');
// it("routes to correct url after deleting filters", async () => {
//   const { router } = render(<FilterSummary onClear={vi.fn()} />, {
//     mocks,
//     routes,
//   });

//   await waitFor(() => {
//     expect(screen.queryByText(placeName)).toBeInTheDocument();
//   });

//   const items: { button: string; params: UrlParamKeys[] }[] = [
//     { button: "Poista suodatin: Tänään", params: ["dateTypes"] },
//     {
//       button: "Poista suodatin: 20.8.2020 - 23.8.2020",
//       params: ["end", "start"],
//     },
//     { button: `Poista suodatin: ${placeName}`, params: ["places"] },
//     {
//       button: `Poista suodatin: ${organizationName}`,
//       params: ["publisher"],
//     },
//     { button: "Poista suodatin: jazz", params: ["text"] },
//   ];
//   console.log("router.query before", router.query);
//   items.forEach((item) => {
//     item.params.forEach((param) => {
//       expect(router.query[param]).toBe(decodeURIComponent(urlParams[param]));
//     });
//     userEvent.click(
//       screen.getByRole("button", {
//         name: item.button,
//       })
//     );
//   });
//   await actWait();
//   console.log("router.query after", router.query);
//   items.forEach((item) => {
//     item.params.forEach((param) => {
//       expect(router.query[param]).toBeUndefined();
//     });
//   });
// });

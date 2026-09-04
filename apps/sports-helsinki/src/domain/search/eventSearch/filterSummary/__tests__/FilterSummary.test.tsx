import {
  NeighborhoodListDocument,
  OrganizationDetailsDocument,
  PlaceDetailsDocument,
} from '@events-helsinki/components';
import React from 'react';

import { configure, render, screen, userEvent, waitFor } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import {
  fakeNeighborhoods,
  fakeOrganization,
  fakePlace,
} from '@/test-utils/mockDataUtils';
import { CombinedSearchProvider } from '../../../combinedSearch/adapters/CombinedSearchProvider';
import FilterSummary, { filterSummaryContainerTestId } from '../FilterSummary';

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

// type UrlParamKeys = keyof UrlParams;

const routes = [
  // eslint-disable-next-line @stylistic/max-len
  `/haku?categories=${urlParams.categories}&dateTypes=today&end=${urlParams.end}&place=${urlParams.place}&organization=${urlParams.organization}&start=${urlParams.start}&text=${urlParams.text}`,
];

// TODO: when HDS fixes the tag id -> uncomment
/* it('test for accessibility violations', async () => {
  const { container } = render(<FilterSummary onClear={vitest.fn()} />, {
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

it('renders nothing when there are no active filters', () => {
  render(
    <CombinedSearchProvider>
      <FilterSummary onClear={vitest.fn()} />
    </CombinedSearchProvider>,
    { routes: ['/haku'] }
  );

  expect(
    screen.queryByTestId(filterSummaryContainerTestId)
  ).not.toBeInTheDocument();
});

it('removes a value from an array filter (sportsCategories) without touching other values', async () => {
  const { router } = render(
    <CombinedSearchProvider>
      <FilterSummary onClear={vitest.fn()} />
    </CombinedSearchProvider>,
    {
      routes: ['/haku?sportsCategories=swimming&sportsCategories=skiing'],
    }
  );

  const removeButtonName = translations.common.filter.ariaButtonRemove.replace(
    '{{filter}}',
    translations.appSports.home.sportsCategory.swimming
  );

  await waitFor(() => {
    expect(
      screen.getByRole('button', { name: removeButtonName })
    ).toBeInTheDocument();
  });

  await userEvent.click(screen.getByRole('button', { name: removeButtonName }));

  await waitFor(() => {
    expect(router.query.sportsCategories).not.toContain('swimming');
    expect(router.query.sportsCategories).toContain('skiing');
  });
});

it('removes a value from an array filter (targetGroups)', async () => {
  const { router } = render(
    <CombinedSearchProvider>
      <FilterSummary onClear={vitest.fn()} />
    </CombinedSearchProvider>,
    {
      routes: ['/haku?targetGroups=adults'],
    }
  );

  const removeButtonName = translations.common.filter.ariaButtonRemove.replace(
    '{{filter}}',
    translations.appSports.home.targetGroup.adults
  );

  await waitFor(() => {
    expect(
      screen.getByRole('button', { name: removeButtonName })
    ).toBeInTheDocument();
  });

  await userEvent.click(screen.getByRole('button', { name: removeButtonName }));

  await waitFor(() => {
    expect(router.query.targetGroups).toStrictEqual([]);
  });
});

it('renders and removes the helsinkiOnly filter', async () => {
  const { router } = render(
    <CombinedSearchProvider>
      <FilterSummary onClear={vitest.fn()} />
    </CombinedSearchProvider>,
    {
      routes: ['/haku?helsinkiOnly=true'],
    }
  );

  const removeButtonName = translations.common.filter.ariaButtonRemove.replace(
    '{{filter}}',
    translations.common.cityOfHelsinki
  );

  await waitFor(() => {
    expect(
      screen.getByRole('button', { name: removeButtonName })
    ).toBeInTheDocument();
  });

  await userEvent.click(screen.getByRole('button', { name: removeButtonName }));

  await waitFor(() => {
    expect(router.query.helsinkiOnly).toBeUndefined();
  });
});

it('renders and removes the reservable filter', async () => {
  const { router } = render(
    <CombinedSearchProvider>
      <FilterSummary onClear={vitest.fn()} />
    </CombinedSearchProvider>,
    {
      routes: ['/haku?reservable=true'],
    }
  );

  const removeButtonName = translations.common.filter.ariaButtonRemove.replace(
    '{{filter}}',
    translations.search.search.reservable
  );

  await waitFor(() => {
    expect(
      screen.getByRole('button', { name: removeButtonName })
    ).toBeInTheDocument();
  });

  await userEvent.click(screen.getByRole('button', { name: removeButtonName }));

  await waitFor(() => {
    expect(router.query.reservable).toBeUndefined();
  });
});

it('renders and removes the accessibilityProfile filter', async () => {
  const { router } = render(
    <CombinedSearchProvider>
      <FilterSummary onClear={vitest.fn()} />
    </CombinedSearchProvider>,
    {
      routes: ['/haku?accessibilityProfile=hearing_aid'],
    }
  );

  const removeButtonName = translations.common.filter.ariaButtonRemove.replace(
    '{{filter}}',
    translations.search.accessibilityProfile.hearing_aid
  );

  await waitFor(() => {
    expect(
      screen.getByRole('button', { name: removeButtonName })
    ).toBeInTheDocument();
  });

  await userEvent.click(screen.getByRole('button', { name: removeButtonName }));

  await waitFor(() => {
    expect(router.query.accessibilityProfile).toBeUndefined();
  });
});

it.todo('routes to correct url after deleting filters');
// it("routes to correct url after deleting filters", async () => {
//   const { router } = render(<FilterSummary onClear={vitest.fn()} />, {
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
//     { button: `Poista suodatin: ${placeName}`, params: ["place"] },
//     {
//       button: `Poista suodatin: ${organizationName}`,
//       params: ["organization"],
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

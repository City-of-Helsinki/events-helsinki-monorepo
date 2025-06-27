import {
  EVENT_SEARCH_FILTERS,
  KeywordListDocument,
  NeighborhoodListDocument,
  PlaceListDocument,
} from '@events-helsinki/components';
import { advanceTo, clear } from 'jest-date-mock';
import mockRouter from 'next-router-mock';
import React from 'react';
import { axe } from 'vitest-axe';
import {
  fakeKeywords,
  fakeNeighborhoods,
  fakePlaces,
} from '../../../../../../config/vitest/mockDataUtils';
import {
  actWait,
  configure,
  render,
  screen,
  userEvent,
} from '../../../../../../config/vitest/test-utils';

import Search from '../AdvancedSearch';

configure({ defaultHidden: true });

const searchValue = 'jazz';
const keywords = fakeKeywords(2, [
  { name: { fi: 'Jazz' } },
  { name: { fi: 'musiikkiklubit' } },
]);
const keywordsResponse = { data: { keywordList: keywords } };

const neighborhoodsResponse = {
  data: { neighborhoodList: fakeNeighborhoods(10) },
};
const placesResponse = { data: { placeList: fakePlaces(10) } };

const mocks = [
  {
    request: {
      query: KeywordListDocument,
      variables: {
        hasUpcomingEvents: true,
        pageSize: 5,
        text: searchValue,
      },
    },
    result: keywordsResponse,
  },
  {
    request: {
      query: NeighborhoodListDocument,
    },
    result: neighborhoodsResponse,
  },
  {
    request: {
      query: PlaceListDocument,
      variables: {
        hasUpcomingEvents: true,
        pageSize: 10,
        text: '',
      },
    },
    result: placesResponse,
  },
];

const pathname = '/haku';
const search = `?${EVENT_SEARCH_FILTERS.TEXT}=jazz`;
const testRoute = `${pathname}${search}`;
const routes = [testRoute];

const renderComponent = () =>
  render(<Search scrollToResultList={vi.fn()} />, {
    mocks,
    routes,
  });

beforeEach(() => {
  mockRouter.setCurrentUrl('/');
});

afterAll(() => {
  clear();
});

it('for accessibility violations', async () => {
  const { container } = renderComponent();

  await actWait();

  const results = await axe(container);
  expect(results).toHaveNoViolations();
}, 50000); // FIXME: Why does this take so long?

it('should clear all filters and search field', async () => {
  const { router } = renderComponent();

  expect(router).toMatchObject({
    pathname,
    query: { [EVENT_SEARCH_FILTERS.TEXT]: 'jazz' },
  });

  const searchInput = screen.getByPlaceholderText(
    'Kirjoita hakusana, esim. ranska tai ruoanlaitto'
  );

  await userEvent.click(
    screen.getByRole('button', { name: /tyhjennä hakuehdot/i })
  );

  expect(searchInput).toHaveValue('');
  expect(router).toMatchObject({ pathname, query: {} });
});

// TODO: There is a problem with the auto suggest menu options
it.todo('should change search query after clicking autosuggest menu item');
// test("should change search query after clicking autosuggest menu item", async () => {
//   const { router } = renderComponent();

//   const searchInput = screen.getByRole("textbox", { name: /mitä etsit\?/i });
//   await act(async () => userEvent.type(searchInput, searchValue));

//   const option = await screen.findByRole("option", {
//     name: /musiikkiklubit/i,
//   });

//   await act(async () => userEvent.click(option));

//   expect(router).toMatchObject({
//     pathname,
//     query: { text: "jazz,musiikkiklubit" },
//   });

//   //  Should add menu item only once
//   await act(async () => userEvent.type(searchInput, searchValue));
//   act(async () =>
//     userEvent.click(screen.getByRole("option", { name: /musiikkiklubit/i }))
//   );

//   expect(router).toMatchObject({
//     pathname,
//     query: { text: "jazz,musiikkiklubit" },
//   });
// });

it('should change search query after checking is free checkbox', async () => {
  const { router } = renderComponent();

  const isFreeCheckbox = screen.getByRole('checkbox', {
    name: /näytä vain maksuttomat/i,
  });

  await userEvent.click(isFreeCheckbox);

  expect(router).toMatchObject({
    pathname,
    query: {
      [EVENT_SEARCH_FILTERS.IS_FREE]: 'true',
      [EVENT_SEARCH_FILTERS.TEXT]: 'jazz',
    },
  });
});

it('should change search query after selecting today date type and pressing submit button', async () => {
  const { router } = renderComponent();

  const chooseDateButton = screen.getByRole('button', {
    name: /valitse ajankohta/i,
  });

  await userEvent.click(chooseDateButton);
  await userEvent.click(screen.getByRole('checkbox', { name: /tänään/i }));
  await userEvent.click(screen.getByRole('button', { name: /hae/i }));
  expect(router).toMatchObject({
    pathname,
    query: {
      [EVENT_SEARCH_FILTERS.DATE_TYPES]: 'today',
      [EVENT_SEARCH_FILTERS.TEXT]: 'jazz',
    },
  });
});

it('should change search query after selecting start date and pressing submit button', async () => {
  advanceTo('2020-10-04');
  const { router } = renderComponent();

  const chooseDateButton = screen.getByRole('button', {
    name: /valitse ajankohta/i,
  });
  await userEvent.click(chooseDateButton);
  await userEvent.click(
    // The reason to use getAllByRole is that there is also mobile date selector with same text,
    // which is hidden using css
    screen.getAllByRole('button', { name: /valitse päivät/i })[0]
  );
  await userEvent.click(
    screen.getAllByRole('button', { name: /valitse päivämäärä/i })[0]
  );
  await userEvent.click(
    screen.getByRole('button', {
      name: /lokakuu 6/i,
    })
  );
  await userEvent.click(screen.getByRole('button', { name: /hae/i }));

  expect(router).toMatchObject({
    pathname,
    query: {
      [EVENT_SEARCH_FILTERS.START]: '2020-10-06',
      [EVENT_SEARCH_FILTERS.TEXT]: 'jazz',
    },
  });
}, 50000); // FIXME: Why does this take so long to test?

it('should change search query after clicking category menu item', async () => {
  const { router } = renderComponent();

  const chooseCategoryButton = screen.getByRole('button', {
    name: /valitse kategoria/i,
  });

  await userEvent.click(chooseCategoryButton);
  await userEvent.click(
    screen.getByRole('checkbox', { name: /elokuva ja media/i })
  );
  await userEvent.click(screen.getByRole('button', { name: /hae/i }));
  expect(router).toMatchObject({
    pathname,
    asPath: `${pathname}?${EVENT_SEARCH_FILTERS.CATEGORIES}=movie_and_media&${EVENT_SEARCH_FILTERS.TEXT}=jazz`,
    query: {
      [EVENT_SEARCH_FILTERS.CATEGORIES]: 'movie_and_media',
      [EVENT_SEARCH_FILTERS.TEXT]: 'jazz',
    },
  });

  // multiple selection
  await userEvent.click(chooseCategoryButton);
  await userEvent.click(screen.getByRole('checkbox', { name: /pelit/i }));
  await userEvent.click(screen.getByRole('checkbox', { name: /musiikki/i }));
  await userEvent.click(screen.getByRole('button', { name: /hae/i }));
  expect(router).toMatchObject({
    pathname,
    // eslint-disable-next-line @stylistic/max-len
    asPath: `${pathname}?${EVENT_SEARCH_FILTERS.CATEGORIES}=movie_and_media%2Cgames%2Cmusic&${EVENT_SEARCH_FILTERS.TEXT}=jazz`,
    query: {
      [EVENT_SEARCH_FILTERS.CATEGORIES]: 'movie_and_media,games,music',
      [EVENT_SEARCH_FILTERS.TEXT]: 'jazz',
    },
  });
}, 50_000);

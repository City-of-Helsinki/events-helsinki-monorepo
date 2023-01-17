import {
  KeywordListDocument,
  NeighborhoodListDocument,
  PlaceListDocument,
} from 'events-helsinki-components';
import { axe } from 'jest-axe';
import { clear } from 'jest-date-mock';
import mockRouter from 'next-router-mock';
import React from 'react';

import { actWait, configure, render, screen, userEvent } from '@/test-utils';
import {
  fakeKeywords,
  fakeNeighborhoods,
  fakePlaces,
} from '@/test-utils/mockDataUtils';
import Search from '../AdvancedSearch';

configure({ defaultHidden: true });

const searchValue = 'jaz';
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

const pathname = '/kurssihaku';
const search = '?text=jazz';
const testRoute = `${pathname}${search}`;
const routes = [testRoute];

const renderComponent = () =>
  render(<Search scrollToResultList={jest.fn()} />, {
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
}); // FIXME: Why does this take so long?

it('should clear all filters and search field', async () => {
  const { router } = renderComponent();

  expect(router).toMatchObject({ pathname, query: { text: 'jazz' } });

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

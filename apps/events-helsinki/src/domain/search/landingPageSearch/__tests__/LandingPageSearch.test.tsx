import { KeywordListDocument } from '@events-helsinki/components';
import { advanceTo } from 'jest-date-mock';
import mockRouter from 'next-router-mock';
import React from 'react';

import { configure, render, screen, userEvent } from '@/test-utils';
import { fakeKeywords } from '@/test-utils/mockDataUtils';
import LandingPageSearch from '../LandingPageSearch';

configure({ defaultHidden: true });

const searchValue = 'jaz';
const keywords = fakeKeywords(2, [
  { name: { fi: 'Jazz' } },
  { name: { fi: 'musiikkiklubit' } },
]);
const keywordsResponse = { data: { keywordList: keywords } };

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
];

const searchPath = '/haku';
describe('Landing page', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
  });

  it('should route to event search page after clicking submit button', async () => {
    const { router } = render(<LandingPageSearch />, { mocks });
    await userEvent.click(screen.getByRole('button', { name: /hae/i }));
    expect(router.pathname).toBe(searchPath);
  });

  it('should route to event search page with correct search query after clicking submit button', async () => {
    const { router } = render(<LandingPageSearch />, { mocks });
    const searchInput = screen.getByRole('textbox');
    await userEvent.type(searchInput, searchValue);
    // Check that auto-suggest menu is open
    expect(screen.getByText(/hakuehdotuksia/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /hae/i }));
    expect(router).toMatchObject({
      asPath: `${searchPath}?text=${searchValue}`,
      pathname: searchPath,
      query: { text: searchValue },
    });
  });

  // Search options does not appear in the auto suggest menu
  it.todo(
    'should route to event search page after clicking autosuggest menu item'
  );
  // test("should route to event search page after clicking autosuggest menu item", async () => {
  //   const { router } = render(<LandingPageSearch />, { mocks });
  //   const searchInput = screen.getByRole("textbox", { name: /mitä etsit\?/i });
  //   await act(() => userEvent.type(searchInput, searchValue));
  //   const option = await screen.findByRole("option", {
  //     name: /musiikkiklubit/i,
  //   });
  //   await act(() => userEvent.click(option));
  //   expect(router).toMatchObject({
  //     asPath: `${searchPath}?text=musiikkiklubit`,
  //     pathname: searchPath,
  //     query: { text: "musiikkiklubit" },
  //   });
  // });

  it('should route to event search page after clicking category', async () => {
    const { router } = render(<LandingPageSearch />, { mocks });
    const links = await screen.findAllByRole('link', { name: /musiikki/i });
    await userEvent.click(links[0]);
    expect(router).toMatchObject({
      asPath: `${searchPath}?categories=music`,
      pathname: searchPath,
      query: { categories: 'music' },
    });
  });

  it('should route to event search page after selecting today date type and pressing submit button', async () => {
    const { router } = render(<LandingPageSearch />, { mocks });
    await userEvent.click(
      screen.getByRole('button', { name: /valitse ajankohta/i })
    );
    await userEvent.click(screen.getByRole('checkbox', { name: /tänään/i }));
    await userEvent.click(screen.getByRole('button', { name: /hae/i }));

    expect(router).toMatchObject({
      asPath: `${searchPath}?dateTypes=today`,
      pathname: searchPath,
      query: { dateTypes: 'today' },
    });
  });

  it('should route to event search page after selecting start date and pressing submit button', async () => {
    advanceTo('2020-10-04');
    const { router } = render(<LandingPageSearch />, { mocks });
    await userEvent.click(
      screen.getByRole('button', { name: /valitse ajankohta/i })
    );
    await userEvent.click(
      // The reason to use getAllByRole is that there is also mobile date selector with same text,
      // which is hidden using css
      screen.getAllByRole('button', { name: /valitse päivät/i })[0]
    );
    await userEvent.type(
      screen.getByRole('textbox', {
        name: /alkamispäivä/i,
      }),
      '06.10.2020'
    );
    expect(router.pathname).toBe('/'); // TODO: remove
    await userEvent.click(screen.getByRole('button', { name: /hae/i }));
    expect(router).toMatchObject({
      asPath: `${searchPath}?start=2020-10-06`,
      pathname: searchPath,
      query: { start: '2020-10-06' },
    });
  }, 50000);
});

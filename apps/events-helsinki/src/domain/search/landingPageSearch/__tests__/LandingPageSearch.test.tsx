import {
  EVENT_SEARCH_FILTERS,
  KeywordListDocument,
} from '@events-helsinki/components';
import { advanceTo } from 'jest-date-mock';
import mockRouter from 'next-router-mock';
import React from 'react';

import { fakeKeywords } from '../../../../../config/vitest/mockDataUtils';
import {
  configure,
  render,
  screen,
  userEvent,
} from '../../../../../config/vitest/test-utils';
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
    await userEvent.click(screen.getByRole('button', { name: /hae/i }));
    expect(router).toMatchObject({
      asPath: `${searchPath}?${EVENT_SEARCH_FILTERS.TEXT}=${searchValue}`,
      pathname: searchPath,
      query: { [EVENT_SEARCH_FILTERS.TEXT]: searchValue },
    });
  });

  it('should route to event search page after clicking category', async () => {
    const { router } = render(<LandingPageSearch />, { mocks });
    const links = await screen.findAllByRole('link', { name: /musiikki/i });
    await userEvent.click(links[0]);
    expect(router).toMatchObject({
      // FIXME: asPath not working when `next-router-mock` was upgraded from `^0.7.4` to `^0.9.13`.
      // See some what related issues in tracker:
      // - https://github.com/scottrippey/next-router-mock/issues/108,
      // - https://github.com/scottrippey/next-router-mock/issues/125
      // - https://github.com/scottrippey/next-router-mock/issues/101
      // - https://github.com/scottrippey/next-router-mock/issues/118
      // asPath: `${searchPath}?${EVENT_SEARCH_FILTERS.CATEGORIES}=music`,
      pathname: searchPath,
      query: { [EVENT_SEARCH_FILTERS.CATEGORIES]: 'music' },
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
      asPath: `${searchPath}?${EVENT_SEARCH_FILTERS.DATE_TYPES}=today`,
      pathname: searchPath,
      query: { [EVENT_SEARCH_FILTERS.DATE_TYPES]: 'today' },
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
      asPath: `${searchPath}?${EVENT_SEARCH_FILTERS.START}=2020-10-06`,
      pathname: searchPath,
      query: { [EVENT_SEARCH_FILTERS.START]: '2020-10-06' },
    });
  }, 50000);
});

import { KeywordListDocument } from 'events-helsinki-components';
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
      asPath: `${searchPath}?q=${searchValue}`,
      pathname: searchPath,
      query: { q: [searchValue] },
    });
  });

  it('should route to event search page after clicking category', async () => {
    const { router } = render(<LandingPageSearch />, { mocks });
    await userEvent.click(screen.getByRole('link', { name: /uinti/i }));
    expect(router).toMatchObject({
      asPath: `${searchPath}?categories=swimming`,
      pathname: searchPath,
      query: { categories: 'swimming' },
    });
  });
});

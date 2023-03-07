import { buildQueryFromObject } from 'events-helsinki-components/utils';
import { clear } from 'jest-date-mock';
import capitalize from 'lodash/capitalize';
import * as React from 'react';

import { render, screen, userEvent } from '@/test-utils';

import { fakeOntology, fakeVenue } from '@/test-utils/mockDataUtils';
import VenueKeywords from '../VenueKeywords';

const keywordNames = ['keyword 1', 'keyword 2'];
const keywords = keywordNames.map((name) => fakeOntology({ label: name }));
const PARAM_SEARCH_TYPE = 'searchType';

const venue = fakeVenue({
  ontologyWords: keywords,
});

afterAll(() => {
  clear();
});

it('should render keywords and handle click', async () => {
  const { router } = render(
    <VenueKeywords venue={venue} showIsFree={true} showKeywords={true} />
  );

  const search = buildQueryFromObject({
    q: capitalize(keywordNames[0]),
    [PARAM_SEARCH_TYPE]: 'Venue',
  });

  keywordNames.forEach((keyword) => {
    expect(
      screen.getByRole('link', { name: new RegExp(keyword, 'i') })
    ).toBeInTheDocument();
  });

  await userEvent.click(
    screen.getByRole('link', { name: new RegExp(keywordNames[0], 'i') })
  );
  expect(router).toMatchObject({
    asPath: `/haku${search}`,
    pathname: '/haku',
    query: { q: capitalize(keywordNames[0]), [PARAM_SEARCH_TYPE]: 'Venue' },
  });
});

it('should not show keywords', () => {
  render(
    <VenueKeywords venue={venue} showIsFree={true} showKeywords={false} />
  );

  keywordNames.forEach((keyword) => {
    expect(
      screen.queryByRole('link', { name: new RegExp(keyword, 'i') })
    ).not.toBeInTheDocument();
  });
});

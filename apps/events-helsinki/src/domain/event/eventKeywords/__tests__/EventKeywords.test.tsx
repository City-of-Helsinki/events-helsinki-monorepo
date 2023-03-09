import type {
  EventFieldsFragment,
  OfferFieldsFragment,
} from 'events-helsinki-components';
import { buildQueryFromObject } from 'events-helsinki-components/utils';
import { advanceTo, clear } from 'jest-date-mock';
import capitalize from 'lodash/capitalize';
import * as React from 'react';

import { render, screen, userEvent } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import { fakeEvent, fakeKeyword, fakeOffer } from '@/test-utils/mockDataUtils';
import EventKeywords from '../EventKeywords';

const startTime = '2020-06-22T07:00:00.000000Z';
const endTime = '2020-06-22T10:00:00.000000Z';

const keywordNames = ['keyword 1', 'keyword 2'];
const keywords = keywordNames.map((name) =>
  fakeKeyword({ name: { fi: name } })
);
const PARAM_SEARCH_TYPE = 'searchType';

const event = fakeEvent({
  keywords,
  startTime,
  endTime,
}) as EventFieldsFragment;

afterAll(() => {
  clear();
});

it('should render keywords and handle click', async () => {
  const { router } = render(
    <EventKeywords event={event} showIsFree={true} showKeywords={true} />
  );

  const search = buildQueryFromObject({
    text: capitalize(keywordNames[0]),
    [PARAM_SEARCH_TYPE]: event.typeId?.toString(),
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
    query: { text: capitalize(keywordNames[0]) },
  });
});

it('should not show keywords', () => {
  render(
    <EventKeywords event={event} showIsFree={true} showKeywords={false} />
  );

  keywordNames.forEach((keyword) => {
    expect(
      screen.queryByRole('link', { name: new RegExp(keyword, 'i') })
    ).not.toBeInTheDocument();
  });
});

it('should render today tag and handle click', async () => {
  advanceTo('2020-06-22');
  const { router } = render(
    <EventKeywords event={event} showIsFree={true} showKeywords={false} />
  );
  await userEvent.click(
    screen.getByRole('link', {
      name: translations.event.categories.labelToday,
    })
  );
  expect(router).toMatchObject({
    asPath: `/haku?dateTypes=today&${[PARAM_SEARCH_TYPE]}=${event.typeId}`,
    pathname: '/haku',
    query: { dateTypes: 'today' },
  });
});

it('should render this week tag and handle click', async () => {
  advanceTo('2020-06-23');
  const { router } = render(
    <EventKeywords event={event} showIsFree={true} showKeywords={false} />
  );
  await userEvent.click(
    screen.getByRole('link', {
      name: translations.event.categories.labelThisWeek,
    })
  );
  expect(router).toMatchObject({
    asPath: `/haku?dateTypes=this_week&${[PARAM_SEARCH_TYPE]}=${event.typeId}`,
    pathname: '/haku',
    query: { dateTypes: 'this_week' },
  });
});

it('should hide buy button for free events', () => {
  const mockEvent = {
    ...event,
    offers: [fakeOffer({ isFree: true }) as OfferFieldsFragment],
  };
  render(
    <EventKeywords event={mockEvent} showIsFree={true} showKeywords={false} />
  );

  expect(
    screen.getByRole('link', {
      name: translations.event.categories.labelFree,
    })
  ).toBeInTheDocument();
});

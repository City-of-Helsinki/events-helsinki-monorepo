import { advanceTo, clear } from 'jest-date-mock';
import capitalize from 'lodash/capitalize';
import type { NextRouter } from 'next/router';
import * as React from 'react';

import { render, screen, userEvent } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import {
  appRoutingUrlMocks,
  fakeEvent,
  fakeKeyword,
  fakeOffer,
} from '@/test-utils/mockDataUtils';
import { AppRoutingProvider } from '../../../routingUrlProvider';
import type {
  AppLanguage,
  EventFieldsFragment,
  KeywordOnClickHandlerType,
  OfferFieldsFragment,
} from '../../../types';
import EventKeywords from '../EventKeywords';

const getKeywordOnClickHandler: KeywordOnClickHandlerType =
  (
    router: NextRouter,
    locale: AppLanguage,
    type: 'dateType' | 'isFree' | 'text',
    value = ''
  ) =>
  () => {
    router.push(`/${locale}/haku/?type=${type}&value=${value}`);
  };

const startTime = '2020-06-22T07:00:00.000000Z';
const endTime = '2020-06-22T10:00:00.000000Z';

const keywordNames = ['keyword 1', 'keyword 2'];
const keywords = keywordNames.map((name) =>
  fakeKeyword({ name: { fi: name } })
);

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
    <AppRoutingProvider
      {...appRoutingUrlMocks}
      getKeywordOnClickHandler={getKeywordOnClickHandler}
    >
      <EventKeywords event={event} showIsFree={true} showKeywords={true} />
    </AppRoutingProvider>
  );

  keywordNames.forEach((keyword) => {
    expect(
      screen.getByRole('link', { name: new RegExp(keyword, 'i') })
    ).toBeInTheDocument();
  });

  await userEvent.click(
    screen.getByRole('link', { name: new RegExp(keywordNames[0], 'i') })
  );
  expect(router).toMatchObject({
    asPath: '/fi/haku?type=text&value=Keyword+1',
    pathname: '/fi/haku',
    query: { type: 'text', value: capitalize(keywordNames[0]) },
  });
});

it('should not show keywords', () => {
  render(
    <AppRoutingProvider
      {...appRoutingUrlMocks}
      getKeywordOnClickHandler={getKeywordOnClickHandler}
    >
      <EventKeywords event={event} showIsFree={true} showKeywords={false} />
    </AppRoutingProvider>
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
    <AppRoutingProvider
      {...appRoutingUrlMocks}
      getKeywordOnClickHandler={getKeywordOnClickHandler}
    >
      <EventKeywords event={event} showIsFree={true} showKeywords={false} />
    </AppRoutingProvider>
  );
  await userEvent.click(
    screen.getByRole('link', {
      name: translations.event.categories.labelToday,
    })
  );
  expect(router).toMatchObject({
    asPath: '/fi/haku?type=dateType&value=today',
    pathname: '/fi/haku',
    query: { type: 'dateType', value: 'today' },
  });
});

it('should render this week tag and handle click', async () => {
  advanceTo('2020-06-23');
  const { router } = render(
    <AppRoutingProvider
      {...appRoutingUrlMocks}
      getKeywordOnClickHandler={getKeywordOnClickHandler}
    >
      <EventKeywords event={event} showIsFree={true} showKeywords={false} />
    </AppRoutingProvider>
  );
  await userEvent.click(
    screen.getByRole('link', {
      name: translations.event.categories.labelThisWeek,
    })
  );
  expect(router).toMatchObject({
    asPath: '/fi/haku?type=dateType&value=this_week',
    pathname: '/fi/haku',
    query: { type: 'dateType', value: 'this_week' },
  });
});

it('should hide buy button for free events', () => {
  const mockEvent = {
    ...event,
    offers: [fakeOffer({ isFree: true }) as OfferFieldsFragment],
  };
  render(
    <AppRoutingProvider
      {...appRoutingUrlMocks}
      getKeywordOnClickHandler={getKeywordOnClickHandler}
    >
      <EventKeywords event={mockEvent} showIsFree={true} showKeywords={false} />
    </AppRoutingProvider>
  );

  expect(
    screen.getByRole('link', {
      name: translations.event.categories.labelFree,
    })
  ).toBeInTheDocument();
});

import { clear } from 'console';

import { advanceTo } from 'jest-date-mock';
import * as React from 'react';

import { render, screen, waitFor } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import {
  fakeEvent,
  fakeEvents,
  fakeKeyword,
  fakeLocalizedObject,
  fakeTargetGroup,
} from '@/test-utils/mockDataUtils';
import { createEventListRequestAndResultMocks } from '@/test-utils/mocks/eventListMocks';
import { EventTypeId } from '../../../../../types/generated/graphql';
import type { EventFieldsFragment } from '../../../../../types/generated/graphql';
import SimilarEvents from '../SimilarEvents';

const id = '1';
const name = 'Event title';
const description = 'Event description';
const startTime = '2020-10-05T07:00:00.000000Z';
const endTime = '2020-10-05T10:00:00.000000Z';
const audience = ['Aikuiset', 'Lapset'];
const keywords = [
  { name: 'Avouinti', id: 'keyword1' },
  { name: 'Eläimet', id: 'keyword2' },
  { name: 'Grillaus', id: 'keyword3' },
];

const expectedSimilarEvents = fakeEvents(3);

const event = fakeEvent({
  id,
  startTime,
  endTime,
  name: fakeLocalizedObject(name),
  description: fakeLocalizedObject(description),
  keywords: keywords.map((k) =>
    fakeKeyword({ name: fakeLocalizedObject(k.name), id: k.id })
  ),
  audience: audience.map((targetGroup) =>
    fakeTargetGroup({ name: fakeLocalizedObject(targetGroup) })
  ),
});

const similarEventQueryVariables = {
  pageSize: 100,
  allOngoing: true,
  keywordOrSet2: [''],
  keywordOrSet3: [''],
  language: undefined,
  audienceMinAgeLt: event.audienceMinAge, // LT - Really?
  audienceMaxAgeGt: event.audienceMaxAge, // GT - Really?
};

const mocks = [
  createEventListRequestAndResultMocks({
    variables: similarEventQueryVariables,
    response: expectedSimilarEvents,
  }),
];

// Mock the similarEventFilters as they are presented in the Tapahtumat and it's mocks
const similarEventFilters = {
  end: '',
  include: ['keywords', 'location'],
  keywordAnd: [],
  keywordNot: [],
  location: [],
  pageSize: 100,
  publisher: null,
  sort: 'end_time',
  start: 'now',
  superEventType: ['umbrella', 'none'],
  keywordOrSet2: [''],
  allOngoing: true,
  keywordOrSet3: [''],
  audienceMinAgeLt: '5',
  audienceMaxAgeGt: '15',
  eventType: [EventTypeId.General],
};

afterAll(() => {
  clear();
});

const waitForComponentToBeLoaded = async () => {
  await waitFor(() => {
    expect(screen.queryByText('Page is loading')).not.toBeInTheDocument();
  });
};

describe('similar events', () => {
  it('should render similar event cards', async () => {
    advanceTo(new Date('2020-08-11'));
    render(
      <SimilarEvents
        event={event as EventFieldsFragment}
        getCardUrl={jest.fn().mockReturnValue('https://tapahtumat.hel.fi')}
        eventFilters={similarEventFilters}
      />,
      {
        mocks,
      }
    );
    await waitForComponentToBeLoaded();
    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: translations.event.similarEvents.title,
        })
      ).toBeInTheDocument();
    });
    expectedSimilarEvents.data.forEach((event) => {
      expect(
        // FIXME: Should the card's area be visible?
        // screen.queryByRole('link', {
        //   name: event.name.fi as string,
        // })
        screen.getByText(event.name.fi as string)
      ).toBeInTheDocument();
    });
  });
  it('should hide the whole page section when there are no cards', async () => {
    advanceTo(new Date('2020-08-11'));
    render(
      <SimilarEvents
        event={event as EventFieldsFragment}
        getCardUrl={jest.fn().mockReturnValue('https://tapahtumat.hel.fi')}
        eventFilters={similarEventFilters}
      />,
      {
        mocks: [
          createEventListRequestAndResultMocks({
            variables: similarEventQueryVariables,
            response: { ...expectedSimilarEvents, data: [] },
          }),
        ],
      }
    );
    await waitForComponentToBeLoaded();
    await waitFor(() => {
      expect(
        screen.queryByRole('heading', {
          name: translations.event.similarEvents.title,
        })
      ).not.toBeInTheDocument();
    });
  });
});

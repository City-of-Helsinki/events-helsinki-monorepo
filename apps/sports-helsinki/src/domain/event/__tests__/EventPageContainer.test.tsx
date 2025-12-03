import type { MockedResponse } from '@apollo/client/testing';
import { waitForLoadingCompleted } from '@events-helsinki/common-tests';
import {
  EventDetailsDocument,
  EventListDocument,
  EventTypeId,
  OrganizationDetailsDocument,
  otherEventTimesListTestId,
  skipFalsyType,
} from '@events-helsinki/components';
import { advanceTo, clear } from 'jest-date-mock';
import * as React from 'react';

import { render, screen, userEvent, waitFor } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import {
  fakeEvent,
  fakeEvents,
  fakeKeyword,
  fakeLocalizedObject,
  fakeOrganization,
  fakeTargetGroup,
} from '@/test-utils/mockDataUtils';
import {
  createEventListRequestAndResultMocks,
  createOtherEventTimesRequestAndResultMocks,
} from '@/test-utils/mocks/eventListMocks';

import AppConfig from '../../app/AppConfig';
import type { EventPageContainerProps } from '../EventPageContainer';
import EventPageContainer from '../EventPageContainer';

const id = 'hel:123';
const name = 'Event title';
const description = 'Event descirption';
const startTime = '2020-10-05T07:00:00.000000Z';
const endTime = '2020-10-05T10:00:00.000000Z';
const audience = ['Aikuiset', 'Lapset'];
const keywords = [
  { name: 'Urheilu', id: 'yso:p1963' },
  { name: 'Liikuntapalvelut', id: 'yso:p9824' },
  { name: 'Jalkapallo', id: 'yso:p6409' },
];
const superEventId = 'hel:super-123';
const otherEventTimesCount = 10;

const event = fakeEvent({
  id,
  startTime,
  endTime,
  name: { fi: name },
  description: fakeLocalizedObject(description),
  keywords: keywords.map((k) =>
    fakeKeyword({ name: fakeLocalizedObject(k.name), id: k.id })
  ),
  audience: audience.map((targetGroup) =>
    fakeTargetGroup({ name: fakeLocalizedObject(targetGroup) })
  ),
  superEvent: {
    __typename: 'InternalIdObject',
    internalId: `https://api.hel.fi/linkedevents/v1/event/${superEventId}/`,
  },
});

const eventKeywordIds: string[] = event.keywords
  .map((keyword) => keyword.id)
  .filter(skipFalsyType);

const eventRequest = {
  query: EventDetailsDocument,
  variables: {
    id: superEventId,
    include: AppConfig.eventSecondaryQueryIncludeParamValue,
  },
};
const otherEventsRequest = {
  query: EventListDocument,
  variables: {
    include: AppConfig.eventSecondaryQueryIncludeParamValue,
    sort: 'end_time',
    start: 'now',
    superEvent: superEventId,
    eventType: [EventTypeId.Course],
  },
};
const request = {
  query: EventDetailsDocument,
  variables: {
    id,
    include: AppConfig.eventDetailsQueryIncludeParamValue,
  },
};

const eventResponse = { data: { eventDetails: event } };
const otherEventsResponse = {
  data: { eventList: fakeEvents(otherEventTimesCount) },
};
const similarEvents = fakeEvents(3);
const organization = fakeOrganization();
const organizationResponse = { data: { organizationDetails: organization } };

const mocks = [
  {
    request: eventRequest,
    result: eventResponse,
  },
  {
    request: otherEventsRequest,
    result: otherEventsResponse,
  },
  createOtherEventTimesRequestAndResultMocks({
    superEventId,
    variables: { eventType: [EventTypeId.Course] },
    response: fakeEvents(otherEventTimesCount),
  }),
  createOtherEventTimesRequestAndResultMocks({
    superEventId: id,
    variables: { eventType: [EventTypeId.Course] },
    response: fakeEvents(otherEventTimesCount),
  }),
  createEventListRequestAndResultMocks({
    variables: {
      fullText: '',
      ongoing: true,
      keywordOrSet2: eventKeywordIds,
      eventType: [EventTypeId.Course],
      superEvent: 'none',
      pageSize: 100,
    },
    response: similarEvents,
  }),
  {
    request: {
      query: OrganizationDetailsDocument,
      variables: {
        id: 'provider:123',
      },
    },
    result: organizationResponse,
  },
];

const testPath = `/courses/${id}`;
const routes = [testPath];

const renderComponent = (
  props: EventPageContainerProps,
  overrideMocks?: MockedResponse[]
) =>
  render(<EventPageContainer {...props} />, {
    mocks: overrideMocks ?? mocks,
    routes,
  });

afterAll(() => {
  clear();
});

it('should render info and load other events + similar events', async () => {
  advanceTo('2020-10-01');
  renderComponent({ event: event, loading: false });

  await waitForLoadingCompleted();

  expect(screen.getByRole('heading', { name })).toBeInTheDocument();

  expect(screen.getByRole('heading', { name: 'Kuvaus' })).toBeInTheDocument();
  expect(screen.getByText(description)).toBeInTheDocument();

  keywords.slice(0, 2).forEach((keyword) => {
    expect(
      screen.getByRole('button', { name: keyword.name })
    ).toBeInTheDocument();
  }, 10000);

  await screen.findByText('Tapahtuman muut ajat');

  expect(screen.getByTestId(otherEventTimesListTestId).children).toHaveLength(
    3
  );

  // click show other times
  await userEvent.click(
    screen.getByRole('button', { name: 'Näytä kaikki muut ajat' })
  );

  expect(screen.getByTestId(otherEventTimesListTestId).children).toHaveLength(
    otherEventTimesCount
  );
}, 50000);

it('should show error info when event is closed', async () => {
  advanceTo('2020-10-10');
  renderComponent({ event: event, loading: false });

  await waitForLoadingCompleted();
  await waitFor(() => {
    expect(
      screen.getByRole('heading', {
        name: translations.event.hero.titleEventClosed,
      })
    ).toBeInTheDocument();
  });
});

it("should show error info when event doesn't exist", async () => {
  const mocks = [
    {
      request,
      error: new Error('not found'),
    },
  ];

  render(<EventPageContainer event={undefined} loading={false} />, {
    mocks,
    routes,
  });

  await waitForLoadingCompleted();
  await waitFor(() => {
    expect(
      screen.getByRole('heading', {
        name: translations.event.notFound.title,
      })
    ).toBeInTheDocument();
  });
});

it('shows similar events when SIMILAR_EVENTS flag is on', async () => {
  advanceTo('2020-10-01');
  const eventNoKeywords = { ...event };
  eventNoKeywords.keywords[0].id = 'yso:p916';
  renderComponent(
    { event: eventNoKeywords, loading: false, showSimilarEvents: true },
    [
      ...mocks,
      createEventListRequestAndResultMocks({
        variables: {
          fullText: '',
          ongoing: true,
          keywordOrSet2: ['yso:p916', 'yso:p9824', 'yso:p6409'],
          eventType: [EventTypeId.Course],
          superEvent: 'none',
          pageSize: 100,
        },
        response: similarEvents,
      }),
    ]
  );
  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
  await waitForLoadingCompleted();

  await waitFor(() => {
    expect(
      screen.getByRole('heading', {
        name: translations.event.similarEvents.title,
      })
    ).toBeInTheDocument();
  });
});

it('hides similar events when SIMILAR_EVENTS flag is off', async () => {
  advanceTo('2020-10-01');
  renderComponent({ event: event, loading: false, showSimilarEvents: false });
  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
  expect(
    screen.queryByRole('heading', {
      name: translations.event.similarEvents.title,
    })
  ).not.toBeInTheDocument();
});

it('hides similar events when event has no keywords', async () => {
  advanceTo('2020-10-01');
  const eventNoKeywords = { ...event, keywords: [] };
  renderComponent({
    event: eventNoKeywords,
    loading: false,
    showSimilarEvents: true,
  });
  await waitForLoadingCompleted();

  expect(
    screen.queryByRole('heading', {
      name: translations.event.similarEvents.title,
    })
  ).not.toBeInTheDocument();
});

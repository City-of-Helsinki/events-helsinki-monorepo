import type { MockedResponse } from '@apollo/client/testing/index.js';
import { waitForLoadingCompleted } from '@events-helsinki/common-tests';
import type { EventFields } from '@events-helsinki/components';
import {
  EventDetailsDocument,
  EventListDocument,
  DEFAULT_EVENT_SORT_OPTION,
  OrganizationDetailsDocument,
  EventTypeId,
  otherEventTimesListTestId,
  EVENT_SEARCH_FILTERS,
} from '@events-helsinki/components';
import { advanceTo, clear } from 'jest-date-mock';
import * as React from 'react';
import { translations } from '../../../../config/vitest/initI18n';
import {
  fakeEvent,
  fakeEvents,
  fakeKeyword,
  fakeLocalizedObject,
  fakeOrganization,
  fakeTargetGroup,
} from '../../../../config/vitest/mockDataUtils';
import {
  createEventListRequestAndResultMocks,
  createOtherEventTimesRequestAndResultMocks,
} from '../../../../config/vitest/mocks/eventListMocks';
import {
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../../config/vitest/test-utils';

import EventPageContainer from '../EventPageContainer';
import type { EventPageContainerProps } from '../EventPageContainer';

const id = 'hel:123';
const name = 'Event title';
const description = 'Event descirption';
const startTime = '2020-10-05T07:00:00.000000Z';
const endTime = '2020-10-05T10:00:00.000000Z';

const audience = ['Aikuiset', 'Lapset'];
const keywords = [
  { name: 'Avouinti', id: 'keyword1' },
  { name: 'Eläimet', id: 'keyword2' },
  { name: 'Grillaus', id: 'keyword3' },
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
}) as EventFields;

const eventRequest = {
  query: EventDetailsDocument,
  variables: {
    id: superEventId,
    include: ['in_language', 'keywords', 'location', 'audience'],
  },
};
const otherEventsRequest = {
  query: EventListDocument,
  variables: {
    include: ['in_language', 'keywords', 'location', 'audience'],
    sort: DEFAULT_EVENT_SORT_OPTION,
    start: 'now',
    superEvent: superEventId,
  },
};
const request = {
  query: EventDetailsDocument,
  variables: {
    id,
    include: ['in_language', 'keywords', 'location'],
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
    response: fakeEvents(otherEventTimesCount),
  }),
  createOtherEventTimesRequestAndResultMocks({
    superEventId: id,
    response: fakeEvents(otherEventTimesCount),
  }),
  createEventListRequestAndResultMocks({
    variables: {
      keywordOrSet2: [''],
      keywordOrSet3: [],
      language: undefined,
      pageSize: 100,
      publisherAncestor: null,
      eventType: [EventTypeId.General],
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

const testPath = `/events/${id}`;
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
      screen.getByRole('link', { name: keyword.name })
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
          keywordOrSet2: ['yso:p916'],
          language: undefined,
          pageSize: 100,
          publisherAncestor: null,
          eventType: [EventTypeId.General],
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

it('doesnt show similar events when SIMILAR_EVENTS flag is off', async () => {
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

it('doesnt show similar events when keywords are not mapped', async () => {
  advanceTo('2020-10-01');
  renderComponent({ event: event, loading: false, showSimilarEvents: true }, [
    ...mocks,
    createEventListRequestAndResultMocks({
      variables: {
        keywordOrSet2: [''],
        language: undefined,
        pageSize: 100,
        publisherAncestor: null,
        eventType: [EventTypeId.General],
      },
      response: {
        data: [],
        meta: {
          __typename: 'Meta',
          count: 0,
          next: '',
          previous: '',
        },
        __typename: 'EventListResponse',
      },
    }),
  ]);
  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
  await waitForLoadingCompleted();

  expect(
    screen.queryByRole('heading', {
      name: translations.event.similarEvents.title,
    })
  ).not.toBeInTheDocument();
});

it.skip('should link to events search when clicking tags', async () => {
  advanceTo('2020-10-01');
  const { router } = renderComponent({
    event: event,
    loading: false,
    showSimilarEvents: false,
  });

  await waitForLoadingCompleted();

  const tagLink = await screen.findByRole('link', { name: 'Avouinti' });

  // click keyword / tag
  await userEvent.click(tagLink);

  expect(router).toMatchObject({
    pathname: '/haku',
    asPath: `/haku?${EVENT_SEARCH_FILTERS.TEXT}=Avouinti`,
  });
});

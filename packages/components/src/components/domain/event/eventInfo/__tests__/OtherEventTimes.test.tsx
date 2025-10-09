import type { MockedResponse } from '@apollo/client/testing';
import { waitForLoadingCompleted } from '@events-helsinki/common-tests';
import { addDays } from 'date-fns';
import { advanceTo, clear } from 'jest-date-mock';
import range from 'lodash/range';
import mockRouter from 'next-router-mock';
import React from 'react';
import { toast } from 'react-toastify';

import { render, screen, userEvent, waitFor } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import { fakeEvent, fakeEvents } from '@/test-utils/mockDataUtils';
import {
  createOtherEventTimesRequestAndResultMocks,
  createOtherEventTimesRequestThrowsErrorMocks,
} from '@/test-utils/mocks/eventListMocks';
import {
  type EventDetails,
  type EventFieldsFragment,
  type EventListQueryVariables,
  type EventListResponse,
  EventTypeId,
  type Meta,
} from '../../../../../types';
import getDateRangeStr from '../../../../../utils/getDateRangeStr';
import OtherEventTimes from '../OtherEventTimes';

const startTime = '2020-10-01T16:00:00Z';
const endTime = '2020-10-01T18:00:00Z';

const superEventId = 'hel:123';
const superEventInternalId = `https://api.hel.fi/linkedevents/v1/event/${superEventId}`;

const courseEvent: EventFieldsFragment = fakeEvent({
  superEvent: { internalId: superEventInternalId },
  typeId: EventTypeId.Course,
});

const meta: Meta = {
  count: 20,
  // eslint-disable-next-line @stylistic/max-len
  next: 'https://api.hel.fi/linkedevents/v1/event/?include=keyword,location&page=2&sort=end_time&start=2020-08-11T03&super_event=hel:123',
  previous: null,
  __typename: 'Meta',
};

const otherEventsResponse = {
  ...fakeEvents(
    10,
    range(1, 11).map((i) => ({
      endTime: addDays(new Date(endTime), i).toISOString(),
      startTime: addDays(new Date(startTime), i).toISOString(),
      typeId: EventTypeId.Course,
    }))
  ),
  meta,
};

const otherEventsLoadMoreResponse = {
  ...fakeEvents(
    10,
    range(11, 21).map((i) => ({
      endTime: addDays(new Date(endTime), i).toISOString(),
      startTime: addDays(new Date(startTime), i).toISOString(),
      typeId: EventTypeId.Course,
    }))
  ),
  meta: { ...meta, next: null },
};

const getEventTimesMocks = ({
  response,
  variables,
  maxUsageCount,
}: {
  response: EventListResponse;
  variables?: EventListQueryVariables;
  maxUsageCount?: number;
}) =>
  createOtherEventTimesRequestAndResultMocks({
    superEventId,
    response,
    variables: { ...variables, eventType: [EventTypeId.Course] },
    maxUsageCount,
  });

const firstLoadMock = getEventTimesMocks({
  variables: { eventType: [EventTypeId.Course] },
  response: otherEventsResponse,
});

const secondLoadMock = getEventTimesMocks({
  variables: { page: 2, eventType: [EventTypeId.Course] },
  response: otherEventsLoadMoreResponse,
  maxUsageCount: 20, // Needed this many times or mocks don't match
});

const secondPageLoadThrowsErrorMock =
  createOtherEventTimesRequestThrowsErrorMocks({
    superEventId,
    variables: { page: 2, eventType: [EventTypeId.Course] },
    maxUsageCount: 7, // Needed this many times or mocks don't match
  });

const defaultMocks = [firstLoadMock, secondLoadMock];

afterAll(() => {
  clear();
});

const renderComponent = ({
  mocks = defaultMocks,
  event = courseEvent,
}: {
  mocks?: MockedResponse[];
  event?: EventFieldsFragment;
} = {}) =>
  render(<OtherEventTimes event={event} />, {
    mocks,
  });

const getDateRangeStrProps = (event: EventDetails) => ({
  start: event.startTime!,
  end: event.endTime,
  locale: 'fi',
  includeTime: true,
  timeAbbreviation: translations.common.timeAbbreviation,
});

describe('events', () => {
  it('should render other event times', async () => {
    advanceTo(new Date('2020-08-11'));
    renderComponent();

    await waitForLoadingCompleted();

    // Initially first 3 shown, 4th not shown
    otherEventsResponse.data.slice(0, 3).forEach((event) => {
      const dateStr = getDateRangeStr(getDateRangeStrProps(event));
      expect(screen.getByText(dateStr)).toBeInTheDocument();
    });
    const fourthevent = otherEventsResponse.data[3];
    const fourthDateStr = getDateRangeStr(getDateRangeStrProps(fourthevent));
    expect(screen.queryByText(fourthDateStr)).not.toBeInTheDocument();

    const toggleButton = await screen.findByRole('button', {
      name: translations.event.otherTimes.buttonShow.ariaLabel,
    });

    // Show all other times
    await userEvent.click(toggleButton);
    await waitForLoadingCompleted();

    // Now all 10 other events should be shown
    expect(otherEventsResponse.data).toHaveLength(10);
    for (const event of otherEventsResponse.data) {
      const dateStr = getDateRangeStr(getDateRangeStrProps(event));
      await waitFor(() => {
        expect(screen.getByText(dateStr)).toBeInTheDocument();
      });
    }
  });

  it('should show toastr when loading next event page fails', async () => {
    toast.error = vi.fn();
    advanceTo(new Date('2020-08-11'));
    const mocks = [firstLoadMock, secondPageLoadThrowsErrorMock];
    renderComponent({ mocks });

    const toggleButton = await screen.findByRole('button', {
      name: translations.event.otherTimes.buttonShow.ariaLabel,
    });

    await userEvent.click(toggleButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        translations.event.info.errorLoadMore
      );
    });
  });

  it('should go to event page of other event time', async () => {
    advanceTo(new Date('2020-08-11'));
    const startUrl = `/fi/kurssit/${superEventId}`;
    mockRouter.setCurrentUrl(startUrl);
    const { router } = renderComponent();

    expect(router.pathname).toStrictEqual(startUrl);

    const toggleButton = await screen.findByRole('button', {
      name: translations.event.otherTimes.buttonShow.ariaLabel,
    });

    await userEvent.click(toggleButton);

    await waitForLoadingCompleted();

    const event = otherEventsResponse.data[0];
    const dateStr = getDateRangeStr(getDateRangeStrProps(event));
    expect(screen.getByText(dateStr)).toBeInTheDocument();

    await userEvent.click(
      screen.getAllByRole('link', {
        name: translations.event.otherTimes.buttonReadMore.replace(
          '{{date}}',
          dateStr
        ),
      })[0]
    );

    await waitForLoadingCompleted();

    await waitFor(() => {
      expect(router.pathname).toStrictEqual(`/kurssit/${event?.id}`);
    });
  });
});

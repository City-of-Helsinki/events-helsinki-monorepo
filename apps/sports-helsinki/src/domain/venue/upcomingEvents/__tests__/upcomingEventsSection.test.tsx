import { EVENT_SORT_OPTIONS } from '@events-helsinki/components/constants';
import * as React from 'react';
import { render, screen, waitFor } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import { fakeEvents } from '@/test-utils/mockDataUtils';
import { createEventListRequestAndResultMocks } from '@/test-utils/mocks/eventListMocks';
import VenueUpcomingEvents from '../UpcomingEventsSection';

const placeId = 'tprek:12345';
const keywords = [
  { name: 'Avouinti', id: 'yso:p916' },
  { name: 'Eläimet', id: 'kulke:710' },
  { name: 'Grillaus', id: 'yso:p17018' },
];

const expectedUpcomingEvents = fakeEvents(3);

const similarEventQueryVariables = {
  location: placeId,
  keywords: keywords.map((k) => k.id),
  include: ['keywords', 'location'],
  start: 'now',
  sort: EVENT_SORT_OPTIONS.END_TIME,
  // superEventType: 'none', // Removed to experiment LIIKUNTA-512 (https://helsinkisolutionoffice.atlassian.net/browse/LIIKUNTA-512).
  pageSize: 6,
  end: undefined,
  isFree: undefined,
  keywordAnd: undefined,
  keywordNot: undefined,
  publisher: undefined,
  keywordOrSet2: undefined,
  eventType: undefined,
};

const mocks = [
  createEventListRequestAndResultMocks({
    variables: similarEventQueryVariables,
    response: expectedUpcomingEvents,
  }),
];

const waitForComponentToBeLoaded = async () => {
  await waitFor(() => {
    expect(screen.queryByText('Page is loading')).not.toBeInTheDocument();
  });
};

describe('upcoming events of a venue', () => {
  it('should render upcoming event cards', async () => {
    render(
      <VenueUpcomingEvents
        placeId={placeId}
        keywords={keywords.map((k) => k.id)}
      />,
      {
        mocks,
      }
    );
    await waitForComponentToBeLoaded();
    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: translations.venue.upcomingEvents.title,
        })
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.queryByText('Page has finished loading')
      ).not.toBeInTheDocument();
    });
    expectedUpcomingEvents.data.forEach((event) => {
      expect(screen.getByText(event.name.fi as string)).toBeInTheDocument();
    });
  });

  it('should hide the whole page section when there are no cards', async () => {
    render(
      <VenueUpcomingEvents
        placeId={placeId}
        keywords={keywords.map((k) => k.id)}
      />,
      {
        mocks: [
          createEventListRequestAndResultMocks({
            variables: similarEventQueryVariables,
            response: { ...expectedUpcomingEvents, data: [] },
          }),
        ],
      }
    );
    await waitForComponentToBeLoaded();
    await waitFor(() => {
      expect(
        screen.queryByRole('heading', {
          name: translations.venue.upcomingEvents.title,
        })
      ).not.toBeInTheDocument();
    });
  });
});

import type { UnifiedSearchVenue } from '@events-helsinki/components';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import { fakeVenuesSearchList } from '@/test-utils/mockDataUtils';
import VenueList from '../VenueList';

function getVenues(count: number): UnifiedSearchVenue[] {
  const { unifiedSearch } = fakeVenuesSearchList(count);
  return (unifiedSearch?.edges ?? []).map(
    (edge) =>
      ({
        __typename: 'UnifiedSearchVenue',
        ...edge?.node?.venue,
      }) as UnifiedSearchVenue
  );
}

describe('VenueList', () => {
  it('renders a card for every venue', () => {
    const venues = getVenues(3);
    render(
      <VenueList
        venues={venues}
        count={venues.length}
        loading={false}
        hasNext={false}
        onLoadMore={vitest.fn()}
      />
    );

    venues.forEach((venue) => {
      expect(screen.getByText(venue.name?.fi as string)).toBeInTheDocument();
    });
  });

  it('does not render the load more button when there is no next page', () => {
    const venues = getVenues(2);
    render(
      <VenueList
        venues={venues}
        count={venues.length}
        loading={false}
        hasNext={false}
        onLoadMore={vitest.fn()}
      />
    );

    expect(
      screen.queryByRole('button', {
        name: /näytä lisää/i,
      })
    ).not.toBeInTheDocument();
  });

  it('renders the load more button with the remaining count and calls onLoadMore', async () => {
    const venues = getVenues(2);
    const onLoadMore = vitest.fn();
    const count = 5;
    render(
      <VenueList
        venues={venues}
        count={count}
        loading={false}
        hasNext={true}
        onLoadMore={onLoadMore}
      />
    );

    const button = screen.getByRole('button', {
      name: translations.search.buttonLoadMore.replace(
        '{{count}}',
        String(count - venues.length)
      ),
    });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('shows the loading spinner and hides the load more button while loading', () => {
    const venues = getVenues(1);
    render(
      <VenueList
        venues={venues}
        count={5}
        loading={true}
        hasNext={true}
        onLoadMore={vitest.fn()}
      />
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', {
        name: /näytä lisää/i,
      })
    ).not.toBeInTheDocument();
  });

  it('renders without crashing when there are no venues', () => {
    render(
      <VenueList
        venues={[]}
        count={0}
        loading={false}
        hasNext={false}
        onLoadMore={vitest.fn()}
      />
    );

    expect(
      screen.queryByRole('button', {
        name: /näytä lisää/i,
      })
    ).not.toBeInTheDocument();
  });
});

import type { EventFieldsFragment } from '@events-helsinki/components';
import { EventName, EVENT_STATUS } from '@events-helsinki/components';
import React from 'react';
import { render, screen } from '@/test-utils';

import { fakeEvent } from '@/test-utils/mockDataUtils';

const eventName = 'Event name fi';
const event = fakeEvent({ name: { fi: eventName } }) as EventFieldsFragment;

it('should render event name', async () => {
  const { container } = render(<EventName event={event} />);

  expect(container.innerHTML).toBe(eventName);
});

it('should tell that event has cancelled', async () => {
  render(
    <EventName
      event={{
        ...event,
        eventStatus: EVENT_STATUS.EVENT_CANCELLED,
      }}
    />
  );

  expect(screen.getByText(/tapahtuma peruttu/i)).toBeInTheDocument();
});

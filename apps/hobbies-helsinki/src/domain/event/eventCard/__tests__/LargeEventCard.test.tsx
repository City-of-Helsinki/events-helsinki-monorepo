import userEvent from '@testing-library/user-event';
import type { EventFieldsFragment } from 'events-helsinki-components';
import { axe } from 'jest-axe';
import mockRouter from 'next-router-mock';
import React from 'react';

import { render, screen } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import { fakeEvent } from '@/test-utils/mockDataUtils';
import LargeEventCard from '../LargeEventCard';

const renderComponent = (event: EventFieldsFragment) =>
  render(<LargeEventCard event={event} />);

beforeEach(() => {
  mockRouter.setCurrentUrl('/');
});

describe('large event card', () => {
  it('for accessibility violations', async () => {
    const event = fakeEvent() as EventFieldsFragment;
    const { container } = renderComponent(event);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should show buy button when event has an offer', async () => {
    const infoUrl = 'https://example.domain';
    global.open = jest.fn();
    const event = fakeEvent({
      offers: [
        {
          infoUrl: {
            fi: infoUrl,
          },
        },
      ],
    }) as EventFieldsFragment;
    renderComponent(event);

    const button = screen.getByRole('button', {
      name: /osta liput - linkki avautuu uudessa ikkunassa/i,
    });

    await userEvent.click(button);
    expect(global.open).toHaveBeenCalledWith(infoUrl);
  });

  it('should hide buy button when event is free', () => {
    const event = fakeEvent({
      offers: [
        {
          infoUrl: {
            fi: 'https://example.domain',
          },
          isFree: true,
        },
      ],
    }) as EventFieldsFragment;
    renderComponent(event);

    expect(
      screen.queryByRole('button', {
        name: /osta liput - linkki avautuu uudessa ikkunassa/i,
      })
    ).not.toBeInTheDocument();
  });

  it('should hide buy button when event is closed', () => {
    const event = fakeEvent({
      endTime: '2017-01-01',
      offers: [
        {
          infoUrl: {
            fi: 'https://example.domain',
          },
        },
      ],
      startTime: '2017-01-01',
    }) as EventFieldsFragment;

    renderComponent(event);

    expect(
      screen.queryByRole('button', {
        name: /osta liput - linkki avautuu uudessa ikkunassa/i,
      })
    ).not.toBeInTheDocument();
  });

  it('should go to event page by click Read more button', async () => {
    const event = fakeEvent({
      id: '123',
    }) as EventFieldsFragment;

    const { router } = renderComponent(event);

    expect(router.pathname).toStrictEqual('/');

    await userEvent.click(
      screen.getByRole('button', {
        name: translations.event.eventCard.ariaLabelReadMore.replace(
          '{{name}}',
          event.name.fi as string
        ),
      })
    );

    expect(router.pathname).toStrictEqual('/kurssit/123');
  });

  // Skipped, because this is not available after the Link-component is changed from react-router Link.
  it.skip('should go to event page by clicking event card', async () => {
    const event = fakeEvent({
      id: '123',
    }) as EventFieldsFragment;

    const { router } = renderComponent(event);

    expect(router.pathname).toStrictEqual('/');

    await userEvent.click(
      screen.getByRole('link', {
        name: translations.event.eventCard.ariaLabelLink.replace(
          '{{name}}',
          event.name.fi as string
        ),
      })
    );

    expect(router.pathname).toStrictEqual('/kurssit/123');
  });
});

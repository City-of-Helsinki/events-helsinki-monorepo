import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import React from 'react';

import { axe } from 'vitest-axe';
import { render, screen } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import { fakeEvent } from '@/test-utils/mockDataUtils';
import type { EventFieldsFragment } from '../../../types';
import LargeEventCard from '../LargeEventCard';

const renderComponent = (event: EventFieldsFragment) =>
  render(<LargeEventCard event={event} eventUrl={`/tapahtumat/${event.id}`} />);

beforeEach(() => {
  mockRouter.setCurrentUrl('/');
});

describe('large event card', () => {
  it('for accessibility violations', async () => {
    const event = fakeEvent();
    const { container } = renderComponent(event);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should go to event page by clicking event card', async () => {
    const event = fakeEvent({
      id: '123',
    }) as EventFieldsFragment;

    const { router } = renderComponent(event);

    expect(router.pathname).toStrictEqual('/');

    await userEvent.click(
      screen.getAllByRole('link', {
        name: translations.event.eventCard.ariaLabelLink.replace(
          '{{name}}',
          event.name.fi as string
        ),
      })[0]
    );

    expect(router.pathname).toStrictEqual('/tapahtumat/123');
  });
});

import userEvent from '@testing-library/user-event';
import type { EventFieldsFragment } from 'events-helsinki-components';
import { axe } from 'jest-axe';
import { advanceTo, clear } from 'jest-date-mock';
import mockRouter from 'next-router-mock';
import React from 'react';

import { render, screen } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import { fakeEvent, fakeKeywords } from '@/test-utils/mockDataUtils';
import EventCard from '../EventCard';

const keywordNames = ['Keyword 1', 'Keyword 2'];
const keywords = fakeKeywords(
  keywordNames.length,
  keywordNames.map((keyword) => ({ name: { fi: keyword } }))
);
const id = '123';
const name = 'Keyword name';
const startTime = '2020-10-05T07:00:00.000000Z';
const endTime = '2020-10-15T10:00:00.000000Z';
const addressLocality = 'Helsinki';
const locationName = 'Location name';
const streetAddress = 'Test address 1';
const event = fakeEvent({
  id,
  startTime,
  endTime,
  keywords: keywords.data,
  name: { fi: name },
  location: {
    internalId: 'tprek:8740',
    addressLocality: { fi: addressLocality },
    name: { fi: locationName },
    streetAddress: { fi: streetAddress },
  },
}) as EventFieldsFragment;

beforeEach(() => {
  mockRouter.setCurrentUrl('/');
});

afterAll(() => {
  clear();
});

const renderComponent = () => render(<EventCard event={event} />);
describe('event card', () => {
  // TODO: when HDS fixes the tag id -> uncomment
  /* it('for accessibility violations', async () => {
    const { container } = renderComponent();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  }); */

  // Skipped, because this is not available after the Link-component is changed from react-router Link.
  it.skip('should go to event page by clicking event card', async () => {
    advanceTo('2020-10-05');
    const { router } = renderComponent();
    expect(router.pathname).toStrictEqual('/');
    await userEvent.click(
      screen.getByRole('link', {
        name: translations.event.eventCard.ariaLabelLink.replace(
          '{{name}}',
          event.name.fi as string
        ),
      })
    );
    expect(router.pathname).toStrictEqual('/tapahtumat/123');
  });

  it('should go to event page by clicking button', async () => {
    const { router } = renderComponent();
    expect(router.pathname).toStrictEqual('/');
    await userEvent.click(
      screen.getByRole('button', {
        name: translations.event.eventCard.ariaLabelLink.replace(
          '{{name}}',
          event.name.fi as string
        ),
      })
    );
    expect(router.pathname).toStrictEqual('/tapahtumat/123');
  });
});

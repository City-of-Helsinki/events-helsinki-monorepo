import React from 'react';
import {
  configure,
  createOtherEventTimesRequestAndResultMocks,
  fakeOrganization,
  fakeEvent,
  fakeEventImage,
  fakeEvents,
  render,
  screen,
  translations,
  waitFor,
} from '@/test-utils';
import {
  type EventFieldsFragment,
  EventTypeId,
  OrganizationDetailsDocument,
} from '../../../../../types';
import EventContent from '../EventContent';

configure({ defaultHidden: true });

const testEventId = 'event-content-test-event-id-1';
const testOrganizationId = 'event-content-test-organization-id-1';
const startTime = '2020-06-22T07:00:00.000000Z';
const endTime = '2020-06-22T10:00:00.000000Z';
const description = 'Event description';
const email = 'test@email.com';
const telephone = '0441234567';
const addressLocality = 'Helsinki';
const neighborhood = 'Malmi';
const locationName = 'Location name';
const streetAddress = 'Test address 1';
const photographerName = 'Kuvaaja Helsinki';
const event: EventFieldsFragment = fakeEvent({
  id: testEventId,
  startTime,
  endTime,
  description: { fi: description },
  publisher: testOrganizationId,
  location: {
    divisions: [{ name: { fi: neighborhood }, type: 'neighborhood' }],
    email,
    telephone: { fi: telephone },
    internalId: 'tprek:8740',
    addressLocality: { fi: addressLocality },
    name: { fi: locationName },
    streetAddress: { fi: streetAddress },
  },
  images: [fakeEventImage({ photographerName })],
});

const testOrganization = fakeOrganization({
  id: testOrganizationId,
});
const organizationResponse = {
  data: {
    organizationDetails: testOrganization,
  },
};

const otherEventTimesCount = 3;

const mocks = [
  {
    request: {
      query: OrganizationDetailsDocument,
      variables: {
        id: testOrganizationId,
      },
    },
    result: organizationResponse,
  },
  createOtherEventTimesRequestAndResultMocks({
    superEventId: testEventId,
    variables: {
      eventType: [EventTypeId.General],
    },
    response: fakeEvents(otherEventTimesCount),
  }),
];

it('should render event content fields', async () => {
  render(<EventContent event={event} />, { mocks });

  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: translations.common.mapBox.title })
    ).toBeInTheDocument();
  });

  const itemsByRole = [
    { role: 'heading', name: translations.event.info.labelDateAndTime },
    { role: 'heading', name: translations.event.info.labelLocation },
    { role: 'heading', name: translations.event.info.labelLanguages },
    { role: 'heading', name: translations.event.info.labelOtherInfo },
    { role: 'heading', name: translations.event.info.labelDirections },
    { role: 'heading', name: translations.event.description.title },
    { role: 'heading', name: translations.event.shareLinks.title },
    { role: 'button', name: translations.common.shareLinks.buttonCopyLink },
    { role: 'button', name: translations.common.shareLink.shareOnFacebook },
    { role: 'button', name: translations.common.shareLink.shareOnTwitter },
    { role: 'button', name: translations.common.shareLink.shareOnLinkedIn },
    { role: 'heading', name: translations.common.mapBox.title },
  ];

  itemsByRole.forEach(({ role, name }) => {
    expect(screen.getByRole(role, { name })).toBeInTheDocument();
  });

  // there is two kartta-links, thus we check that three is at least one match of each
  expect(
    screen.queryAllByRole('link', {
      // eslint-disable-next-line @stylistic/max-len
      name: `${translations.common.mapBox.location.openMap}. ${translations.common.srOnly.opensInANewTab} ${translations.common.srOnly.opensInAnExternalSite}`,
    })
  ).not.toHaveLength(0);

  const itemsByText = [
    description,
    `Kuva: ${photographerName}`,
    [streetAddress, neighborhood, addressLocality].join(', '),
  ];

  itemsByText.forEach((item) => {
    expect(screen.getByText(item)).toBeInTheDocument();
  });

  // Both location and event info have directions links so test that both are available
  const itemsAllByRole = [
    {
      role: 'link',
      // eslint-disable-next-line @stylistic/max-len
      name: `${translations.common.mapBox.location.directionsGoogle}. ${translations.common.srOnly.opensInANewTab} ${translations.common.srOnly.opensInAnExternalSite}`,
    },
    {
      role: 'link',
      // eslint-disable-next-line @stylistic/max-len
      name: `${translations.common.mapBox.location.directionsHSL}. ${translations.common.srOnly.opensInANewTab} ${translations.common.srOnly.opensInAnExternalSite}`,
    },
  ];

  itemsAllByRole.forEach(({ role, name }) => {
    expect(screen.queryAllByRole(role, { name })).toHaveLength(2);
  });
}, 10_000);

it('should hide map if internet event', () => {
  render(
    <EventContent
      event={
        {
          ...event,
          location: { ...event.location, id: 'helsinki:internet' },
        } as EventFieldsFragment
      }
    />,
    { mocks }
  );
  expect(screen.queryByText(/sijainti/i)).not.toBeInTheDocument();
});

it('should show location extra info when available', () => {
  render(
    <EventContent
      event={
        {
          ...event,
          locationExtraInfo: { fi: 'Sisään takaovesta' },
        } as EventFieldsFragment
      }
    />,
    { mocks }
  );
  expect(screen.getByText(/Paikan lisätiedot/i)).toBeInTheDocument();
  expect(screen.getByText(/Sisään takaovesta/i)).toBeInTheDocument();
});

it('should not show location extra info title when location extra info not available', () => {
  render(<EventContent event={event} />, { mocks });
  expect(screen.queryByText(/Paikan lisätiedot/i)).not.toBeInTheDocument();
});

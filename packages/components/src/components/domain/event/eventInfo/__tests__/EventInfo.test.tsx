import { waitForLoadingCompleted } from '@events-helsinki/common-tests';
import * as ics from 'ics';
import mockRouter from 'next-router-mock';

import type { MockInstance } from 'vitest';
import {
  actWait,
  configure,
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import { fakeEvent } from '@/test-utils/mockDataUtils';
import type { AppLanguage } from '../../../../../types';
import type {
  EventFields,
  SuperEventResponse,
} from '../../../../../types/event-types';
import type { EventDetails } from '../../../../../types/generated/graphql';
import { EventTypeId } from '../../../../../types/generated/graphql';
import getDateRangeStr from '../../../../../utils/getDateRangeStr';
import {
  addressLocality,
  email,
  event,
  getSubEventsMocks,
  locationName,
  mocks,
  organizationName,
  organizerName,
  providerContactInfo,
  streetAddress,
  subEventsResponse,
  superEventInternalId,
  telephone,
} from '../../eventInfo/mocks/EventInfo.mocks';
import EventInfo from '../EventInfo';
import { subEventsListTestId, superEventTestId } from '../EventsHierarchy';

beforeEach(() => {
  mockRouter.setCurrentUrl('/');
});
configure({ defaultHidden: true });

const getDateRangeStrProps = (event: EventDetails) => ({
  start: event.startTime!,
  end: event.endTime,
  locale: 'fi' as AppLanguage,
  includeTime: true,
  timeAbbreviation: translations.common.timeAbbreviation,
});

it('should render event info fields', async () => {
  const superEventMock = getSubEventsMocks({
    variables: {
      superEvent: 'super:123',
      eventType: [EventTypeId.Course],
    },
    response: subEventsResponse,
  });
  const subEventMock = getSubEventsMocks({
    variables: {
      superEvent: event.id,
      eventType: [EventTypeId.Course],
    },
    response: subEventsResponse,
  });
  render(<EventInfo event={event} />, {
    mocks: [...mocks, superEventMock, subEventMock],
  });
  await actWait();

  const itemsByRole = [
    { role: 'heading', name: translations.event.info.labelDateAndTime },
    { role: 'heading', name: translations.event.info.labelLocation },
    { role: 'heading', name: translations.event.info.labelLanguages },
    { role: 'heading', name: translations.event.info.labelOtherInfo },
    { role: 'heading', name: translations.event.info.labelAudience },
    { role: 'heading', name: translations.event.info.labelPublisher },
    { role: 'heading', name: translations.event.info.labelOrganizer },
    {
      role: 'link',
      // eslint-disable-next-line @stylistic/max-len
      name: `${translations.event.info.extlinkFacebook}. ${translations.common.srOnly.opensInANewTab} ${translations.common.srOnly.opensInAnExternalSite}`,
    },
    { role: 'heading', name: translations.event.info.labelDirections },
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

  for (const { role, name } of itemsByRole) {
    expect(await screen.findByRole(role, { name })).toBeInTheDocument();
  }

  const itemsByText = [
    'Ma 22.6.2020, klo 10.00–13.00',
    addressLocality,
    locationName,
    streetAddress,
    organizationName,
    organizerName,
  ];

  for (const item of itemsByText) {
    expect(await screen.findByText(item)).toBeInTheDocument();
  }

  // Email and telephone should not be found in the document anymore
  expect(screen.queryByText(email)).not.toBeInTheDocument();
  expect(screen.queryByText(telephone)).not.toBeInTheDocument();

  // Instead the Finnish translation of provider contact info should be visible
  expect(await screen.findByText(providerContactInfo.fi)).toBeInTheDocument();
  expect(screen.queryByText(providerContactInfo.en)).not.toBeInTheDocument();
  expect(screen.queryByText(providerContactInfo.sv)).not.toBeInTheDocument();
}, 20_000);

it('should hide the organizer section when the organizer name is not given', async () => {
  const mockEvent = {
    ...event,
    provider: null,
  };
  render(<EventInfo event={mockEvent} />, {
    mocks,
  });
  await actWait();
  expect(
    screen.getByRole('heading', {
      name: translations.event.info.labelPublisher,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelOrganizer,
    })
  ).not.toBeInTheDocument();
});

it('should hide other info section if no provider contact info, external links or info url', () => {
  const mockEvent: EventFields = {
    ...event,
    externalLinks: [],
    infoUrl: null,
    providerContactInfo: null,
  };
  render(<EventInfo event={mockEvent} />, {
    mocks,
  });

  // Event info fields
  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelOtherInfo,
    })
  ).not.toBeInTheDocument();
  expect(screen.queryByText(providerContactInfo.en)).not.toBeInTheDocument();
  expect(screen.queryByText(providerContactInfo.fi)).not.toBeInTheDocument();
  expect(screen.queryByText(providerContactInfo.sv)).not.toBeInTheDocument();
});

it('should hide other info section registration url from external links', () => {
  const mockEvent: EventFields = {
    ...event,
    externalLinks: [
      {
        name: 'registration',
        link: 'https://harrastushaku.fi/register/14302',
      },
    ],
    infoUrl: null,
  };
  render(<EventInfo event={mockEvent} />, {
    mocks,
  });

  expect(
    screen.queryByRole('button', {
      name: translations.event.info.registration,
    })
  ).not.toBeInTheDocument();
});

it('should hide the map link from location info if location is internet', () => {
  expect(event.location).not.toBeFalsy();
  const mockEvent: EventFields = {
    ...event,
    externalLinks: [],
    infoUrl: null,
    location: {
      ...event.location!,
      id: 'helsinki:internet',
    },
  };
  render(<EventInfo event={mockEvent} />, {
    mocks,
  });

  expect(
    screen.queryByRole('button', {
      name: translations.event.info.openMap,
    })
  ).not.toBeInTheDocument();
});

describe('add to calendar', () => {
  let icsCreateEventSpy: MockInstance<typeof ics.createEvent> | null = null;

  beforeEach(() => {
    const emptyIcsReturnObject: ics.ReturnObject = {};
    icsCreateEventSpy = vi
      .spyOn(ics, 'createEvent')
      .mockImplementation(
        (..._args: unknown[]): ics.ReturnObject => emptyIcsReturnObject
      );
  });

  afterEach(() => {
    if (icsCreateEventSpy) {
      icsCreateEventSpy.mockRestore();
    }
  });

  it('should call ics.createEvent', async () => {
    render(<EventInfo event={event} />, { mocks });

    // Event info fields
    await userEvent.click(
      screen.getByRole('button', {
        name: translations.event.info.buttonAddToCalendar,
      })
    );

    await waitFor(() => {
      expect(icsCreateEventSpy).toHaveBeenCalledOnce();
    });
  });

  it('should call ics.createEvent when end time is not defined', async () => {
    render(<EventInfo event={{ ...event, endTime: null }} />, {
      mocks,
    });

    // Event info fields
    await userEvent.click(
      screen.getByRole('button', {
        name: translations.event.info.buttonAddToCalendar,
      })
    );

    await waitFor(() => {
      expect(icsCreateEventSpy).toHaveBeenCalledOnce();
    });
  });
});

it('should show formatted audience age info on single event page if min and max ages are specified', async () => {
  render(
    <EventInfo
      event={{ ...event, audienceMinAge: '7', audienceMaxAge: '16' }}
    />,
    {
      mocks,
      routes: [`/kurssit`],
    }
  );

  expect(await screen.findByText(/7–16-vuotiaat/i)).toBeInTheDocument();
});

it('should show formatted audience age info on single event page if max age is not specified', async () => {
  render(<EventInfo event={{ ...event, audienceMaxAge: null }} />, {
    mocks,
    routes: [`/kurssit`],
  });

  expect(await screen.findByText(/5\+-vuotiaat/i)).toBeInTheDocument();
});

it('should hide audience age info on single event page if min and max ages are not specified', async () => {
  render(
    <EventInfo
      event={{ ...event, audienceMinAge: null, audienceMaxAge: null }}
    />,
    {
      mocks,
      routes: [`/kurssit`],
    }
  );

  await waitFor(() => {
    expect(screen.queryByText(/-vuotiaat/i)).not.toBeInTheDocument();
  });
});

describe('OrganizationInfo', () => {
  it.each([
    {
      eventTypeId: EventTypeId.General,
      expectedLinkText: 'Katso julkaisijan muut tapahtumat',
    },
    {
      expectedLinkText: 'Katso julkaisijan muut harrastukset',
      eventTypeId: EventTypeId.Course,
    },
  ])(
    'should show correct provider link text on event/hobby detail page',
    async ({ eventTypeId, expectedLinkText }) => {
      render(<EventInfo event={{ ...event, typeId: eventTypeId }} />, {
        mocks,
        routes: ['/fi/kurssit/test'],
      });
      await waitFor(() => {
        expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
      });
    }
  );

  it.each(Object.values(EventTypeId))(
    'should show correct provider link on event/hobby detail page',
    async (eventTypeId) => {
      render(<EventInfo event={{ ...event, typeId: eventTypeId }} />, {
        mocks,
        routes: ['/fi/kurssit/test'],
      });
      const getPublisherLink = () => {
        const publisherLinkElement: HTMLElement =
          screen.getByTestId('publisherLink');
        return publisherLinkElement instanceof HTMLAnchorElement
          ? {
              pathname: publisherLinkElement.pathname,
              searchParams: new URLSearchParams(publisherLinkElement.search),
            }
          : null;
      };
      await waitFor(() => {
        expect(getPublisherLink()?.pathname).toBe('/haku');
      });
      await waitFor(() => {
        expect(
          getPublisherLink()?.searchParams.getAll('publisher').length
        ).toBe(1);
      });
      await waitFor(() => {
        expect(
          getPublisherLink()?.searchParams.getAll('searchType').length
        ).toBe(1);
      });
      await waitFor(() => {
        expect(getPublisherLink()?.searchParams.get('publisher')).toBe(
          event.publisher
        );
      });
      await waitFor(() => {
        expect(getPublisherLink()?.searchParams.get('searchType')).toBe(
          eventTypeId
        );
      });
      await waitFor(() => {
        expect(
          [...(getPublisherLink()?.searchParams.keys() ?? [])].sort((a, b) =>
            a.localeCompare(b)
          )
        ).toStrictEqual(['publisher', 'searchType']);
      });
    }
  );
});

describe('superEvent', () => {
  it('should render super event title and link when super event is given', async () => {
    const superEvent = fakeEvent({
      superEvent: { internalId: superEventInternalId },
      typeId: EventTypeId.General,
    });
    const superEventResponse: SuperEventResponse = {
      data: superEvent,
      status: 'resolved',
    };
    const { router } = render(
      <EventInfo event={event} superEvent={superEventResponse} />,
      {
        mocks,
      }
    );
    await actWait();
    expect(
      screen.getByRole('heading', {
        name: translations.event.superEvent.title,
      })
    ).toBeInTheDocument();

    await userEvent.click(
      within(screen.getByTestId(superEventTestId)).getByText(
        superEvent.name.fi!
      )
    );
    expect(router.pathname).toBe(`/kurssit/${superEvent.id}`);
  }, 20_000);

  it('should should not render super event title when super event is not given', async () => {
    render(<EventInfo event={event} />, {
      mocks,
    });
    await actWait();

    expect(
      screen.queryByRole('heading', {
        name: translations.event.superEvent.title,
      })
    ).not.toBeInTheDocument();
  });
});

describe('subEvents', () => {
  it('should render sub events title and content when sub events are given', async () => {
    render(<EventInfo event={event} />, { mocks });
    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: translations.event.subEvents.title,
        })
      ).toBeInTheDocument();
    });
    await testSubEvents();
  });

  it('should navigate to sub events page when it is clicked', async () => {
    const { router } = render(<EventInfo event={event} />, { mocks });
    const eventsList = await screen.findByTestId(subEventsListTestId);
    const subEvent = subEventsResponse.data[0];
    const dateStr = getDateRangeStr(getDateRangeStrProps(subEvent));

    await userEvent.click(
      within(eventsList).getByText(`${subEvent.name.fi} ${dateStr}`)
    );
    expect(router.pathname).toBe(`/kurssit/${subEvent.id}`);
  });

  // eslint-disable-next-line @stylistic/max-len
  it('should render subEvents with other times title when the event is a middle level event in event hierarchy', async () => {
    const middleAsSuperEventMock = getSubEventsMocks({
      variables: {
        superEvent: event.id,
        eventType: [EventTypeId.Course],
      },
      response: {
        ...subEventsResponse,
        data: subEventsResponse.data.map((subEvent) => ({
          ...subEvent,
          superEvent: {
            internalId: `https://api.hel.fi/linkedevents/v1/event/${event.id}`,
          },
        })),
      },
    });
    const superEventMock = getSubEventsMocks({
      variables: {
        superEvent: 'super:123',
        eventType: [EventTypeId.Course],
      },
      response: subEventsResponse,
    });
    const superEventResponseMock: SuperEventResponse = {
      data: {
        ...event,
        subEvents: [
          {
            internalId: `https://api.hel.fi/linkedevents/v1/event/${event.id}`,
          },
        ],
      },
      status: 'resolved',
    };
    const testEvent = {
      ...event,
      superEvent: {
        internalId: 'https://api.hel.fi/linkedevents/v1/event/super:123',
      },
      subEvents: [
        { internalId: 'https://api.hel.fi/linkedevents/v1/event/sub:123' },
      ],
    };
    render(
      <EventInfo event={testEvent} superEvent={superEventResponseMock} />,
      {
        mocks: [...mocks, middleAsSuperEventMock, superEventMock],
      }
    );
    await waitForLoadingCompleted();
    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: translations.event.otherTimes.title,
          hidden: false,
        })
      ).toBeInTheDocument();
    });

    expect(
      screen.queryByRole('heading', {
        name: translations.event.subEvents.title,
      })
    ).not.toBeInTheDocument();
  });

  async function testSubEvents() {
    await waitFor(() => {
      expect(
        screen.queryByTestId('skeleton-loader-wrapper')
      ).not.toBeInTheDocument();
    });
    subEventsResponse.data.slice(0, 3).forEach((event) => {
      const dateStr = getDateRangeStr(getDateRangeStrProps(event));
      expect(
        screen.getByText(`${event.name.fi} ${dateStr}`)
      ).toBeInTheDocument();
    });
    const fourthevent = subEventsResponse.data[3];
    const fourthDateStr = getDateRangeStr(getDateRangeStrProps(fourthevent));
    expect(
      screen.queryByText(`${event.name.fi} ${fourthDateStr}`)
    ).not.toBeInTheDocument();

    const toggleButton = await screen.findByRole('button', {
      name: translations.event.relatedEvents.buttonShow,
    });

    await userEvent.click(toggleButton);

    await waitForLoadingCompleted();

    subEventsResponse.data.forEach((event) => {
      const dateStr = getDateRangeStr(getDateRangeStrProps(event));
      expect(
        screen.getByText(`${event.name.fi} ${dateStr}`)
      ).toBeInTheDocument();
    });

    // FIXME: Test load more sub events

    // console.log(
    //   "subEventsLoadMoreResponse events names",
    //   subEventsLoadMoreResponse.data.map(
    //     (event) =>
    //       `${event.name.fi} ${getDateRangeStr(getDateRangeStrProps(event))}`
    //   )
    // );
    // await waitFor(() => {
    //   expect(
    //     screen.queryByTestId("skeleton-loader-wrapper")
    //   ).not.toBeInTheDocument();
    // });
    // subEventsLoadMoreResponse.data.slice(0, 1).forEach((event) => {
    //   const dateStr = getDateRangeStr(getDateRangeStrProps(event));
    //   expect(
    //     screen.getByText(`${event.name.fi} ${dateStr}`)
    //   ).toBeInTheDocument();
    // });
  }
});

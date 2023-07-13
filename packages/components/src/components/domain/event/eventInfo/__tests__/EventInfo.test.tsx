import { waitForLoadingCompleted } from '@events-helsinki/common-tests';
import FileSaver from 'file-saver';
import type { NextRouter } from 'next/router';
import mockRouter from 'next-router-mock';
import React from 'react';

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
import type {
  EventFields,
  SuperEventResponse,
} from '../../../../../types/event-types';
import type { EventDetails } from '../../../../../types/generated/graphql';
import { EventTypeId } from '../../../../../types/generated/graphql';
import type { AppLanguage } from '../../../../../types/types';
import getDateRangeStr from '../../../../../utils/getDateRangeStr';
import {
  addressLocality,
  email,
  event,
  getSubEventsMocks,
  locationName,
  mocks,
  mocksWithSubEvents,
  organizationName,
  organizerName,
  price,
  streetAddress,
  subEventsResponse,
  superEventInternalId,
  telephone,
} from '../../eventInfo/utils/EventInfo.mocks';
import EventInfo from '../EventInfo';
import { subEventsListTestId, superEventTestId } from '../EventsHierarchy';

const eventInfoUrlProps = {
  getEventListLinkUrl: jest
    .fn()
    .mockImplementation(
      (event: EventFields, _router: NextRouter, _locale: AppLanguage) =>
        `/kurssit/${event.id}?returnPath=/haku`
    ),
  getOrganizationSearchUrl: jest
    .fn()
    .mockImplementation(
      (event: EventFields, _router: NextRouter, _locale: AppLanguage) =>
        `/haku?publisher=${event.publisher}&searchType=${event.typeId}`
    ),
  getPlainEventUrl: jest
    .fn()
    .mockImplementation(
      (event: EventFields, _locale: AppLanguage) => `/kurssit/${event.id}`
    ),
};

beforeEach(() => {
  mockRouter.setCurrentUrl('/');
});
configure({ defaultHidden: true });

const getDateRangeStrProps = (event: EventDetails) => ({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  start: event.startTime!,
  end: event.endTime,
  locale: 'fi',
  includeTime: true,
  timeAbbreviation: translations.common.timeAbbreviation,
});

it('should render event info fields', async () => {
  render(<EventInfo event={event} {...eventInfoUrlProps} />, { mocks });
  await actWait();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      name: `${translations.event.info.extlinkFacebook}. ${translations.common.srOnly.opensInANewTab} ${translations.common.srOnly.opensInAnExternalSite}`,
    },
    { role: 'heading', name: translations.event.info.labelDirections },
    {
      role: 'link',
      name: `${translations.common.mapBox.location.directionsGoogle}. ${translations.common.srOnly.opensInANewTab} ${translations.common.srOnly.opensInAnExternalSite}`,
    },
    {
      role: 'link',
      name: `${translations.common.mapBox.location.directionsHSL}. ${translations.common.srOnly.opensInANewTab} ${translations.common.srOnly.opensInAnExternalSite}`,
    },
    { role: 'heading', name: translations.event.info.labelPrice },
  ];

  itemsByRole.forEach(({ role, name }) => {
    expect(screen.getByRole(role, { name })).toBeInTheDocument();
  });

  const itemsByText = [
    'Ma 22.6.2020, klo 10.00–13.00',
    addressLocality,
    locationName,
    streetAddress,
    email,
    telephone,
    organizationName,
    organizerName,
    price,
  ];

  itemsByText.forEach(async (item) => {
    await screen.findByText(item);
  });
});

it('should hide the organizer section when the organizer name is not given', async () => {
  const mockEvent = {
    ...event,
    provider: null,
  };
  render(<EventInfo event={mockEvent} {...eventInfoUrlProps} />, { mocks });
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

it('should hide other info section', () => {
  const mockEvent = {
    ...event,
    externalLinks: [],
    infoUrl: null,
    location: {
      ...event.location,
      email: null,
      externalLinks: [],
      telephone: null,
    },
  } as EventFields;
  render(<EventInfo event={mockEvent} {...eventInfoUrlProps} />, {
    mocks,
  });

  // Event info fields
  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelOtherInfo,
    })
  ).not.toBeInTheDocument();
  expect(screen.queryByText(email)).not.toBeInTheDocument();
  expect(screen.queryByText(telephone)).not.toBeInTheDocument();
});

it('should hide other info section registration url from external links', () => {
  const mockEvent = {
    ...event,
    externalLinks: [
      {
        name: 'registration',
        link: 'https://harrastushaku.fi/register/14302',
      },
    ],
    infoUrl: null,
    location: {
      ...event.location,
      email: null,
      externalLinks: [],
      telephone: null,
    },
  } as EventFields;
  render(<EventInfo event={mockEvent} {...eventInfoUrlProps} />, {
    mocks,
  });

  expect(
    screen.queryByRole('button', {
      name: translations.event.info.registration,
    })
  ).not.toBeInTheDocument();
});

it('should hide the map link from location info if location is internet', () => {
  const mockEvent = {
    ...event,
    externalLinks: [],
    infoUrl: null,
    location: {
      ...event.location,
      id: 'helsinki:internet',
      email: null,
      externalLinks: [],
      telephone: null,
    },
  } as EventFields;
  render(<EventInfo event={mockEvent} {...eventInfoUrlProps} />, {
    mocks,
  });

  expect(
    screen.queryByRole('button', {
      name: translations.event.info.openMap,
    })
  ).not.toBeInTheDocument();
});

it('should open ticket buy page', async () => {
  global.open = jest.fn();
  render(<EventInfo event={event} {...eventInfoUrlProps} />, { mocks });

  // Event info fields
  await userEvent.click(
    screen.getByRole('button', {
      name: translations.event.info.ariaLabelBuyTickets,
    })
  );

  await waitFor(() => {
    expect(global.open).toHaveBeenCalled();
  });
});

// eslint-disable-next-line jest/no-disabled-tests
it.skip('should create ics file succesfully', async () => {
  const saveAsSpy = jest.spyOn(FileSaver, 'saveAs');
  render(<EventInfo event={event} {...eventInfoUrlProps} />, { mocks });

  // Event info fields
  await userEvent.click(
    screen.getByRole('button', {
      name: translations.event.info.buttonAddToCalendar,
    })
  );

  await waitFor(() => {
    expect(saveAsSpy).toHaveBeenCalled();
  });
});

// eslint-disable-next-line jest/no-disabled-tests
it.skip('should create ics file succesfully when end time is not defined', async () => {
  const saveAsSpy = jest.spyOn(FileSaver, 'saveAs');
  render(
    <EventInfo event={{ ...event, endTime: null }} {...eventInfoUrlProps} />,
    {
      mocks,
    }
  );

  // Event info fields
  await userEvent.click(
    screen.getByRole('button', {
      name: translations.event.info.buttonAddToCalendar,
    })
  );

  await waitFor(() => {
    expect(saveAsSpy).toHaveBeenCalled();
  });
});

it('should hide audience age info on single event page', async () => {
  render(<EventInfo event={event} {...eventInfoUrlProps} />, {
    routes: [`/kurssit`],
  });

  await waitFor(() => {
    expect(screen.getByText(/5-15 -vuotiaat/i)).toBeInTheDocument();
  });
});

it('should show formatted audience age info on single event page if max age is not specified', async () => {
  render(
    <EventInfo
      event={{ ...event, audienceMaxAge: null }}
      {...eventInfoUrlProps}
    />,
    {
      routes: [`/kurssit`],
    }
  );

  await waitFor(() => {
    expect(screen.getByText(/5\+ -vuotiaat/i)).toBeInTheDocument();
  });
});

it('should hide audience age info on single event page if min and max ages are not specified', async () => {
  render(
    <EventInfo
      event={{ ...event, audienceMinAge: null, audienceMaxAge: null }}
      {...eventInfoUrlProps}
    />,
    {
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
      render(
        <EventInfo
          event={{ ...event, typeId: eventTypeId } as EventFields}
          {...eventInfoUrlProps}
        />,
        {
          mocks: mocksWithSubEvents,
          routes: ['/fi/kurssit/test'],
        }
      );
      await waitFor(() => {
        expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
      });
    }
  );

  it.each(Object.keys(EventTypeId))(
    'should show correct provider link on event/hobby detail page',
    async (eventTypeId) => {
      render(
        <EventInfo
          event={{ ...event, typeId: eventTypeId } as EventFields}
          {...eventInfoUrlProps}
        />,
        {
          mocks,
          routes: ['/fi/kurssit/test'],
        }
      );
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
          [...(getPublisherLink()?.searchParams.keys() ?? [])].sort()
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
    const superEventResponse = {
      data: superEvent,
      status: 'resolved',
    } as SuperEventResponse;
    const { router } = render(
      <EventInfo
        event={event}
        superEvent={superEventResponse}
        {...eventInfoUrlProps}
      />,
      {
        mocks: mocksWithSubEvents,
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        superEvent.name.fi!
      )
    );
    expect(router.pathname).toBe(`/kurssit/${superEvent.id}`);
  });

  it('should should not render super event title when super event is not given', async () => {
    render(<EventInfo event={event} {...eventInfoUrlProps} />, {
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
    render(<EventInfo event={event} {...eventInfoUrlProps} />, {
      mocks: mocksWithSubEvents,
    });
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
    const { router } = render(
      <EventInfo event={event} {...eventInfoUrlProps} />,
      {
        mocks: mocksWithSubEvents,
      }
    );
    const eventsList = await screen.findByTestId(subEventsListTestId);
    const subEvent = subEventsResponse.data[0];
    const dateStr = getDateRangeStr(getDateRangeStrProps(subEvent));

    await userEvent.click(
      within(eventsList).getByText(`${subEvent.name.fi} ${dateStr}`)
    );
    expect(router.pathname).toBe(`/kurssit/${subEvent.id}`);
  });

  // eslint-disable-next-line max-len
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
      data: Object.assign({}, event, {
        subEvents: [
          {
            internalId: `https://api.hel.fi/linkedevents/v1/event/${event.id}`,
          },
        ],
      }),
      status: 'resolved',
    };
    render(
      <EventInfo
        event={Object.assign({}, event, {
          superEvent: {
            internalId: 'https://api.hel.fi/linkedevents/v1/event/super:123',
          },
          subEvents: [
            { internalId: 'https://api.hel.fi/linkedevents/v1/event/sub:123' },
          ],
        })}
        superEvent={superEventResponseMock}
        {...eventInfoUrlProps}
      />,
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

    await actWait();

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

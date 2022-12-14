import { useLazyQuery } from '@apollo/client';
import {
  LoadingSpinner,
  useLocale,
  isClient,
  addParamsToQueryString,
  getEventIdFromUrl,
  isEventClosed,
  EventDetailsDocument,
  MAIN_CONTENT_ID,
} from 'events-helsinki-components';
import type {
  SuperEventResponse,
  EventFields,
} from 'events-helsinki-components';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Link } from 'react-helsinki-headless-cms';

import { ROUTES } from '../../constants';
import { getLocalizedCmsItemUrl } from '../../utils/routerUtils';
import ErrorHero from '../error/ErrorHero';
import EventClosedHero from './eventClosedHero/EventClosedHero';
import EventContent from './eventContent/EventContent';
import EventHero from './eventHero/EventHero';
import styles from './eventPage.module.scss';
import EventPageMeta from './eventPageMeta/EventPageMeta';
import SimilarEvents from './similarEvents/SimilarEvents';

export interface EventPageContainerProps {
  loading: boolean;
  event?: EventFields;
  showSimilarEvents?: boolean;
}

const EventPageContainer: React.FC<EventPageContainerProps> = ({
  event,
  loading,
  showSimilarEvents = true,
}) => {
  const { t } = useTranslation('event');
  const router = useRouter();
  const locale = useLocale();
  const search = addParamsToQueryString(router.asPath, {
    returnPath: `/${locale}/${getLocalizedCmsItemUrl(
      ROUTES.SEARCH,
      {},
      locale
    )}`,
  });

  const [superEvent, setSuperEvent] = React.useState<SuperEventResponse>({
    data: null,
    status: 'pending',
  });

  const [hasSimilarEvents, setHasSimilarEvents] = useState(false);

  const superEventId = getEventIdFromUrl(
    event?.superEvent?.internalId ?? '',
    'event'
  );

  const [superEventSearch, { data: superEventData }] = useLazyQuery(
    EventDetailsDocument,
    {
      variables: {
        id: superEventId,
        include: ['in_language', 'keywords', 'location', 'audience'],
      },
    }
  );

  React.useEffect(() => {
    if (superEventId) {
      superEventSearch();
      if (superEventData) {
        setSuperEvent({
          data: superEventData.eventDetails,
          status: 'resolved',
        });
      }
    } else if (event) {
      setSuperEvent({ data: null, status: 'resolved' });
    }
  }, [event, superEventId, superEventData, superEventSearch]);

  const handleSimilarEventsLoaded = (eventsCount: number) => {
    setHasSimilarEvents(eventsCount > 0);
  };

  const eventClosed = !event || isEventClosed(event);
  return (
    <div className={styles.eventPageWrapper}>
      <main id={MAIN_CONTENT_ID}>
        <LoadingSpinner isLoading={loading}>
          {event ? (
            <>
              {/* Wait for data to be accessible before updating metadata */}
              <EventPageMeta event={event} />
              {eventClosed ? (
                <EventClosedHero />
              ) : (
                <>
                  <EventHero event={event} superEvent={superEvent} />
                  <EventContent
                    event={event}
                    superEvent={superEvent}
                    hasSimilarEvents={hasSimilarEvents}
                  />
                </>
              )}
              {/* Hide similar event on SSR to make initial load faster */}
              {isClient && showSimilarEvents && !eventClosed && (
                <SimilarEvents
                  event={event}
                  onEventsLoaded={handleSimilarEventsLoaded}
                />
              )}
            </>
          ) : (
            <ErrorHero text={t('notFound.text')} title={t('notFound.title')}>
              <Link
                href={`${getLocalizedCmsItemUrl(
                  ROUTES.SEARCH,
                  {},
                  locale
                )}${search}`}
              >
                {t('notFound.linkSearchEvents')}
              </Link>
            </ErrorHero>
          )}
        </LoadingSpinner>
      </main>
    </div>
  );
};

export default EventPageContainer;

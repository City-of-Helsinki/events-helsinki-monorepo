import {
  LoadingSpinner,
  useLocale,
  addParamsToQueryString,
  isEventClosed,
  MAIN_CONTENT_ID,
  useSuperEventLazyLoad,
  EventClosedHero,
  EventContent,
  EventHero,
  EventPageMeta,
} from '@events-helsinki/components';
import type { EventFields } from '@events-helsinki/components';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { Link } from 'react-helsinki-headless-cms';

import IconDirection from 'assets/icons/IconDirections';
import AppConfig from 'domain/app/AppConfig';
import { ROUTES } from '../../constants';
import routerHelper from '../app/routerHelper';
import ErrorHero from '../error/ErrorHero';
import {
  getPlainEventUrl,
  getOrganizationSearchUrl,
  getEventListLinkUrl,
} from '../search/eventSearch/utils';
import styles from './eventPage.module.scss';
import { extractLatestReturnPath } from './eventQueryString.util';
import {
  useSubEvents,
  useSubEventsQueryVariables,
  useOtherEventTimes,
  useSimilarEventsQuery,
} from './queryUtils';
import useEventCards from './useEventCards';
const SimilarEvents = dynamic(
  () =>
    import(
      '@events-helsinki/components/components/event/similarEvents/SimilarEvents'
    ),
  {
    ssr: false,
  }
);

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
    returnPath: `/${locale}/${routerHelper.getLocalizedCmsItemUrl(
      ROUTES.SEARCH,
      {},
      locale
    )}`,
  });
  const { superEvent } = useSuperEventLazyLoad(event);
  const [hasSimilarEvents, setHasSimilarEvents] = useState(false);
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
                <EventClosedHero
                  appConfig={AppConfig}
                  router={router}
                  routerHelper={routerHelper}
                  locale={locale}
                />
              ) : (
                <>
                  <EventHero
                    event={event}
                    superEvent={superEvent}
                    appConfig={AppConfig}
                    extractLatestReturnPath={extractLatestReturnPath}
                  />
                  <EventContent
                    event={event}
                    superEvent={superEvent}
                    hasSimilarEvents={hasSimilarEvents}
                    appConfig={AppConfig}
                    iconDirections={IconDirection}
                    getPlainEventUrl={getPlainEventUrl}
                    getOrganizationSearchUrl={getOrganizationSearchUrl}
                    useSubEvents={useSubEvents}
                    useSubEventsQueryVariables={useSubEventsQueryVariables}
                    useOtherEventTimes={useOtherEventTimes}
                    getEventListLinkUrl={getEventListLinkUrl}
                  />
                </>
              )}
              {/* Hide similar event on SSR to make initial load faster */}
              {showSimilarEvents && !eventClosed && (
                <SimilarEvents
                  event={event}
                  onEventsLoaded={handleSimilarEventsLoaded}
                  useSimilarEventsQuery={useSimilarEventsQuery}
                  useEventCards={useEventCards}
                />
              )}
            </>
          ) : (
            <ErrorHero text={t('notFound.text')} title={t('notFound.title')}>
              <Link
                href={`${routerHelper.getLocalizedCmsItemUrl(
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

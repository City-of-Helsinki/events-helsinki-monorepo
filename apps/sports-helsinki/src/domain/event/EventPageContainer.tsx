import {
  LoadingSpinner,
  useLocale,
  addParamsToQueryString,
  isEventClosed,
  MAIN_CONTENT_ID,
  useSuperEventLazyLoad,
  EventClosedHero,
  EventHero,
} from '@events-helsinki/components';
import type { EventFields } from '@events-helsinki/components';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { Link } from 'react-helsinki-headless-cms';

import { ROUTES } from '../../constants';
import routerHelper from '../app/routerHelper';
import ErrorHero from '../error/ErrorHero';
import { getKeywordOnClickHandler } from '../search/eventSearch/utils';
import AppConfig from './../app/AppConfig';
import EventContent from './eventContent/EventContent';
import styles from './eventPage.module.scss';
import EventPageMeta from './eventPageMeta/EventPageMeta';

const SimilarEvents = dynamic(() => import('./similarEvents/SimilarEvents'), {
  ssr: false,
});

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
  const moveToHomePage = () => {
    router.push(routerHelper.getI18nPath('/', locale));
  };
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
                  onClick={moveToHomePage}
                  theme={AppConfig.defaultButtonTheme}
                  variant={AppConfig.defaultButtonVariant}
                />
              ) : (
                <>
                  <EventHero
                    event={event}
                    superEvent={superEvent}
                    theme={AppConfig.defaultButtonTheme}
                    variant={AppConfig.defaultButtonVariant}
                    getKeywordOnClickHandler={getKeywordOnClickHandler}
                  />
                  <EventContent
                    event={event}
                    superEvent={superEvent}
                    hasSimilarEvents={hasSimilarEvents}
                  />
                </>
              )}
              {/* Hide similar event on SSR to make initial load faster */}
              {showSimilarEvents && !eventClosed && (
                <SimilarEvents
                  event={event}
                  onEventsLoaded={handleSimilarEventsLoaded}
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

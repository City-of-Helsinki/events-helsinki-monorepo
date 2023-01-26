import classNames from 'classnames';
import type { Venue } from 'events-helsinki-components';
import {
  isClient,
  LoadingSpinner,
  useLocale,
  addParamsToQueryString,
  MAIN_CONTENT_ID,
} from 'events-helsinki-components';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { Link } from 'react-helsinki-headless-cms';

import { ROUTES } from '../../constants';
import { getLocalizedCmsItemUrl } from '../../utils/routerUtils';
import ErrorHero from '../error/ErrorHero';
import { SPORT_COURSES_KEYWORDS } from '../search/eventSearch/constants';
import VenueUpcomingEvents from './upcomingEvents/UpcomingEventsSection';
import getVenueSourceId from './utils/getVenueSourceId';
import VenueContent from './venueContent/VenueContent';
import VenueHero from './venueHero/VenueHero';
import styles from './venuePage.module.scss';
// import EventPageMeta from '../event/eventPageMeta/EventPageMeta';

export interface VenuePageContainerProps {
  loading: boolean;
  venue: Venue;
  showUpcomingEvents?: boolean;
  showSimilarVenues?: boolean;
}

const VenuePageContainer: React.FC<VenuePageContainerProps> = ({
  venue,
  loading,
  showUpcomingEvents = true,
  showSimilarVenues = false,
}) => {
  const { id: venueId } = venue;
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
  const [hasUpcomingEvents, setHasUpcomingEvents] = React.useState(false);
  const handleSimilarEventsLoaded = (eventsCount: number) => {
    setHasUpcomingEvents(eventsCount > 0);
  };
  // NOTE: for some reason, the venue.id might be something else than TPREK,
  // when the venue is given from the Venue-graphql-proxy,
  // but the LinkedEvents is still using the TPREK as a source.
  const placeId = getVenueSourceId(venueId.replace(/[^:]*:/, ''));

  return (
    <div className={styles.venuePageWrapper}>
      <main id={MAIN_CONTENT_ID}>
        <LoadingSpinner isLoading={loading}>
          {venue ? (
            <>
              {/* Wait for data to be accessible before updating metadata */}
              {/* <EventPageMeta venue={venue} /> */}
              <VenueHero venue={venue} />
              <VenueContent
                venue={venue}
                className={classNames({
                  [styles.spaceOnBottom]:
                    (!showUpcomingEvents && !showSimilarVenues) ||
                    !hasUpcomingEvents,
                })}
              />
              {isClient && showUpcomingEvents && (
                <VenueUpcomingEvents
                  placeId={placeId}
                  keywords={SPORT_COURSES_KEYWORDS}
                  type="carousel"
                  onEventsLoaded={handleSimilarEventsLoaded}
                />
              )}
              {/* Hide similar event on SSR to make initial load faster */}
              {/* {isClient && showSimilarVenues && (
                <SimilarVenues
                  event={event}
                  onEventsLoaded={handleSimilarEventsLoaded}
                />
              )} */}
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

export default VenuePageContainer;

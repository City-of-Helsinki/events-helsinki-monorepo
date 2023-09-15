import type { Venue } from '@events-helsinki/components';
import {
  LoadingSpinner,
  useLocale,
  addParamsToQueryString,
  MAIN_CONTENT_ID,
} from '@events-helsinki/components';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { Link } from 'react-helsinki-headless-cms';
import { ROUTES } from '../../constants';
import routerHelper from '../../domain/app/routerHelper';
import ErrorHero from '../error/ErrorHero';
import { SPORT_COURSES_KEYWORDS } from '../search/eventSearch/constants';
import getVenueSourceId from './utils/getVenueSourceId';
import VenueContent from './venueContent/VenueContent';
import VenueHero from './venueHero/VenueHero';
import styles from './venuePage.module.scss';
import VenuePageMeta from './venuePageMeta/VenuePageMeta';

const SimilarVenues = dynamic(
  () => import('./similarVenues/SimilarVenuesSection'),
  {
    ssr: false,
  }
);

const VenueUpcomingEvents = dynamic(
  () => import('./upcomingEvents/UpcomingEventsSection'),
  {
    ssr: false,
  }
);

export interface VenuePageContainerProps {
  loading: boolean;
  venue: Venue | undefined;
  showUpcomingEvents?: boolean;
  showSimilarVenues?: boolean;
}

const VenuePageContainer: React.FC<VenuePageContainerProps> = ({
  venue,
  loading,
  showUpcomingEvents = true,
  showSimilarVenues = true,
}) => {
  const venueId = venue?.id ?? '';
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
  const [hasUpcomingEvents, setHasUpcomingEvents] = React.useState(false);
  const [hasSimilarVenues, setHasSimilarVenues] = React.useState(false);
  const handleSimilarEventsLoaded = (eventsCount: number) => {
    setHasUpcomingEvents(eventsCount > 0);
  };
  const handleSimilarVenuesLoaded = (venuesCount: number) => {
    setHasSimilarVenues(venuesCount > 0);
  };
  // NOTE: for some reason, the venue.id might be something else than TPREK,
  // when the venue is given from the Venue-graphql-proxy,
  // but the LinkedEvents is still using the TPREK as a source.
  const placeId =
    // Remove everything from venueId before first colon and the first colon:
    getVenueSourceId(venueId.replace(/^[^:]*:/, ''));

  return (
    <div className={styles.venuePageWrapper}>
      <main id={MAIN_CONTENT_ID}>
        <LoadingSpinner isLoading={loading}>
          {venue ? (
            <>
              {/* Wait for data to be accessible before updating metadata */}
              <VenuePageMeta venue={venue} />
              <VenueHero venue={venue} />
              <VenueContent
                venue={venue}
                className={classNames({
                  [styles.spaceOnBottom]:
                    (!showUpcomingEvents && !showSimilarVenues) ||
                    (!hasUpcomingEvents && !hasSimilarVenues),
                })}
              />
              {/* Hide upcoming events on SSR to make initial load faster */}
              {showUpcomingEvents && (
                <VenueUpcomingEvents
                  placeId={placeId}
                  keywords={SPORT_COURSES_KEYWORDS}
                  type="carousel"
                  onEventsLoaded={handleSimilarEventsLoaded}
                />
              )}
              {/* Hide similar venues on SSR to make initial load faster */}
              {showSimilarVenues && (
                <SimilarVenues
                  venue={venue}
                  onVenuesLoaded={handleSimilarVenuesLoaded}
                  korosTop
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

export default VenuePageContainer;

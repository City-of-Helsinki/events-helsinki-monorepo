import type { Venue } from 'events-helsinki-components';
import {
  LoadingSpinner,
  useLocale,
  addParamsToQueryString,
  MAIN_CONTENT_ID,
} from 'events-helsinki-components';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { Link } from 'react-helsinki-headless-cms';

import { ROUTES } from '../../constants';
import { getLocalizedCmsItemUrl } from '../../utils/routerUtils';
import ErrorHero from '../error/ErrorHero';
import VenueContent from './venueContent/VenueContent';
import VenueHero from './venueHero/VenueHero';
import styles from './venuePage.module.scss';
// import EventPageMeta from '../event/eventPageMeta/EventPageMeta';

export interface VenuePageContainerProps {
  loading: boolean;
  venue?: Venue;
  // showSimilarVenues?: boolean;
}

const VenuePageContainer: React.FC<VenuePageContainerProps> = ({
  venue,
  loading,
  // showSimilarVenues = true,
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

  return (
    <div className={styles.venuePageWrapper}>
      <main id={MAIN_CONTENT_ID}>
        <LoadingSpinner isLoading={loading}>
          {venue ? (
            <>
              {/* Wait for data to be accessible before updating metadata */}
              {/* <EventPageMeta venue={venue} /> */}
              <VenueHero venue={venue} />
              <VenueContent venue={venue} />
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

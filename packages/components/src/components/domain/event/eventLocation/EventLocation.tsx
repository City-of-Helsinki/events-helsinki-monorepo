import { IconLocation, useCookies } from 'hds-react';
import React from 'react';
import { Link, SecondaryLink } from 'react-helsinki-headless-cms';

import { useEventTranslation, useLocale } from '../../../../hooks';
import type { EventFields } from '../../../../types';
import { getEventFields, getServiceMapUrl } from '../../../../utils';
import styles from './eventLocation.module.scss';
import LocationText from './EventLocationText';

interface Props {
  event: EventFields;
}

const EventLocation: React.FC<Props> = ({ event }) => {
  const { t } = useEventTranslation();
  const locale = useLocale();
  const { googleDirectionsLink, hslDirectionsLink, name } = getEventFields(
    event,
    locale
  );
  const { getAllConsents } = useCookies();
  const getConsentStatus = (cookieId: string) => {
    const consents = getAllConsents();
    return consents[cookieId];
  };
  const isServiceMapEnabled = getConsentStatus('servicemap_session');

  // TODO: Migrate the map of VenueLocation and EventLocation to a common component
  return (
    <div className={styles.eventLocationContainer}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>
          <IconLocation aria-hidden />
          <h2>{t('event:location.title')}</h2>
        </div>
        <Link
          className={styles.mapLink}
          href={getServiceMapUrl(event, locale, false)}
        >
          {t('event:location.openMap')}
        </Link>
      </div>
      {isServiceMapEnabled && (
        <iframe
          title={t('event:location.mapTitle')}
          className={styles.mapContainer}
          src={getServiceMapUrl(event, locale, true)}
        ></iframe>
      )}
      <div className={styles.eventName}>{name}</div>
      <div className={styles.location}>
        <LocationText
          event={event}
          showDistrict={true}
          showLocationName={false}
        />
      </div>
      <SecondaryLink
        className={styles.externalLink}
        href={googleDirectionsLink}
      >
        {t('event:location.directionsGoogle')}
      </SecondaryLink>
      <SecondaryLink className={styles.externalLink} href={hslDirectionsLink}>
        {t('event:location.directionsHSL')}
      </SecondaryLink>
    </div>
  );
};

export default EventLocation;

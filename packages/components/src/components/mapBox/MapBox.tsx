import { IconLocation, useCookies } from 'hds-react';
import React from 'react';
import { Link, SecondaryLink } from 'react-helsinki-headless-cms';
import { useCommonTranslation } from '../../hooks';
import Text from '../text/Text';
import styles from './mapBox.module.scss';

type Props = {
  title: string;
  serviceMapUrl: string;
  openMapUrl: string;
  placeName: string;
  placeAddress: string;
  googleDirectionsLink: string;
  hslDirectionsLink: string;
  accessibilitySentences?: JSX.Element;
};

function MapBox({
  title,
  serviceMapUrl,
  openMapUrl,
  placeName,
  placeAddress,
  googleDirectionsLink,
  hslDirectionsLink,
  accessibilitySentences,
}: Props) {
  const { t } = useCommonTranslation();
  const { getAllConsents } = useCookies();
  const getConsentStatus = (cookieId: string) => {
    const consents = getAllConsents();
    return consents[cookieId];
  };
  const isServiceMapEnabled = getConsentStatus('servicemap_session');
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <div className={styles.titleText}>
          <IconLocation aria-hidden="true" />
          <h2>{title}</h2>
        </div>
        <Link className={styles.mapLink} href={openMapUrl} openInNewTab={true}>
          {t('common:mapBox.location.openMap')}
        </Link>
      </div>
      {isServiceMapEnabled && (
        <iframe
          title={title}
          className={styles.mapContainer}
          src={serviceMapUrl}
        ></iframe>
      )}
      <div className={styles.meta}>
        <Text as="p" variant="h3" className={styles.locationName}>
          {placeName}
        </Text>
        <Text variant="body-l" className={styles.location}>
          {placeAddress}
        </Text>
        <SecondaryLink
          className={styles.externalLink}
          href={googleDirectionsLink}
        >
          {t('common:mapBox.location.directionsGoogle')}
        </SecondaryLink>
        <SecondaryLink className={styles.externalLink} href={hslDirectionsLink}>
          {t('common:mapBox.location.directionsHSL')}
        </SecondaryLink>
        {accessibilitySentences}
      </div>
    </div>
  );
}

export default MapBox;

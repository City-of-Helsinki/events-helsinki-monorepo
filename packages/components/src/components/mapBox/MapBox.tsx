import { IconLocation, useCookies } from 'hds-react';
import router from 'next/router';
import React from 'react';
import { Link, SecondaryLink } from 'react-helsinki-headless-cms';
import { useCookieConfigurationContext } from '../../cookieConfigurationProvider';
import { useCommonTranslation } from '../../hooks';
import CookiesRequired from '../cookieConsent/CookiesRequired';
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
  consentUrl?: string;
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
  consentUrl,
}: Props) {
  const { t } = useCommonTranslation();
  const { cookieDomain } = useCookieConfigurationContext();
  const { getAllConsents } = useCookies({ cookieDomain });
  const getConsentStatus = (cookieId: string) => {
    const consents = getAllConsents();
    return consents[cookieId];
  };
  const isConsentGiven = getConsentStatus('servicemap_session');
  const handleConsentPageRedirect = () => {
    if (consentUrl) {
      router.push(`${consentUrl}?returnPath=${router.asPath}`);
    }
  };
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
      {!isConsentGiven && (
        <CookiesRequired
          title={t('common:mapBox.cookiesRequired.title')}
          description={t('common:mapBox.cookiesRequired.description')}
          handleConsent={handleConsentPageRedirect}
        />
      )}
      {isConsentGiven && (
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
        <SecondaryLink className={styles.externalLink} href={hslDirectionsLink}>
          {t('common:mapBox.location.directionsHSL')}
        </SecondaryLink>
        <SecondaryLink
          className={styles.externalLink}
          href={googleDirectionsLink}
        >
          {t('common:mapBox.location.directionsGoogle')}
        </SecondaryLink>
        {accessibilitySentences}
      </div>
    </div>
  );
}

export default MapBox;

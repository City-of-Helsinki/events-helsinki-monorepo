import type { Venue } from '@events-helsinki/components';
import {
  useCommonTranslation,
  InfoBlock,
  Text,
} from '@events-helsinki/components';
import { IconAngleDown } from 'hds-react';
import dynamic from 'next/dynamic';
import React from 'react';
import { ROUTES } from '../../../constants';
import {
  getGoogleDirectionsUrl,
  getHSLDirectionsUrl,
  getVenueDirectionPoint,
} from '../utils/getVenueDirections';
import getVenueIdParts from '../utils/getVenueIdParts';
import styles from './venueLocation.module.scss';

const MapBox = dynamic(
  () => import('@events-helsinki/components').then((mod) => mod.MapBox),
  {
    ssr: false,
  }
);

const VenueLocation = ({ venue }: { venue: Venue }) => {
  const { t } = useCommonTranslation();
  const { id, name, streetAddress, addressLocality, accessibilitySentences } =
    venue;

  const directionPoint = getVenueDirectionPoint(venue);

  // TODO: Implement with something else than InfoBlock, so the Infoblock can be removed
  const accessibilitySentencesCollapse = (
    <InfoBlock.Collapse
      className={styles.accessibilitySentences}
      titleClassName={styles.accessibilityTitle}
      title={t('common:mapBox.location.accessibilitySentences')}
      icon={<IconAngleDown aria-hidden="true" className={styles.icon} />}
      items={accessibilitySentences.map((group) => (
        <React.Fragment key={`accessibility-${group?.groupName}`}>
          <Text variant="body-l" className={styles.groupName}>
            {group?.groupName}
          </Text>
          <InfoBlock.List
            key={group?.groupName}
            items={
              group?.sentences?.reduce((items: string[], sentence) => {
                if (sentence) {
                  return [...items, sentence];
                }
                return items;
              }, []) ?? []
            }
          />
        </React.Fragment>
      ))}
    />
  );

  const simplifiedAddress = [streetAddress, addressLocality].join(', ');

  return (
    <MapBox
      title={t('common:mapBox.title')}
      serviceMapUrl={`https://palvelukartta.hel.fi/fi/embed/unit/${
        getVenueIdParts(id).id
      }`}
      openMapUrl={`https://palvelukartta.hel.fi/fi/unit/${
        getVenueIdParts(id).id
      }`}
      placeName={name ?? ''}
      placeAddress={simplifiedAddress}
      accessibilitySentences={accessibilitySentencesCollapse}
      googleDirectionsLink={getGoogleDirectionsUrl(null, directionPoint)}
      hslDirectionsLink={getHSLDirectionsUrl(null, directionPoint)}
      consentUrl={ROUTES.COOKIE_CONSENT}
    />
  );
};

export default VenueLocation;

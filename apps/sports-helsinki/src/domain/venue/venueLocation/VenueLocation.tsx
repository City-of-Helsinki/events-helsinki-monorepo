import type { Venue } from 'events-helsinki-components';
import { MapBox, InfoBlock, Text } from 'events-helsinki-components';
import { IconAngleDown } from 'hds-react';
import React from 'react';
import { getVenueDirectionPoint } from '../utils/getVenueDirections';
import getVenueIdParts from '../utils/getVenueIdParts';
import { GoogleInfoLink, HSLInfoLink } from '../venueInfo/VenueInfo';
import styles from './venueLocation.module.scss';

const VenueLocation = ({ venue }: { venue: Venue }) => {
  const { id, name, streetAddress, addressLocality, accessibilitySentences } =
    venue;

  const directionPoint = getVenueDirectionPoint(venue);

  const hslInfoLink = directionPoint && (
    <HSLInfoLink directionPoint={directionPoint} />
  );
  const googleInfoLink = directionPoint && (
    <GoogleInfoLink directionPoint={directionPoint} />
  );
  const accessibilitySentencesCollapse = (
    <InfoBlock.Collapse
      className={styles.accessibilitySentences}
      titleClassName={styles.accessibilityTitle}
      title={'map_box.accessibility_sentences'}
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

  const links = [hslInfoLink, googleInfoLink].reduce(
    (acc: JSX.Element[], link) => {
      if (link) {
        return [...acc, link];
      }
      return acc;
    },
    []
  );

  // TODO: Migrate the map of VenueLocation and EventLocation to a common component
  return (
    <MapBox
      title={'map_box.title'}
      serviceMapUrl={`https://palvelukartta.hel.fi/fi/embed/unit/${
        getVenueIdParts(id).id
      }`}
      placeName={name ?? ''}
      placeAddress={simplifiedAddress}
      links={links}
      accessibilitySentences={accessibilitySentencesCollapse}
    />
  );
};

export default VenueLocation;

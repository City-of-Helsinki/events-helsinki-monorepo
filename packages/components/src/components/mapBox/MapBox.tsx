import { IconLocation } from 'hds-react';
import React from 'react';
import { Link } from 'react-helsinki-headless-cms';
import InfoBlock from '../infoBlock/InfoBlock';
import Text from '../text/Text';
import styles from './mapBox.module.scss';

type Props = {
  title: string;
  serviceMapUrl: string;
  placeName: string;
  placeAddress: string;
  links?: React.ReactElement<React.ComponentProps<typeof InfoBlock.Link>>[];
  accessibilitySentences?: React.ReactElement<
    React.ComponentProps<typeof InfoBlock.Collapse>
  >;
};

// TODO: Migrate the map of VenueLocation and EventLocation to a common component
function MapBox({
  title,
  serviceMapUrl,
  placeName,
  placeAddress,
  links,
  accessibilitySentences,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <div className={styles.titleText}>
          <IconLocation aria-hidden="true" />
          {title}
        </div>
        <Link
          className={styles.mapLink}
          href={serviceMapUrl}
          openInNewTab={true}
        >
          {'open_map'}
        </Link>
      </div>
      <iframe
        title={title}
        className={styles.mapContainer}
        src={serviceMapUrl}
      ></iframe>
      <div className={styles.meta}>
        <Text as="p" variant="h3">
          {placeName}
        </Text>
        <Text variant="body-l">{placeAddress}</Text>
        {links && (
          <InfoBlock.List className={styles.links} inline items={links} />
        )}
        {accessibilitySentences}
      </div>
    </div>
  );
}

export default MapBox;

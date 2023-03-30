import type { Venue } from '@events-helsinki/components';
import { IconLocation } from 'hds-react';
import React from 'react';

import { TagComponent as Tag } from 'react-helsinki-headless-cms';

import styles from './venueDetails.module.scss';

export type VenueDetailsProps = {
  location: Venue;
};

const VenueDetails: React.FC<VenueDetailsProps> = ({ location }) => {
  const [first, second, ...restKeywords] = location.ontologyWords ?? [];
  return (
    <div>
      {location.streetAddress && (
        <div className={styles.infoRow}>
          <div className={styles.withIcon}>
            <div className={styles.icon}>
              <IconLocation aria-hidden />
            </div>
            <div
              className={styles.text}
            >{`${location.streetAddress}, ${location.addressLocality}`}</div>
          </div>
        </div>
      )}
      <div className={styles.tags}>
        {[first, second]
          .filter((t) => t)
          .map((tag) => (
            <Tag key={tag?.label}>{tag?.label}</Tag>
          ))}
        {!!restKeywords.length && (
          <Tag className={styles.tagCount}>{`+${restKeywords.length}`}</Tag>
        )}
      </div>
    </div>
  );
};

export default VenueDetails;

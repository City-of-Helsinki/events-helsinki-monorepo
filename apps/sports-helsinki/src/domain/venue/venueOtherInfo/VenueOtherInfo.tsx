import { Text, useVenueTranslation } from '@events-helsinki/components';
import type { Venue } from '@events-helsinki/components';
import React from 'react';
import styles from './venueOtherInfo.module.scss';

const VenueOtherInfo = ({ venue: { connections } }: { venue: Venue }) => {
  const venueOtherInfoContainer = React.useRef<HTMLDivElement | null>(null);
  const { t } = useVenueTranslation();
  const otherInfoConnections = connections?.filter(
    (item) => item?.sectionType === 'OTHER_INFO'
  );
  if (otherInfoConnections.length > 0) {
    return (
      <div className={styles.venueOtherInfo} ref={venueOtherInfoContainer}>
        <h2 className={styles.descriptionTitle}>
          {t('venue:otherInfo.title')}
        </h2>
        {otherInfoConnections?.map((connection, i) => (
          <Text
            className={styles.description}
            key={`contact-details-other-info${i}`}
          >
            {connection?.name}
          </Text>
        ))}
      </div>
    );
  } else return null;
};

export default VenueOtherInfo;

import type { Venue } from '@events-helsinki/components';
import {
  useVenueTranslation,
  Text,
  ShareLinks,
} from '@events-helsinki/components';
import classNames from 'classnames';
import React from 'react';
import {
  PageSection,
  ContentContainer,
  Link,
  HtmlToReact,
} from 'react-helsinki-headless-cms';
import VenueHighlights from '../venueHighlights/VenueHighlights';
import VenueInfo from '../venueInfo/VenueInfo';
import VenueLocation from '../venueLocation/VenueLocation';
import VenueOtherInfo from '../venueOtherInfo/VenueOtherInfo';
import styles from './venueContent.module.scss';

interface Props {
  venue: Venue;
  className?: string;
}

const VenueContent: React.FC<Props> = ({ venue, className }) => {
  const { t } = useVenueTranslation();
  const { description } = venue;
  const shortDescription = null;
  return (
    <PageSection className={classNames(styles.eventContent, className)}>
      <ContentContainer>
        <div className={styles.contentWrapper}>
          <div className={styles.leftEmpty} />
          <div>
            <VenueHighlights venue={venue} />
            <h2 className={styles.descriptionTitle}>
              {t('venue:description.title')}
            </h2>
            {shortDescription && (
              <Text variant="body-l" className={styles.description}>
                {shortDescription}
              </Text>
            )}
            {description && (
              <div className={styles.description}>
                <HtmlToReact
                  components={{
                    a: Link,
                  }}
                >
                  {description}
                </HtmlToReact>
              </div>
            )}
            <VenueOtherInfo venue={venue} />
            <ShareLinks title={t('venue:shareLinks.title')} />
            <VenueLocation venue={venue} />
          </div>
          <aside>
            <VenueInfo venue={venue} />
          </aside>
        </div>
      </ContentContainer>
    </PageSection>
  );
};

export default VenueContent;

import classNames from 'classnames';
import type { Venue } from 'events-helsinki-components';
import { useVenueTranslation, Text } from 'events-helsinki-components';
import React from 'react';
import {
  PageSection,
  ContentContainer,
  Link,
  HtmlToReact,
} from 'react-helsinki-headless-cms';
import ShareLinks from '../../../common-events/components/shareLinks/ShareLinks';
import VenueInfo from '../venueInfo/VenueInfo';
import VenueLocation from '../venueLocation/VenueLocation';
import styles from './venueContent.module.scss';

interface Props {
  venue: Venue;
  hasSimilarEvents?: boolean;
}

const VenueContent: React.FC<Props> = ({ venue, hasSimilarEvents }) => {
  const { t } = useVenueTranslation();
  const { description } = venue;
  const shortDescription = null;
  return (
    <PageSection className={styles.eventContent}>
      <ContentContainer>
        <div
          className={classNames(
            styles.contentWrapper,
            !hasSimilarEvents && styles.noSimilarEvents
          )}
        >
          <div className={styles.leftEmpty} />
          <div>
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

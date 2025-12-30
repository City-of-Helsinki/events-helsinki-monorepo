import {
  PageSection,
  ContentContainer,
  Link,
  HtmlToReact,
} from '@city-of-helsinki/react-helsinki-headless-cms';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';

import ShareLinks from '../../../../components/shareLinks/ShareLinks';
import { EVENT_LOCATIONS } from '../../../../constants/event-constants';
import useLocale from '../../../../hooks/useLocale';
import type {
  EventFields,
  SuperEventResponse,
} from '../../../../types/event-types';
import { getEventFields } from '../../../../utils/eventUtils';
import EventInfo from '../eventInfo/EventInfo';
import EventLocation from '../eventLocation/EventLocation';
import styles from './eventContent.module.scss';

interface Props {
  event: EventFields;
  superEvent?: SuperEventResponse;
  hasSimilarEvents?: boolean;
}

const EventContent: React.FC<Props> = ({
  event,
  superEvent,
  hasSimilarEvents,
}) => {
  const { t } = useTranslation(['common', 'event']);
  const locale = useLocale();
  const { description, photographerName, locationExtraInfo } = getEventFields(
    event,
    locale
  );

  const isInternetEvent = event?.location?.id === EVENT_LOCATIONS.INTERNET;

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
          <div className={styles.mainContent}>
            {description && (
              <>
                <h2 className={styles.descriptionTitle}>
                  {t('event:description.title')}
                </h2>
                <div className={styles.description}>
                  <HtmlToReact
                    components={{
                      a: Link,
                    }}
                  >
                    {description}
                  </HtmlToReact>
                </div>
                {locationExtraInfo && (
                  <>
                    <h2 className={styles.descriptionTitle}>
                      {t('event:locationExtraInfo.title')}
                    </h2>
                    <div className={styles.description}>
                      <p>{locationExtraInfo}</p>
                    </div>
                  </>
                )}
                {photographerName && (
                  <p>
                    {t('common:photographerText', {
                      photographer: photographerName,
                    })}
                  </p>
                )}
              </>
            )}
          </div>
          <aside className={styles.sidebar}>
            <EventInfo event={event} superEvent={superEvent} />
          </aside>
          <div className={styles.secondaryContent}>
            <ShareLinks title={t('event:shareLinks.title')} />
            {!isInternetEvent && <EventLocation event={event} />}
          </div>
        </div>
      </ContentContainer>
    </PageSection>
  );
};

export default EventContent;

import classNames from 'classnames';
import {
  sanitizeHtml,
  useLocale,
  EventLocation,
  getEventFields,
  EVENT_LOCATIONS,
} from 'events-helsinki-components';
import type {
  EventFields,
  SuperEventResponse,
} from 'events-helsinki-components';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { PageSection, ContentContainer } from 'react-helsinki-headless-cms';

import ShareLinks from '../../../common-events/components/shareLinks/ShareLinks';
import EventInfo from '../eventInfo/EventInfo';
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
          <div>
            {description && (
              <>
                <h2 className={styles.descriptionTitle}>
                  {t('event:description.title')}
                </h2>
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(description),
                  }}
                />
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
            <ShareLinks title={t('event:shareLinks.title')} />
            {!isInternetEvent && <EventLocation event={event} />}
          </div>
          <div>
            <EventInfo event={event} superEvent={superEvent} />
          </div>
        </div>
      </ContentContainer>
    </PageSection>
  );
};

export default EventContent;

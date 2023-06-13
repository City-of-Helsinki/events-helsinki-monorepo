import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import type { ElementType, ReactElement } from 'react';
import React from 'react';
import {
  PageSection,
  ContentContainer,
  Link,
  HtmlToReact,
} from 'react-helsinki-headless-cms';
import {
  ShareLinks,
  useLocale,
  EventLocation,
  getEventFields,
  EVENT_LOCATIONS,
} from '../../../index';
import type {
  EventFields,
  SuperEventResponse,
  AppConfig,
  AppLanguage,
  GetOrganizationSearchUrl,
  UseSubEventsQueryVariables,
  UseSubEvents,
  UseOtherEventTimes,
  GetEventListLinkUrl,
} from '../../../index';

import EventInfo from '../eventInfo/EventInfo';
import styles from './eventContent.module.scss';

interface Props {
  event: EventFields;
  superEvent?: SuperEventResponse;
  hasSimilarEvents?: boolean;
  appConfig: AppConfig;
  getPlainEventUrl: (event: EventFields, locale: AppLanguage) => string;
  iconDirections: ElementType;
  getOrganizationSearchUrl: GetOrganizationSearchUrl;
  useSubEvents: UseSubEvents;
  useSubEventsQueryVariables: UseSubEventsQueryVariables;
  useOtherEventTimes: UseOtherEventTimes;
  getEventListLinkUrl: GetEventListLinkUrl;
}

const EventContent: React.FC<Props> = ({
  event,
  superEvent,
  hasSimilarEvents,
  appConfig: AppConfig,
  getPlainEventUrl,
  iconDirections,
  getOrganizationSearchUrl,
  useSubEvents: useSubEvent,
  useSubEventsQueryVariables,
  useOtherEventTimes,
  getEventListLinkUrl,
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
            <ShareLinks title={t('event:shareLinks.title')} />
            {!isInternetEvent && <EventLocation event={event} />}
          </div>
          <div>
            <EventInfo
              appConfig={AppConfig}
              event={event}
              superEvent={superEvent}
              getPlainEventUrl={getPlainEventUrl}
              iconDirections={iconDirections}
              getOrganizationSearchUrl={getOrganizationSearchUrl}
              useSubEvent={useSubEvent}
              useSubEventsQueryVariables={useSubEventsQueryVariables}
              useOtherEventTimes={useOtherEventTimes}
              getEventListLinkUrl={getEventListLinkUrl}
            />
          </div>
        </div>
      </ContentContainer>
    </PageSection>
  );
};

export default EventContent;

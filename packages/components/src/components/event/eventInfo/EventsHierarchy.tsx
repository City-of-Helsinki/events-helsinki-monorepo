import {
  IconAngleDown,
  IconAngleUp,
  IconCalendarPlus,
  IconLayers,
} from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

// import type { EventListQueryVariables } from 'react-helsinki-headless-cms/__generated__-445e2838';
// import { useSubEventsQueryVariables } from '../queryUtils';
import type {
  GetEventListLinkUrl,
  UseSubEvents,
  UseSubEventsQueryVariables,
} from 'types';
import { InfoWithIcon, LoadingSpinner, SkeletonLoader } from '../../../index';
import type { EventFields, SuperEventResponse } from '../../../index';
import EventList from './eventList/EventList';
import styles from './eventList/eventList.module.scss';

const EVENTS_LIST_LIMIT = 3;
export const subEventsListTestId = 'sub-events-list';
export const superEventTestId = 'super-event';
export interface Props {
  event: EventFields;
  useSubEvents: UseSubEvents;
  useSubEventsQueryVariables: UseSubEventsQueryVariables;
  getEventListLinkUrl: GetEventListLinkUrl;
}
const SubEvents: React.FC<Props> = ({
  event,
  useSubEvents,
  useSubEventsQueryVariables,
  getEventListLinkUrl,
}) => {
  const { t } = useTranslation('event');
  const [isListOpen, setIsListOpen] = React.useState(false);

  const { superEventId, variables } = useSubEventsQueryVariables(event);

  const {
    subEvents: events,
    isFetchingMore,
    loading,
  } = useSubEvents(event, variables, superEventId);

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  if (loading) {
    return (
      <div
        className={styles.skeletonWrapper}
        data-testid="skeleton-loader-wrapper"
      >
        <SkeletonLoader />
      </div>
    );
  }

  if (events.length === 0) {
    return null;
  }

  const shownEvents = isListOpen ? events : events.slice(0, EVENTS_LIST_LIMIT);

  /**
   * When an event is a middle level event,
   * it is wanted that it's subevents acts as sibling events.
   * Middle level events are all the events that have super event and subEvents.
   */
  const isMiddleLevelEvent = Boolean(
    event.superEvent && event.subEvents.length
  );

  const isLowestLevelEvent = Boolean(
    event.superEvent && !event.subEvents.length
  );

  /**
   * When the event is a middle level event, then the so called sibbling events
   * (the events that have the same super event)
   * are not wanted to be seen.
   * NOTE: This means that there should never be more than 3 levels in event hierarchy.
   */
  const [title, titleIcon] = isMiddleLevelEvent
    ? [
        t('otherTimes.title'),
        <IconCalendarPlus key={'icon-calendar´' + Math.random()} aria-hidden />,
      ]
    : [
        t('subEvents.title'),
        <IconLayers key={'icon-layers' + Math.random()} aria-hidden />,
      ];

  return (
    <div className={styles.eventList}>
      <InfoWithIcon icon={titleIcon} title={title}>
        {isLowestLevelEvent || isMiddleLevelEvent ? (
          <EventList
            id={subEventsListTestId}
            events={shownEvents}
            showDate
            getEventListLinkUrl={getEventListLinkUrl}
          />
        ) : (
          <EventList
            id={subEventsListTestId}
            events={shownEvents}
            showName
            showDate
            getEventListLinkUrl={getEventListLinkUrl}
          />
        )}
        {events.length > EVENTS_LIST_LIMIT && (
          <button onClick={toggleList} aria-expanded={isListOpen}>
            {isListOpen
              ? t('relatedEvents.buttonHide')
              : t('relatedEvents.buttonShow')}
            {isListOpen ? (
              <IconAngleUp aria-hidden />
            ) : (
              <IconAngleDown aria-hidden />
            )}
          </button>
        )}
      </InfoWithIcon>
      <LoadingSpinner
        hasPadding={false}
        isLoading={loading || isFetchingMore}
      />
    </div>
  );
};

const SuperEvent: React.FC<{
  superEvent: SuperEventResponse | undefined;
  getEventListLinkUrl: GetEventListLinkUrl;
}> = ({ superEvent, getEventListLinkUrl }) => {
  const { t } = useTranslation('event');

  if (!superEvent?.data) return null;

  if (superEvent?.status === 'pending') return <SkeletonLoader />;

  return (
    <div className={styles.eventList}>
      <InfoWithIcon
        icon={<IconLayers aria-hidden />}
        title={t('superEvent.title')}
      >
        <EventList
          id={superEventTestId}
          showName
          events={[superEvent.data]}
          getEventListLinkUrl={getEventListLinkUrl}
        />
      </InfoWithIcon>
    </div>
  );
};

export { SubEvents, SuperEvent };
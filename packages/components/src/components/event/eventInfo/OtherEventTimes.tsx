import { IconAngleDown, IconAngleUp, IconCalendarPlus } from 'hds-react';
import React from 'react';
import type {
  EventFields,
  GetEventListLinkUrl,
  UseOtherEventTimes,
} from '../../../index';
import {
  InfoWithIcon,
  LoadingSpinner,
  SkeletonLoader,
  useEventTranslation,
} from '../../../index';
import EventList from './eventList/EventList';
import styles from './eventList/eventList.module.scss';

const EVENTS_LIST_LIMIT = 3;

export const otherEventTimesListTestId = 'other-event-times-list';
interface OtherEventTimesProps {
  event: EventFields;
  useOtherEventTimes: UseOtherEventTimes;
  getEventListLinkUrl: GetEventListLinkUrl;
}
const OtherEventTimes: React.FC<OtherEventTimesProps> = ({
  event,
  useOtherEventTimes,
  getEventListLinkUrl,
}) => {
  const { t } = useEventTranslation();
  const [isListOpen, setIsListOpen] = React.useState(false);

  const { superEventId, loading, events, isFetchingMore } =
    useOtherEventTimes(event);
  if (!superEventId) return null;
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

  return (
    <div className={styles.eventList}>
      <InfoWithIcon
        icon={<IconCalendarPlus aria-hidden />}
        title={t('event:otherTimes.title')}
      >
        <EventList
          id={otherEventTimesListTestId}
          events={shownEvents}
          showDate
          getEventListLinkUrl={getEventListLinkUrl}
        />
        {events.length > EVENTS_LIST_LIMIT && (
          <button
            onClick={toggleList}
            aria-expanded={isListOpen}
            aria-label={
              isListOpen
                ? t('event:otherTimes.buttonHide.ariaLabel')
                : t('event:otherTimes.buttonShow.ariaLabel')
            }
          >
            {isListOpen
              ? t('event:otherTimes.buttonHide.label')
              : t('event:otherTimes.buttonShow.label')}
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

export default OtherEventTimes;

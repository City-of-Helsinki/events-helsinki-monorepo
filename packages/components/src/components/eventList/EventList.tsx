import classNames from 'classnames';
import type { ButtonTheme } from 'hds-react';
import { Button, ButtonVariant, ButtonPresetTheme } from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

import EventCard from '../../components/eventCard/EventCard';
import LargeEventCard from '../../components/eventCard/LargeEventCard';

import LoadingSpinner from '../../components/spinner/LoadingSpinner';
import { useLocale } from '../../hooks';
import type { EventFields, GetEventUrlType } from '../../types';
import styles from './eventList.module.scss';

const eventCardsMap = {
  default: EventCard,
  large: LargeEventCard,
};

type EventListProps = {
  buttonCentered?: boolean;
  cardSize?: keyof typeof eventCardsMap;
  events: EventFields[];
  count: number;
  loading: boolean;
  hasNext: boolean;
  showEnrolmentStatusInCardDetails: boolean;
  onLoadMore: () => void;
  getEventUrl: GetEventUrlType;
  loadMoreButtonVariant?: Exclude<ButtonVariant, 'supplementary'>;
  loadMoreButtonTheme?: ButtonTheme | ButtonPresetTheme;
};

const EventList: React.FC<EventListProps> = ({
  buttonCentered = false,
  cardSize = 'default',
  events,
  loading,
  count,
  hasNext,
  onLoadMore,
  getEventUrl,
  showEnrolmentStatusInCardDetails = false,
  loadMoreButtonVariant = ButtonVariant.Secondary,
  loadMoreButtonTheme,
}) => {
  const { t } = useTranslation('search');
  const router = useRouter();
  const locale = useLocale();
  const eventsLeft = count - events.length;
  const EventCardComponent = eventCardsMap[cardSize];
  const eventCards = events.map((event) => {
    const eventUrl = getEventUrl(event, router, locale);
    return (
      <EventCardComponent
        key={event.id}
        event={event}
        eventUrl={eventUrl}
        showEnrolmentStatusInCardDetails={showEnrolmentStatusInCardDetails}
      />
    );
  });

  return (
    <div className={classNames(styles.eventListWrapper, styles[cardSize])}>
      <div className={styles.eventsWrapper}>{eventCards}</div>
      <div
        className={classNames(styles.loadMoreWrapper, {
          [styles.buttonCentered]: buttonCentered,
        })}
      >
        <LoadingSpinner hasPadding={!events.length} isLoading={loading}>
          {hasNext && (
            <Button
              onClick={onLoadMore}
              variant={loadMoreButtonVariant}
              theme={
                loadMoreButtonTheme ||
                (loadMoreButtonVariant === ButtonVariant.Secondary
                  ? ButtonPresetTheme.Black
                  : undefined)
              }
            >
              {t('buttonLoadMore', { count: eventsLeft })}
            </Button>
          )}
        </LoadingSpinner>
      </div>
    </div>
  );
};

export default EventList;

import {
  LoadingSpinner,
  BasicEventCard,
  LargeEventCard,
  useLocale,
} from '@events-helsinki/components';
import type { EventFields } from '@events-helsinki/components';
import classNames from 'classnames';
import { Button } from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

import AppConfig from '../../../domain/app/AppConfig';
import {
  getEventUrl,
  getKeywordOnClickHandler,
} from '../../../domain/search/eventSearch/utils';

import styles from './eventList.module.scss';

const eventCardsMap = {
  default: BasicEventCard,
  large: LargeEventCard, // TODO: ADD LargeEventCard,
};

interface Props {
  buttonCentered?: boolean;
  cardSize?: 'default' | 'large';
  events: EventFields[];
  count: number;
  loading: boolean;
  hasNext: boolean;
  onLoadMore: () => void;
}

const EventList: React.FC<Props> = ({
  buttonCentered = false,
  cardSize = 'default',
  events,
  loading,
  count,
  hasNext,
  onLoadMore,
}) => {
  const { t } = useTranslation('search');
  const eventsLeft = count - events.length;
  const EventCard = eventCardsMap[cardSize];
  const router = useRouter();
  const locale = useLocale();

  return (
    <div className={classNames(styles.eventListWrapper, styles[cardSize])}>
      <div className={styles.eventsWrapper}>
        {(events as EventFields[]).map((event) => (
          <EventCard
            key={event.id}
            event={event}
            getEventUrlFunction={getEventUrl}
            showEnrolmentStatusInCardDetails={
              AppConfig.showEnrolmentStatusInCardDetails
            }
            clickAction={getKeywordOnClickHandler(router, locale, 'text', '')}
          />
        ))}
      </div>
      <div
        className={classNames(styles.loadMoreWrapper, {
          [styles.buttonCentered]: buttonCentered,
        })}
      >
        <LoadingSpinner hasPadding={!events.length} isLoading={loading}>
          {hasNext && (
            <Button onClick={onLoadMore} variant="secondary" theme="black">
              {t('buttonLoadMore', { count: eventsLeft })}
            </Button>
          )}
        </LoadingSpinner>
      </div>
    </div>
  );
};

export default EventList;

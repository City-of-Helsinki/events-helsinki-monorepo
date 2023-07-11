import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { BackgroundImage, LinkBox } from 'react-helsinki-headless-cms';

import ArrowRightWithLoadingIndicator from '../../components/arrowRightWithLoadingIndicator/ArrowRightWithLoadingIndicator';
import EventLocationText from '../../components/domain/event/eventLocation/EventLocationText';
import IconButton from '../../components/iconButton/IconButton';
import useClickCapture from '../../hooks/useClickCapture';
import useCommonTranslation from '../../hooks/useCommonTranslation';
import useLocale from '../../hooks/useLocale';
import {
  getDateRangeStr,
  getEventCardId,
  getEventFields,
  getEventPrice,
  isEventClosed,
} from '../../utils';
import EventKeywords from '../eventKeywords/EventKeywords';
import EventName from '../eventName/EventName';
import styles from './eventCard.module.scss';
import type { EventCardProps } from './types';

const EventCard: React.FC<EventCardProps> = ({
  event,
  eventUrl,
  getKeywordOnClickHandler,
}) => {
  const { t } = useTranslation('event');
  const { t: commonTranslation } = useCommonTranslation();
  const router = useRouter();
  const locale = useLocale();
  const button = React.useRef<HTMLDivElement>(null);

  const { endTime, id, imageUrl, name, startTime } = getEventFields(
    event,
    locale
  );

  const eventClosed = isEventClosed(event);
  const eventPriceText = getEventPrice(event, locale, t('eventCard.isFree'));

  const goToEventPage = () => {
    router.push(eventUrl);
  };

  const { clickCaptureRef, clicked } = useClickCapture(1000);

  return (
    <div ref={clickCaptureRef}>
      <LinkBox
        aria-label={t('eventCard.ariaLabelLink', {
          name,
        })}
        id={getEventCardId(id)}
        data-testid={event.id}
        href={eventUrl}
      >
        <div
          className={classNames(styles.eventCard, {
            [styles.eventClosed]: eventClosed,
          })}
        >
          {/* INFO WRAPPER. Re-order info wrapper and text wrapper on css */}
          <div className={styles.infoWrapper}>
            <div className={styles.textWrapper}>
              <div className={styles.eventName}>
                <EventName event={event} />
              </div>
              <div className={styles.eventDateAndTime}>
                {!!startTime &&
                  getDateRangeStr({
                    start: startTime,
                    end: endTime,
                    locale,
                    includeWeekday: false,
                    includeTime: true,
                    timeAbbreviation: commonTranslation('timeAbbreviation'),
                  })}
              </div>
              <div className={styles.eventLocation}>
                <EventLocationText
                  event={event}
                  showDistrict={false}
                  showLocationName={true}
                />
              </div>
              <div className={styles.eventPrice}>{eventPriceText}</div>

              <div className={styles.keywordWrapperMobile}>
                <EventKeywords
                  event={event}
                  showIsFree={true}
                  showKeywords={false}
                  getKeywordOnClickHandler={getKeywordOnClickHandler}
                />
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <div ref={button}>
                <IconButton
                  ariaLabel={t('eventCard.ariaLabelLink', {
                    name,
                  })}
                  icon={
                    <ArrowRightWithLoadingIndicator
                      loading={clicked}
                      aria-hidden
                    />
                  }
                  onClick={goToEventPage}
                  size="default"
                />
              </div>
            </div>
          </div>
          <BackgroundImage
            className={styles.imageWrapper}
            id={id}
            url={imageUrl}
          >
            <div className={styles.keywordWrapperDesktop}>
              <EventKeywords
                event={event}
                showIsFree={true}
                showKeywords={false}
                getKeywordOnClickHandler={getKeywordOnClickHandler}
              />
            </div>
          </BackgroundImage>
        </div>
      </LinkBox>
    </div>
  );
};

export default EventCard;

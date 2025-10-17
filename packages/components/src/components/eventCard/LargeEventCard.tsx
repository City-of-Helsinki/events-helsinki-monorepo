import classNames from 'classnames';
import {
  IconBell,
  IconCake,
  IconCalendarClock,
  IconLocation,
  IconTicket,
} from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { BackgroundImage, LinkBox } from 'react-helsinki-headless-cms';

// eslint-disable-next-line @stylistic/max-len
import ArrowRightWithLoadingIndicator from '../../components/arrowRightWithLoadingIndicator/ArrowRightWithLoadingIndicator';
import EventEnrolmentStatus from '../../components/domain/event/eventEnrolmentStatus/EventEnrolmentStatus';
import useEventEnrolmentStatus from '../../components/domain/event/eventEnrolmentStatus/useEventEnrolmentStatus';
import EventLocationText from '../../components/domain/event/eventLocation/EventLocationText';
import { EnrolmentStatusLabel } from '../../constants/event-constants';
import useClickCapture from '../../hooks/useClickCapture';
import useLocale from '../../hooks/useLocale';
import {
  getAudienceAgeText,
  getDateRangeStr,
  getEventFields,
  getEventPrice,
  getLargeEventCardId,
} from '../../utils';
import EventKeywords from '../eventKeywords/EventKeywords';
import EventName from '../eventName/EventName';
import styles from './largeEventCard.module.scss';
import type { LargeEventCardProps } from './types';

const LargeEventCard: React.FC<LargeEventCardProps> = ({
  event,
  eventUrl,
  showEnrolmentStatusInCardDetails = false,
}) => {
  const { t } = useTranslation('event');
  const { t: commonTranslation } = useTranslation('common');
  const locale = useLocale();

  const {
    id,
    endTime,
    imageUrl,
    name,
    startTime,
    audienceMinAge,
    audienceMaxAge,
  } = getEventFields(event, locale);

  const audienceAge = getAudienceAgeText(t, audienceMinAge, audienceMaxAge);

  const { status: eventEnrolmentStatus } = useEventEnrolmentStatus(event);

  const { clickCaptureRef, clicked } = useClickCapture(1000);

  const eventPrice = getEventPrice(event, locale, t('eventCard.isFree'));

  return (
    <div ref={clickCaptureRef}>
      <LinkBox
        type="linkBox"
        aria-label={t('eventCard.ariaLabelLink', {
          name,
        })}
        id={getLargeEventCardId(id)}
        data-testid={event.id}
        href={eventUrl}
      >
        <div className={styles.eventCard}>
          {/* INFO WRAPPER. Re-order info wrapper and text wrapper on css */}
          <div className={styles.infoWrapper}>
            <div className={styles.eventName}>
              <EventName event={event} />
            </div>

            <div className={styles.eventLocation}>
              <IconLocation aria-hidden />
              <EventLocationText
                event={event}
                showNeighborhood={false}
                showLocationName={true}
              />
            </div>
            <div className={styles.eventDateAndTime}>
              {!!startTime && (
                <>
                  <IconCalendarClock aria-hidden />
                  {getDateRangeStr({
                    start: startTime,
                    end: endTime,
                    locale,
                    includeTime: true,
                    timeAbbreviation: commonTranslation('timeAbbreviation'),
                  })}
                </>
              )}
            </div>
            {audienceAge && (
              <div className={styles.eventAudienceAge}>
                <IconCake aria-hidden />
                {audienceAge}
              </div>
            )}
            {eventPrice && (
              <div className={styles.eventPrice}>
                <IconTicket aria-hidden />
                {eventPrice}
              </div>
            )}
            {showEnrolmentStatusInCardDetails &&
              eventEnrolmentStatus !==
                EnrolmentStatusLabel.noEnrolmentTimes && (
                <div className={styles.eventPrice}>
                  <IconBell aria-hidden />

                  <EventEnrolmentStatus
                    event={event}
                    className={classNames(styles.linkArrowLabel, {
                      [styles.alert]:
                        eventEnrolmentStatus === EnrolmentStatusLabel.full,
                    })}
                  />
                </div>
              )}
            <div className={styles.keywordWrapperDesktop}>
              <EventKeywords
                event={event}
                hideKeywordsOnMobile={true}
                showIsFree={true}
                withActions={false}
              />
            </div>
            <div className={styles.buttonWrapper}>
              <div>
                <ArrowRightWithLoadingIndicator
                  className={styles.arrowRight}
                  size="l"
                  aria-hidden="true"
                  loading={clicked}
                />
              </div>
            </div>
          </div>
          <BackgroundImage
            className={styles.imageWrapper}
            id={id}
            url={imageUrl}
          >
            <div className={styles.keywordWrapper}>
              <EventKeywords
                event={event}
                hideKeywordsOnMobile={true}
                showIsFree={true}
              />
            </div>
          </BackgroundImage>
        </div>
      </LinkBox>
    </div>
  );
};

export default LargeEventCard;

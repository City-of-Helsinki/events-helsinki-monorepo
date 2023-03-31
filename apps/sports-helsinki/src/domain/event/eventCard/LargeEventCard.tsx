import type { EventFields } from '@events-helsinki/components';
import {
  useClickCapture,
  EnrolmentStatusLabel,
  EventEnrolmentStatus,
  useEventEnrolmentStatus,
  getDateRangeStr,
  useLocale,
  EventLocationText as LocationText,
  getAudienceAgeText,
  getEventFields,
  getEventPrice,
  getLargeEventCardId,
  isEventClosed,
  ArrowRightWithLoadingIndicator,
} from '@events-helsinki/components';
import classNames from 'classnames';
import { IconCake, IconCalendarClock, IconLocation } from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { BackgroundImage, LinkBox } from 'react-helsinki-headless-cms';
import { ROUTES } from '../../../constants';
import AppConfig from '../../app/AppConfig';
import routerHelper from '../../app/routerHelper';
import { PARAM_SEARCH_TYPE } from '../../search/combinedSearch/constants';
import EventKeywords from '../eventKeywords/EventKeywords';
import EventName from '../eventName/EventName';
import styles from './largeEventCard.module.scss';

interface Props {
  event: EventFields;
}

const LargeEventCard: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation('event');
  const { t: commonTranslation } = useTranslation('common');
  const router = useRouter();
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

  const eventClosed = isEventClosed(event);

  const eventUrl = routerHelper.getLocalizedCmsItemUrl(
    ROUTES.COURSES,
    {
      eventId: event.id,
      returnPath: routerHelper.getLocalizedCmsItemUrl(
        ROUTES.SEARCH,
        {
          ...router.query,
          eventId: event.id,
          [PARAM_SEARCH_TYPE]: event.typeId ?? '',
        },
        locale
      ),
    },
    locale
  );

  const { status: eventEnrolmentStatus } = useEventEnrolmentStatus(event);

  const { clickCaptureRef, clicked } = useClickCapture(1000);

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
        <div
          className={classNames(styles.eventCard, {
            [styles.eventClosed]: eventClosed,
          })}
        >
          {/* INFO WRAPPER. Re-order info wrapper and text wrapper on css */}
          <div className={styles.infoWrapper}>
            <div className={styles.eventName}>
              <EventName event={event} />
            </div>

            <div className={styles.eventLocation}>
              <IconLocation aria-hidden />
              <LocationText
                event={event}
                showDistrict={false}
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
            <div className={styles.eventPrice}>
              {getEventPrice(event, locale, t('eventCard.isFree'))}
            </div>
            <div className={styles.keywordWrapperDesktop}>
              <EventKeywords
                event={event}
                hideKeywordsOnMobile={true}
                showIsFree={true}
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
                {AppConfig.showEnrolmentStatusInCardDetails && (
                  <EventEnrolmentStatus
                    event={event}
                    className={classNames(styles.linkArrowLabel, {
                      [styles.alert]:
                        eventEnrolmentStatus === EnrolmentStatusLabel.full,
                    })}
                  />
                )}
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

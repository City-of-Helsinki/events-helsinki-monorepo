import classNames from 'classnames';
import type { NextRouter } from 'next/router';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { BackgroundImage, LinkBox } from 'react-helsinki-headless-cms';
import type { AppLanguage } from 'types';
import type { EventFields } from '../../../index';
import {
  useCommonTranslation,
  getDateRangeStr,
  useLocale,
  IconButton,
  EventLocationText as LocationText,
  getEventCardId,
  getEventFields,
  getEventPrice,
  isEventClosed,
  ArrowRightWithLoadingIndicator,
  useClickCapture,
} from '../../../index';
import type { keyWordOnClickArgs } from '../eventKeywords/EventKeywords';
import EventKeywords from '../eventKeywords/EventKeywords';
import EventName from '../eventName/EventName';
import styles from './eventCard.module.scss';

interface Props {
  event: EventFields;
  getEventUrlFunction?: (
    event: EventFields,
    router: NextRouter,
    locale: AppLanguage
  ) => string;
  clickAction?: (args: keyWordOnClickArgs) => void;
}

const EventCard: React.FC<Props> = ({
  event,
  getEventUrlFunction,
  clickAction,
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

  const eventUrl = getEventUrlFunction
    ? getEventUrlFunction(event, router, locale)
    : undefined;
  const eventClosed = isEventClosed(event);
  const eventPriceText = getEventPrice(event, locale, t('eventCard.isFree'));

  const goToEventPage = () => {
    if (eventUrl) {
      router.push(eventUrl);
    }
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
                <LocationText
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
                  clickAction={clickAction}
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
                clickAction={clickAction}
              />
            </div>
          </BackgroundImage>
        </div>
      </LinkBox>
    </div>
  );
};

export default EventCard;

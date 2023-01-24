import classNames from 'classnames';
import {
  addParamsToQueryString,
  getDateRangeStr,
  buttonStyles,
  useLocale,
  EventLocationText as LocationText,
  getAudienceAgeText,
  getEventFields,
  getEventPrice,
  getLargeEventCardId,
  isEventClosed,
  isEventFree,
} from 'events-helsinki-components';
import type { EventFields } from 'events-helsinki-components';
import {
  Button,
  IconArrowRight,
  IconCake,
  IconCalendarClock,
  IconLinkExternal,
  IconLocation,
} from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { BackgroundImage, LinkBox } from 'react-helsinki-headless-cms';
import { ROUTES } from '../../../constants';
import { getLocalizedCmsItemUrl } from '../../../utils/routerUtils';
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
  const button = React.useRef<HTMLDivElement>(null);

  const {
    id,
    endTime,
    imageUrl,
    name,
    offerInfoUrl,
    startTime,
    audienceMinAge,
    audienceMaxAge,
  } = getEventFields(event, locale);

  const audienceAge = getAudienceAgeText(t, audienceMinAge, audienceMaxAge);

  const eventClosed = isEventClosed(event);
  const queryString = addParamsToQueryString(
    router.asPath.split('?')[1] ?? '',
    {
      returnPath: `${getLocalizedCmsItemUrl(
        ROUTES.SEARCH,
        {},
        locale
      )}?eventId=${event.id}`,
    }
  );

  const eventUrl = `${getLocalizedCmsItemUrl(
    ROUTES.EVENTS,
    { eventId: event.id },
    locale
  )}${queryString}`;

  const showBuyButton = !eventClosed && !!offerInfoUrl && !isEventFree(event);

  const goToBuyTicketsPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    // avoids also navigating to details page
    e.preventDefault();
    window.open(offerInfoUrl);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const goToEventPage = (ev: React.MouseEvent<HTMLButtonElement>) => {
    router.push(eventUrl);
  };

  return (
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
          <div
            className={classNames(
              styles.buttonWrapper,
              showBuyButton ? styles.rightAlign : ''
            )}
          >
            {showBuyButton ? (
              <>
                <div>
                  <Button
                    aria-label={t('eventCard.ariaLabelBuyTickets')}
                    iconRight={<IconLinkExternal aria-hidden />}
                    fullWidth
                    onClick={goToBuyTicketsPage}
                    size="small"
                    variant="success"
                  >
                    {t('eventCard.buttonBuyTickets')}
                  </Button>
                </div>
                <div ref={button}>
                  <Button
                    aria-label={t('eventCard.ariaLabelReadMore', {
                      name,
                    })}
                    className={buttonStyles.buttonGray}
                    fullWidth
                    onClick={goToEventPage}
                    size="small"
                    type="button"
                  >
                    {t('eventCard.buttonReadMore')}
                  </Button>
                </div>
              </>
            ) : (
              <IconArrowRight
                className={styles.arrowRight}
                size="l"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
        <BackgroundImage className={styles.imageWrapper} id={id} url={imageUrl}>
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
  );
};

export default LargeEventCard;

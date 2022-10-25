import classNames from 'classnames';
import {
  Visible,
  useLocale,
  getDateRangeStr,
  buttonStyles,
  IconButton,
  InfoWithIcon,
  SkeletonLoader,
} from 'events-helsinki-components';
import {
  Button,
  IconArrowLeft,
  IconCalendarClock,
  IconLinkExternal,
  IconLocation,
  IconTicket,
} from 'hds-react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import {
  BackgroundImage,
  ContentContainer,
  PageSection,
} from 'react-helsinki-headless-cms';

import EventKeywords from '../eventKeywords/EventKeywords';
import LocationText from '../eventLocation/EventLocationText';
import EventName from '../eventName/EventName';
import type { ReturnParams } from '../eventQueryString.util';
import { extractLatestReturnPath } from '../eventQueryString.util';
import { getEventFields, getEventPrice } from '../EventUtils';
import type { EventFields, SuperEventResponse } from '../types';
import styles from './eventHero.module.scss';

export interface Props {
  event: EventFields;
  superEvent?: SuperEventResponse;
}

const EventHero: React.FC<Props> = ({ event, superEvent }) => {
  const { t } = useTranslation('event');
  const { t: commonTranslation } = useTranslation('common');
  const locale = useLocale();
  const router = useRouter();
  const search = router.asPath.split('?')[1];

  const {
    endTime: eventEndTime,
    imageUrl,
    keywords,
    offerInfoUrl,
    shortDescription,
    startTime: eventStartTime,
    today,
    thisWeek,
    showBuyButton,
    registrationUrl,
  } = getEventFields(event, locale);
  const eventPriceText = getEventPrice(event, locale, t('hero.offers.isFree'));
  const showKeywords = Boolean(today || thisWeek || keywords.length);
  const returnParam = extractLatestReturnPath(search, locale);

  const goBack = ({ returnPath, remainingQueryString }: ReturnParams) => {
    router.push(
      `${returnPath}${remainingQueryString ? `?${remainingQueryString}` : ''}`
    );
  };

  const goToBuyTicketsPage = () => {
    window.open(offerInfoUrl);
  };

  const startTime =
    superEvent?.status === 'pending'
      ? ''
      : superEvent?.data?.startTime || eventStartTime;
  const endTime =
    superEvent?.status === 'pending'
      ? ''
      : superEvent?.data?.endTime || eventEndTime;

  return (
    <PageSection className={classNames(styles.heroSection)}>
      <ContentContainer className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.backButtonWrapper}>
            <IconButton
              role="link"
              ariaLabel={t('hero.ariaLabelBackButton')}
              backgroundColor="white"
              icon={<IconArrowLeft aria-hidden />}
              onClick={() => goBack(returnParam)}
              size="default"
            />
          </div>
          {imageUrl && (
            <div>
              <BackgroundImage
                className={styles.image}
                id={`event-background-${event.id}`}
                url={imageUrl}
              />
            </div>
          )}
          <div className={styles.leftPanel}>
            <div className={styles.leftPanelWrapper}>
              <div className={styles.leftPanelEmpty} />
              <div className={styles.textWrapper}>
                <h1 className={styles.title}>
                  <EventName event={event} />
                </h1>
                {shortDescription && (
                  <div className={styles.description}>{shortDescription}</div>
                )}
                <div className={styles.additionalInfo}>
                  <Visible above="s" className={styles.location}>
                    <InfoWithIcon
                      icon={<IconLocation aria-hidden />}
                      title={''}
                    >
                      <LocationText
                        event={event}
                        showDistrict={false}
                        showLocationName={true}
                      />
                    </InfoWithIcon>
                  </Visible>
                  <Visible above="s" className={styles.start}>
                    {(startTime !== eventStartTime ||
                      endTime !== eventEndTime) && (
                      <InfoWithIcon
                        icon={<IconCalendarClock aria-hidden />}
                        title={''}
                      >
                        {superEvent?.status === 'pending' ? (
                          <SkeletonLoader />
                        ) : (
                          getDateRangeStr({
                            start: eventStartTime || '',
                            end: eventEndTime,
                            locale,
                            includeTime: true,
                            timeAbbreviation:
                              commonTranslation('timeAbbreviation'),
                          })
                        )}
                      </InfoWithIcon>
                    )}
                  </Visible>
                  {eventPriceText && (
                    <Visible above="s" className={styles.price}>
                      <InfoWithIcon
                        icon={<IconTicket aria-hidden />}
                        title={''}
                      >
                        {eventPriceText}
                      </InfoWithIcon>
                    </Visible>
                  )}
                  {showBuyButton && (
                    <Visible above="s" className={styles.buyButtonWrapper}>
                      <Button
                        aria-label={t('hero.ariaLabelBuyTickets')}
                        onClick={goToBuyTicketsPage}
                        iconRight={<IconLinkExternal aria-hidden />}
                        variant="success"
                      >
                        {t('hero.buttonBuyTickets') as string}
                      </Button>
                    </Visible>
                  )}
                  {registrationUrl && (
                    <Visible className={styles.registrationButtonWrapper}>
                      <Button
                        className={buttonStyles.buttonCoatBlue}
                        aria-label={t('hero.ariaLabelEnrol')}
                        onClick={() => window.open(registrationUrl)}
                      >
                        {t('hero.buttonEnrol') as string}
                      </Button>
                    </Visible>
                  )}
                </div>
                {showKeywords && (
                  <div className={styles.categoryWrapper}>
                    <EventKeywords event={event} showIsFree={true} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </PageSection>
  );
};

export default EventHero;

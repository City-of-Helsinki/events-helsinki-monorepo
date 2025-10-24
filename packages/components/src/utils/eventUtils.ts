import { isPast, isThisWeek, isToday } from 'date-fns';
import capitalize from 'lodash/capitalize';
import type { TFunction } from 'next-i18next';

import {
  CITY_OF_HELSINKI_LINKED_EVENTS_ORGANIZATION_PREFIXES,
  EnrolmentStatusLabel,
  EVENT_KEYWORD_BLACK_LIST,
  EVENT_LOCATIONS,
  EVENT_SOME_IMAGE,
  EVENT_STATUS,
} from '../constants';
import type {
  EventFields,
  KeywordOption,
  AppLanguage,
  LocalizedObject,
  PlaceFieldsFragment,
} from '../types';
import { EventTypeId } from '../types';
import { getEnrolmentStatus } from './getEventEnrolmentStatus';
import getLocalizedString from './getLocalizedString';
import getSecureImage from './getSecureImage';

export const getEventCardId = (id: string): string => `event-card_${id}`;

export const getLargeEventCardId = (id: string): string =>
  `large-event-card_${id}`;

/**
 * Check is event closed
 * @param event
 * @return {boolean}
 */
export const isEventClosed = (event: EventFields): boolean => {
  return !!event.endTime && isPast(new Date(event.endTime));
};

/**
 * Check is event cancelled
 * @param event
 * @return {boolean}
 */
export const isEventCancelled = (event: EventFields): boolean => {
  return event.eventStatus === EVENT_STATUS.EVENT_CANCELLED;
};

/**
 * Check is event owned by City of Helsinki
 * @param event
 * @return {boolean}
 */
export const isEventHelsinkiCityOwned = (event: EventFields): boolean => {
  const publisherPrefix = event?.publisher?.split(':')[0] ?? '';
  return CITY_OF_HELSINKI_LINKED_EVENTS_ORGANIZATION_PREFIXES.includes(
    publisherPrefix
  );
};

/**
 * Check is event free
 * @param eventData
 * @return {boolean}
 */
export const isEventFree = (event: EventFields): boolean => {
  const offer = event.offers?.find((item) => item.isFree);
  return !!offer?.isFree;
};

/**
 * Get event id from url
 */
export const getEventIdFromUrl = (
  url: string,
  type: 'event' = 'event'
): string | undefined => {
  return new RegExp(`/(?:${type}s?)/([^/?]*)`, 'i').exec(url)?.[1];
};

export const getEventIdsFromUrls = (urls: string[]): { eventIds: string[] } => {
  return {
    eventIds: urls
      .map((url) => getEventIdFromUrl(url) as string)
      .filter(Boolean),
  };
};

/*
 * Format string to price format (add €) if it is a number and is missing currency
 * For example:
 * 'random text' -> 'random text'
 * '2' -> '2 €'
 * '2.5' -> '2.5 €'
 * '30/50' -> '30/50 €'
 * '30-50' -> '30-50 €'
 */
export const formatPrice = (price?: string): string => {
  if (!price) {
    return '';
  }

  const priceRegex = /^\d+(?:[/\-.,]\d+)?$/;
  return priceRegex.exec(price) ? `${price} €` : price;
};

/**
 * Get event price as a string
 * @param {object} event
 * @param {string} locale
 * @param {string} isFreeText - text to return if case that event is free
 * @return {string}
 */
export const getEventPrice = (
  event: EventFields,
  locale: AppLanguage,
  isFreeText: string
): string => {
  return isEventFree(event)
    ? isFreeText
    : (event?.offers
        ?.map((offer) =>
          // Format text to price if it happens to be number e.g. '2' -> '2 €'
          formatPrice(
            getLocalizedString(offer.price || offer.description, locale)
          )
        )
        ?.filter((e) => e)
        ?.sort((a, b) => a.localeCompare(b))
        ?.join(', ') ?? '');
};

export const getEventHeroButtonText = (
  event: EventFields,
  prefix: string,
  t: TFunction,
  superEvent?: EventFields
): string => {
  const status = getEnrolmentStatus(event, superEvent);

  if (status === EnrolmentStatusLabel.queueable) {
    return t(`hero.${prefix}QueueEnrol`);
  }
  return t(
    `hero.${prefix}${
      event.typeId === EventTypeId.General && !isEventFree(event)
        ? 'BuyTickets'
        : 'Enrol'
    }`
  );
};

export const getKeywordList = (
  locale: AppLanguage,
  list: {
    id?: string | null;
    name?: LocalizedObject | null;
  }[] = []
): KeywordOption[] => {
  return list
    .map((listItem) => ({
      id: listItem.id || '',
      name: capitalize(listItem.name?.[locale] || '').trim(),
    }))
    .filter(
      (listItem, index, arr) =>
        !!listItem.id &&
        !!listItem.name &&
        !EVENT_KEYWORD_BLACK_LIST.includes(listItem.id) &&
        arr.findIndex((item) => item.name === listItem.name) === index
    )
    .sort((a, b) => (a.name > b.name ? 1 : -1));
};

/**
 * Get event image url
 * @param {object} event
 * @return {string}
 */
export const getEventImageUrl = (event: EventFields): string => {
  const image = event.images?.[0];

  return getSecureImage(image?.url);
};

/**
 * Get event image url for social media
 * @param {object} event
 * @return {string}
 */
export const getEventSomeImageUrl = (event: EventFields): string => {
  const image = event.images?.[0];
  return getSecureImage(image?.url) || EVENT_SOME_IMAGE;
};

/**
 * Get event neighborhood info as string
 * @param {object} event
 * @param {string} locale
 * @return {string}
 */
export const getEventNeighborhood = (
  event: EventFields,
  locale: AppLanguage
): string | null => {
  const neighborhood = event.location?.divisions?.find(
    (division) => division.type === 'neighborhood'
  );
  return getLocalizedString(neighborhood?.name, locale);
};

/**
 * Get event location fields
 * @param {EventFields} event
 * @param {AppLanguage} locale
 */
const getEventLocationFields = (event: EventFields, locale: AppLanguage) => {
  const location = event.location;
  return {
    addressLocality: getLocalizedString(location?.addressLocality, locale),
    coordinates: [...(location?.position?.coordinates || [])].reverse(),
    neighborhood: getEventNeighborhood(event, locale),
    location,
    postalCode: location?.postalCode,
    streetAddress: getLocalizedString(location?.streetAddress, locale),
  };
};

/**
 * Get palvelukartta compatible id for the location
 * @param {object} location
 * @return {string}
 */
export const getLocationId = (
  location?: PlaceFieldsFragment | null
): string => {
  return location?.id ? location?.id.split(':').slice(1).join() : '';
};

/**
 * Get service map url
 * @param {object} event
 * @param {string} locale
 * @param {boolean} isEmbedded
 * @return {string}
 */
export const getServiceMapUrl = (
  event: EventFields,
  locale: AppLanguage,
  isEmbedded?: boolean
): string => {
  const location = event.location;
  const locationId = getLocationId(location);
  if (location?.id !== EVENT_LOCATIONS.INTERNET) {
    return `https://palvelukartta.hel.fi/${locale}${
      isEmbedded ? '/embed' : ''
    }/unit/${locationId}`;
  }
  return '';
};

/**
 * Get Google link to show directions to event location
 * @param {object} event
 * @param {string} locale
 * @return {string}
 */
export const getGoogleDirectionsLink = (
  event: EventFields,
  locale: AppLanguage
): string => {
  const { addressLocality, coordinates, postalCode, streetAddress } =
    getEventLocationFields(event, locale);

  return `https://www.google.com/maps/dir//${streetAddress},+${postalCode}+${addressLocality}/@${coordinates.join(
    ','
  )}`.replaceAll(/\s/g, '+');
};

/**
 * Get HSL link to show directions to event location
 * @param {object} event
 * @param {string} locale
 * @return {string}
 */
export const getHslDirectionsLink = (
  event: EventFields,
  locale: AppLanguage
): string => {
  const { addressLocality, coordinates, streetAddress } =
    getEventLocationFields(event, locale);

  return `https://reittiopas.hsl.fi/%20/${encodeURIComponent(
    streetAddress
  )},%20${encodeURIComponent(addressLocality)}::${coordinates.join(
    ','
  )}?locale=${locale}`;
};

/**
 * Get offer info url
 * @param {object} event
 * @param {string} locale
 * @return {string}
 */
const getOfferInfoUrl = (event: EventFields, locale: AppLanguage): string => {
  const offer = event.offers?.find((item) =>
    getLocalizedString(item.infoUrl, locale)
  );

  return offer ? getLocalizedString(offer?.infoUrl, locale) : '';
};

const getRegistrationUrl = (event: EventFields) => {
  return event.externalLinks?.find((externalLink) => {
    return externalLink.name === 'registration';
  })?.link;
};

/**
 * Get event fields
 * @param {object} event
 * @param {string} locale
 * @return {object}
 */

export const getEventFields = (event: EventFields, locale: AppLanguage) => {
  const eventLocation = event.location;
  const offerInfoUrl = getOfferInfoUrl(event, locale);
  const registrationUrl = getRegistrationUrl(event);
  const startTime = event.startTime;
  return {
    description: getLocalizedString(event.description, locale),
    email: eventLocation?.email,
    endTime: event.endTime,
    id: event.id,
    name: getLocalizedString(event.name, locale),
    externalLinks: event.externalLinks,
    googleDirectionsLink: getGoogleDirectionsLink(event, locale),
    hslDirectionsLink: getHslDirectionsLink(event, locale),
    imageUrl: getEventImageUrl(event),
    infoUrl: getLocalizedString(event.infoUrl, locale),
    keywords: getKeywordList(locale, event.keywords),
    languages: event.inLanguage
      ?.map((item: EventFields['inLanguage'][number]) =>
        capitalize(getLocalizedString(item.name, locale))
      )
      ?.filter((e) => e),
    locationName: getLocalizedString(eventLocation?.name, locale),
    offerInfoUrl,
    registrationUrl,
    provider: getLocalizedString(event.provider, locale),
    publisher: event.publisher || '',
    shortDescription: getLocalizedString(event.shortDescription, locale),
    someImageUrl: getEventSomeImageUrl(event),
    startTime,
    telephone: getLocalizedString(eventLocation?.telephone, locale),
    freeEvent: isEventFree(event),
    today: startTime ? isToday(new Date(startTime)) : false,
    thisWeek: startTime ? isThisWeek(new Date(startTime)) : false,
    audience: getKeywordList(locale, event.audience),
    audienceMinAge: event.audienceMinAge,
    audienceMaxAge: event.audienceMaxAge,
    photographerName: event.images?.[0]?.photographerName,
    ...getEventLocationFields(event, locale),
    locationExtraInfo: getLocalizedString(event.locationExtraInfo, locale),
    remainingAttendeeCapacity: event.registration?.remainingAttendeeCapacity,
    waitingListCapacity: event.registration?.waitingListCapacity,
    remainingWaitingListCapacity:
      event.registration?.remainingWaitingListCapacity,
    enrolmentStartTime: event.enrolmentStartTime,
    enrolmentEndTime: event.enrolmentEndTime,
    providerContactInfo: getLocalizedString(event.providerContactInfo, locale),
  };
};

export const isLocalized = (event: EventFields, locale: AppLanguage): boolean =>
  Boolean(
    event.name?.[locale] &&
      event.shortDescription?.[locale] &&
      event.description?.[locale]
  );

export const getAudienceAgeText = (
  t: TFunction,
  audienceMinAge?: string | null,
  audienceMaxAge?: string | null
): string => {
  if (!audienceMinAge && !audienceMaxAge) {
    return '';
  }
  const ageLimit = `${audienceMinAge ?? '0'}${
    audienceMaxAge ? `–${audienceMaxAge}` : '+'
  }`;
  return `${ageLimit}-${t('event:info.age')}`;
};

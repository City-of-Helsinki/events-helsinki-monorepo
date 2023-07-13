/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from '@faker-js/faker';
import merge from 'lodash/merge';
import type { NextRouter } from 'next/router';
import { EXTLINK } from '../../src/constants';
import { EventTypeId } from '../../src/types';
import type {
  EventFields,
  AppLanguage,
  type Audience,
  type BannerPage,
  type CmsImage,
  type EventDetails,
  type EventListResponse,
  type ExternalLink,
  type Image,
  type InLanguage,
  type Keyword,
  type KeywordListResponse,
  type LocalizedCmsImage,
  type LocalizedCmsKeywords,
  type LocalizedObject,
  type Neighborhood,
  type NeighborhoodListResponse,
  type Offer,
  type OrganizationDetails,
  type Place,
  type PlaceListResponse,
  type StaticPage,
} from '../../src/types';

export const fakeEvents = (
  count = 1,
  events?: Partial<EventDetails>[]
): EventListResponse => ({
  data: generateNodeArray((i) => fakeEvent(events?.[i]), count),
  meta: {
    __typename: 'Meta',
    count: count,
    next: '',
    previous: '',
  },
  __typename: 'EventListResponse',
});

export const fakeEvent = (overrides?: Partial<EventDetails>): EventDetails => {
  return merge<EventDetails, typeof overrides>(
    {
      id: `hel:${faker.string.uuid()}`,
      internalId: faker.string.uuid(),
      name: fakeLocalizedObject(),
      publisher: 'provider:123',
      provider: fakeLocalizedObject(),
      shortDescription: fakeLocalizedObject(),
      description: fakeLocalizedObject(),
      images: [fakeImage()],
      infoUrl: fakeLocalizedObject(),
      inLanguage: [fakeInLanguage()],
      audience: [],
      keywords: [fakeKeyword()],
      location: fakePlace(),
      startTime: '2020-07-13T05:51:05.761000Z',
      endTime: null,
      datePublished: null,
      externalLinks: [fakeExternalLink()],
      offers: [
        {
          infoUrl: fakeLocalizedObject(),
          isFree: false,
          description: fakeLocalizedObject(),
        },
      ],
      subEvents: [] as any,
      eventStatus: 'EventScheduled',
      superEvent: null,
      dataSource: 'hel',
      enrolmentEndTime: '',
      enrolmentStartTime: '',
      maximumAttendeeCapacity: 10,
      minimumAttendeeCapacity: 1,
      remainingAttendeeCapacity: 5,
      audienceMinAge: '5',
      audienceMaxAge: '15',
      typeId: EventTypeId.General,
      __typename: 'EventDetails',
      locationExtraInfo: null,
    },
    overrides
  );
};

export const fakeAudience = (
  count = 1,
  audience?: Partial<Audience>[]
): Audience[] => {
  return generateNodeArray((i) => fakeTargetGroup(audience?.[i]), count);
};

export const fakeTargetGroup = (overrides?: Partial<Audience>): Audience => {
  return merge<Audience, typeof overrides>(
    {
      __typename: 'Audience',
      id: faker.string.uuid(),
      internalContext: '',
      internalId: faker.string.uuid(),
      name: fakeLocalizedObject(faker.word.sample()),
    },
    overrides
  );
};

export const fakeExternalLink = (
  overrides?: Partial<ExternalLink>
): ExternalLink =>
  merge(
    {
      link: faker.internet.url(),
      name: EXTLINK.EXTLINK_FACEBOOK,
      __typename: 'ExternalLink',
    },
    overrides
  );

export const fakeImage = (overrides?: Partial<Image>): Image =>
  merge(
    {
      id: faker.string.uuid(),
      internalId: 'https://api.hel.fi/linkedevents-test/v1/image/48566/',
      license: 'cc_by',
      name: faker.word.words(),
      url: 'https://api.hel.fi/linkedevents-test/media/images/test.png',
      cropping: '59,0,503,444',
      photographerName: faker.person.firstName(),
      __typename: 'Image',
    },
    overrides
  );

export const fakeInLanguage = (overrides?: InLanguage): InLanguage =>
  merge(
    {
      id: 'fi',
      internalId: 'https://api.hel.fi/linkedevents-test/v1/language/fi/',
      name: {
        en: null,
        fi: 'suomi',
        sv: null,
        __typename: 'LocalizedObject',
      },
      __typename: 'InLanguage',
    },
    overrides
  );

export const fakePlaces = (
  count = 1,
  places?: Partial<Place>[]
): PlaceListResponse => ({
  data: generateNodeArray((i) => fakePlace(places?.[i]), count),
  meta: {
    count: count,
    next: '',
    previous: '',
    __typename: 'Meta',
  },
  __typename: 'PlaceListResponse',
});

export const fakePlace = (overrides?: Partial<Place>): Place =>
  merge(
    {
      id: faker.string.uuid(),
      internalId: 'https://api.hel.fi/linkedevents-test/v1/place/tprek:15376/',
      name: fakeLocalizedObject(),
      streetAddress: fakeLocalizedObject(),
      addressLocality: fakeLocalizedObject(),
      postalCode: faker.location.zipCode(),
      hasUpcomingEvents: true,
      telephone: fakeLocalizedObject(),
      email: faker.internet.email(),
      infoUrl: fakeLocalizedObject(faker.internet.url()),
      position: null,
      divisions: [],
      __typename: 'Place',
    },
    overrides
  );

export const fakeKeywords = (
  count = 1,
  keywords?: Partial<Keyword>[]
): KeywordListResponse => ({
  data: generateNodeArray((i) => fakeKeyword(keywords?.[i]), count),
  meta: {
    __typename: 'Meta',
    count: count,
    next: '',
    previous: '',
  },
  __typename: 'KeywordListResponse',
});

export const fakeKeyword = (overrides?: Partial<Keyword>): Keyword =>
  merge(
    {
      id: faker.string.uuid(),
      dataSource: 'yso',
      hasUpcomingEvents: true,
      name: fakeLocalizedObject(),
      internalId: 'https://api.hel.fi/linkedevents-test/v1/keyword/yso:p4363/',
      __typename: 'Keyword',
    },
    overrides
  );

export const fakeOffer = (overrides?: Partial<Offer>): Offer =>
  merge(
    {
      description: fakeLocalizedObject(),
      infoUrl: fakeLocalizedObject(faker.internet.url()),
      isFree: false,
      price: fakeLocalizedObject(),
      __typename: 'Offer',
    },
    overrides
  );

export const fakeOrganization = (
  overrides?: Partial<OrganizationDetails>
): OrganizationDetails =>
  merge(
    {
      id: faker.string.uuid(),
      internalId: faker.string.uuid(),
      isAffiliated: false,
      name: faker.company.name(),
      __typename: 'OrganizationDetails',
    },
    overrides
  );

export const fakeNeighborhoods = (
  count = 1,
  neighborhoods?: Partial<Neighborhood>[]
): NeighborhoodListResponse => ({
  data: generateNodeArray((i) => fakeNeighborhood(neighborhoods?.[i]), count),
  meta: {
    count: count,
    next: '',
    previous: '',
    __typename: 'Meta',
  },
  __typename: 'NeighborhoodListResponse',
});

export const fakeNeighborhood = (
  overrides?: Partial<Neighborhood>
): Neighborhood =>
  merge(
    {
      id: 'kaupunginosa:aluemeri',
      name: fakeLocalizedObject(),
      __typename: 'Neighborhood',
    },
    overrides
  );

export const fakeBanner = (overrides?: Partial<BannerPage>): BannerPage =>
  merge(
    {
      buttonText: fakeLocalizedObject(),
      buttonUrl: fakeLocalizedObject(faker.internet.url()),
      description: fakeLocalizedObject(),
      heroBackgroundImage: fakeLocalizedCmsImage(),
      heroBackgroundImageColor: fakeLocalizedObject('BLACK'),
      heroBackgroundImageMobile: fakeLocalizedCmsImage(),
      heroTopLayerImage: fakeLocalizedCmsImage(),
      keywords: fakeLocalizedCmsKeywords(),
      socialMediaImage: fakeLocalizedCmsImage(),
      title: fakeLocalizedObject(),
      titleAndDescriptionColor: fakeLocalizedObject('BLACK'),
      __typename: 'BannerPage',
    },
    overrides
  );

export const fakeCmsImage = (overrides?: Partial<CmsImage>): CmsImage =>
  merge(
    {
      photographerCredit: fakeLocalizedObject(faker.person.lastName()),
      url: faker.internet.url(),
      __typename: 'CmsImage',
    },
    overrides
  );

export const fakeLocalizedCmsKeywords = (
  overrides?: Partial<LocalizedCmsKeywords>
): LocalizedCmsKeywords =>
  merge(
    {
      en: fakeCmsKeywords(),
      fi: fakeCmsKeywords(),
      sv: fakeCmsKeywords(),
      __typename: 'LocalizedCmsKeywords',
    },
    overrides
  );

export const fakeCmsKeywords = (count = 1, keywords?: string[]): string[] =>
  generateNodeArray((i) => keywords?.[i] || faker.company.name(), count);

export const fakeLocalizedCmsImage = (
  overrides?: Partial<LocalizedCmsImage>
): LocalizedCmsImage =>
  merge(
    {
      en: fakeCmsImage(),
      fi: fakeCmsImage(),
      sv: fakeCmsImage(),
      __typename: 'LocalizedCmsImage',
    },
    overrides
  );

export const fakeStaticPage = (overrides?: Partial<StaticPage>): StaticPage =>
  merge(
    {
      id: faker.string.uuid(),
      expired: false,
      headingSection: fakeLocalizedObject(),
      contentSection: fakeLocalizedObject(),
      keywords: fakeLocalizedCmsKeywords(),
      __typename: 'StaticPage',
    },
    overrides
  );

const sentences: string[] = [];
const uniqueSentences = (): string => {
  const sentence = faker.word.words();

  if (sentences.includes(sentence)) {
    return uniqueSentences();
  } else {
    sentences.push(sentence);
  }

  return sentence;
};

export const fakeLocalizedObject = (text?: string): LocalizedObject => ({
  __typename: 'LocalizedObject',
  en: text || uniqueSentences(),
  sv: text || uniqueSentences(),
  fi: text || uniqueSentences(),
});

const generateNodeArray = <T extends (...args: any) => any>(
  fakeFunc: T,
  length: number
): ReturnType<T>[] => {
  return Array.from({ length }).map((_, i) => fakeFunc(i));
};

export const commonAppUrlGetterMocks = {
  getEventListLinkUrl: jest
    .fn()
    .mockImplementation(
      (event: EventFields, _router: NextRouter, _locale: AppLanguage) =>
        `/kurssit/${event.id}?returnPath=/haku`
    ),
  getOrganizationSearchUrl: jest
    .fn()
    .mockImplementation(
      (event: EventFields, _router: NextRouter, _locale: AppLanguage) =>
        `/haku?publisher=${event.publisher}&searchType=${event.typeId}`
    ),
  getPlainEventUrl: jest
    .fn()
    .mockImplementation(
      (event: EventFields, _locale: AppLanguage) => `/kurssit/${event.id}`
    ),
};

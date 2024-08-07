import type { NextRouter } from 'next/router';
import type React from 'react';
import type { APP_LANGUAGES } from '../constants';
import type { EventFields } from './event-types';
import type { LocalizedObject, Venue } from './generated/graphql';
export type AppLanguage = (typeof APP_LANGUAGES)[number];

export type AutosuggestType = 'keyword' | 'text';

export type ValidLocalizedObject = {
  __typename: LocalizedObject['__typename'];
  en: NonNullable<LocalizedObject['en']>;
  fi: NonNullable<LocalizedObject['fi']>;
  sv: NonNullable<LocalizedObject['sv']>;
};

/* eslint-enable @typescript-eslint/naming-convention */

export type Option = {
  text: string;
  value: string;
};

export type Breakpoint = 'xs' | 's' | 'm' | 'l' | 'xl';

export type LandingPageTextColor = 'BLACK' | 'WHITE';

export type CmsLanguage = {
  id: string;
  name: string;
  slug: string;
  code: string;
  locale: string;
};

export type AppMenuItem = {
  id: string;
  order: number;
  path: string;
  target: string;
  title: string;
  url: string;
  label: string;
};

export type AppNode<T> = {
  cursor: string;
  node: T;
};

export type AutosuggestMenuOption = {
  text: string;
  type: AutosuggestType;
  value: string;
};

export type AppCategory = {
  icon?: React.ReactElement;
  text: string;
  value: string;
};

export type PageUriInfo = { uri: string; slug: string; locale: string };

export type TimeResourceState =
  | 'open'
  | 'closed'
  | 'undefined'
  | 'self_service'
  | 'with_key'
  | 'with_reservation'
  | 'open_and_reservable'
  | 'with_key_and_reservation'
  | 'enter_only'
  | 'exit_only'
  | 'weather_permitting';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type MapItem = {
  id: string;
  title: string;
  pre?: string;
  href: string;
  location?: number[];
};

export type TransitionOptions = {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
};

export type LocalizedString = {
  fi?: string | null;
  sv?: string | null;
  en?: string | null;
};

export enum SPORTS_CATEGORIES {
  SWIMMING = 'swimming',
  SKIING = 'skiing',
  ICE_SKATING = 'ice_skating',
  GYM = 'gym',
  OUTDOOR_GYMS = 'outdoor_gyms',
  PLAYGROUNDS = 'playgrounds',
  TENNIS = 'tennis',
  SKATEBOARDING = 'skateboarding',
  INDOOR_SPORTS_HALLS = 'indoor_sports_halls',
  OUTDOOR_RECREATION = 'outdoor_recreation',
  GUIDED_EXERCISE = 'guided_exercise',
}

export const isSportsCategory = (value: unknown): value is SPORTS_CATEGORIES =>
  Object.values(SPORTS_CATEGORIES).includes(value as SPORTS_CATEGORIES);

export enum TARGET_GROUPS {
  ADAPTED_GROUPS = 'ADAPTED_GROUPS',
  ADULTS = 'ADULTS',
  CHILDREN_AND_FAMILIES = 'CHILDREN_AND_FAMILIES',
  PARTNERS = 'PARTNERS',
  SENIORS = 'SENIORS',
  YOUTH = 'YOUTH',
}

export const isTargetGroup = (value: unknown): value is TARGET_GROUPS =>
  Object.values(TARGET_GROUPS).includes(value as TARGET_GROUPS);

/**
 * RNS i.e. React and Share i.e. Askem Classic data
 * @see https://docs.reactandshare.com/
 */
export type RnsData = {
  /**
   * API Key that was created upon the registration.
   */
  apiKey?: string;

  /**
   * Title of the page or post.
   *
   * Defaults to the value of supported metadata, if it exists. If neither metadata or
   * title property exist, the title of the page is used instead.
   */
  title?: string;

  /**
   * Canonical url of the page or post.
   *
   * By default the plugin uses the value of <link ref="canonical"> element. The default
   * value can be overdriven by this property. If no link element or property is not
   * provided, the url of the page is used instead.
   */
  canonicalUrl?: string;

  /**
   * Name of the author of the page or post.
   */
  author?: string;

  /**
   * ISO 8601 datetime string or Unix timestamp type in milliseconds.
   */
  date?: string | number;

  /**
   * Categories of the page or post
   */
  categories?: string[];

  /**
   * Number of comments, if there is a possibility to leave comments on the page.
   */
  commentNumber?: number;

  /**
   * Custom ID to identify the post/page instead of URL. The use of this is recommended,
   * if the URL is likely to be changed over time.
   */
  postId?: string;

  /**
   * Custom call-to-action URL after a reaction button click.
   */
  ctaUrl?: string;

  /**
   * Flag for disabling Font Awesome
   */
  disableFa?: boolean;

  /**
   * Flag for disabling Google Fonts
   */
  disableFonts?: boolean;

  /**
   * Function to be called after plugin initiation.
   * This function can be used to access the existing plugin element, e.g. add elements
   * to the plugin.
   * @param {HTMLElement} element - DOM element capsulating the plugin
   * @param {string} url - Canonical url of the parent of the plugin or url of the page
   */
  initCallback?: (element?: HTMLElement, url?: string) => void;

  /**
   * Function to be called after a reaction button is clicked.
   * This function can be used e.g. to trigger 3rd party analytics or marketing
   * automation services.
   * @param {string} eventType - reaction or unreaction
   * @param {string} reactionLabel - Label of the reaction button clicked
   * @param {string} url - Canonical url of the parent of the plugin or url of the page
   */
  reactionCallback?: (
    eventType?: string,
    reactionLabel?: string,
    url?: string
  ) => void;

  /**
   * Function to be called after a share button is clicked.
   * This function can be used e.g. to trigger 3rd party analytics or marketing
   * automation services.
   * @param {string} eventType - reaction or unreaction
   * @param {string} reactionLabel - Label of the reaction button clicked
   * @param {string} url - Canonical url of the parent of the plugin or url of the page
   */
  shareCallback?: (
    eventType?: string,
    reactionLabel?: string,
    url?: string
  ) => void;
};

export type KeywordOnClickHandlerType = (
  router: NextRouter,
  locale: AppLanguage,
  type: 'dateType' | 'isFree' | 'text',
  value?: string
) => () => void;

export type GetEventUrlType = (
  event: EventFields,
  router: NextRouter,
  locale: AppLanguage
) => string;

export type GetEventListLinkUrlType = (
  event: EventFields,
  router: NextRouter,
  locale: AppLanguage
) => string;

export type GetOrganizationSearchUrlType = (
  event: EventFields,
  router: NextRouter,
  locale: AppLanguage
) => string;

export type GetHelsinkiOnlySearchUrlType = (
  source: EventFields | Venue,
  router: NextRouter,
  locale: AppLanguage
) => string;

export type GetPlainEventUrlType = (
  event: EventFields,
  locale: AppLanguage
) => string;

export type GetCardUrlType = (
  event: EventFields,
  locale: AppLanguage
) => string;

export type PreviewDataObject = {
  token: string;
  maxAge: number;
};

export {};

declare global {
  interface Window {
    rnsData: RnsData;
    resetRns: () => void;
  }
}

import type React from 'react';
import type { APP_LANGUAGES } from '../constants';

export type AppLanguage = (typeof APP_LANGUAGES)[number];

export type AutosuggestType = 'keyword' | 'text';

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

export type PageInfo = { uri: string; slug: string; locale: string };

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

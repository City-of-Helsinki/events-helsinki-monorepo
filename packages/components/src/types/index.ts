import type React from 'react';
import type { AUTOSUGGEST_TYPES } from '../constants';

export type Language = 'en' | 'fi' | 'sv';

// TODO: Copy-pasted from react-helsinki-headless-cms.
// For some reason next build fails when there is dependency to rhhc.
/** Enum of all available language codes */
/* eslint-disable @typescript-eslint/naming-convention */
export enum LanguageCodeEnum {
  En = 'EN',
  /** The default locale of the site */
  Fi = 'FI',
  Sv = 'SV',
}
/* eslint-enable @typescript-eslint/naming-convention */

export type OptionType = {
  label: string;
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

export type MenuItem = {
  id: string;
  order: number;
  path: string;
  target: string;
  title: string;
  url: string;
  label: string;
};

export type Connection<T> = {
  edges: Node<T>[];
};

export type Node<T> = {
  cursor: string;
  node: T;
};

export type AutosuggestMenuOption = {
  text: string;
  type: AUTOSUGGEST_TYPES;
  value: string;
};

export type Category = {
  icon?: React.ReactElement;
  text: string;
  value: string;
};

export type PageInfo = { uri: string; slug: string; locale: string };

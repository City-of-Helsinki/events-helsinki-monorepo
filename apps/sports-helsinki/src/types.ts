import type { SEARCH_ROUTES } from './constants';

export type Language = 'en' | 'fi' | 'sv';

export enum SUPPORT_LANGUAGES {
  EN = 'en',
  FI = 'fi',
  SV = 'sv',
}

export type LocalizedString = {
  fi?: string | null;
  sv?: string | null;
  en?: string | null;
};

export type SearchRoute = (typeof SEARCH_ROUTES)[keyof typeof SEARCH_ROUTES];

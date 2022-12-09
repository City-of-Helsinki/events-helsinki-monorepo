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

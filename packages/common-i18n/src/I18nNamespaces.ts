import type cms from './locales/fi/cms.json';
import type common from './locales/fi/common.json';
import type event from './locales/fi/event.json';
import type home from './locales/fi/footer.json';
import type notFound from './locales/fi/notFound.json';
import type search from './locales/fi/search.json';

export type I18nNamespaces = {
  cms: typeof cms;
  common: typeof common;
  event: typeof event;
  home: typeof home;
  notFound: typeof notFound;
  search: typeof search;
};

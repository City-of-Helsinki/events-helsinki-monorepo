import type cms from './locales/fi/cms.json';
import type common from './locales/fi/common.json';
import type event from './locales/fi/event.json';
import type eventsCommon from './locales/fi/eventsCommon.json';
import type footer from './locales/fi/footer.json';
import type hobbiesCommon from './locales/fi/hobbiesCommon.json';
import type home from './locales/fi/home.json';
import type notFound from './locales/fi/notFound.json';
import type search from './locales/fi/search.json';

export type I18nNamespaces = {
  common: typeof common;
  hobbiesCommon: typeof hobbiesCommon;
  eventsCommon: typeof eventsCommon;
  home: typeof home;
  cms: typeof cms;
  footer: typeof footer;
  event: typeof event;
  notFound: typeof notFound;
  search: typeof search;
};

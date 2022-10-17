import type cms from './locales/fi/cms.json';
import type common from './locales/fi/common.json';
import type demo from './locales/fi/demo.json';
import type event from './locales/fi/event.json';
import type footer from './locales/fi/footer.json';
import type home from './locales/fi/home.json';
import type notFound from './locales/fi/notFound.json';
import type search from './locales/fi/search.json';
import type system from './locales/fi/system.json';

export type I18nNamespaces = {
  common: typeof common;
  demo: typeof demo;
  home: typeof home;
  system: typeof system;
  cms: typeof cms;
  footer: typeof footer;
  event: typeof event;
  notFound: typeof notFound;
  search: typeof search;
};

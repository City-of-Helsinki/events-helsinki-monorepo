import type cms from '../../../public/locales/fi/cms.json';
import type common from '../../../public/locales/fi/common.json';
import type event from '../../../public/locales/fi/event.json';
import type footer from '../../../public/locales/fi/footer.json';
import type home from '../../../public/locales/fi/home.json';
import type notFound from '../../../public/locales/fi/notFound.json';
import type search from '../../../public/locales/fi/search.json';

export type I18nNamespaces = {
  common: typeof common;
  cms: typeof cms;
  home: typeof home;
  event: typeof event;
  footer: typeof footer;
  notFound: typeof notFound;
  search: typeof search;
};

import type common from './locales/fi/common.json';
import type demo from './locales/fi/demo.json';
import type home from './locales/fi/home.json';
import type system from './locales/fi/system.json';

export type I18nNamespaces = {
  common: typeof common;
  demo: typeof demo;
  home: typeof home;
  system: typeof system;
};

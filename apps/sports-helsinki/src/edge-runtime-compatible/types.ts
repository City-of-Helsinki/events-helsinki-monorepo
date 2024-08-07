import type { LOCALES } from './constants';

// TODO: For some reason middleware cannot read `'@events-helsinki/components` package without breaking the build
export type AppLanguage = (typeof LOCALES)[number];

export type RedirectAddress = string;
export type Redirects = Record<RedirectAddress, RedirectAddress>;

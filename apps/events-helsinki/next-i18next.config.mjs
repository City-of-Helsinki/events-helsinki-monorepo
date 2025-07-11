import { resolve } from 'path';

const debugI18n = ['true', 1].includes(
  // eslint-disable-next-line no-undef
  process?.env?.NEXTJS_DEBUG_I18N ?? 'false'
);

/**
 * @type {import('next-i18next').UserConfig}
 */
export default {
  i18n: {
    defaultLocale: 'default',
    locales: ['default', 'fi', 'sv', 'en'],
    localeDetection: false,
  },
  serializeConfig: false,
  // eslint-disable-next-line no-undef
  reloadOnPrerender: process?.env?.NODE_ENV === 'development',
  react: {
    useSuspense: false,
  },
  debug: debugI18n,
  localePath:
    typeof window === 'undefined'
      ? resolve('../../packages/common-i18n/src/locales')
      : undefined,
};

const path = require('path');
const debugI18n = ['true', 1].includes(
  process?.env?.NEXTJS_DEBUG_I18N ?? 'false'
);

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  i18n: {
    defaultLocale: 'default',
    locales: ['default', 'fi', 'sv', 'en'],
    // localeDetection: false,
  },
  serializeConfig: false,
  reloadOnPrerender: process?.env?.NODE_ENV === 'development',
  react: {
    useSuspense: false,
  },
  debug: debugI18n,
  localePath:
    typeof window === 'undefined'
      ? path.resolve('../../packages/common-i18n/src/locales')
      : undefined,
};

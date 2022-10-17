const { default: AppConfig } = require('domain/app/AppConfig');
module.exports = {
  i18n: {
    defaultLocale: 'default',
    locales: AppConfig.locales,
    // localeDetection: false,
  },
  // react: { useSuspense: false },
  trailingSlash: true,
};

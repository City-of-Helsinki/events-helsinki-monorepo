const packageJson = require('./package.json');
const i18nRoutes = require('./i18nRoutes.config');
const redirectRoutes = require('./redirectRoutes.config');
const { i18n } = require('./next-i18next.config');
const nextBaseConfig = require('../../next.base.config');

module.exports = nextBaseConfig({
  packageJson,
  i18nRoutes,
  i18n,
  override: {
    async redirects() {
      return Object.entries(redirectRoutes).flatMap(([destination, sources]) =>
        sources.map(({ source, locale }) => ({
          destination,
          source: `/${locale}${source}`,
          locale: false,
          permanent: true,
        }))
      );
    },
  },
});

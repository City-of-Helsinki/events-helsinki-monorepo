const packageJson = require('./package.json');
const i18nRoutes = require('./i18nRoutes.config');
const { i18n } = require('./next-i18next.config');
const redirectCampaignRoutes = require('./redirectCampaignRoutes.config');
const nextBaseConfig = require('../../next.base.config');

const campaignRoutes = Object.entries(redirectCampaignRoutes).flatMap(
  ([source, destination]) => [
    {
      // Not setting `locale: false` here because that didn't work for some reason.
      // When locale is left undefined middleware.ts's prefixDefaultLocale function
      // lets these redirect routes through without prefixing them with locale.
      source,
      destination,
      permanent: true,
    },
  ]
);

module.exports = nextBaseConfig({
  packageJson,
  i18nRoutes,
  i18n,
  async redirects() {
    return campaignRoutes;
  },
});

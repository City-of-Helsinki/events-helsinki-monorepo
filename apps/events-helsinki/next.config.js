const packageJson = require('./package.json');
const i18nRoutes = require('./i18nRoutes.config');
const redirectCampaignRoutes = require('./redirectCampaignRoutes.config');
const redirectNonCampaignRoutes = require('./redirectNonCampaignRoutes.config');
const { i18n } = require('./next-i18next.config');
const nextBaseConfig = require('../../next.base.config');

const campaignRedirects = Object.entries(redirectCampaignRoutes).flatMap(
  ([source, destination]) => [
    {
      // Not setting `locale: false` here because that didn't work for some reason.
      // When locale is left undefined middleware.ts's prefixDefaultLocale function
      // lets these redirect routes through without prefixing them with locale.
      source,
      destination,
      permanent: false,
    },
  ]
);

const nonCampaignRedirects = Object.entries(redirectNonCampaignRoutes).flatMap(
  ([destination, sources]) =>
    sources.map(({ source, locale }) => ({
      destination,
      source: `/${locale}${source}`,
      locale: false,
      permanent: false,
    }))
);

module.exports = nextBaseConfig({
  packageJson,
  i18nRoutes,
  i18n,
  async redirects() {
    return [...campaignRedirects, ...nonCampaignRedirects];
  },
});

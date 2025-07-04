import packageJson from './package.json' with { type: 'json' };
import i18nRoutes from './i18nRoutes.config.js';
import redirectCampaignRoutes from './redirectCampaignRoutes.config.js';
import redirectNonCampaignRoutes from './redirectNonCampaignRoutes.config.js';
import nextConfig from './next-i18next.config.js';
import nextBaseConfig from '../../next.base.config.js';

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

export default nextBaseConfig({
  packageJson,
  i18nRoutes,
  i18n: nextConfig.i18n,
  async redirects() {
    return [...campaignRedirects, ...nonCampaignRedirects];
  },
});

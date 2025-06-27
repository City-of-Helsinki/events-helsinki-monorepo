import packageJson from './package.json' with { type: 'json' };
import i18nRoutes from './i18nRoutes.config.mjs';
import redirectCampaignRoutes from './redirectCampaignRoutes.config.mjs';
import nextConfig from './next-i18next.config.mjs';
import nextBaseConfig from '../../next.base.config.mjs';

const campaignRoutes = Object.entries(redirectCampaignRoutes).flatMap(
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

export default nextBaseConfig({
  packageJson,
  i18nRoutes,
  i18n: nextConfig.i18n,
  async redirects() {
    return campaignRoutes;
  },
});

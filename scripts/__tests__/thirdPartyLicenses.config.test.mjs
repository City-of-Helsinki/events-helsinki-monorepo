import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { thirdPartyLicensesConfig } from '../thirdPartyLicenses.config.mjs';

describe('thirdPartyLicensesConfig', () => {
  it('elects Apache-2.0 for the dual-licensed dompurify', () => {
    const decision = thirdPartyLicensesConfig.licenseDecisions?.dompurify;
    assert.equal(decision?.license, 'Apache-2.0');
    assert.equal(decision?.declared, '(MPL-2.0 OR Apache-2.0)');
  });

  it('treats the workspace packages as first-party', () => {
    assert.deepEqual(thirdPartyLicensesConfig.firstPartyPackages, [
      '@events-helsinki/*',
    ]);
  });
});

describe('nextBaseConfig', () => {
  it('writes the notices by default, from the client source maps', async () => {
    process.env.CMS_ORIGIN ??= 'https://cms.example.test';
    process.env.NEXTJS_DISABLE_SENTRY = 'true';
    delete process.env.NEXT_DISABLE_SOURCEMAPS;
    const { default: nextBaseConfig } = await import(
      '../../next.base.config.mjs'
    );

    const config = nextBaseConfig({
      packageJson: { name: 'test-app', version: '0.0.0' },
      i18nRoutes: {},
      i18n: { locales: ['fi'], defaultLocale: 'fi' },
    });

    assert.equal(config.productionBrowserSourceMaps, true);
    assert.equal(typeof config.compiler?.runAfterProductionCompile, 'function');
  });
});

/** @type {import('@city-of-helsinki/license-notices/next').ThirdPartyLicensesConfig} */
export const thirdPartyLicensesConfig = {
  repositoryUrl: 'https://github.com/City-of-Helsinki/events-helsinki-monorepo',
  firstPartyPackages: ['@events-helsinki/*'],
  licenseDecisions: {
    dompurify: {
      declared: '(MPL-2.0 OR Apache-2.0)',
      license: 'Apache-2.0',
      note:
        'Offered by its author under "(MPL-2.0 OR Apache-2.0)". This ' +
        'distribution elects Apache-2.0, so the MPL-2.0 obligations do not ' +
        'apply to this component.',
    },
  },
};

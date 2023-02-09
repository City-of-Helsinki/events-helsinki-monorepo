import {
  changeLanguageAndTrySearch,
  getEnvUrl,
  allCookiesUser,
  setConsentAllCookie,
} from 'events-helsinki-common-tests/browser-tests';

fixture('Landing page header')
  .page(getEnvUrl())
  .beforeEach(async () => {
    await setConsentAllCookie();
  });

test('Verify header title', async (t) => {
  await t.useRole(allCookiesUser);
  await changeLanguageAndTrySearch('appEvents');
});

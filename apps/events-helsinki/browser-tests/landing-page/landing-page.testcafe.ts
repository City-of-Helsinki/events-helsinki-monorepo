import {
  changeLanguageAndTrySearch,
  getEnvUrl,
  allCookiesUser,
} from 'events-helsinki-common-tests/browser-tests';

fixture.disablePageCaching('Landing page header').beforeEach(async (t) => {
  await t.useRole(allCookiesUser).navigateTo(getEnvUrl());
});

test('Verify header title', async () => {
  await changeLanguageAndTrySearch('appEvents');
});

import {
  changeLanguageAndTrySearch,
  getEnvUrl,
  allCookiesUser,
} from 'events-helsinki-common-tests/browser-tests';

fixture('Landing page header').page(getEnvUrl());

test('Verify header title', async (t) => {
  await t.useRole(allCookiesUser);
  await changeLanguageAndTrySearch('appSports');
});

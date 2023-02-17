import {
  changeLanguageAndTrySearch,
  getEnvUrl,
  allCookiesUser,
} from 'events-helsinki-common-tests/browser-tests';

fixture.disablePageCaching('Landing page header').beforeEach(async (t) => {
  await t.useRole(allCookiesUser);

  // console.log('check cookie');

  // const cookies = await t.getCookies('city-of-helsinki-cookie-consents');
  // console.log('cookie');
  // console.log(cookies);
  await t.navigateTo(getEnvUrl());

});

test('Verify header title', async (t) => {
  console.log('check cookie');
  const cookies = await t.getCookies('city-of-helsinki-cookie-consents');
  console.log('cookie');
  console.log(cookies);

  await changeLanguageAndTrySearch('appSports');
});

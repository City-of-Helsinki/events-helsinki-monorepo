import {
  changeLanguageAndTrySearch,
  getEnvUrl,
  allCookiesUser,
  useRoleAndNavigateBack,
} from '@events-helsinki/common-tests/browser-tests';

fixture
  .disablePageCaching('Landing page header')
  .page(getEnvUrl('/fi'))
  .beforeEach(async (t) => {
    await useRoleAndNavigateBack(allCookiesUser, t);
  });

test('Verify header title', async () => {
  await changeLanguageAndTrySearch('appHobbies');
});

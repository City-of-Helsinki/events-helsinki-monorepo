import {
  changeLanguageAndTrySearch,
  getEnvUrl,
  ensureConsentDismissed,
} from '@events-helsinki/common-tests/browser-tests';

fixture
  .disablePageCaching('Landing page header')
  .page(getEnvUrl('/fi'))
  .beforeEach(async (t) => {
    await ensureConsentDismissed(t);
  });

test('Verify header title', async () => {
  await changeLanguageAndTrySearch('appEvents');
});

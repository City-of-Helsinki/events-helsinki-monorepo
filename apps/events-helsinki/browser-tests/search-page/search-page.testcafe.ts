import {
  getEnvUrl,
  allCookiesUser,
  EventSearchPage,
  setConsentAllCookie,
} from 'events-helsinki-common-tests/browser-tests';
import i18n from '../../../../packages/common-i18n/src/tests/initI18n';
import { ROUTES } from '../../src/constants';

fixture('Search page')
  .page(getEnvUrl(ROUTES.SEARCH))
  .beforeEach(async () => {
    await i18n.changeLanguage('default');
    await setConsentAllCookie();
  });

test('Verify searching', async (t) => {
  await t.useRole(allCookiesUser);
  const searchPage = new EventSearchPage('appEvents');
  await searchPage.verify();
  await searchPage.doSuccessfulSearch();
  await searchPage.doUnsuccessfulSearch();
});

import {
  getEnvUrl,
  allCookiesUser,
  EventSearchPage,
} from 'events-helsinki-common-tests/browser-tests';
import i18n from '../../../../packages/common-i18n/src/tests/initI18n';
import { ROUTES } from '../../src/constants';

fixture.disablePageCaching('Search page').beforeEach(async () => {
  await i18n.changeLanguage('default');
});

test('Verify searching', async (t) => {
  await t.useRole(allCookiesUser).navigateTo(getEnvUrl(ROUTES.SEARCH));
  const searchPage = new EventSearchPage('appEvents');
  await searchPage.verify();
  await searchPage.doSuccessfulSearch();
  await searchPage.doUnsuccessfulSearch();
});

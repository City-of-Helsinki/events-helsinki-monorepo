import { initTestI18n as i18n } from '../../../../packages/common-i18n/src/';
import {
  EventSearchPage,
  getEnvUrl,
} from '../../../../packages/common-tests/browser-tests';
import { ROUTES } from '../../src/constants';
import allCookiesUser from '../roles/allCookiesUser';

fixture('Search page')
  .page(getEnvUrl(ROUTES.SEARCH))
  .beforeEach(async () => i18n.changeLanguage('default'));

test('Verify searching', async (t) => {
  await t.useRole(allCookiesUser);
  const searchPage = new EventSearchPage('appHobbies');
  await searchPage.verify();
  await searchPage.doSuccessfulSearch();
  await searchPage.doUnsuccessfulSearch();
});

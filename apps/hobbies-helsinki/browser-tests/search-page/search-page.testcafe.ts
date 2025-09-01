import {
  getEnvUrl,
  allCookiesUser,
  EventSearchPage,
  testNavigationFromSearchToDetailsAndBack,
} from '@events-helsinki/common-tests/browser-tests';
import { defaultSearchProps } from '@events-helsinki/common-tests/browser-tests/page-model/eventSearchPage';
import i18n from '../../../../packages/common-i18n/src/tests/initI18n';
import { ROUTES } from '../../src/constants';

const searchPage = new EventSearchPage('appHobbies');
const searchType = 'Course';

fixture.disablePageCaching('Search page').beforeEach(async (t) => {
  await i18n.changeLanguage('default');
  await t.useRole(allCookiesUser).navigateTo(getEnvUrl(ROUTES.SEARCH));
});

test('Verify searching', async () => {
  await searchPage.verify();
  await searchPage.doSearch({
    searchText: defaultSearchProps.searchText,
    searchType,
  });
  await searchPage.doUnsuccessfulSearch({ searchType });
});

test('Verify navigation between the search page and event details page', async (t) => {
  await searchPage.verify();
  const results = searchPage.results;
  await t.expect(results.count).eql(10);
  const firstCard = results.nth(0);
  const lastCard = results.nth(-1);
  testNavigationFromSearchToDetailsAndBack(firstCard);
  testNavigationFromSearchToDetailsAndBack(lastCard);
  // TODO: Test that the used navigation filters stays on when returning
});

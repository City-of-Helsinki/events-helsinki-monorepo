import {
  getEnvUrl,
  allCookiesUser,
  EventSearchPage,
  testNavigationFromSearchToDetailsAndBack,
  useRoleAndNavigateBack,
} from '@events-helsinki/common-tests/browser-tests';
import { defaultSearchProps } from '@events-helsinki/common-tests/browser-tests/page-model/eventSearchPage';
import i18n from '../../../../packages/common-i18n/src/tests/initI18n';
import { ROUTES } from '../../src/constants';

const expectedPageSize = 25; // Should be same as AppConfig.pageSize
const searchPage = new EventSearchPage('appEvents');
const searchType = 'GeneralEvent';

fixture
  .disablePageCaching('Search page')
  .page(getEnvUrl(`/fi/${ROUTES.SEARCH}`))
  .beforeEach(async (t) => {
    await i18n.changeLanguage('default');
    await useRoleAndNavigateBack(allCookiesUser, t);
  });

test('Verify searching', async () => {
  await searchPage.verify();
  await searchPage.doSearch({
    searchText: defaultSearchProps.searchText,
  });
  await searchPage.expectSearchResults({
    min: 1,
    max: expectedPageSize,
    searchType,
  });
  await searchPage.doUnsuccessfulSearch();
  await searchPage.expectNoSearchResults(searchType);
});

test('Verify navigation between the search page and event details page', async (t) => {
  await searchPage.verify();
  const results = searchPage.results;
  await t.expect(results.count).eql(expectedPageSize);
  const firstCard = results.nth(0);
  const lastCard = results.nth(-1);
  testNavigationFromSearchToDetailsAndBack(firstCard);
  testNavigationFromSearchToDetailsAndBack(lastCard);
  // TODO: Test that the used navigation filters stays on when returning
});

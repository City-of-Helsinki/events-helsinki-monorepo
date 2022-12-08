import { screen } from '@testing-library/testcafe';
import { t } from 'testcafe';
import { initTestI18n as i18n } from '../../../common-i18n/src';
import type { AppNamespace } from '../types/app-namespace';

class EventSearchPage {
  searchText = 'helsinki';
  private appNamespace: 'appHobbies' | 'appEvents' | 'appSports';

  constructor(appNamespace: AppNamespace) {
    this.appNamespace = appNamespace;
  }

  protected get searchFormHeading() {
    const searchHeadingText = i18n.t(`search:search.labelSearchField`);
    return screen.getByRole('heading', {
      name: searchHeadingText,
    });
  }

  protected get searchButton() {
    const searchButtonText = i18n.t(`search:search.buttonSearch`);
    return screen.getByRole('button', {
      name: searchButtonText,
    });
  }

  protected get autoSuggestInput() {
    const searchPlaceholderText = i18n.t(
      `${this.appNamespace}:search.search.placeholder`
    );
    return screen.getByPlaceholderText(searchPlaceholderText);
  }

  protected get buttonLoadMore() {
    const loadMoreText = i18n.t('search:buttonLoadMore');
    return screen.queryByRole('button', {
      name: loadMoreText,
    });
  }

  protected get results() {
    const cardLinkRoleName = i18n
      .t('event:eventCard.ariaLabelLink')
      .replace('{{name}}', '*.');
    return screen.queryAllByRole('link', {
      name: new RegExp(cardLinkRoleName, 'i'),
    });
  }

  protected get notFoundResult() {
    const notFoundText = i18n.t('search:searchNotification');
    return screen.queryByText(notFoundText);
  }

  public async expectSearchResults() {
    t.expect(this.notFoundResult.exists).notOk;
    const results = this.results;
    await t.expect(results.count).gte(1); // At least one result should be found
    await t.expect(results.count).lte(10); // max 10 result per page
  }

  public async expectNoSearchResults() {
    t.expect(this.notFoundResult.exists).ok;
    await t.expect(this.results.count).eql(0); // no cards returned
  }

  public async doSuccessfulSearch() {
    // eslint-disable-next-line no-console
    console.info('EventSearchPage: doSuccessfulSearch');
    await t.typeText(this.autoSuggestInput, this.searchText);
    await t.click(this.searchButton);
    await this.expectSearchResults();
  }

  public async doUnsuccessfulSearch() {
    // eslint-disable-next-line no-console
    console.info('EventSearchPage: doUnsuccessfulSearch');
    await t.typeText(
      this.autoSuggestInput,
      'thisisatextthatverylikelycannotbefound'
    );
    await t.click(this.searchButton);
    await this.expectNoSearchResults();
  }

  public async verify() {
    // eslint-disable-next-line no-console
    console.info('EventSearchPage: verify');
    await t.expect(this.searchFormHeading.exists).ok();
  }
}

export default EventSearchPage;

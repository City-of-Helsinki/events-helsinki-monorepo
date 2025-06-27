import { screen } from '@testing-library/testcafe';
import { t } from 'testcafe';
import { initTestI18n as i18n } from '../../../common-i18n/src/index';
import type { AppNamespace } from '../types/app-namespace';

type SearchProps = {
  searchText: string;
};

const defaultSearchProps: SearchProps = { searchText: 'helsinki' };

class EventSearchPage {
  private appNamespace: 'appHobbies' | 'appEvents' | 'appSports';

  constructor(appNamespace: AppNamespace) {
    this.appNamespace = appNamespace;
  }

  protected get searchFormHeading() {
    const searchHeadingText = i18n.t(`search:search.labelSearchField`);
    return screen.findByRole('heading', {
      name: searchHeadingText,
    });
  }

  protected get searchButton() {
    const searchButtonText = i18n.t(`search:search.buttonSearch`);
    return screen.findByRole('button', {
      name: searchButtonText,
    });
  }

  protected get autoSuggestInput() {
    const searchPlaceholderText = i18n.t(
      `${this.appNamespace}:search.search.placeholder`
    );
    return screen.findByPlaceholderText(searchPlaceholderText);
  }

  protected get buttonLoadMore() {
    const loadMoreText = i18n.t('search:buttonLoadMore');
    return screen.queryByRole('button', {
      name: loadMoreText,
    });
  }

  public get results() {
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

  public async expectSearchResults({
    min: minResults = 1,
    max: maxResults = 10,
  }: {
    min: number;
    max: number;
  }) {
    await t.expect(this.notFoundResult.exists).notOk();
    const results = this.results;
    // NOTE: the link is there twice
    await t.expect(results.count).gte(minResults * 2); // At least one result should be found.
    await t.expect(results.count).lte(maxResults * 2); // max 10 result per page
  }

  public async expectNoSearchResults() {
    await t.expect(this.notFoundResult.exists).ok();
    await t.expect(this.results.count).eql(0); // no cards returned
  }

  public async doSearch({ searchText }: SearchProps = defaultSearchProps) {
    // eslint-disable-next-line no-console
    console.info('EventSearchPage: doSearch');
    await t.typeText(this.autoSuggestInput, searchText);
    await t.pressKey('tab');
    await t.click(this.searchButton);
    await t.wait(2000);
    await this.expectSearchResults({ min: 1, max: 10 });
  }

  public async doUnsuccessfulSearch() {
    // eslint-disable-next-line no-console
    console.info('EventSearchPage: doUnsuccessfulSearch');
    await t.typeText(
      this.autoSuggestInput,
      'thisisatextthatverylikelycannotbefound'
    );
    // The menu can be too big, so that it hides the search button,
    // so an unfocus event must be triggered.
    await t.pressKey('tab');
    await t.click(this.searchButton);
    await t.wait(2000);
    await this.expectNoSearchResults();
  }

  public async verify() {
    // eslint-disable-next-line no-console
    console.info('EventSearchPage: verify');
    await t.expect(this.searchFormHeading.exists).ok();
  }
}

export default EventSearchPage;

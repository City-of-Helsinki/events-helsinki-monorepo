import { screen } from '@testing-library/testcafe';
import { t } from 'testcafe';
import {
  initTestI18n as i18n,
  translations,
} from '../../../common-i18n/src/index';
import type { AppNamespace } from '../types/app-namespace';

type SearchType = 'GeneralEvent' | 'Course' | 'Venue';

type SearchProps = {
  searchText: string;
};

export const defaultSearchProps = {
  searchText: 'helsinki',
} as const satisfies SearchProps;

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

  protected get textSearchInput() {
    const searchPlaceholderText = i18n.t(
      `${this.appNamespace}:search.search.placeholder`
    );
    return screen.findAllByPlaceholderText(searchPlaceholderText);
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

  protected get notFoundResultEvents() {
    const notFoundText = i18n.t(
      translations.search.searchNotification.noResultsTitleGeneral
    );
    return screen.queryByText(notFoundText);
  }

  protected get notFoundResultCourses() {
    const notFoundText = i18n.t(
      translations.search.searchNotification.noResultsTitleCourse
    );
    return screen.queryByText(notFoundText);
  }

  protected get notFoundResultVenues() {
    const notFoundText = i18n.t(
      translations.search.searchNotification.noResultsTitleVenue
    );
    return screen.queryByText(notFoundText);
  }

  public async expectSearchResults({
    min: minResults,
    max: maxResults,
    searchType = 'GeneralEvent',
  }: {
    min: number;
    max: number;
    searchType: SearchType;
  }) {
    if (searchType === 'GeneralEvent')
      await t.expect(this.notFoundResultEvents.exists).notOk();
    if (searchType === 'Course')
      await t.expect(this.notFoundResultCourses.exists).notOk();
    if (searchType === 'Venue')
      await t.expect(this.notFoundResultVenues.exists).notOk();
    const results = this.results;
    // Check that results per page are in the expected range:
    await t.expect(results.count).gte(minResults);
    await t.expect(results.count).lte(maxResults);
  }

  public async expectNoSearchResults(searchType: SearchType = 'GeneralEvent') {
    if (searchType === 'GeneralEvent')
      await t.expect(this.notFoundResultEvents.exists).ok();
    if (searchType === 'Course')
      await t.expect(this.notFoundResultCourses.exists).ok();
    if (searchType === 'Venue')
      await t.expect(this.notFoundResultVenues.exists).ok();
    await t.expect(this.results.count).eql(0); // no cards returned
  }

  public async doSearch({ searchText }: SearchProps = defaultSearchProps) {
    // eslint-disable-next-line no-console
    console.info('EventSearchPage: doSearch');
    await t.typeText(this.textSearchInput, searchText);
    await t.pressKey('tab');
    await t.click(this.searchButton);
    await t.wait(2000);
  }

  public async doUnsuccessfulSearch() {
    // eslint-disable-next-line no-console
    console.info('EventSearchPage: doUnsuccessfulSearch');
    await t.typeText(
      this.textSearchInput,
      'thisisatextthatverylikelycannotbefound'
    );
    // The menu can be too big, so that it hides the search button,
    // so an unfocus event must be triggered.
    await t.pressKey('tab');
    await t.click(this.searchButton);
    await t.wait(2000);
  }

  public async verify() {
    // eslint-disable-next-line no-console
    console.info('EventSearchPage: verify');
    await t.expect(this.searchFormHeading.exists).ok();
  }
}

export default EventSearchPage;

import { screen } from '@testing-library/testcafe';
import { t } from 'testcafe';
import { initTestI18n as i18n } from '../../../common-i18n/src';
import type { AppNamespace } from '../types/app-namespace';

class LandingPage {
  searchText = 'sirkuskoulu';
  private appNamespace: 'appHobbies' | 'appEvents' | 'appSports';

  constructor(appNamespace: AppNamespace) {
    this.appNamespace = appNamespace;
  }

  public async verify() {
    // eslint-disable-next-line no-console
    console.log('LandingPage: verify');
    const searchPlaceholderText = i18n.t(`home:search.placeholder`);

    await t
      .expect(
        screen.findByRole('heading', {
          name: i18n.t(`${this.appNamespace}:home.search.title`),
        }).exists
      )
      .ok();

    // NOTE: There is some debounce wait time set to the search
    // and it also makes an API call.
    await t
      .typeText(
        screen.findByPlaceholderText(searchPlaceholderText),
        this.searchText
      )
      .expect(screen.findByText(this.searchText).exists)
      .ok({ timeout: 5000 });
  }
}

export default LandingPage;

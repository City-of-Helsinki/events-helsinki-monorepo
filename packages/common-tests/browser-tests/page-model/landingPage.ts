import { screen } from '@testing-library/testcafe';
import { t } from 'testcafe';
import { initTestI18n as i18n } from '../../../common-i18n/src';
import type { AppNamespace } from '../types/app-namespace';

class LandingPage {
  searchText = 'sirkuskoulu';
  private appNamespace: 'appHobbies' | 'appEvents';

  constructor(appNamespace: AppNamespace) {
    this.appNamespace = appNamespace;
  }

  public async verify() {
    // eslint-disable-next-line no-console
    console.log('LandingPage: verify');
    const searchPlaceholderText = i18n.t(`home:search.placeholder`);

    await t
      .expect(
        screen.getByRole('heading', {
          name: i18n.t(`${this.appNamespace}:search.title`),
        }).exists
      )
      .ok();

    await t.typeText(
      screen.getByPlaceholderText(searchPlaceholderText),
      this.searchText
    );
    await t.wait(2000);
    await t.expect(screen.findByText(this.searchText).exists).ok();
  }
}

export default LandingPage;

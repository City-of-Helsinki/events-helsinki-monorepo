import { screen } from '@testing-library/testcafe';
import { t } from 'testcafe';
import { initI18n as i18n } from '../../config/jest/initI18n';

class LandingPage {
  searchText = 'sirkuskoulu';

  public async verify() {
    // eslint-disable-next-line no-console
    console.log('LandingPage: verify');
    // const searchPlaceholderText = i18n.t('home:search.placeholder');

    await t
      .expect(
        screen.getByRole('heading', { name: i18n.t('appEvents:search.title') })
          .exists
      )
      .ok();

    // await t.typeText(
    //   screen.getByPlaceholderText(searchPlaceholderText),
    //   this.searchText
    // );
    // await t.wait(2000);
    // await t.expect(screen.findByText(this.searchText).exists).ok();
  }
}

export default LandingPage;

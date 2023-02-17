import { screen } from '@testing-library/testcafe';
import { t } from 'testcafe';
import { initTestI18n as i18n } from '../../../common-i18n/src';

class ClosedEventDetailsPage {
  public get heading() {
    const title = i18n.t('event:hero.titleEventClosed');
    return screen.queryByRole('heading', {
      name: title,
    });
  }

  private get toHomeButton() {
    const name = i18n.t('event:hero.buttonToHomePage');
    return screen.getByRole('button', {
      name,
    });
  }

  public async verify() {
    await t.expect(this.heading.exists).ok();
    await t.expect(this.toHomeButton.exists).ok();
  }
}

export default ClosedEventDetailsPage;

import { screen } from '@testing-library/testcafe';
import { t } from 'testcafe';

// TODO: If the ConsentModal could be used as a generic class,
// the  implementing classes could be deleted from the apps.
// More details: https://github.com/City-of-Helsinki/events-helsinki-monorepo/pull/95#discussion_r1050459925
abstract class ConsentModal {
  protected abstract get appName(): string;

  private get title() {
    return screen.findByRole('heading', {
      name: `${this.appName} käyttää evästeitä`,
    });
  }

  private get acceptAllCookiesButton() {
    return screen.findByRole('button', {
      name: /hyväksy kaikki evästeet/i,
    });
  }

  private get acceptOnlyRequiredCookiesButton() {
    return screen.findByRole('button', {
      name: /hyväksy vain pakolliset evästeet/i,
    });
  }

  public async clickAcceptAllCookies() {
    await t.click(this.acceptAllCookiesButton);
    await this.isClosed();
  }

  public async clickAcceptOnlyRequiredCookies() {
    await t.click(this.acceptOnlyRequiredCookiesButton);
    await this.isClosed();
  }

  public async isOpened() {
    await t.expect(this.title.exists).ok();
  }
  public async isClosed() {
    await t.expect(this.title.exists).notOk();
  }
}

export default ConsentModal;

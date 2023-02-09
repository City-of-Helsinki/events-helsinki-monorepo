import { screen } from '@testing-library/testcafe';
import { Selector, t } from 'testcafe';

// TODO: If the ConsentModal could be used as a generic class,
// the  implementing classes could be deleted from the apps.
// More details: https://github.com/City-of-Helsinki/events-helsinki-monorepo/pull/95#discussion_r1050459925
class ConsentModal {
  private get title() {
    return screen.getByRole('heading', {
      name: /\w+ käyttää evästeitä/,
    });
  }

  private get acceptAllCookiesButton() {
    return screen.getByRole('button', {
      name: /hyväksy kaikki evästeet/i,
    });
  }

  private get acceptOnlyRequiredCookiesButton() {
    return screen.getByRole('button', {
      name: /hyväksy vain välttämättömät evästeet/i,
    });
  }

  private get readMoreButton() {
    return screen.getByRole('button', {
      name: /lue lisää/i,
    });
  }

  private get componentContainer() {
    return Selector('#cookie-consent-content');
  }

  public async clickAcceptAllCookies() {
    console.log('ConsentModal: acceptAllCookies');
    await t.click(this.acceptAllCookiesButton);
    await this.isClosed();
  }

  public async clickAcceptOnlyRequiredCookies() {
    console.log('ConsentModal: acceptOnlyRequiredCookies');
    await t.click(this.acceptOnlyRequiredCookiesButton);
    await this.isClosed();
  }

  public async isOpened() {
    await t.wait(2000);
    await t.expect(this.componentContainer.exists).ok();
    await t.expect(this.title.exists).ok();
    await t.expect(this.acceptAllCookiesButton.exists).ok();
    await t.expect(this.acceptOnlyRequiredCookiesButton.exists).ok();
    console.log('ConsentModal: isOpened');
  }

  public async isMinimized() {
    await t.expect(this.componentContainer.exists).ok();
    await t.expect(this.title.exists).ok();
    await t.expect(this.readMoreButton.exists).ok();
    console.log('ConsentModal: isMinimized');
  }

  public async isClosed() {
    await t.expect(this.componentContainer.exists).notOk();
    console.log('ConsentModal: isClosed');
  }
}

export default ConsentModal;

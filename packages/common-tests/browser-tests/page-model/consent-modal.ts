import { screen } from '@testing-library/testcafe';
import { Selector, t } from 'testcafe';

class ConsentModal {
  consentAllCookieName = 'city-of-helsinki-cookie-consents';

  private get title() {
    return screen.findByRole('heading', {
      name: /\w+ käyttää evästeitä/,
    });
  }

  private get acceptAllCookiesButton() {
    return screen.findByRole('button', {
      name: /hyväksy kaikki evästeet/i,
    });
  }

  private get acceptOnlyRequiredCookiesButton() {
    return screen.findByRole('button', {
      name: /hyväksy vain välttämättömät evästeet/i,
    });
  }

  private get componentContainer() {
    return Selector('#cookie-consent-content');
  }

  public async clickAcceptAllCookies() {
    await t.click(this.acceptAllCookiesButton);
    console.log('ConsentModal: acceptAllCookies');
    await this.isClosed();
  }

  public async clickAcceptOnlyRequiredCookies() {
    await t.click(this.acceptOnlyRequiredCookiesButton);
    console.log('ConsentModal: acceptOnlyRequiredCookies');
    await this.isClosed();
  }

  public async isOpened() {
    console.log('ConsentModal: isOpened');
    await t.expect(this.title.exists).ok();
    await t.expect(this.acceptAllCookiesButton.exists).ok();
    await t.expect(this.acceptOnlyRequiredCookiesButton.exists).ok();
  }

  public async isClosed() {
    await t.expect(this.componentContainer.exists).notOk();
    console.log('ConsentModal: isClosed');
  }
}

export default ConsentModal;

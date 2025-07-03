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
    // eslint-disable-next-line no-console
    console.debug('ConsentModal: acceptAllCookies');
    await this.isClosed();
  }

  public async clickAcceptOnlyRequiredCookies() {
    await t.click(this.acceptOnlyRequiredCookiesButton);
    // eslint-disable-next-line no-console
    console.debug('ConsentModal: acceptOnlyRequiredCookies');
    await this.isClosed();
  }

  public async isOpened() {
    // eslint-disable-next-line no-console
    console.debug('ConsentModal: isOpened');
    await t.expect(this.title.exists).ok();
    await t.expect(this.acceptAllCookiesButton.exists).ok();
    await t.expect(this.acceptOnlyRequiredCookiesButton.exists).ok();
  }

  public async isClosed() {
    await t.expect(this.componentContainer.exists).notOk();
    // eslint-disable-next-line no-console
    console.debug('ConsentModal: isClosed');
  }
}

export default ConsentModal;

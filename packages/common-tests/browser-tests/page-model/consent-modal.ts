import { within } from '@testing-library/testcafe';
import { Selector, t } from 'testcafe';

class ConsentModal {
  consentAllCookieName = 'city-of-helsinki-cookie-consents';

  private get title() {
    const { getByRole } = within(this.componentContainer);
    return getByRole('heading', {
      name: /\w+ käyttää evästeitä/,
    });
  }

  private get acceptAllCookiesButton() {
    const { getByRole } = within(this.componentContainer);
    return getByRole('button', {
      name: /hyväksy kaikki evästeet/i,
    });
  }

  private get acceptOnlyRequiredCookiesButton() {
    const { getByRole } = within(this.componentContainer);
    return getByRole('button', {
      name: /hyväksy vain välttämättömät evästeet/i,
    });
  }

  private get componentContainer() {
    return Selector('#cookie-consent-content');
  }

  private async waitCookieExists() {
    let i: number = 0;
    let cookies = await t.getCookies(this.consentAllCookieName);
    do {
      if (cookies.length > 0) {
        break;
      }
      await t.wait(100);
      i++;
      cookies = await t.getCookies(this.consentAllCookieName);
    } while (i < 100);

    console.log('Cookie wait time ' + i / 10 + 's');
  }

  public async clickAcceptAllCookies() {
    await t.click(this.acceptAllCookiesButton);
    console.log('ConsentModal: acceptAllCookies');
    //    await this.waitCookieExists();
    await this.isClosed();
  }

  public async clickAcceptOnlyRequiredCookies() {
    await t.click(this.acceptOnlyRequiredCookiesButton);
    console.log('ConsentModal: acceptOnlyRequiredCookies');
    //    await this.waitCookieExists();
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

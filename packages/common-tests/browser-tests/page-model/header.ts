import { screen } from '@testing-library/testcafe';
import { Selector, t } from 'testcafe';
import { initTestI18n as i18n } from '../../../common-i18n/src';

import { DEFAULT_LANGUAGE } from '../../../components/src/constants/constants';
import type { AppLanguage } from '../../../components/src/types/types';

class Header {
  currentLang = DEFAULT_LANGUAGE;

  banner = screen.getByRole('banner');
  languageSelectorButton = Selector('#languageSelector-button');
  languageSelectorItem = Selector('a').withAttribute('lang', this.currentLang);

  private setLanguage(lang: AppLanguage) {
    this.currentLang = lang;
    this.languageSelectorItem = Selector('a').withAttribute(
      'lang',
      this.currentLang
    );
  }

  public async changeLanguage(lang: AppLanguage) {
    // eslint-disable-next-line no-console
    console.log('changeLanguage to ' + lang);

    this.setLanguage(lang);

    const languageSelectorButtonScreen = screen.getByRole('button', {
      name: await this.languageSelectorButton.innerText,
    });
    const languageSelectorItemScreen = screen.getByRole('link', {
      name: await this.languageSelectorItem.innerText,
    });

    await t
      .click(languageSelectorButtonScreen)
      .click(languageSelectorItemScreen);

    await i18n.changeLanguage(lang);
  }

  public async verify() {
    // eslint-disable-next-line no-console
    console.log('Header: verify');
    await t.expect(this.banner.exists).ok();
  }
}

export default Header;

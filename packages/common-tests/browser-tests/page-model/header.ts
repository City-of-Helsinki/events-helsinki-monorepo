import { screen } from '@testing-library/testcafe';
import { Selector, t } from 'testcafe';
import { initTestI18n as i18n } from '../../../common-i18n/src';

import {
  APP_LANGUAGE_LABELS,
  DEFAULT_LANGUAGE,
} from '../../../components/src/constants';
import type { AppLanguage } from '../../../components/src/types';

function getLanguageSelectorButton(language: AppLanguage) {
  return Selector('button')
    .withAttribute('lang', language)
    .withText(APP_LANGUAGE_LABELS[language]);
}

class Header {
  banner = screen.getByRole('banner');
  currentLang: AppLanguage = DEFAULT_LANGUAGE;
  languageSelectorButton = getLanguageSelectorButton(this.currentLang);

  private async setLanguage(lang: AppLanguage) {
    this.currentLang = lang;
    this.languageSelectorButton = getLanguageSelectorButton(this.currentLang);
  }

  public async changeLanguage(lang: AppLanguage) {
    // eslint-disable-next-line no-console
    console.log('changeLanguage to ' + lang);

    await this.setLanguage(lang);

    const languageSelectorButtonScreen = screen.getByRole('button', {
      name: await this.languageSelectorButton.innerText,
    });

    await t.click(languageSelectorButtonScreen);
    await i18n.changeLanguage(lang);
  }

  public async verify() {
    // eslint-disable-next-line no-console
    console.log('Header: verify');
    await t.expect(this.banner.exists).ok();
  }
}

export default Header;

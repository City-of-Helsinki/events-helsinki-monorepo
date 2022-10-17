import { initTestI18n, config } from 'events-helsinki-common-i18n';
import { translations } from 'events-helsinki-common-i18n/tests/initI18n';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { render, screen } from '@/test-utils';
import type { Language } from 'types';
import * as useLocale from '../useLocale';

const TestComponent = () => {
  const { t } = useTranslation('common');
  const locale = useLocale.default();
  return (
    <I18nextProvider i18n={initTestI18n}>
      <div data-testid="translation">{t('supriseMe') as string}</div>
      <div data-testid="locale">{locale}</div>
    </I18nextProvider>
  );
};

describe('useLocale', () => {
  const supportedLanguages: Language[] = ['fi', 'en', 'sv'];
  const unsupportedLanguages = ['fr', 'test'];
  const mockUseLocale = jest.spyOn(useLocale, 'default');

  beforeEach(async () => {
    await initTestI18n.changeLanguage(config.lng);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each(supportedLanguages)(
    'supports the "%s" as a language',
    async (lang) => {
      expect(initTestI18n.language).toBe(config.lng);

      await initTestI18n.changeLanguage(lang);

      render(<TestComponent />);
      expect(initTestI18n.language).toBe(lang);
      expect(mockUseLocale).toHaveReturnedWith(lang as Language);
    }
  );

  it.each(unsupportedLanguages)(
    `returns default language "${config.lng}" for unsupported language "%s"`,
    async (lang) => {
      expect(initTestI18n.language).toBe(config.lng);
      await initTestI18n.changeLanguage(lang);
      render(<TestComponent />);
      expect(initTestI18n.language).toBe(lang);
      expect(mockUseLocale).toHaveReturnedWith('fi' as Language);
      expect(await screen.findByTestId('translation')).toHaveTextContent(
        translations.common.supriseMe
      );
    }
  );
});

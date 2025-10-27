import {
  initTestI18n,
  config,
  translations,
} from '@events-helsinki/common-i18n';
import { useTranslation } from 'react-i18next';
import { render, screen } from '../../../config/tests/test-utils';
import { APP_LANGUAGES } from '../../constants';
import * as useLocale from '../useLocale';

const TestComponent = () => {
  const { t } = useTranslation('common');
  const locale = useLocale.default();
  return (
    <>
      <div data-testid="translation">{t('supriseMe') as string}</div>
      <div data-testid="locale">{locale}</div>
    </>
  );
};

describe('useLocale', () => {
  const unsupportedLanguages = ['fr', 'test'];
  const mockUseLocale = vi.spyOn(useLocale, 'default');

  beforeEach(async () => {
    await initTestI18n.changeLanguage(config.lng);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it.each(APP_LANGUAGES)('supports the "%s" as a language', async (lang) => {
    expect(initTestI18n.language).toBe(config.lng);

    await initTestI18n.changeLanguage(lang);

    render(<TestComponent />);
    expect(initTestI18n.language).toBe(lang);
    expect(mockUseLocale).toHaveReturnedWith(lang);
  });

  it.each(unsupportedLanguages)(
    `returns default language "${config.lng}" for unsupported language "%s"`,
    async (lang) => {
      expect(initTestI18n.language).toBe(config.lng);
      await initTestI18n.changeLanguage(lang);
      render(<TestComponent />);
      expect(initTestI18n.language).toBe(lang);
      expect(mockUseLocale).toHaveReturnedWith('fi');
      expect(await screen.findByTestId('translation')).toHaveTextContent(
        translations.common.supriseMe
      );
    }
  );
});

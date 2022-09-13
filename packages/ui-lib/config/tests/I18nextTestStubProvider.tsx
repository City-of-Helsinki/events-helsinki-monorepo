import i18n from 'i18next';
import type { FC, ReactNode } from 'react';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import type { I18nNamespace } from '../../src/lib/i18n/I18nNamespace.types';

/**
 * Fully wrapped strategy for i18next, you can use stub/mocks as well
 * @link {https://react.i18next.com/misc/testing}
 */
i18n.use(initReactI18next).init({
  lng: 'default',
  fallbackLng: 'default',
  ns: ['common'],
  defaultNS: 'common',
  debug: false,
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  // Let empty so you can test on translation keys rather than translated strings
  resources: {
    default: { common: {} } as Record<I18nNamespace, Record<string, never>>,
  },
});

export const I18nextTestStubProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

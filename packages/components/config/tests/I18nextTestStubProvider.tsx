import { initTestI18n as i18n } from '@events-helsinki/common-i18n';
import type { FC, ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';

export const I18nextTestStubProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

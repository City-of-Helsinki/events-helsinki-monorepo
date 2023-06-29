import { Trans, useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { errorsConfig } from '../../translations/errors.config';
import ErrorPage from './ErrorPage';
import type { ErrorPageProps } from './ErrorPage';

type Props = {
  appName: ErrorPageProps['appName'];
};
const UnknownError: React.FC<Props> = ({ appName }) => {
  const { t, i18n } = useTranslation(errorsConfig.i18nNamespaces, {
    bindI18n: 'languageChanged loaded',
  });
  // bindI18n: loaded is needed because of the reloadResources call
  // if all pages use the reloadResources mechanism, the bindI18n option can also be defined in next-i18next.config.js
  useEffect(() => {
    i18n.reloadResources(i18n.resolvedLanguage, errorsConfig.i18nNamespaces);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ErrorPage
      headerText={t(`errors:unknownError.title`)}
      descriptionText={
        <Trans t={t} i18nKey="errors:unknownError.description">
          Koita myöhemmin uudestaan. Jos tilanne toistuu, kerro siitä meille{' '}
          <a
            href={t(`errors:unknownError.feedbackFormLink`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            palautelomakkeella
          </a>
        </Trans>
      }
      appName={appName}
    />
  );
};
export default UnknownError;

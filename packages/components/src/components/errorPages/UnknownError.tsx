import { Trans } from 'next-i18next';
import React from 'react';
import useErrorsTranslation from '../../hooks/useErrorsTranslation';
import ErrorPage from './ErrorPage';
import type { ErrorPageProps } from './ErrorPage';
import styles from './errorPage.module.scss';
type Props = {
  appName: ErrorPageProps['appName'];
  errorMessage?: string;
};
const UnknownError: React.FC<Props> = ({ appName, errorMessage }) => {
  const { t } = useErrorsTranslation();
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
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </Trans>
      }
      appName={appName}
    />
  );
};

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className={styles.errorMessageInfoBlock}>
      <code>{message}</code>
    </div>
  );
};

export default UnknownError;

import { Trans } from 'next-i18next';
import React from 'react';
import type useCommonTranslation from '../../hooks/useCommonTranslation';
import { ErrorPage } from '../index';
import type { ErrorPageProps } from './ErrorPage';

type Props = {
  appName: ErrorPageProps['appName'];
  t: ReturnType<typeof useCommonTranslation>['t'];
};
const UnknownError: React.FC<Props> = ({ appName, t }) => {
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

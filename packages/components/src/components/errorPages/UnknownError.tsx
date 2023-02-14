import React from 'react';
import useErrorsTranslation from '../../hooks/useErrorsTranslation';
import { ErrorPage } from '../index';
import type { ErrorPageProps } from './ErrorPage';

type Props = {
  appName: ErrorPageProps['appName'];
};
const UnknownError: React.FC<Props> = ({ appName }) => {
  const { t } = useErrorsTranslation();
  return (
    <ErrorPage
      headerText={t(`errors:unknownError.title`)}
      descriptionText={t(`errors:unknownError.description`)}
      appName={appName}
    />
  );
};
export default UnknownError;

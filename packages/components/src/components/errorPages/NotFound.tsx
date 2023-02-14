import React from 'react';
import useErrorsTranslation from '../../hooks/useErrorsTranslation';
import { ErrorPage } from '../index';
import type { ErrorPageProps } from './ErrorPage';

type Props = {
  appName: ErrorPageProps['appName'];
};
const NotFound: React.FC<Props> = ({ appName }) => {
  const { t } = useErrorsTranslation();
  return (
    <ErrorPage
      headerText={t(`errors:notFound.title`)}
      descriptionText={t(`errors:notFound.description`)}
      appName={appName}
    />
  );
};
export default NotFound;

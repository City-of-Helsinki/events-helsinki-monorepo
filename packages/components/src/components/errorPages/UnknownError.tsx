import React from 'react';
import { useResilientTranslation } from '../../hooks';
import ErrorPage from './ErrorPage';
import type { ErrorPageProps } from './ErrorPage';

type Props = {
  appName: ErrorPageProps['appName'];
};
const UnknownError: React.FC<Props> = ({ appName }) => {
  const { resilientT } = useResilientTranslation();
  return (
    <ErrorPage
      headerText={resilientT('errors:unknownError.title')}
      descriptionText={
        <p>
          {resilientT('errors:unknownError.descriptionPrefix')}{' '}
          <a
            href={resilientT('errors:feedbackFormLink')}
            target="_blank"
            rel="noopener noreferrer"
          >
            {resilientT('errors:unknownError.descriptionSuffixLinkText')}
          </a>
        </p>
      }
      appName={appName}
    />
  );
};
export default UnknownError;

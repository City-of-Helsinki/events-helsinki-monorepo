import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import useConsentTranslation from '../../hooks/useConsentTranslation';
import CookiesRequired from '../cookieConsent/CookiesRequired';
import styles from './askem.module.scss';
import useAskem from './useAskem';

interface AskemFeedbackContainerProps {
  consentUrl?: string;
  withPadding?: boolean;
}

const AskemFeedbackContainer: React.FC<AskemFeedbackContainerProps> = ({
  consentUrl,
  withPadding = false,
}) => {
  const { consentGiven, disabled } = useAskem();
  const { t } = useConsentTranslation();
  const router = useRouter();

  const handleConsentPageRedirect = () => {
    if (consentUrl) {
      router.push(`${consentUrl}?returnPath=${router.asPath}`);
    }
  };

  if (disabled) {
    return null;
  }

  return (
    <div className={styles.rnsContainer}>
      <div
        className={classNames(
          styles.rnsContainerInner,
          withPadding ? styles.withPadding : ''
        )}
      >
        {!consentGiven && (
          <CookiesRequired
            className={styles.rnsCookiesRequired}
            title={t('consent:askem.cookiesRequiredTitle')}
            description={t('consent:askem.cookiesRequiredDescription')}
            handleConsent={handleConsentPageRedirect}
          />
        )}
        {!disabled && consentGiven && <div className="rns" />}
      </div>
    </div>
  );
};

AskemFeedbackContainer.displayName = 'AskemFeedbackContainer';

export default AskemFeedbackContainer;

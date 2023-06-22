import classNames from 'classnames';
import { Button } from 'hds-react';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
          <div className={styles.rnsCookiesRequired}>
            <h2>{t('consent:askem.cookiesRequiredTitle')}</h2>
            <p>{t('consent:askem.cookiesRequiredDescription')}</p>
            {consentUrl && (
              <Button
                theme="black"
                variant="secondary"
                onClick={handleConsentPageRedirect}
              >
                {t('consent:askem.cookieSettingsButtonText')}
              </Button>
            )}
          </div>
        )}
        {!disabled && consentGiven && <div className="rns" />}
      </div>
    </div>
  );
};

AskemFeedbackContainer.displayName = 'AskemFeedbackContainer';

export default AskemFeedbackContainer;

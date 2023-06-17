import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './askem.module.scss';
import useAskem from './useAskem';

interface AskemFeedbackContainerProps {
  onSettingsClick?: () => void;
}

const AskemFeedbackContainer: React.FC<AskemFeedbackContainerProps> = ({
  onSettingsClick,
}) => {
  const { consentGiven, disabled } = useAskem();
  const { t } = useTranslation();

  const handleConsentPageRedirect = () => {
    if (onSettingsClick) {
      onSettingsClick();
    }
  };

  if (disabled) {
    return null;
  }

  return (
    <>
      {!consentGiven && (
        <div className={styles.rnsCookiesRequired}>
          <h2>{t('consent:askem.cookiesRequiredTitle')}</h2>
          <p>{t('consent:askem.cookiesRequiredDescription')}</p>
          {onSettingsClick && (
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
    </>
  );
};

AskemFeedbackContainer.displayName = 'AskemFeedbackContainer';

export default AskemFeedbackContainer;

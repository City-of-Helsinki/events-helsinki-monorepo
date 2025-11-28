import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import { useCookieConfigurationContext } from '../../cookieConfigurationProvider';
import useConsentTranslation from '../../hooks/useConsentTranslation';
import { userTrackingLogger } from '../../loggers/logger';
import CookiesRequired from '../cookieConsent/CookiesRequired';
import styles from './askem.module.scss';
import useAskem from './useAskem';

interface AskemFeedbackContainerProps {
  withPadding?: boolean;
}

const AskemFeedbackContainer: React.FC<AskemFeedbackContainerProps> = ({
  withPadding = false,
}) => {
  const { consentGiven, disabled } = useAskem();
  const { t } = useConsentTranslation();
  const router = useRouter();

  const { consentUrl } = useCookieConfigurationContext();

  const handleConsentPageRedirect = () => {
    if (consentUrl) {
      router.push(consentUrl);
    }
  };

  // Handle logging of consent status changes.
  React.useEffect(() => {
    if (disabled) {
      userTrackingLogger.info(
        'Askem Feedback: **DISABLED**. Not rendering anything.'
      );
    } else if (consentGiven) {
      userTrackingLogger.info(
        'Askem Feedback: **CONSENT GIVEN**. Rendering Askem widget container (.rns).'
      );
    } else {
      userTrackingLogger.info(
        'Askem Feedback: **CONSENT MISSING**. Rendering Cookies Required banner.'
      );
    }
  }, [consentGiven, disabled]);

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

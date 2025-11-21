import classNames from 'classnames';
import { Button, ButtonPresetTheme, ButtonVariant } from 'hds-react';
import useConsentTranslation from '../../hooks/useConsentTranslation';
import styles from './cookiesRequired.module.scss';

type CookiesRequiredProps = {
  className?: string;
  title: string;
  description: string;
  handleConsent?: () => void;
};

/**
 *
 * @param className the element class names
 * @param title the text that is shown the largest and explains what is missing
 * @param description the description text that is shown under the title and tells what should be done
 * @param handleConsent button onClick action. Button not rendered if left as undefined.
 * @returns a component that prompts for cookie consent and has button to give it
 */
function CookiesRequired({
  className,
  title,
  description,
  handleConsent,
}: CookiesRequiredProps) {
  const { t } = useConsentTranslation();

  return (
    <div className={classNames([styles.cookiesRequired, className])}>
      <h2>{title}</h2>
      <p>{description}</p>
      {handleConsent && (
        <Button
          theme={ButtonPresetTheme.Black}
          variant={ButtonVariant.Secondary}
          onClick={handleConsent}
        >
          {t('consent:cookiesRequired.cookieSettingsButtonText')}
        </Button>
      )}
    </div>
  );
}

export default CookiesRequired;

import { useRouter } from 'next/router';
import { AskemFeedbackContainer, AskemProvider } from '../askem';
import useAskemContext from '../askem/useAskemContext';
import EventsCookieConsent from '../eventsCookieConsent/EventsCookieConsent';
import { useCookieConfigurationContext } from '../../cookieConfigurationProvider';

type UserTrackingFeaturesProps = {
  appName: string;
  hasFeedBack: boolean;
  feedbackWithPadding: boolean;
  consentUrl: string;
  isModalConsent: boolean;
  children?: React.ReactNode[];
};

export default function UserTrackingFeatures({
  appName,
  hasFeedBack,
  feedbackWithPadding,
  consentUrl,
  isModalConsent,
}: UserTrackingFeaturesProps) {
  const { asPath } = useRouter();
  const { cookieDomain, askemConfiguration: askemConfigurationInput } =
    useCookieConfigurationContext();

  const { askemInstance, handleConsentGiven } = useAskemContext({
    cookieDomain,
    asPath,
    askemConfigurationInput,
  });

  return (
    <AskemProvider value={askemInstance}>
      {hasFeedBack && (
        <AskemFeedbackContainer
          withPadding={feedbackWithPadding}
          consentUrl={consentUrl}
        />
      )}
      {isModalConsent && (
        <EventsCookieConsent
          onConsentGiven={handleConsentGiven}
          allowLanguageSwitch={false}
          appName={appName}
        />
      )}
    </AskemProvider>
  );
}

import { useRouter } from 'next/router';
import { useCookieConfigurationContext } from '../../cookieConfigurationProvider';
import { AskemFeedbackContainer, AskemProvider } from '../askem';
import useAskemContext from '../askem/useAskemContext';
import EventsCookieConsent from '../eventsCookieConsent/EventsCookieConsent';

type UserTrackingFeaturesProps = {
  hasFeedBack: boolean;
  feedbackWithPadding: boolean;
  children?: React.ReactNode[];
};

export default function UserTrackingFeatures({
  hasFeedBack,
  feedbackWithPadding,
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
    </AskemProvider>
  );
}

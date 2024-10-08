import { useRouter } from 'next/router';
import { AskemFeedbackContainer, AskemProvider } from '../../components/askem';
import useAskemContext from '../../components/askem/useAskemContext';
import EventsCookieConsent from '../../components/eventsCookieConsent/EventsCookieConsent';
import { useCookieConfigurationContext } from '../../cookieConfigurationProvider';

type WidgetsContainerProps = {
  appName: string;
  hasFeedBack: boolean;
  feedbackWithPadding: boolean;
  consentUrl: string;
  isModalConsent: boolean;
  children?: React.ReactNode[];
};

export default function WidgetsContainer({
  appName,
  hasFeedBack,
  feedbackWithPadding,
  consentUrl,
  isModalConsent,
}: WidgetsContainerProps) {
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

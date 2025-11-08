import { useRouter } from 'next/router';
import { useCookieConfigurationContext } from '../../cookieConfigurationProvider';
import { AskemFeedbackContainer, AskemProvider } from '../askem';
import useAskemContext from '../askem/useAskemContext';

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

  const { askemInstance } = useAskemContext({
    cookieDomain,
    asPath,
    askemConfigurationInput,
  });

  return (
    <AskemProvider value={askemInstance}>
      {hasFeedBack && (
        <AskemFeedbackContainer withPadding={feedbackWithPadding} />
      )}
    </AskemProvider>
  );
}

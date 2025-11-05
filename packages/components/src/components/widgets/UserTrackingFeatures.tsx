import MatomoProvider from '@jonkoops/matomo-tracker-react/lib/MatomoProvider.js';
import { AskemFeedbackContainer, AskemProvider } from '../askem';
import useAskemContext from '../askem/useAskemContext';
import useMatomoInstance from '../matomo/useMatomo';
import MatomoWrapper from '../matomoWrapper/MatomoWrapper';

type UserTrackingFeaturesProps = {
  hasFeedBack: boolean;
  feedbackWithPadding: boolean;
  cookieBanner?: React.ReactNode;
  children?: React.ReactNode[];
};

export default function UserTrackingFeatures({
  hasFeedBack,
  feedbackWithPadding,
  cookieBanner,
}: UserTrackingFeaturesProps) {
  const { askemInstance } = useAskemContext();
  const matomoInstance = useMatomoInstance();

  return (
    <>
      <MatomoProvider value={matomoInstance}>
        <MatomoWrapper>
          <AskemProvider value={askemInstance}>
            {hasFeedBack && (
              <AskemFeedbackContainer withPadding={feedbackWithPadding} />
            )}
          </AskemProvider>
        </MatomoWrapper>
      </MatomoProvider>
      {cookieBanner}
    </>
  );
}

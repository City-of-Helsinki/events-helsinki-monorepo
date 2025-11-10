import { AskemFeedbackContainer, AskemProvider } from '../askem';
import useAskemContext from '../askem/useAskemContext';

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

  return (
    <>
      <AskemProvider value={askemInstance}>
        {hasFeedBack && (
          <AskemFeedbackContainer withPadding={feedbackWithPadding} />
        )}
      </AskemProvider>
      {cookieBanner}
    </>
  );
}

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
  const { askemInstance } = useAskemContext();

  return (
    <AskemProvider value={askemInstance}>
      {hasFeedBack && (
        <AskemFeedbackContainer withPadding={feedbackWithPadding} />
      )}
    </AskemProvider>
  );
}

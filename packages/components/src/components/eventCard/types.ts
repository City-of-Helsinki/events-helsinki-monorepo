import type { KeywordOnClickHandlerType } from '../../components/eventKeywords/EventKeywords';
import type { EventFields } from '../../types';

export type EventCardProps = {
  event: EventFields;
  eventUrl: string;
  getKeywordOnClickHandler: KeywordOnClickHandlerType;
};

export type LargeEventCardProps = EventCardProps & {
  showEnrolmentStatusInCardDetails?: boolean;
};

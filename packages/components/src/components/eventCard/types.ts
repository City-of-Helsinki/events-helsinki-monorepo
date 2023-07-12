import type { EventFields, KeywordOnClickHandlerType } from '../../types';

export type EventCardProps = {
  event: EventFields;
  eventUrl: string;
  getKeywordOnClickHandler: KeywordOnClickHandlerType;
};

export type LargeEventCardProps = EventCardProps & {
  showEnrolmentStatusInCardDetails?: boolean;
};

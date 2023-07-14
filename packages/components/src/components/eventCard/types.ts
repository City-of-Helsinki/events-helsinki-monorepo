import type { EventFields } from '../../types';

export type EventCardProps = {
  event: EventFields;
  eventUrl: string;
};

export type LargeEventCardProps = EventCardProps & {
  showEnrolmentStatusInCardDetails?: boolean;
};

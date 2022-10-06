import type { EventFieldsFragment } from '../nextApi/graphql/generated/graphql';
import { EventTypeId } from '../nextApi/graphql/generated/graphql';

export type KeywordOption = {
  id: string;
  name: string;
};

export type EventFields = EventFieldsFragment;

export type SuperEventResponse = {
  data: EventFields | null;
  status: 'pending' | 'resolved';
};

export type EventType = 'event' | 'course';

export const eventTypeToId: Record<EventType, EventTypeId> = {
  event: EventTypeId.General,
  course: EventTypeId.Course,
};

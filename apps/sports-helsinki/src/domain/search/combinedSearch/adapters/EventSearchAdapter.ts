import { EventTypeId } from '@events-helsinki/components/types';
import type {
  CombinedSearchAdapter,
  CombinedSearchAdapterInput,
  EventSearchParams,
} from '../types';

class EventSearchAdapter implements CombinedSearchAdapter<EventSearchParams> {
  text: string | null;
  keywords: string[];
  sort?: string | null;

  constructor(
    input: CombinedSearchAdapterInput,
    eventType: EventTypeId = EventTypeId.General
  ) {
    this.text = input.text ?? null;
    this.keywords = this.getKeywords(input);
    this.sort =
      eventType === EventTypeId.General
        ? input.eventOrderBy
        : input.courseOrderBy;
  }

  private getKeywords({ keywords }: CombinedSearchAdapterInput) {
    return [...new Set([...keywords])];
  }

  public getQueryVariables() {
    return { ...this } as EventSearchParams;
  }
}

export default EventSearchAdapter;

import { EventTypeId } from '@events-helsinki/components/types';
import { initialEventSearchAdapterValues } from '../constants';
import type {
  CombinedSearchAdapter,
  CombinedSearchAdapterInput,
  EventSearchParams,
} from '../types';

class EventSearchAdapter implements CombinedSearchAdapter<EventSearchParams> {
  text: EventSearchParams['text'];
  allOngoingAnd: EventSearchParams['allOngoingAnd'];
  start: EventSearchParams['start'];
  end: EventSearchParams['end'];
  include: EventSearchParams['include'];
  keyword: EventSearchParams['keyword'];
  keywordAnd: EventSearchParams['keywordAnd'];
  keywordNot: EventSearchParams['keywordNot'];
  keywordOrSet1: EventSearchParams['keywordOrSet1'];
  keywordOrSet2: EventSearchParams['keywordOrSet2'];
  location: EventSearchParams['location'];
  sort: EventSearchParams['sort'];
  eventType: EventSearchParams['eventType'];
  superEventType: EventSearchParams['superEventType'];
  publisher: EventSearchParams['publisher'];
  page: EventSearchParams['page'];
  pageSize: EventSearchParams['pageSize'];

  constructor(
    input: CombinedSearchAdapterInput,
    eventType: EventTypeId = EventTypeId.General
  ) {
    // Initialize the object with default values
    Object.assign(this, initialEventSearchAdapterValues, { eventType });

    this.text = input.text ?? null;
    // this.allOngoingAnd = [input.text] ?? null;
    this.keywordAnd = this.getKeywords(input);
    this.sort =
      (eventType === EventTypeId.General
        ? input.eventOrderBy
        : input.courseOrderBy) ?? initialEventSearchAdapterValues.sort;
    this.publisher =
      input.organization ?? initialEventSearchAdapterValues.publisher;
  }

  private getKeywords({ keywords }: CombinedSearchAdapterInput) {
    return [...new Set([...keywords])];
  }

  public getQueryVariables(): EventSearchParams {
    return { ...this };
  }
}

export default EventSearchAdapter;

import { CITY_OF_HELSINKI_LINKED_EVENTS_ORGANIZATION_ID } from '@events-helsinki/components';
import { EventTypeId } from '@events-helsinki/components/types';
import {
  SPORT_COURSES_KEYWORDS,
  sportsCategoryData,
  TARGET_GROUP_DATA,
} from '../../eventSearch/constants';
import { initialEventSearchAdapterValues } from '../constants';
import type {
  CombinedSearchAdapter,
  CombinedSearchAdapterInput,
  EventSearchParams,
} from '../types';

class EventSearchAdapter implements CombinedSearchAdapter<EventSearchParams> {
  /*
   * List here all the event and course search parameters
   * that are wanted to be mapped with the combined search.
   */
  xFullText?: EventSearchParams['xFullText'];
  xOngoing: EventSearchParams['xOngoing'];
  start: EventSearchParams['start'];
  end: EventSearchParams['end'];
  include: EventSearchParams['include'];
  keyword: EventSearchParams['keyword'];
  keywordAnd: EventSearchParams['keywordAnd'];
  keywordNot: EventSearchParams['keywordNot'];
  keywordOrSet1: EventSearchParams['keywordOrSet1'];
  keywordOrSet2: EventSearchParams['keywordOrSet2'];
  keywordOrSet3: EventSearchParams['keywordOrSet3'];
  location: EventSearchParams['location'];
  sort: EventSearchParams['sort'];
  eventType: EventSearchParams['eventType'];
  superEventType: EventSearchParams['superEventType'];
  superEvent: EventSearchParams['superEvent'];
  publisher: EventSearchParams['publisher'];
  publisherAncestor: EventSearchParams['publisherAncestor'];
  page: EventSearchParams['page'];
  pageSize: EventSearchParams['pageSize'];
  division: EventSearchParams['division'];

  /**
   * Map the combined search form fields to the event search query variables.
   * @param input The output of the CombinedSearchFormAdapter is here as an input.
   * @param eventType The courses and general events have their own mappings.
   */
  constructor(
    input: CombinedSearchAdapterInput,
    eventType: EventTypeId = EventTypeId.General
  ) {
    // Initialize the object with default values
    Object.assign(this, initialEventSearchAdapterValues, { eventType });

    this.xFullText = input.text || initialEventSearchAdapterValues.xFullText;
    this.keywordAnd = [];
    this.keywordOrSet1 = SPORT_COURSES_KEYWORDS;
    this.keywordOrSet2 = this.getSportsKeywords(input);
    this.keywordOrSet3 = this.getTargetGroupKeywords(input);
    this.sort =
      (eventType === EventTypeId.General
        ? input.eventOrderBy
        : input.courseOrderBy) ?? initialEventSearchAdapterValues.sort;
    this.publisher =
      input.organization ?? initialEventSearchAdapterValues.publisher;
    this.publisherAncestor = input.helsinkiOnly
      ? CITY_OF_HELSINKI_LINKED_EVENTS_ORGANIZATION_ID
      : initialEventSearchAdapterValues.publisherAncestor;
    this.superEvent = this.getSuperEvent(eventType);
  }

  /**
   * If the search is for Courses,
   * the superEvent should be set to 'none' -
   * LIIKUNTA-512 (https://helsinkisolutionoffice.atlassian.net/browse/LIIKUNTA-512)
   * */
  public getSuperEvent(eventType: EventTypeId) {
    if (eventType === EventTypeId.Course) {
      return 'none';
    }
  }

  public getSportsKeywords({ sportsCategories }: CombinedSearchAdapterInput) {
    return [
      ...new Set( // unique keywords
        sportsCategories.flatMap(
          (category) => sportsCategoryData?.[category].keywords ?? []
        )
      ),
    ];
  }

  public getTargetGroupKeywords({ targetGroups }: CombinedSearchAdapterInput) {
    return [
      ...new Set( // unique keywords
        targetGroups.flatMap(
          (targetGroup) => TARGET_GROUP_DATA?.[targetGroup].keywords ?? []
        )
      ),
    ];
  }

  public getQueryVariables(): EventSearchParams {
    const queryVariables: EventSearchParams = { ...this };
    (Object.keys(queryVariables) as Array<keyof EventSearchParams>).forEach(
      (key) => queryVariables[key] === undefined && delete queryVariables[key]
    );
    return queryVariables;
  }
}

export default EventSearchAdapter;

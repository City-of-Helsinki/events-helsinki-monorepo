import {
  CITY_OF_HELSINKI_LINKED_EVENTS_ORGANIZATION_ID,
  EVENT_SORT_OPTIONS,
} from '@events-helsinki/components';
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
  fullText?: EventSearchParams['fullText'];
  ongoing: EventSearchParams['ongoing'];
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

    this.fullText = input.text || initialEventSearchAdapterValues.fullText;
    this.keywordAnd = [];
    this.keywordOrSet1 = SPORT_COURSES_KEYWORDS;
    this.keywordOrSet2 = this.getSportsKeywords(input);
    this.keywordOrSet3 = this.getTargetGroupKeywords(input);
    this.sort = this.getSortingValue(
      eventType,
      input.eventOrderBy,
      input.courseOrderBy
    );
    this.publisher =
      input.organization ?? initialEventSearchAdapterValues.publisher;
    this.publisherAncestor = input.helsinkiOnly
      ? CITY_OF_HELSINKI_LINKED_EVENTS_ORGANIZATION_ID
      : initialEventSearchAdapterValues.publisherAncestor;
    this.superEvent = this.getSuperEvent(eventType);
    this.location = input.place ?? initialEventSearchAdapterValues.location;
  }

  /**
   * Determines the correct sort parameter value for an API request.
   *
   * This function selects the appropriate sort order (`eventOrderBy` or `courseOrderBy`)
   * based on the `eventType`. It also implements special handling for
   * `EVENT_SORT_OPTIONS.RANK_DESC`.
   *
   * As per LinkedEvents API requirements (see LINK-2422), relevance sorting (rank)
   * is activated by providing an *empty string* as the sort parameter when
   * `full_text` is used, not the literal '-rank' value. This function
   * performs that conversion.
   *
   * @param {EventTypeId} eventType The type of event, used to decide whether to use `eventOrderBy` or `courseOrderBy`.
   * @param {EventSearchParams['sort']} [eventOrderBy] The sort value to use if `eventType` is `EventTypeId.General`.
   * @param {EventSearchParams['sort']} [courseOrderBy] The sort value to use if `eventType` is `EventTypeId.Course`.
   * @returns {string} The finalized sort parameter string. Returns an empty string (`''`)
   * if the determined sort value is `EVENT_SORT_OPTIONS.RANK_DESC`,
   * otherwise returns the selected or default sort value.
   */
  public getSortingValue(
    eventType: EventTypeId,
    eventOrderBy?: EventSearchParams['sort'],
    courseOrderBy?: EventSearchParams['sort']
  ): string {
    const sortValue =
      (eventType === EventTypeId.General ? eventOrderBy : courseOrderBy) ??
      initialEventSearchAdapterValues.sort;

    // RANK_DESC needs to be handled as an empty string.
    return sortValue === EVENT_SORT_OPTIONS.RANK_DESC ? '' : sortValue;
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
          (category) => sportsCategoryData?.[category]?.keywords ?? []
        )
      ),
    ];
  }

  public getTargetGroupKeywords({ targetGroups }: CombinedSearchAdapterInput) {
    return [
      ...new Set( // unique keywords
        targetGroups.flatMap(
          (targetGroup) => TARGET_GROUP_DATA?.[targetGroup]?.keywords ?? []
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

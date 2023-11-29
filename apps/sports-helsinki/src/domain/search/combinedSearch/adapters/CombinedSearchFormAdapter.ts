import type { ParsedUrlQuery } from 'querystring';
import type { UnifiedSearchOrderByType } from '@events-helsinki/components/components/domain/unifiedSearch/unifiedSearchConstants';
import { UnifiedSearchOrderBy } from '@events-helsinki/components/components/domain/unifiedSearch/unifiedSearchConstants';
import type {
  AppLanguage,
  Coordinates,
} from '@events-helsinki/components/types';
import { EventTypeId } from '@events-helsinki/components/types';
import { upperFirst } from 'lodash';
import qs from 'query-string';
import { initialCombinedSearchFormValues } from '../constants';
import type {
  CombinedSearchAdapterInput,
  CombinedSearchAdapterInputFallback,
  InputFieldValueCleaner,
  SearchType,
  CombinedSearchAdapterInputArrayFields,
  CombinedSearchAdapterInputNonArrayFields,
} from '../types';
import EventSearchAdapter from './EventSearchAdapter';
import VenueSearchAdapter from './VenueSearchAdapter';

type CombinedSearchAdapterInputField =
  keyof typeof initialCombinedSearchFormValues;

type SearchAdapterType = typeof EventSearchAdapter | typeof VenueSearchAdapter;

type SearchVariablesType = {
  [K in SearchType]: K extends 'venue'
    ? ReturnType<VenueSearchAdapter['getQueryVariables']>
    : ReturnType<EventSearchAdapter['getQueryVariables']>;
};

export const searchAdapterForType: Record<SearchType, SearchAdapterType> = {
  event: EventSearchAdapter,
  course: EventSearchAdapter,
  venue: VenueSearchAdapter,
};

function toTrueOrUndefined(input?: string | boolean | null): true | undefined {
  return (
    ['true', '1', 'yes'].includes(input?.toString().toLowerCase() ?? '') ||
    undefined
  );
}

type CleanFunctionName = Exclude<
  keyof InputFieldValueCleaner<CombinedSearchAdapterInput>,
  'clean'
>;

export const cleanFunctionNames = Object.keys(
  initialCombinedSearchFormValues
).map((fieldName) => `clean${upperFirst(fieldName)}` as CleanFunctionName);

class CombinedSearchFormAdapter
  implements
    CombinedSearchAdapterInput,
    InputFieldValueCleaner<CombinedSearchAdapterInput>
{
  searchParams: URLSearchParams;
  /*
   * List here all the form fields that are available in the combined search form.
   * Note that these properties should have some general level name.
   * These values can be mapped to event, course and venue queries.
   */
  language: string;
  geolocation?: Coordinates | null;
  text: string;
  venueOrderBy?: string | null;
  eventOrderBy?: string | null;
  courseOrderBy?: string | null;
  sportsCategories: string[];
  targetGroups: string[];
  helsinkiOnly?: boolean | string | null;
  reservable?: boolean | string | null;
  accessibilityProfile?: string | null;
  organization?: string | null;
  place?: string | null;
  keywords: string[];

  /**
   * Map the URL search parameters to the form fields.
   * @param router NextRouter that can be used to resolve current URL
   * @param locale A locale is the current language and is needed by some of the graphql queries
   * @param input The URL search params that represents here the current page URL and the current state of the search form.
   */
  constructor(
    locale: string,
    input: URLSearchParams,
    geolocation?: Coordinates | null
  ) {
    this.searchParams = input;

    // Initialize the form with default values
    Object.assign(this, initialCombinedSearchFormValues);

    this.language = locale;
    this.geolocation = geolocation;

    this.text = this.getSingleValueInput<'text'>('text', 'q');
    this.venueOrderBy = this.getSingleValueInput<'venueOrderBy'>(
      'venueOrderBy',
      'orderBy',
      'sort'
    );
    this.eventOrderBy = this.getSingleValueInput<'eventOrderBy'>(
      'eventOrderBy',
      'orderBy',
      'sort'
    );
    this.courseOrderBy = this.getSingleValueInput<'courseOrderBy'>(
      'courseOrderBy',
      'orderBy',
      'sort'
    );
    this.sportsCategories =
      this.getMultiValueInput<'sportsCategories'>('sportsCategories');
    this.targetGroups = this.getMultiValueInput<'targetGroups'>('targetGroups');
    this.helsinkiOnly =
      this.getSingleValueInput<'helsinkiOnly'>('helsinkiOnly');
    this.reservable = this.getSingleValueInput<'reservable'>('reservable');
    this.organization = this.getSingleValueInput<'organization'>(
      'organization',
      'publisher'
    );
    this.place = this.getSingleValueInput<'place'>('place', 'places');
    this.keywords = this.getMultiValueInput<'keywords'>('keywords');
    this.accessibilityProfile =
      this.getSingleValueInput<'accessibilityProfile'>('accessibilityProfile');

    // Clean the field values for adapters
    this.clean();
  }

  /** The combined search form fields. */
  private getFormFields() {
    return Object.keys(
      initialCombinedSearchFormValues
    ) as CombinedSearchAdapterInputField[];
  }

  /**
   * Get a single value (i.e. not an array) type URL search parameter with fallbacks
   * @param primaryField The primary field name
   * @param fallbackFields The fallback field names in order of priority
   * @return Primary field's value if it's non-null, or the first non-null value of
   * the fallback fields or initialCombinedSearchFormValues[primaryField] if all are
   * null
   */
  private getSingleValueInput<
    T extends CombinedSearchAdapterInputNonArrayFields
  >(
    primaryField: T,
    ...fallbackFields: CombinedSearchAdapterInputFallback[]
  ): string | (typeof initialCombinedSearchFormValues)[T] {
    for (const field of [primaryField, ...fallbackFields]) {
      const value = this.searchParams.get(field);
      if (value !== null) {
        return value;
      }
    }
    return initialCombinedSearchFormValues[primaryField];
  }

  /**
   * Get a multi value (i.e. an array) type URL search parameter with fallbacks
   * @param primaryField The primary field name
   * @param fallbackFields The fallback field names in order of priority
   * @return Primary field's value if it's non-empty, or the first non-empty value of
   * the fallback fields or initialCombinedSearchFormValues[primaryField] if all are
   * empty
   */
  private getMultiValueInput<T extends CombinedSearchAdapterInputArrayFields>(
    primaryField: T,
    ...fallbackFields: CombinedSearchAdapterInputFallback[]
  ): string[] | (typeof initialCombinedSearchFormValues)[T] {
    for (const field of [primaryField, ...fallbackFields]) {
      const value = this.searchParams.getAll(field);
      if (value.length > 0) {
        return value;
      }
    }
    return initialCombinedSearchFormValues[primaryField];
  }

  /**
   * Get a map of form values.
   */
  public getFormValues(): CombinedSearchAdapterInput {
    const formFields = this.getFormFields();
    return formFields.reduce(
      (formParams: CombinedSearchAdapterInput, field) => {
        const value = this[field];
        return {
          ...formParams,
          [field]: value,
        };
      },
      { ...initialCombinedSearchFormValues }
    );
  }

  public setFormValues(formValues: Partial<CombinedSearchAdapterInput>) {
    const formFields = this.getFormFields();
    Object.entries(formValues).forEach(([field, value]) => {
      if (formFields.includes(field as CombinedSearchAdapterInputField)) {
        Object.assign(this, { [field]: value });
      }
    });
  }

  /**
   * Get parsed URL query, where the current parsed URL query
   * from the Router is used as a base and it's params are
   * overridden with the transformed params.
   * */
  public getURLQuery(): ParsedUrlQuery {
    const currentParams = qs.parse(this.searchParams.toString());
    const formParams = this.getFormValues();
    // Remove the undefined properties with JSON-utils.
    // Also decode the values for URL.
    return JSON.parse(
      JSON.stringify({ ...currentParams, ...formParams } as ParsedUrlQuery)
    );
  }

  public getSearchVariables(): SearchVariablesType {
    const venueSearchQueryVariables = new VenueSearchAdapter(
      this.getFormValues(),
      this.language as AppLanguage,
      this.geolocation
    ).getQueryVariables();
    const eventSearchQueryVariables = new EventSearchAdapter(
      this.getFormValues(),
      EventTypeId.General
    ).getQueryVariables();
    const courseSearchQueryVariables = new EventSearchAdapter(
      this.getFormValues(),
      EventTypeId.Course
    ).getQueryVariables();

    return {
      venue: venueSearchQueryVariables,
      event: eventSearchQueryVariables,
      course: courseSearchQueryVariables,
    };
  }

  public cleanText() {
    return;
  }

  public cleanVenueOrderBy() {
    if (
      this.venueOrderBy &&
      Object.values(UnifiedSearchOrderBy).includes(
        this.venueOrderBy as UnifiedSearchOrderByType
      )
    ) {
      const orderDir = this.searchParams.get('orderDir');
      if (orderDir?.includes('desc')) {
        this.venueOrderBy = '-' + this.venueOrderBy;
      }
    }
  }

  public cleanEventOrderBy() {
    return;
  }

  public cleanCourseOrderBy() {
    return;
  }

  public cleanSportsCategories() {
    return;
  }

  public cleanTargetGroups() {
    return;
  }

  public cleanHelsinkiOnly() {
    this.helsinkiOnly = toTrueOrUndefined(this.helsinkiOnly);
  }

  public cleanReservable() {
    this.reservable = toTrueOrUndefined(this.reservable);
  }

  public cleanOrganization() {
    return;
  }

  public cleanKeywords() {
    return;
  }

  public cleanPlace() {
    return;
  }

  public cleanAccessibilityProfile() {
    return;
  }

  /**
   * Clean and format the values
   * so that they can be better handled with the adapters.
   * The URL is an URL-encoded string presentation of search params (some keys and values).
   * This method should decode and type them.
   * */
  public clean() {
    for (const cleanFunctionName of cleanFunctionNames) {
      this[cleanFunctionName]();
    }
  }
}

export default CombinedSearchFormAdapter;

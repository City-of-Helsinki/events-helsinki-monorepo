import type { ParsedUrlQuery } from 'querystring';
import type { UnifiedSearchOrderByType } from '@events-helsinki/components/components/domain/unifiedSearch/unifiedSearchConstants';
import { UnifiedSearchOrderBy } from '@events-helsinki/components/components/domain/unifiedSearch/unifiedSearchConstants';
import type { AppLanguage } from '@events-helsinki/components/types';
import { EventTypeId } from '@events-helsinki/components/types';
import qs from 'query-string';
import { initialCombinedSearchFormValues } from '../constants';
import type {
  CombinedSearchAdapterInput,
  InputFieldValueCleaner,
  SearchType,
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
  text: string;
  venueOrderBy?: string | null;
  eventOrderBy?: string | null;
  courseOrderBy?: string | null;
  sportsCategories: string[];
  organization?: string | null;
  place?: string | null;
  keywords: string[];

  /**
   * Map the URL search parameters to the form fields.
   * @param router NextRouter that can be used to resolve current URL
   * @param locale A locale is the current language and is needed by some of the graphql queries
   * @param input The URL search params that represents here the current page URL and the current state of the search form.
   */
  constructor(locale: string, input: URLSearchParams) {
    this.searchParams = input;

    // Initialize the form with default values
    Object.assign(this, initialCombinedSearchFormValues);

    this.language = locale;
    this.text = input.get('text') ?? input.get('q') ?? '';
    this.venueOrderBy =
      input.get('venueOrderBy') ??
      input.get('orderBy') ??
      input.get('sort') ??
      initialCombinedSearchFormValues.venueOrderBy;
    this.eventOrderBy =
      input.get('eventOrderBy') ??
      input.get('orderBy') ??
      input.get('sort') ??
      initialCombinedSearchFormValues.eventOrderBy;
    this.courseOrderBy =
      input.get('courseOrderBy') ??
      input.get('orderBy') ??
      input.get('sort') ??
      initialCombinedSearchFormValues.courseOrderBy;
    this.sportsCategories = input.getAll('sportsCategories');
    this.organization =
      input.get('organization') ??
      input.get('publisher') ??
      initialCombinedSearchFormValues.organization;
    this.place =
      input.get('place') ??
      input.get('places') ??
      initialCombinedSearchFormValues.place;
    this.keywords = input.getAll('keywords');

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
   * Get a map of form values.
   * */
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
      this.language as AppLanguage
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

  public cleanOrganization() {
    return;
  }

  public cleanKeywords() {
    return;
  }

  public cleanPlace() {
    return;
  }

  /**
   * Clean and format the values
   * so that they can be better handled with the adapters.
   * The URL is an URL-encoded string presentation of search params (some keys and values).
   * This method should decode and type them.
   * */
  public clean() {
    this.cleanText();
    this.cleanVenueOrderBy();
    this.cleanEventOrderBy();
    this.cleanCourseOrderBy();
    this.cleanSportsCategories();
    this.cleanOrganization();
    this.cleanKeywords();
    this.cleanPlace();
  }
}

export default CombinedSearchFormAdapter;

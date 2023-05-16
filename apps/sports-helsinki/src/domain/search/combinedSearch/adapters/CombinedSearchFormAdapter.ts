import type { ParsedUrlQuery } from 'querystring';
import type { AppLanguage } from '@events-helsinki/components/types';
import { EventTypeId } from '@events-helsinki/components/types';
import type { NextRouter } from 'next/router';
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
  router: NextRouter;
  language: string;
  text: string;
  venueOrderBy?: string | null;
  eventOrderBy?: string | null;
  courseOrderBy?: string | null;
  sportsCategories: string[];
  organization?: string | null;
  keywords: string[];

  constructor(router: NextRouter, locale: string, input?: URLSearchParams) {
    this.router = router;

    // Initialize the object with default values
    Object.assign(this, initialCombinedSearchFormValues);

    if (!input) {
      input = new URLSearchParams(qs.stringify(router.query));
    }
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
    this.organization = input.get('publisher') ?? undefined;
    this.keywords = input.getAll('keywords');

    // Clean the field values for adapters
    this.clean();
  }

  /** The combined search form fields. */
  private getFormFields() {
    return Object.keys(initialCombinedSearchFormValues).map(
      (k) => k as CombinedSearchAdapterInputField
    );
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
    const currentParams = this.router.query;
    const formParams = this.getFormValues();
    // Remove the undefined properties with JSON-utils.
    // Also decode the values for URL.
    return JSON.parse(
      JSON.stringify({ ...currentParams, ...formParams } as ParsedUrlQuery)
    );
  }

  public routerPush() {
    const query = this.getURLQuery();
    this.router.push({ query });
  }

  public routerReplace() {
    const query = this.getURLQuery();
    this.router.replace({ query });
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
    return;
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
  }
}

export default CombinedSearchFormAdapter;

import type { ParsedUrlQuery } from 'querystring';
import type { Router } from 'next/router';
import qs from 'query-string';
import type {
  CombinedSearchAdapterInput,
  CombinedSearchAdapterInputField,
  InputFieldValueCleaner,
} from '../types';
import { combinedSearchAdapterInputFields } from '../types';
import EventSearchAdapter from './EventSearchAdapter';
import VenueSearchAdapter from './VenueSearchAdapter';

class CombinedSearchFormAdapter
  implements
    CombinedSearchAdapterInput,
    InputFieldValueCleaner<CombinedSearchAdapterInput>
{
  router: Router;
  initialFormParams: CombinedSearchAdapterInput = {
    text: '',
    orderBy: '',
    sportsCategories: [],
    organization: null,
    keywords: [],
  };
  text: string;
  orderBy: string;
  sportsCategories: string[];
  organization: string | null;
  keywords: string[];

  constructor(router: Router, input?: URLSearchParams) {
    this.router = router;

    if (!input) {
      input = new URLSearchParams(qs.stringify(router.query));
    }

    this.text = input.get('text') ?? input.get('q') ?? '';
    this.orderBy = input.get('orderBy') ?? input.get('sort') ?? '';
    this.sportsCategories = input.getAll('sportsCategories');
    this.organization = input.get('publisher');
    this.keywords = input.getAll('keywords');

    // Clean the field values for adapters
    this.clean();
  }

  /**
   * Get a map of form values.
   * */
  public getFormValues(): CombinedSearchAdapterInput {
    return Object.keys(this).reduce(
      (formParams: CombinedSearchAdapterInput, field) => {
        if (
          combinedSearchAdapterInputFields.includes(
            field as CombinedSearchAdapterInputField
          )
        ) {
          return {
            ...formParams,
            [field]: this[field as CombinedSearchAdapterInputField],
          };
        }
        return formParams;
      },
      { ...this.initialFormParams }
    );
  }

  /**
   * Get parsed URL query, where the current parsed URL query
   * from the Router is used as a base and it's params are
   * overridden with the transformed params.
   * */
  public getURLQuery(): ParsedUrlQuery {
    const currentParams = this.router.query;
    const formParams = this.getFormValues();
    return { ...currentParams, ...formParams } as ParsedUrlQuery;
  }

  public routerPush() {
    const query = this.getURLQuery();
    this.router.push({ query });
  }

  public routerReplace() {
    const query = this.getURLQuery();
    this.router.replace({ query });
  }

  public getSearchVariables() {
    const venueSearchAdapter = new VenueSearchAdapter(
      this.getFormValues()
    ).getQueryVariables();
    const eventSearchAdapter = new EventSearchAdapter(
      this.getFormValues()
    ).getQueryVariables();

    return {
      VenueSearchAdapter: venueSearchAdapter,
      EventSearchAdapter: eventSearchAdapter,
    };
  }

  public cleanText() {
    return;
  }

  public cleanOrderBy() {
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
    this.cleanOrderBy();
    this.cleanSportsCategories();
    this.cleanOrganization();
    this.cleanKeywords();
  }
}

export default CombinedSearchFormAdapter;

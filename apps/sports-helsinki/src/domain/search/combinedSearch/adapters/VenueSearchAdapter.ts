import { SortOrder } from '@events-helsinki/components/types';
import { initialVenueSearchAdapterValues } from '../constants';
import type {
  CombinedSearchAdapter,
  CombinedSearchAdapterInput,
  VenueSearchParams,
} from '../types';

class VenueSearchAdapter implements CombinedSearchAdapter<VenueSearchParams> {
  q: VenueSearchParams['q'];
  ontologyTreeIds: VenueSearchParams['ontologyWordIds'];
  ontologyWordIds: VenueSearchParams['ontologyWordIds'];
  openAt?: VenueSearchParams['openAt'];
  administrativeDivisionIds?: VenueSearchParams['administrativeDivisionIds'];
  orderByName: VenueSearchParams['orderByName'];
  orderByDistance: VenueSearchParams['orderByDistance'];
  after?: VenueSearchParams['after'];
  first?: VenueSearchParams['first'];

  constructor(input: CombinedSearchAdapterInput) {
    // Initialize the object with default values
    Object.assign(this, initialVenueSearchAdapterValues);

    this.q = input.text;
    this.ontologyWordIds = this.getOntologyWords(input);
    this.orderByName = input.venueOrderBy
      ? SortOrder.Ascending.toLowerCase().includes(input.venueOrderBy)
        ? { order: SortOrder.Ascending }
        : { order: SortOrder.Descending }
      : null;
    // this.orderByDistance = null; // input.venueOrderBy ? (SortOrder.Ascending.toLowerCase().includes(input.venueOrderBy) ? {order: SortOrder.Ascending} : {order: SortOrder.Descending}) : null;
  }

  private getOntologyWords({
    keywords,
    sportsCategories,
  }: CombinedSearchAdapterInput) {
    return [...new Set([...keywords, ...sportsCategories])];
  }

  public getQueryVariables() {
    return { ...this };
  }

  // public getQueryVariables() {
  //   type VenueSearchParamsField = keyof typeof initialVenueSearchAdapterValues;
  //   const searchFields = Object.keys(initialVenueSearchAdapterValues);
  //   return searchFields.reduce(
  //     (searchVariables: VenueSearchParams, field) => {
  //       return {
  //         ...searchVariables,
  //         [field]: this[field as VenueSearchParamsField],
  //       };
  //     },
  //     { ...initialVenueSearchAdapterValues }
  //   );
  // }
}

export default VenueSearchAdapter;

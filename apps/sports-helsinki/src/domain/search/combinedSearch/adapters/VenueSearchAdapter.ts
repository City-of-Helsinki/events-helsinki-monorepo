import type {
  AppLanguage,
  UnifiedSearchLanguage,
} from '@events-helsinki/components/types';
import { SortOrder } from '@events-helsinki/components/types';
import { appToUnifiedSearchLanguageMap } from '../../eventSearch/types';
import { initialVenueSearchAdapterValues } from '../constants';
import type {
  CombinedSearchAdapter,
  CombinedSearchAdapterInput,
  VenueSearchParams,
} from '../types';

class VenueSearchAdapter implements CombinedSearchAdapter<VenueSearchParams> {
  includeHaukiFields: VenueSearchParams['includeHaukiFields'];
  language: VenueSearchParams['language'];
  q: VenueSearchParams['q'];
  ontologyTreeIds: VenueSearchParams['ontologyWordIds'];
  ontologyWordIds: VenueSearchParams['ontologyWordIds'];
  openAt?: VenueSearchParams['openAt'];
  administrativeDivisionIds?: VenueSearchParams['administrativeDivisionIds'];
  orderByName: VenueSearchParams['orderByName'];
  orderByDistance: VenueSearchParams['orderByDistance'];
  after?: VenueSearchParams['after'];
  first?: VenueSearchParams['first'];

  constructor(input: CombinedSearchAdapterInput, locale: AppLanguage) {
    // Initialize the object with default values
    Object.assign(this, initialVenueSearchAdapterValues);

    this.language = appToUnifiedSearchLanguageMap[
      locale
    ] as UnifiedSearchLanguage;
    this.q = input.text || initialVenueSearchAdapterValues.q;
    this.ontologyWordIds = this.getOntologyWords(input);
    this.orderByName = input.venueOrderBy
      ? SortOrder.Ascending.toLowerCase().includes(input.venueOrderBy)
        ? { order: SortOrder.Ascending }
        : { order: SortOrder.Descending }
      : initialVenueSearchAdapterValues.orderByName;
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
}

export default VenueSearchAdapter;

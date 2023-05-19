import { SPORTS_CATEGORY_TO_ONTOLOGY_TREE_IDS } from '@events-helsinki/components/components/domain/unifiedSearch/unifiedSearchConstants';
import type {
  AppLanguage,
  SPORTS_CATEGORIES,
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
  /*
   * List here all the venue search parameters
   * that are wanted to be mapped with the combined search.
   */
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

  /**
   * Map the combined search form fields to the venue search query variables.
   * @param input The output of the CombinedSearchFormAdapter is here as an input.
   * @param locale The venue search needs a locale as a mandatory variable. This is not included in the combnined search form as a field (for now).
   */
  constructor(input: CombinedSearchAdapterInput, locale: AppLanguage) {
    // Initialize the object with default values
    Object.assign(this, initialVenueSearchAdapterValues);

    this.language = appToUnifiedSearchLanguageMap[
      locale
    ] as UnifiedSearchLanguage;
    this.q = input.text || initialVenueSearchAdapterValues.q;
    this.ontologyTreeIds = this.getOntologyTreeIds(input);
    this.orderByName = input.venueOrderBy
      ? SortOrder.Ascending.toLowerCase().includes(input.venueOrderBy)
        ? { order: SortOrder.Ascending }
        : { order: SortOrder.Descending }
      : initialVenueSearchAdapterValues.orderByName;
    // TODO: this.orderByDistance = null; // input.venueOrderBy ? (SortOrder.Ascending.toLowerCase().includes(input.venueOrderBy) ? {order: SortOrder.Ascending} : {order: SortOrder.Descending}) : null;
  }

  private getOntologyTreeIds({
    sportsCategories,
  }: CombinedSearchAdapterInput): VenueSearchParams['ontologyWordIds'] {
    // If there are no selected sport categories, use the default one for sports
    if (!sportsCategories?.length) {
      return initialVenueSearchAdapterValues.ontologyTreeIds;
    }
    const filteredSportsCategories =
      sportsCategories
        .reduce((ids: number[], sportCategory) => {
          const treeIds =
            SPORTS_CATEGORY_TO_ONTOLOGY_TREE_IDS[
              sportCategory as SPORTS_CATEGORIES
            ];
          return [...ids, ...(treeIds ?? [])];
        }, [])
        .map(String) ?? [];

    // Return a unique list of tree ids
    return [...new Set([...filteredSportsCategories])];
  }

  public getQueryVariables(): VenueSearchParams {
    return { ...this };
  }
}

export default VenueSearchAdapter;

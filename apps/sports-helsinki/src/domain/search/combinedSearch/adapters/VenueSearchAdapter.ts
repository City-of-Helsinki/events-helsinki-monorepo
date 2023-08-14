import {
  SPORTS_CATEGORY_TO_ONTOLOGY_TREE_IDS,
  TARGET_GROUPS_TO_UNIFIED_SEARCH_TARGET_GROUPS,
} from '@events-helsinki/components/components/domain/unifiedSearch/unifiedSearchConstants';
import type {
  AppLanguage,
  Coordinates,
  OrderByDistance,
  SPORTS_CATEGORIES,
  UnifiedSearchLanguage,
  TARGET_GROUPS,
  TargetGroup as UnifiedSearchTargetGroup,
} from '@events-helsinki/components/types';
import {
  SortOrder,
  ProviderType,
  ServiceOwnerType,
} from '@events-helsinki/components/types';
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
  providerTypes: VenueSearchParams['providerTypes'];
  serviceOwnerTypes: VenueSearchParams['serviceOwnerTypes'];
  targetGroups: VenueSearchParams['targetGroups'];
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
  constructor(
    input: CombinedSearchAdapterInput,
    locale: AppLanguage,
    geoLocation?: Coordinates | null
  ) {
    // Initialize the object with default values
    Object.assign(this, initialVenueSearchAdapterValues);

    this.language = appToUnifiedSearchLanguageMap[
      locale
    ] as UnifiedSearchLanguage;
    this.q = input.text || initialVenueSearchAdapterValues.q;
    this.ontologyTreeIds = this.getOntologyTreeIds(input);
    this.targetGroups = this.getTargetGroups(input);
    this.providerTypes = input.helsinkiOnly
      ? [ProviderType.SelfProduced]
      : initialVenueSearchAdapterValues.providerTypes;
    this.serviceOwnerTypes = input.helsinkiOnly
      ? [ServiceOwnerType.MunicipalService]
      : initialVenueSearchAdapterValues.serviceOwnerTypes;
    if (input.venueOrderBy?.includes('name')) {
      this.orderByName = input.venueOrderBy.startsWith('-')
        ? { order: SortOrder.Descending }
        : { order: SortOrder.Ascending };
    } else if (input.venueOrderBy?.includes('distance') && geoLocation) {
      this.orderByDistance = {
        latitude: geoLocation?.latitude,
        longitude: geoLocation?.longitude,
        order: input.venueOrderBy.startsWith('-')
          ? SortOrder.Descending
          : SortOrder.Ascending,
      } as OrderByDistance;
    }
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

  private getTargetGroups({
    targetGroups,
  }: CombinedSearchAdapterInput): VenueSearchParams['targetGroups'] {
    // If there are no selected target groups, use the default one
    if (!targetGroups?.length) {
      return initialVenueSearchAdapterValues.targetGroups;
    }
    const mappedTargetGroups = targetGroups.reduce(
      (accumulator: UnifiedSearchTargetGroup[], targetGroup) => {
        return [
          ...accumulator,
          ...TARGET_GROUPS_TO_UNIFIED_SEARCH_TARGET_GROUPS[
            targetGroup as TARGET_GROUPS
          ],
        ];
      },
      []
    );

    // Return a unique list of target groups
    return [...new Set([...mappedTargetGroups])];
  }

  public getQueryVariables(): VenueSearchParams {
    const queryVariables: VenueSearchParams = { ...this };
    (Object.keys(queryVariables) as Array<keyof VenueSearchParams>).forEach(
      (key) => queryVariables[key] === undefined && delete queryVariables[key]
    );
    return queryVariables;
  }
}

export default VenueSearchAdapter;

import {
  SPORTS_CATEGORY_TO_ONTOLOGY_TREE_IDS,
  TARGET_GROUPS_TO_ONTOLOGY_TREE_IDS,
} from '@events-helsinki/components/components/domain/unifiedSearch/unifiedSearchConstants';
import type {
  AppLanguage,
  Coordinates,
  OrderByDistance,
} from '@events-helsinki/components/types';
import {
  SortOrder,
  ProviderType,
  ServiceOwnerType,
  isSportsCategory,
  isTargetGroup,
} from '@events-helsinki/components/types';
import { isAccessibilityProfile } from '@events-helsinki/components/utils/accessibilityProfile/typeguards';
import { SPORTS_DEPARTMENT_ONTOLOGY_TREE_ID } from '../../../app/appConstants';
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
  text: VenueSearchParams['text'];
  ontologyTreeIdOrSets: VenueSearchParams['ontologyTreeIdOrSets'];
  ontologyWordIdOrSets: VenueSearchParams['ontologyWordIdOrSets'];
  providerTypes: VenueSearchParams['providerTypes'];
  serviceOwnerTypes: VenueSearchParams['serviceOwnerTypes'];
  mustHaveReservableResource: VenueSearchParams['mustHaveReservableResource'];
  openAt?: VenueSearchParams['openAt'];
  administrativeDivisionIds?: VenueSearchParams['administrativeDivisionIds'];
  orderByName: VenueSearchParams['orderByName'];
  orderByDistance: VenueSearchParams['orderByDistance'];
  orderByAccessibilityProfile: VenueSearchParams['orderByAccessibilityProfile'];
  showCultureAndLeisureDivisionFirst: VenueSearchParams['showCultureAndLeisureDivisionFirst'];
  after?: VenueSearchParams['after'];
  first?: VenueSearchParams['first'];

  /**
   * Map the combined search form fields to the venue search query variables.
   * @param input The output of the CombinedSearchFormAdapter is here as an input.
   * @param locale The venue search needs a locale as a mandatory variable.
   * This is not included in the combnined search form as a field (for now).
   */
  constructor(
    input: CombinedSearchAdapterInput,
    locale: AppLanguage,
    geoLocation?: Coordinates | null
  ) {
    // Initialize the object with default values
    Object.assign(this, initialVenueSearchAdapterValues);

    this.language = appToUnifiedSearchLanguageMap[locale];
    this.text = input.text || initialVenueSearchAdapterValues.text;
    this.ontologyTreeIdOrSets =
      this.getOntologyTreeIdOrSets(input) ||
      initialVenueSearchAdapterValues.ontologyTreeIdOrSets;
    this.providerTypes = input.helsinkiOnly
      ? [ProviderType.SelfProduced]
      : initialVenueSearchAdapterValues.providerTypes;
    this.serviceOwnerTypes = input.helsinkiOnly
      ? [ServiceOwnerType.MunicipalService]
      : initialVenueSearchAdapterValues.serviceOwnerTypes;
    this.mustHaveReservableResource = !!input.reservable;

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
    } else if (isAccessibilityProfile(input.venueOrderBy)) {
      this.orderByAccessibilityProfile = input.venueOrderBy;
    } else {
      // Only show Culture and Leisure Division's venues first
      // if no other specific ordering is defined → means "Sort by relevance",
      this.showCultureAndLeisureDivisionFirst = true;
    }
  }

  private getSportsCategoriesOntologyTreeIds(
    sportsCategories: CombinedSearchAdapterInput['sportsCategories']
  ): string[] {
    // If there are no selected sport categories, use the default one for sports
    if (!sportsCategories?.length) {
      return [SPORTS_DEPARTMENT_ONTOLOGY_TREE_ID.toString()];
    }
    const sportsCategoriesOntologyTreeIds = sportsCategories
      .filter(isSportsCategory)
      .flatMap(
        (sportsCategory) => SPORTS_CATEGORY_TO_ONTOLOGY_TREE_IDS[sportsCategory]
      )
      .map(String);

    // Return a unique list of sports categories' ontology tree IDs
    return [...new Set(sportsCategoriesOntologyTreeIds)];
  }

  private getTargetGroupsOntologyTreeIds(
    targetGroups: CombinedSearchAdapterInput['targetGroups']
  ): string[] {
    // If there are no selected target groups, use the default one
    if (!targetGroups?.length) {
      return []; // No default target groups
    }
    const targetGroupsOntologyTreeIds = targetGroups
      .filter(isTargetGroup)
      .flatMap((targetGroup) => TARGET_GROUPS_TO_ONTOLOGY_TREE_IDS[targetGroup])
      .map(String);

    // Return a unique list of target groups' ontology tree IDs
    return [...new Set(targetGroupsOntologyTreeIds)];
  }

  private getOntologyTreeIdOrSets({
    sportsCategories,
    targetGroups,
  }: CombinedSearchAdapterInput): VenueSearchParams['ontologyTreeIdOrSets'] {
    return [
      this.getSportsCategoriesOntologyTreeIds(sportsCategories),
      this.getTargetGroupsOntologyTreeIds(targetGroups),
    ].filter((list) => list.length > 0);
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

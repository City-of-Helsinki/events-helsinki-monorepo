import type {
  CombinedSearchAdapter,
  CombinedSearchAdapterInput,
  VenueSearchParams,
} from '../types';

class VenueSearchAdapter implements CombinedSearchAdapter<VenueSearchParams> {
  q: string;
  ontologyWords: string[];
  orderBy: string;

  constructor(input: CombinedSearchAdapterInput) {
    this.q = input.text;
    this.orderBy = input.orderBy;
    this.ontologyWords = this.getOntologyWords(input);
  }

  private getOntologyWords({
    keywords,
    sportsCategories,
  }: CombinedSearchAdapterInput) {
    return [...new Set([...keywords, ...sportsCategories])];
  }

  public getQueryVariables() {
    return { ...this } as VenueSearchParams;
  }
}

export default VenueSearchAdapter;

import type {
  CombinedSearchAdapter,
  CombinedSearchAdapterInput,
  EventSearchParams,
} from '../types';

class EventSearchAdapter implements CombinedSearchAdapter<EventSearchParams> {
  text: string;
  keywords: string[];
  sort: string;

  constructor(input: CombinedSearchAdapterInput) {
    this.text = input.text;
    this.keywords = this.getKeywords(input);
    this.sort = input.orderBy;
  }

  private getKeywords({ keywords }: CombinedSearchAdapterInput) {
    return [...new Set([...keywords])];
  }

  public getQueryVariables() {
    return { ...this } as EventSearchParams;
  }
}

export default EventSearchAdapter;

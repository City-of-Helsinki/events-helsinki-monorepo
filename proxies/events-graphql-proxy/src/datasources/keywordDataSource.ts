import type { Keyword, KeywordListResponse } from '../types/types';
import LinkedEventsDataSource from './LinkedEventsDataSource';

class KeywordDataSource extends LinkedEventsDataSource {
  public async getKeywordDetails(id: string): Promise<Keyword> {
    return this.get(`keyword/${id}`);
  }

  public async getKeywordList(query: string): Promise<KeywordListResponse> {
    return this.get(`keyword${query}`);
  }
}

export default KeywordDataSource;

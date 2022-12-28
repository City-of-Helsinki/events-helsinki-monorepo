import type { Keyword, KeywordListResponse } from '../types/types';
import DataSource from './LinkedEventsDataSource';

class KeywordAPI extends DataSource {
  public async getKeywordDetails(id: string): Promise<Keyword> {
    return this.get(`keyword/${id}`);
  }

  public async getKeywordList(query: string): Promise<KeywordListResponse> {
    return this.get(`keyword${query}`);
  }
}

export default KeywordAPI;

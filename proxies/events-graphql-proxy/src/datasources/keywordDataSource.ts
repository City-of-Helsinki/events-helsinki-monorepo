import type { Keyword, KeywordListResponse } from '../types/__generated__.js';
import LinkedEventsDataSource from './LinkedEventsDataSource.js';

class KeywordDataSource extends LinkedEventsDataSource {
  public getKeywordDetails(id: string): Promise<Keyword> {
    return this.get(`keyword/${id}/`);
  }

  public getKeywordList(query: string): Promise<KeywordListResponse> {
    return this.get(`keyword/${query}`);
  }
}

export default KeywordDataSource;

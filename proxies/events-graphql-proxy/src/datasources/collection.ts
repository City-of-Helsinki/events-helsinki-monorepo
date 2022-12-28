import type { CollectionDetails, CollectionListResponse } from '../types/types';
import DataSource from './CmsDataSource';

class CollectionAPI extends DataSource {
  public async getCollectionDetails(
    slug?: string | null,
    query?: string
  ): Promise<CollectionDetails> {
    return this.get(`collections/${slug ?? ''}${query ?? ''}`);
  }

  public async getCollectionList(
    query: string
  ): Promise<CollectionListResponse['data']> {
    return this.get(`collections${query}`);
  }
}

export default CollectionAPI;

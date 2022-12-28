import type { Place, PlaceListResponse } from '../types/types';
import DataSource from './LinkedEventsDataSource';
class PlaceAPI extends DataSource {
  public async getPlaceDetails(id: string): Promise<Place> {
    return this.get(`place/${id}`);
  }
  public async getPlaceList(query: string): Promise<PlaceListResponse> {
    return this.get(`place${query}`);
  }
}

export default PlaceAPI;

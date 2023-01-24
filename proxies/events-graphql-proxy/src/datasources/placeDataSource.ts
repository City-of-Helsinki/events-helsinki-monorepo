import type { Place, PlaceListResponse } from '../types/types';
import LinkedEventsDataSource from './LinkedEventsDataSource';
class PlaceDataSource extends LinkedEventsDataSource {
  public async getPlaceDetails(id: string): Promise<Place> {
    return this.get(`place/${id}`);
  }
  public async getPlaceList(query: string): Promise<PlaceListResponse> {
    return this.get(`place${query}`);
  }
}

export default PlaceDataSource;
